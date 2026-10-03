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

function getGreetingResponse(question) {
            const normalized = String(question || "").trim().toLocaleLowerCase("fr")
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[!?.,;:]+$/g, "").replace(/\s+/g, " ").trim();
            const greeting = normalized.match(/^(bonjour(?: [a-z]+)?|bonsoir|salut|coucou|hello|hi|bonne (?:journee|matinee|soiree|nuit)|bien le bonjour|comment ca va|ca va(?: bien)?|comment vas-tu)(?: leona)?$/);
            if (!greeting) return null;
            if (greeting[1] === "bonsoir" || greeting[1] === "bonne soiree") return "Bonsoir !";
            if (greeting[1] === "bonne nuit") return "Bonne nuit !";
            if (greeting[1] === "bonne journee") return "Bonne journée !";
            if (greeting[1] === "bonne matinee") return "Bonne matinée !";
            if (greeting[1].startsWith("comment") || greeting[1].startsWith("ca va")) return "Je vais bien, merci !";
            if (greeting[1] === "salut" || greeting[1] === "coucou" || greeting[1] === "hello" || greeting[1] === "hi") return "Salut !";
            return "Bonjour !";
        }

function getGeminiConfig() {
            const injected = window.EBIBLIA_CONFIG || {};
            return {
                apiKey: injected.API_KEY || "",
                model: injected.GEMINI_MODEL || "gemini-3-flash-preview"
            };
        }

function getAIProviders() {
            const injected = window.EBIBLIA_CONFIG || {};
            const geminiKeys = [
                ...(Array.isArray(injected.GEMINI_API_KEYS) ? injected.GEMINI_API_KEYS : []),
                injected.API_KEY
            ].filter((key, index, keys) => typeof key === "string" && key.trim() && keys.indexOf(key) === index);
            const providers = geminiKeys.map(apiKey => ({
                name: "Gemini",
                apiKey,
                model: injected.GEMINI_MODEL || "gemini-3-flash-preview"
            }));
            if (injected.OPENROUTER_API_KEY) {
                providers.push({
                    name: "OpenRouter",
                    apiKey: injected.OPENROUTER_API_KEY,
                    model: injected.OPENROUTER_MODEL || "google/gemini-2.5-flash"
                });
            }
            return providers;
        }

