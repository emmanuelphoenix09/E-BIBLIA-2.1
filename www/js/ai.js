/*
 * E-BIBLIA 3.0 — Moteur IA de Léona
 * ------------------------------------------------------------
 * Ce fichier contient la logique de communication avec Gemini
 * et le rendu des réponses de l'assistant.
 *
 * Pour modifier le comportement de Léona : modifiez ce fichier.
 * Pour modifier son interface visuelle : modifiez css/ia.css.
 * Pour modifier la structure HTML : modifiez ia.html.
 */
(function () {
  function escapeHtml(value) { const div=document.createElement("div"); div.textContent=value ?? ""; return div.innerHTML; }

function getGeminiConfig() {
            const injected = window.EBIBLIA_CONFIG || {};
            return {
                apiKey: injected.API_KEY || "",
                model: injected.GEMINI_MODEL || "gemini-3-flash-preview"
            };
        }

async function askGemini(question = "") {
            const config = getGeminiConfig();
            if (!config.apiKey) {
                throw new Error("La configuration interne de l'Assistant IA est introuvable.");
            }

            const biblicalContext = window.EBibliaReader.getSelectedVersesText();
            const isInitialExplanation = !question.trim();
            const userRequest = isInitialExplanation
                ? `Explique directement ce passage biblique dans son contexte. Commence par identifier le contexte immédiat du passage, puis présente son contexte historique et culturel lorsque pertinent, explique le sens du texte verset par verset ou par unités de pensée, les notions théologiques importantes et le message principal. Termine par quelques points d'application clairement distingués de ce que le texte dit réellement. Ne demande pas à l'utilisateur de formuler une question : cette réponse est l'explication initiale du passage.`
                : `Réponds précisément à la question de l'utilisateur en t'appuyant d'abord sur le passage sélectionné et son contexte. Si nécessaire, rappelle brièvement le contexte avant de répondre. Question : ${question}`;

            const systemInstruction = {
                parts: [{
                    text: "Tu es l'assistant d'étude biblique E-Biblia. Réponds en français avec rigueur, nuance et clarté. Distingue le texte biblique, le contexte historique et culturel, les interprétations théologiques et les applications pratiques. N'invente pas de versets ni de citations. Lorsque le passage ne permet pas d'établir un point, indique-le clairement. IMPORTANT : utilise un formatage riche mais n'écris JAMAIS les marqueurs Markdown **, ***, __ ou * pour simuler le gras, l'italique ou le souligné. Utilise uniquement du texte normal avec des titres et des listes simples. E-Biblia transformera ensuite certains marqueurs internes si nécessaire."
                }]
            };

            const payload = {
                systemInstruction,
                contents: [{
                    role: "user",
                    parts: [{
                        text: `Passage biblique sélectionné :\n${biblicalContext}\n\n${userRequest}`
                    }]
                }]
            };

            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.error?.message || `Erreur Gemini (${response.status}).`);
            return (data?.candidates?.[0]?.content?.parts || []).map(part => part.text || "").join("").trim() || "Gemini n'a retourné aucun contenu.";
        }

function renderAIResponse(markdown) {
            let text = escapeHtml(markdown).replace(/\r\n?/g, "\n");
            const blocks = text.split(/\n{2,}/);

            const formatInline = (value) => {
                // Code inline
                value = value.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">$1</code>');
                // Gras + italique : ***texte***
                value = value.replace(/\*\*\*([^*\n]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
                // Souligné : __texte__
                value = value.replace(/__([^_\n]+?)__/g, '<u>$1</u>');
                // Gras : **texte**
                value = value.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
                // Italique : *texte* ou _texte_
                value = value.replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>');
                value = value.replace(/(^|[^_])_([^_\n]+?)_(?!_)/g, '$1<em>$2</em>');
                // Nettoyage final : aucun marqueur Markdown d'emphase ne doit rester visible.
                // Les puces ont déjà été retirées par le moteur de listes avant cet appel.
                value = value.replace(/\*{1,3}/g, '');
                value = value.replace(/(?<![A-Za-zÀ-ÿ])_{1,2}(?![A-Za-zÀ-ÿ])/g, '');
                return value;
            };

            return blocks.map(block => {
                const lines = block.split("\n");
                const heading = lines[0].match(/^(#{1,3})\s+(.+)$/);
                if (heading && lines.length === 1) {
                    const level = heading[1].length;
                    const sizes = {1:'text-xl',2:'text-lg',3:'text-base'};
                    return `<h${level} class="${sizes[level]} font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100">${formatInline(heading[2])}</h${level}>`;
                }

                const isList = lines.every(line => /^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line));
                if (isList) {
                    const ordered = lines.every(line => /^\s*\d+[.)]\s+/.test(line));
                    const tag = ordered ? 'ol' : 'ul';
                    const cls = ordered ? 'list-decimal' : 'list-disc';
                    const items = lines.map(line => line.replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/, '')).map(formatInline);
                    return `<${tag} class="${cls} pl-6 space-y-1 my-2">${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
                }

                // Gère aussi les listes mélangées avec du texte sur des lignes séparées.
                if (lines.some(line => /^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line))) {
                    let html = '';
                    let listTag = null;
                    let items = [];
                    const flush = () => {
                        if (!items.length) return;
                        const tag = listTag || 'ul';
                        const cls = tag === 'ol' ? 'list-decimal' : 'list-disc';
                        html += `<${tag} class="${cls} pl-6 space-y-1 my-2">${items.map(item => `<li>${formatInline(item)}</li>`).join('')}</${tag}>`;
                        items = []; listTag = null;
                    };
                    lines.forEach(line => {
                        const m = line.match(/^\s*([-*+]\s+|\d+[.)]\s+)(.+)$/);
                        if (m) {
                            const nextTag = /^\d/.test(m[1]) ? 'ol' : 'ul';
                            if (listTag && listTag !== nextTag) flush();
                            listTag = nextTag; items.push(m[2]);
                        } else {
                            flush();
                            html += `<p class="mb-2">${formatInline(line)}</p>`;
                        }
                    });
                    flush();
                    return html;
                }

                return `<p class="mb-3 leading-7">${formatInline(lines.join('<br>'))}</p>`;
            }).join('');
        }




async function runGeminiAnalysis(initialExplanation = false) {
            const questionInput = document.getElementById("ai-question");
            const question = questionInput?.value.trim() || "";
            const result = document.getElementById("ai-result");
            const button = document.getElementById("btn-ai-submit");
            if (!initialExplanation && !question) {
                window.EBiblia?.showToast("Écrivez votre question.");
                questionInput?.focus();
                return;
            }

            result.innerHTML = `<div class="flex items-center justify-center gap-2 text-gray-500 py-8"><i class="fa-solid fa-spinner fa-spin"></i> ${initialExplanation ? "Explication du passage en cours…" : "Recherche de la réponse…"}</div>`;
            if (button) button.disabled = true;
            try {
                const answer = await askGemini(question);
                result.innerHTML = renderAIResponse(answer);
            } catch (error) {
                result.innerHTML = `<div class="text-red-600 dark:text-red-400">${escapeHtml(error.message)}</div>`;
            } finally {
                if (button) button.disabled = false;
            }
        }

  window.EBibliaAI = { getGeminiConfig, askGemini, renderAIResponse, runGeminiAnalysis };
  window.EBiblia = window.EBiblia || {};
  Object.assign(window.EBiblia, window.EBibliaAI);
})();