async function askGemini(question = "", onUpdate = null, referencedVerses = []) {
            const providers = getAIProviders();
            if (!providers.length) {
                throw new Error("La configuration interne de l'Assistant IA est introuvable.");
            }

            const reader = window.EBibliaReader;
            const app = window.EBibliaApp || {};
            const selectedVerses = app.selectedVerses || [];
            const selectedContext = reader?.getSelectedVersesText?.() || selectedVerses.map(verse => {
                const bookName = app.books?.find(book => book.id === verse.book)?.name || verse.book;
                return `${bookName} ${verse.chapter}:${verse.verse}\n${verse.text || ""}`;
            }).join("\n\n");
            const referenceContext = referencedVerses.map(verse => `${verse.reference}\n${verse.text}`).join("\n\n");
            const biblicalContext = [selectedContext, referenceContext].filter(Boolean).join("\n\n");
            const isInitialExplanation = !question.trim() && Boolean(biblicalContext);
            const userRequest = isInitialExplanation
                ? `Explique brièvement le sens du passage sélectionné, sans contexte historique ou culturel sauf si je le demande explicitement :\n${biblicalContext}`
                : biblicalContext
                    ? `Réponds uniquement à la question posée, sans introduction, conclusion ni information non demandée. Ne donne pas le contexte sauf demande explicite. Passage fourni à utiliser seulement s'il est nécessaire pour répondre :\n${biblicalContext}\nQuestion : ${question}`
                    : `Réponds précisément et uniquement à cette question, sans ajouter d'information non demandée. Question : ${question}`;

            const systemInstruction = {
                parts: [{
                    text: "Tu es Léona, l'assistante de E-BIBLIA. Réponds en français, précisément, clairement et de façon concise. Donne exactement les informations nécessaires pour répondre à la question, sans introduction, salutation, conclusion, commentaire personnel ni information supplémentaire. Ne fournis aucun contexte historique, culturel ou théologique, sauf si l'utilisateur le demande explicitement. Réponds à la question directe sans la reformuler. Si une précision est nécessaire, reste brève. N'invente ni verset, ni citation, ni fait. Tu réponds uniquement aux questions concernant la Bible, le Coran ou l'Église. Pour toute demande sans rapport avec ces sujets, réponds exactement : « Mon créateur, Emmanuel PAKOU, ne m'a pas entraînée pour répondre aux sujets hors biblique, coranique ou ecclésiastique. » N'ajoute rien à ce refus. N'utilise jamais les marqueurs Markdown **, ***, __ ou * pour le gras/italique."
                }]
            };

            const contents = [{
                role: "user",
                parts: [{ text: userRequest }]
            }];
            const payload = {
                systemInstruction,
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.25
                },
                contents
            };

            const providerErrors = [];
            for (let providerIndex = 0; providerIndex < providers.length; providerIndex += 1) {
                const provider = providers[providerIndex];
                const answerParts = [];
                const providerContents = [...contents];
                try {
                    for (let continuation = 0; continuation <= 3; continuation += 1) {
                        const isOpenRouter = provider.name === "OpenRouter";
                        const endpoint = isOpenRouter
                            ? "https://openrouter.ai/api/v1/chat/completions"
                            : `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(provider.model)}:streamGenerateContent?alt=sse`;
                        const requestPayload = isOpenRouter
                            ? {
                                model: provider.model,
                                stream: true,
                                max_tokens: payload.generationConfig.maxOutputTokens,
                                temperature: payload.generationConfig.temperature,
                                messages: [
                                    ...(payload.systemInstruction?.parts || []).map(part => ({ role: "system", content: part.text })),
                                    ...providerContents.map(message => ({
                                        role: message.role === "model" ? "assistant" : message.role,
                                        content: (message.parts || []).map(part => part.text || "").join("")
                                    }))
                                ]
                            }
                            : payload;
                        const headers = { "Content-Type": "application/json" };
                        if (isOpenRouter) {
                            headers.Authorization = `Bearer ${provider.apiKey}`;
                            headers["HTTP-Referer"] = window.location.origin;
                            headers["X-Title"] = "E-BIBLIA";
                        } else {
                            // Gemini utilise désormais l'en-tête x-goog-api-key.
                            // Évite de placer la clé dans l'URL de la requête.
                            headers["x-goog-api-key"] = provider.apiKey;
                        }
                        if (isOpenRouter) {
                            headers.Authorization = `Bearer ${provider.apiKey}`;
                        }
                        const response = await fetch(endpoint, {
                            method: "POST",
                            headers,
                            body: JSON.stringify(requestPayload)
                        });
                        if (!response.ok) {
                            let errorMessage = `Erreur ${provider.name} (${response.status}).`;
                            try {
                                const data = await response.json();
                                errorMessage = data?.error?.message || errorMessage;
                            } catch (error) {
                                console.error(`Lecture de l’erreur ${provider.name}:`, error);
                            }
                            throw new Error(errorMessage);
                        }
                        if (!response.body?.getReader) throw new Error(`Le flux de réponse ${provider.name} n’est pas pris en charge par ce navigateur.`);

                        const readerStream = response.body.getReader();
                        const decoder = new TextDecoder();
                        let buffer = "";
                        let turnText = "";
                        let finishReason = null;
                        const processEvent = eventText => {
                            const dataLines = eventText.split(/\r?\n/).filter(line => line.startsWith("data:"));
                            if (!dataLines.length) return;
                            const dataText = dataLines.map(line => line.slice(5).trim()).join("\n");
                            if (!dataText || dataText === "[DONE]") return;
                            let data;
                            try {
                                data = JSON.parse(dataText);
                            } catch (error) {
                                console.error(`Événement invalide dans le flux ${provider.name}:`, error);
                                throw new Error(`${provider.name} a envoyé une partie de réponse invalide.`);
                            }

                            let chunk = "";
                            if (isOpenRouter) {
                                const delta = data?.choices?.[0]?.delta?.content;
                                chunk = typeof delta === "string"
                                    ? delta
                                    : Array.isArray(delta) ? delta.map(part => part.text || "").join("") : "";
                                finishReason = data?.choices?.[0]?.finish_reason || finishReason;
                            } else {
                                const candidate = data?.candidates?.[0];
                                if (!candidate) return;
                                chunk = (candidate.content?.parts || []).map(part => part.text || "").join("");
                                finishReason = candidate.finishReason || finishReason;
                            }
                            if (chunk) {
                                turnText += chunk;
                                const previousTurns = answerParts.join("\n");
                                onUpdate?.(previousTurns ? previousTurns + "\n" + turnText : turnText);
                            }
                        };

                        while (true) {
                            const { value, done } = await readerStream.read();
                            buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
                            buffer = buffer.replace(/\r\n/g, "\n");
                            let eventEnd = buffer.indexOf("\n\n");
                            while (eventEnd !== -1) {
                                processEvent(buffer.slice(0, eventEnd));
                                buffer = buffer.slice(eventEnd + 2);
                                eventEnd = buffer.indexOf("\n\n");
                            }
                            if (done) break;
                        }
                        if (buffer.trim()) processEvent(buffer);
                        answerParts.push(turnText);

                        if (finishReason === "STOP" || finishReason === "stop") {
                            const answer = answerParts.join("\n").trim();
                            if (!answer) throw new Error(`${provider.name} n’a retourné aucun contenu.`);
                            return answer;
                        }
                        if (finishReason !== "MAX_TOKENS" && finishReason !== "length") {
                            throw new Error(`${provider.name} a interrompu sa réponse avant de la terminer (${finishReason || "raison inconnue"}).`);
                        }
                        if (continuation === 3) {
                            throw new Error("La réponse de Léona dépasse la limite de génération et n’a pas pu être complétée.");
                        }
                        if (!turnText) throw new Error(`${provider.name} a interrompu sa réponse sans fournir de contenu à continuer.`);
                        providerContents.push(
                            { role: "model", parts: [{ text: turnText }] },
                            { role: "user", parts: [{ text: "Continue exactement là où tu t'es arrêté. Termine entièrement la réponse, sans répéter les parties déjà fournies." }] }
                        );
                    }
                } catch (error) {
                    providerErrors.push(`${provider.name}: ${error.message}`);
                    console.warn(`Échec de ${provider.name}, essai du fournisseur suivant.`, error);
                    if (providerIndex < providers.length - 1) onUpdate?.("");
                }
            }

            throw new Error(`Aucun fournisseur IA n’a pu répondre. ${providerErrors.join(" | ")}`);
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

            if (leonaOrbState === "listening") stopLeonaListening();
            setLeonaOrbState("thinking");
            result.innerHTML = `<div class="leona-empty-result"><span class="leona-mini-orb leona-mini-orb-large" aria-hidden="true"></span><p>${initialExplanation ? "Léona étudie le passage…" : "Léona réfléchit…"}</p></div>`;
            if (button) button.disabled = true;
            try {
                const answer = await askGemini(question);
                result.innerHTML = renderAIResponse(answer);
            } catch (error) {
                result.innerHTML = `<div class="text-red-600 dark:text-red-400">${escapeHtml(error.message)}</div>`;
            } finally {
                if (button) button.disabled = false;
                if (leonaOrbState === "speaking") setLeonaOrbState("rest");
            }
        }


  // ============================================================
  // ORBE VISUEL DE LÉONA
  // ------------------------------------------------------------
  // Cette partie pilote uniquement l'identité visuelle de l'orbe.
  // Les appels Gemini et le rendu des réponses restent plus bas.
  // ============================================================
  let leonaOrbState = "rest";
  let leonaOrbAnimation = null;
  let leonaOrbStream = null;
  let leonaOrbAudioContext = null;
  let leonaOrbAnalyser = null;

  function setLeonaOrbState(state) {
      leonaOrbState = state;
      const status = document.getElementById("leona-status");
      const label = document.getElementById("leona-status-text");
      const micButton = document.getElementById("leona-mic-button");
      if (status) status.dataset.state = state;
      if (label) {
          label.textContent = state === "listening"
              ? "À l'écoute..."
              : state === "thinking"
                  ? "Léona réfléchit..."
                  : "En repos";
      }
      if (status) status.setAttribute("aria-live", "polite");
      if (micButton) {
          const listening = state === "listening";
          micButton.setAttribute("aria-pressed", String(listening));
          micButton.setAttribute("aria-label", listening ? "Arrêter le microphone" : "Activer le microphone");
          const icon = micButton.querySelector("i");
          const text = micButton.querySelector("span");
          if (icon) icon.className = listening ? "fa-solid fa-stop" : "fa-solid fa-microphone";
          if (text) text.textContent = listening ? "Arrêter" : "Écouter";
      }
  }

  function stopLeonaListening() {
      if (leonaOrbStream) {
          leonaOrbStream.getTracks().forEach(track => track.stop());
          leonaOrbStream = null;
      }
      if (leonaOrbAudioContext) {
          leonaOrbAudioContext.close().catch(() => {});
          leonaOrbAudioContext = null;
      }
      leonaOrbAnalyser = null;
      setLeonaOrbState("rest");
  }

  async function toggleLeonaListening() {
      if (leonaOrbState === "listening") {
          stopLeonaListening();
          return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
          window.EBiblia?.showToast?.("Le microphone n'est pas disponible sur cet appareil.");
          return;
      }

      try {
          leonaOrbStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          leonaOrbAudioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = leonaOrbAudioContext.createMediaStreamSource(leonaOrbStream);
          leonaOrbAnalyser = leonaOrbAudioContext.createAnalyser();
          leonaOrbAnalyser.fftSize = 128;
          source.connect(leonaOrbAnalyser);
          setLeonaOrbState("listening");
      } catch (error) {
          stopLeonaListening();
          window.EBiblia?.showToast?.("Accès au microphone refusé ou indisponible.");
      }
  }

  function initLeonaOrb() {
      const canvas = document.getElementById("leona-orb");
      const orbButton = document.getElementById("leona-orb-button");
      const micButton = document.getElementById("leona-mic-button");
      if (!canvas || !orbButton) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resize = () => {
          const rect = canvas.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.max(1, Math.floor(rect.width * ratio));
          canvas.height = Math.max(1, Math.floor(rect.height * ratio));
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      const particles = [];
      const random = (min, max) => Math.random() * (max - min) + min;
      let frameId = null;
      let isVisible = false;
      const observer = new IntersectionObserver((entries) => {
          isVisible = entries[0]?.isIntersecting === true;
          if (isVisible && !frameId) frameId = requestAnimationFrame(draw);
          if (!isVisible && frameId) {
              cancelAnimationFrame(frameId);
              frameId = null;
          }
      }, { threshold: 0.01 });
      observer.observe(canvas);

      const spawnParticle = (cx, cy, intensity) => {
          if (particles.length > 24 || Math.random() > intensity * .18) return;
          const angle = random(0, Math.PI * 2);
          const speed = random(.35, 1.6) * intensity;
          particles.push({
              x: cx, y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: random(.25, .7),
              maxLife: random(.25, .7),
              size: random(1, 2.6),
              hue: Math.random() > .5 ? "cyan" : "violet"
          });
      };

      const draw = (time) => {
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          const cx = w / 2;
          const cy = h / 2;
          const t = time * .001;

          // Au repos, l'orbe reste totalement immobile : un seul rendu est conservé.
          // L'animation continue uniquement lorsque Léona travaille (réflexion) ou écoute.
          let intensity = .14;
          if (leonaOrbState === "thinking") intensity = .82 + (Math.sin(t * 7) + 1) * .09;
          if (leonaOrbState === "listening" && leonaOrbAnalyser) {
              const data = new Uint8Array(leonaOrbAnalyser.frequencyBinCount);
              leonaOrbAnalyser.getByteFrequencyData(data);
              const average = data.reduce((sum, value) => sum + value, 0) / Math.max(1, data.length);
              intensity = Math.min(1, .18 + average / 115);
          }

          ctx.clearRect(0, 0, w, h);

          const glow = ctx.createRadialGradient(cx, cy, 12, cx, cy, w * .47);
          glow.addColorStop(0, leonaOrbState === "listening" ? "rgba(168,85,247,.18)" : "rgba(0,240,255,.15)");
          glow.addColorStop(.48, "rgba(168,85,247,.07)");
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, w, h);

          for (let ring = 0; ring < 3; ring++) {
              ctx.beginPath();
              const radius = w * (.19 + ring * .055);
              for (let a = 0; a <= Math.PI * 2 + .05; a += .045) {
                  const wave = Math.sin(a * (3 + ring) + t * (1.1 + ring * .25)) * (4 + intensity * 12) * (1 - ring * .16);
                  const r = radius + wave;
                  const x = cx + Math.cos(a) * r;
                  const y = cy + Math.sin(a) * r;
                  if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
              }
              ctx.closePath();
              const violet = ring % 2 === 1 || leonaOrbState === "listening";
              ctx.strokeStyle = violet ? "rgba(168,85,247,.72)" : "rgba(0,240,255,.78)";
              ctx.lineWidth = 1.2 + intensity * 1.2;
              ctx.shadowBlur = 10 + intensity * 12;
              ctx.shadowColor = violet ? "#a855f7" : "#00f0ff";
              ctx.stroke();
          }
          ctx.shadowBlur = 0;

          const pulse = 1 + Math.sin(t * 2.2) * .025 + intensity * .055;
          const sphere = ctx.createRadialGradient(cx - w*.055, cy - w*.06, 2, cx, cy, w*.20 * pulse);
          sphere.addColorStop(0, "rgba(255,255,255,.98)");
          sphere.addColorStop(.16, "rgba(0,240,255,.95)");
          sphere.addColorStop(.56, "rgba(168,85,247,.82)");
          sphere.addColorStop(1, "rgba(126,34,206,0)");
          ctx.fillStyle = sphere;
          ctx.beginPath();
          ctx.arc(cx, cy, w*.20 * pulse, 0, Math.PI * 2);
          ctx.fill();

          if (intensity > .28) spawnParticle(cx, cy, intensity);
          for (let i = particles.length - 1; i >= 0; i--) {
              const p = particles[i];
              p.x += p.vx;
              p.y += p.vy;
              p.life -= .016;
              if (p.life <= 0) {
                  particles.splice(i, 1);
                  continue;
              }
              const alpha = p.life / p.maxLife;
              ctx.fillStyle = p.hue === "cyan" ? `rgba(0,240,255,${alpha})` : `rgba(168,85,247,${alpha})`;
              ctx.shadowBlur = 7;
              ctx.shadowColor = p.hue === "cyan" ? "#00f0ff" : "#a855f7";
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
          }
          ctx.shadowBlur = 0;

          // En repos, ne pas relancer requestAnimationFrame : l'orbe reste parfaitement fixe.
          // Pendant thinking/listening, la boucle est relancée pour animer l'orbe.
          if (leonaOrbState === "thinking" || leonaOrbState === "listening") {
              frameId = requestAnimationFrame(draw);
              leonaOrbAnimation = frameId;
          } else {
              frameId = null;
              leonaOrbAnimation = null;
          }
      };

      orbButton.addEventListener("click", () => {
          if (leonaOrbState === "listening") return;
          setLeonaOrbState("rest");
      });

      micButton?.addEventListener("click", toggleLeonaListening);
      if (canvas.getBoundingClientRect().width > 0) {
          isVisible = true;
          // Premier et unique rendu au repos : aucune animation en arrière-plan.
          draw(0);
      }
  }

  // Initialisation après chargement du DOM pour que l'orbe soit autonome sur ia.html.
  if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initLeonaOrb, { once: true });
  } else {
      initLeonaOrb();
  }

  window.EBibliaAI = { getGeminiConfig, getGreetingResponse, askGemini, renderAIResponse, runGeminiAnalysis };
  window.EBiblia = window.EBiblia || {};
  Object.assign(window.EBiblia, window.EBibliaAI);
})();
