/**
 * E-BIBLIA 3.0 — Master Application Engine
 * Architecture Single Page Application complète et réactive
 * Conforme en tous points à la maquette officielle (21 pages / Dark & Light)
 */

(function () {
  'use strict';

  // Configuration et État Global
  const APP = {
    theme: localStorage.getItem('ebiblia_theme') || ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'),
    currentView: 'home',
    currentBook: 'GEN',
    currentChapter: 1,
    currentVersion: 'LSG',
    selectedVerse: null,
    selectedVerses: [],
    streak: Number(localStorage.getItem('ebiblia_streak')) || 14,
    activeDays: 27,
    searchFilter: 'all',
    plansFilter: 'all',
    prayerFilter: 'all',
    activeDonationAmount: '10 €',
    // Préférences de confidentialité : le partage commercial est interdit par défaut.
    privacy: {
      commercialConsent: localStorage.getItem('ebiblia_privacy_commercial') === 'true',
      personalization: localStorage.getItem('ebiblia_privacy_personalization') !== 'false'
    },
    // Carnet de méditations bibliques approfondies
    meditations: [],

    // Livres bibliques complets (66 livres du canon biblique)
    books: [
      // Ancien Testament (39)
      { id: 'GEN', name: 'Genèse', testament: 'AT', chapters: 50, file: 'Gen' },
      { id: 'EXO', name: 'Exode', testament: 'AT', chapters: 40, file: 'Exod' },
      { id: 'LEV', name: 'Lévitique', testament: 'AT', chapters: 27, file: 'Lev' },
      { id: 'NUM', name: 'Nombres', testament: 'AT', chapters: 36, file: 'Num' },
      { id: 'DEU', name: 'Deutéronome', testament: 'AT', chapters: 34, file: 'Deut' },
      { id: 'JOS', name: 'Josué', testament: 'AT', chapters: 24, file: 'Josh' },
      { id: 'JDG', name: 'Juges', testament: 'AT', chapters: 21, file: 'Judg' },
      { id: 'RUT', name: 'Ruth', testament: 'AT', chapters: 4, file: 'Ruth' },
      { id: '1SA', name: '1 Samuel', testament: 'AT', chapters: 31, file: '1Sam' },
      { id: '2SA', name: '2 Samuel', testament: 'AT', chapters: 24, file: '2Sam' },
      { id: '1KI', name: '1 Rois', testament: 'AT', chapters: 22, file: '1Kgs' },
      { id: '2KI', name: '2 Rois', testament: 'AT', chapters: 25, file: '2Kgs' },
      { id: '1CH', name: '1 Chroniques', testament: 'AT', chapters: 29, file: '1Chr' },
      { id: '2CH', name: '2 Chroniques', testament: 'AT', chapters: 36, file: '2Chr' },
      { id: 'EZR', name: 'Esdras', testament: 'AT', chapters: 10, file: 'Ezra' },
      { id: 'NEH', name: 'Néhémie', testament: 'AT', chapters: 13, file: 'Neh' },
      { id: 'EST', name: 'Esther', testament: 'AT', chapters: 10, file: 'Esth' },
      { id: 'JOB', name: 'Job', testament: 'AT', chapters: 42, file: 'Job' },
      { id: 'PSA', name: 'Psaumes', testament: 'AT', chapters: 150, file: 'Ps' },
      { id: 'PRO', name: 'Proverbes', testament: 'AT', chapters: 31, file: 'Prov' },
      { id: 'ECC', name: 'Ecclésiaste', testament: 'AT', chapters: 12, file: 'Eccl' },
      { id: 'SNG', name: 'Cantique des cantiques', testament: 'AT', chapters: 8, file: 'Song' },
      { id: 'ISA', name: 'Ésaïe', testament: 'AT', chapters: 66, file: 'Isa' },
      { id: 'JER', name: 'Jérémie', testament: 'AT', chapters: 52, file: 'Jer' },
      { id: 'LAM', name: 'Lamentations', testament: 'AT', chapters: 5, file: 'Lam' },
      { id: 'EZK', name: 'Ézéchiel', testament: 'AT', chapters: 48, file: 'Ezek' },
      { id: 'DAN', name: 'Daniel', testament: 'AT', chapters: 12, file: 'Dan' },
      { id: 'HOS', name: 'Osée', testament: 'AT', chapters: 14, file: 'Hos' },
      { id: 'JOL', name: 'Joël', testament: 'AT', chapters: 3, file: 'Joel' },
      { id: 'AMO', name: 'Amos', testament: 'AT', chapters: 9, file: 'Amos' },
      { id: 'OBD', name: 'Abdias', testament: 'AT', chapters: 1, file: 'Obad' },
      { id: 'JON', name: 'Jonas', testament: 'AT', chapters: 4, file: 'Jonah' },
      { id: 'MIC', name: 'Michée', testament: 'AT', chapters: 7, file: 'Mic' },
      { id: 'NAM', name: 'Nahum', testament: 'AT', chapters: 3, file: 'Nah' },
      { id: 'HAB', name: 'Habacuc', testament: 'AT', chapters: 3, file: 'Hab' },
      { id: 'ZEP', name: 'Sophonie', testament: 'AT', chapters: 3, file: 'Zeph' },
      { id: 'HAG', name: 'Aggée', testament: 'AT', chapters: 2, file: 'Hag' },
      { id: 'ZEC', name: 'Zacharie', testament: 'AT', chapters: 14, file: 'Zech' },
      { id: 'MAL', name: 'Malachie', testament: 'AT', chapters: 4, file: 'Mal' },
      // Nouveau Testament (27)
      { id: 'MAT', name: 'Matthieu', testament: 'NT', chapters: 28, file: 'Matt' },
      { id: 'MRK', name: 'Marc', testament: 'NT', chapters: 16, file: 'Mark' },
      { id: 'LUK', name: 'Luc', testament: 'NT', chapters: 24, file: 'Luke' },
      { id: 'JHN', name: 'Jean', testament: 'NT', chapters: 21, file: 'John' },
      { id: 'ACT', name: 'Actes', testament: 'NT', chapters: 28, file: 'Acts' },
      { id: 'ROM', name: 'Romains', testament: 'NT', chapters: 16, file: 'Rom' },
      { id: '1CO', name: '1 Corinthiens', testament: 'NT', chapters: 16, file: '1Cor' },
      { id: '2CO', name: '2 Corinthiens', testament: 'NT', chapters: 13, file: '2Cor' },
      { id: 'GAL', name: 'Galates', testament: 'NT', chapters: 6, file: 'Gal' },
      { id: 'EPH', name: 'Éphésiens', testament: 'NT', chapters: 6, file: 'Eph' },
      { id: 'PHP', name: 'Philippiens', testament: 'NT', chapters: 4, file: 'Phil' },
      { id: 'COL', name: 'Colossiens', testament: 'NT', chapters: 4, file: 'Col' },
      { id: '1TH', name: '1 Thessaloniciens', testament: 'NT', chapters: 5, file: '1Thess' },
      { id: '2TH', name: '2 Thessaloniciens', testament: 'NT', chapters: 3, file: '2Thess' },
      { id: '1TI', name: '1 Timothée', testament: 'NT', chapters: 6, file: '1Tim' },
      { id: '2TI', name: '2 Timothée', testament: 'NT', chapters: 4, file: '2Tim' },
      { id: 'TIT', name: 'Tite', testament: 'NT', chapters: 3, file: 'Titus' },
      { id: 'PHM', name: 'Philémon', testament: 'NT', chapters: 1, file: 'Phlm' },
      { id: 'HEB', name: 'Hébreux', testament: 'NT', chapters: 13, file: 'Heb' },
      { id: 'JAS', name: 'Jacques', testament: 'NT', chapters: 5, file: 'Jas' },
      { id: '1PE', name: '1 Pierre', testament: 'NT', chapters: 5, file: '1Pet' },
      { id: '2PE', name: '2 Pierre', testament: 'NT', chapters: 3, file: '2Pet' },
      { id: '1JN', name: '1 Jean', testament: 'NT', chapters: 5, file: '1John' },
      { id: '2JN', name: '2 Jean', testament: 'NT', chapters: 1, file: '2John' },
      { id: '3JN', name: '3 Jean', testament: 'NT', chapters: 1, file: '3John' },
      { id: 'JUD', name: 'Jude', testament: 'NT', chapters: 1, file: 'Jude' },
      { id: 'REV', name: 'Apocalypse', testament: 'NT', chapters: 22, file: 'Rev' }
    ],

    // Versions bibliques
    versions: {
      'LSG': { name: 'Louis Segond (1910)', code: 'LSG', file: 'LSG' },
      'BFC': { name: 'Bible en français courant', code: 'BFC', file: 'BFC' },
      'DAR': { name: 'Bible Darby', code: 'DAR', file: 'DAR' },
      'MRT': { name: 'Bible Martin', code: 'MRT', file: 'MRT' },
      'OST': { name: 'Ostervald', code: 'OST', file: 'OST' }
    },

    // Cache des textes bibliques
    loadedBooks: {},
    searchBooks: {},

    // Données par défaut pour affichage immédiat identique à la maquette
    sampleNotes: [
      { id: 1, book: 'GEN', chapter: 1, verse: 1, ref: 'Genèse 1:1', date: '12 janv. 2025', text: 'Note personnelle sur la création : la puissance de la parole de Dieu qui appelle toute chose à l\'existence.' },
      { id: 2, book: 'PSA', chapter: 23, verse: 1, ref: 'Psaumes 23:1', date: '10 janv. 2025', text: 'Réflexion sur la confiance : le Seigneur est un berger prévenant et fidèle, aucun manque dans sa présence.' },
      { id: 3, book: 'JHN', chapter: 3, verse: 16, ref: 'Jean 3:16', date: '8 janv. 2025', text: 'Dieu nous a tant aimés : le cœur de l\'Évangile et l\'infinie dimension de la grâce offerte.' }
    ],

    sampleHighlights: [
      { id: 1, color: 'orange', ref: 'Romains 8:28', text: 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.' },
      { id: 2, color: 'purple', ref: 'Philippiens 4:6', text: 'Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.' },
      { id: 3, color: 'green', ref: 'Matthieu 6:33', text: 'Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.' }
    ],

    sampleBookmarks: [
      { id: 1, ref: 'Jean 3:16', text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.' },
      { id: 2, ref: 'Psaumes 23:1', text: 'L\'Éternel est mon berger : je ne manquerai de rien.' },
      { id: 3, ref: 'Romains 12:2', text: 'Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l\'intelligence, afin que vous discerniez quelle est la volonté de Dieu.' }
    ],

    samplePrayers: [
      { id: 1, title: 'Ma famille', text: 'Seigneur, protège ma famille, garde nos cœurs unis dans ton amour et ta paix chaque jour.', answered: false, color: 'blue', icon: 'fa-house' },
      { id: 2, title: 'Santé', text: 'Je te confie ma santé et celle de mes proches. Renouvelle nos forces et apporte la guérison.', answered: false, color: 'purple', icon: 'fa-heart' },
      { id: 3, title: 'Direction', text: 'Guide-moi dans mes décisions quotidiennes, éclaire mon sentier et donne-moi la sagesse d\'en haut.', answered: false, color: 'orange', icon: 'fa-compass' }
    ],

    sampleCompare: [
      { code: 'LSG', name: 'Louis Segond', ref: 'Jean 3:16', text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.' },
      { code: 'NIV', name: 'New International Version', ref: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
      { code: 'BDS', name: 'Bible du Semeur', ref: 'Jean 3:16', text: 'Car Dieu a tellement aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse pas mais obtienne la vie éternelle.' }
    ]
  };

  const SEARCH_BOOK_FILES = ['Gen','Exod','Lev','Num','Deut','Josh','Judg','Ruth','1Sam','2Sam','1Kgs','2Kgs','1Chr','2Chr','Ezra','Neh','Esth','Job','Ps','Prov','Eccl','Song','Isa','Jer','Lam','Ezek','Dan','Hos','Joel','Amos','Obad','Jonah','Mic','Nah','Hab','Zeph','Hag','Zech','Mal','Matt','Mark','Luke','John','Acts','Rom','1Cor','2Cor','Gal','Eph','Phil','Col','1Thess','2Thess','1Tim','2Tim','Titus','Phlm','Heb','Jas','1Pet','2Pet','1John','2John','3John','Jude','Rev'];

  // Initialisation du Stockage Local
  function getStored(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  APP.notes = getStored('ebiblia_notes_v3', APP.sampleNotes);
  APP.highlights = getStored('ebiblia_highlights_v3', APP.sampleHighlights);
  APP.bookmarks = getStored('ebiblia_bookmarks_v3', APP.sampleBookmarks);
  APP.prayers = getStored('ebiblia_prayers_v3', APP.samplePrayers);
  APP.meditations = getStored('ebiblia_meditations_v1', []);

  // -------------------------------------------------------------
  // GESTION DU THÈME (Dark / Light)
  // -------------------------------------------------------------
  function applyTheme(theme) {
    APP.theme = theme;
    localStorage.setItem('ebiblia_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Mettre à jour l'affichage dans Paramètres
    const themeLabel = document.getElementById('setting-theme-val');
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Sombre (par défaut)' : 'Clair';
    }
  }

  function toggleTheme() {
    const next = APP.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(next === 'dark' ? 'Thème sombre activé' : 'Thème clair activé');
  }

  // -------------------------------------------------------------
  // CONFIDENTIALITÉ ET CONTRÔLE DES DONNÉES
  // -------------------------------------------------------------
  function savePrivacyPreferences() {
    localStorage.setItem('ebiblia_privacy_commercial', String(APP.privacy.commercialConsent));
    localStorage.setItem('ebiblia_privacy_personalization', String(APP.privacy.personalization));
  }

  function renderPrivacyView() {
    const commercial = document.getElementById('privacy-commercial-consent');
    const personalization = document.getElementById('privacy-personalization');
    if (commercial) commercial.checked = APP.privacy.commercialConsent;
    if (personalization) personalization.checked = APP.privacy.personalization;
  }

  // Autorisation explicite requise avant toute vente ou utilisation commerciale.
  function isCommercialDataSharingAllowed() {
    return APP.privacy.commercialConsent === true;
  }

  function exportLocalData() {
    const data = {
      exportedAt: new Date().toISOString(),
      app: 'E-BIBLIA',
      privacy: { ...APP.privacy },
      notes: APP.notes,
      highlights: APP.highlights,
      bookmarks: APP.bookmarks,
      prayers: APP.prayers,
      meditations: APP.meditations
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ebiblia-mes-donnees.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Vos données ont été préparées pour l’export.');
  }

  function deleteLocalData() {
    const confirmed = window.confirm('Supprimer vos notes, favoris, surlignages, prières et méditations de cet appareil ?');
    if (!confirmed) return;

    ['ebiblia_notes_v3', 'ebiblia_highlights_v3', 'ebiblia_bookmarks_v3', 'ebiblia_prayers_v3', 'ebiblia_meditations_v1'].forEach(key => localStorage.removeItem(key));

    APP.notes = [];
    APP.highlights = [];
    APP.bookmarks = [];
    APP.prayers = [];
    APP.meditations = [];

    showToast('Vos données locales ont été supprimées.');
    if (APP.currentView === 'notes') renderNotesView();
    if (APP.currentView === 'marks') renderHighlightsView();
    if (APP.currentView === 'verses') renderBookmarksView();
    if (APP.currentView === 'prayers') renderPrayersView();
    if (APP.currentView === 'meditation') renderMeditationView();
  }

  // -------------------------------------------------------------
  // ROUTEUR DE NAVIGATION (SPA)
  // -------------------------------------------------------------
  function showView(viewId, params = {}) {
    APP.currentView = viewId;

    // Cacher toutes les vues
    document.querySelectorAll('.eb-view').forEach(view => {
      view.classList.remove('is-active');
    });

    // Afficher la vue demandée
    const target = document.getElementById('view-' + viewId);
    if (target) {
      target.classList.add('is-active');
      target.scrollTop = 0;
    }

    // Mettre à jour la barre d'onglets (5 onglets principaux)
    // Pour toutes les sous-pages du Menu (about, settings, notes, etc.), Menu reste actif
    const isMenuSubView = ['notes', 'meditation', 'marks', 'verses', 'images', 'videos', 'events', 'prayers', 'stats', 'settings', 'privacy', 'donate', 'profile', 'about'].includes(viewId);
    document.querySelectorAll('.eb-tab-btn').forEach(btn => {
      const tab = btn.dataset.tab;
      if (tab === 'menu' && isMenuSubView) {
        btn.classList.add('is-active');
      } else {
        btn.classList.toggle('is-active', tab === viewId);
      }
    });

    // Déclencher les rendus spécifiques
    if (viewId === 'reader') {
      if (params.book) APP.currentBook = params.book;
      if (params.chapter) APP.currentChapter = Number(params.chapter);
      renderBibleReader(params.verse);
    } else if (viewId === 'compare') {
      renderCompareView(params.verse || 'Jean 3:16');
    } else if (viewId === 'search') {
      renderSearchView();
    } else if (viewId === 'notes') {
      renderNotesView();
    } else if (viewId === 'meditation') {
      renderMeditationView();
    } else if (viewId === 'marks') {
      renderHighlightsView();
    } else if (viewId === 'verses') {
      renderBookmarksView();
    } else if (viewId === 'stats') {
      renderStatsView();
    } else if (viewId === 'privacy') {
      renderPrivacyView();
    } else if (viewId === 'prayers') {
      renderPrayersView();
    } else if (viewId === 'leona') {
      initLeonaOrb();
    }

    // Mettre à jour l'ancre URL
    window.location.hash = '#' + viewId;
  }

  // Écouter les changements de hash
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== APP.currentView) {
      showView(hash);
    }
  });

  // -------------------------------------------------------------
  // CHARGEMENT DIRECT DEPUIS BIBLE-DATA (100% Hors-ligne & Réactif)
  // -------------------------------------------------------------
  async function fetchVersionBook(versionCode, bookFile) {
    const key = `${versionCode}_${bookFile}`;
    if (APP.loadedBooks[key]) return APP.loadedBooks[key];

    const versionMeta = APP.versions[versionCode] || APP.versions['LSG'];
    const url = `./bible-data/fr/${versionMeta.file}/books/${bookFile}.json`;

    try {
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const data = await resp.json();
      APP.loadedBooks[key] = data;
      return data;
    } catch (e) {
      console.warn(`Erreur de chargement pour ${url}:`, e);
      return null;
    }
  }

  async function fetchVersionChapter(versionCode, bookId, chapterNum) {
    const bookObj = APP.books.find(b => b.id === bookId || b.file === bookId) || APP.books[0];
    const data = await fetchVersionBook(versionCode, bookObj.file);
    if (!data || !data.chapters) return null;
    const chapter = data.chapters.find(c => Number(c.chapter) === Number(chapterNum));
    return chapter?.verses || null;
  }

  async function fetchChapterData(bookId, chapterNum) {
    // 1. Essai avec la version actuellement active
    let verses = await fetchVersionChapter(APP.currentVersion, bookId, chapterNum);
    if (verses && verses.length) return verses;

    // 2. Repli sur LSG par défaut
    if (APP.currentVersion !== 'LSG') {
      verses = await fetchVersionChapter('LSG', bookId, chapterNum);
      if (verses && verses.length) return verses;
    }

    // 3. Repli sur toute version disponible dans bible-data
    for (const code of Object.keys(APP.versions)) {
      if (code === APP.currentVersion || code === 'LSG') continue;
      verses = await fetchVersionChapter(code, bookId, chapterNum);
      if (verses && verses.length) return verses;
    }

    return [{ verse: 1, text: 'Verset non disponible dans les données bibliques locales.' }];
  }

  // -------------------------------------------------------------
  // MOTEUR DU LECTEUR BIBLIQUE (Screen 2 & 9)
  // -------------------------------------------------------------
  async function renderBibleReader(scrollToVerse = null) {
    const bookObj = APP.books.find(b => b.id === APP.currentBook || b.file === APP.currentBook) || APP.books[0];
    const titleBtn = document.getElementById('reader-book-picker');
    const bottomRef = document.getElementById('reader-bottom-reference');
    const versionBadge = document.getElementById('reader-version-badge');
    const container = document.getElementById('reader-verses-container');

    if (titleBtn) titleBtn.innerHTML = `<span>${bookObj.name} ${APP.currentChapter}</span> <svg class="eb-icon" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>`;
    if (bottomRef) bottomRef.textContent = `${bookObj.name} ${APP.currentChapter}`;
    if (versionBadge) versionBadge.textContent = APP.currentVersion;

    if (!container) return;
    container.innerHTML = '<div style="text-align:center;padding:30px;color:var(--eb-text-secondary);">Chargement des écritures...</div>';

    const verses = await fetchChapterData(APP.currentBook, APP.currentChapter);
    container.innerHTML = '';

    verses.forEach(v => {
      const row = document.createElement('div');
      row.className = 'eb-verse-row';
      row.dataset.verse = v.verse;

      // Vérifier si le verset est surligné
      const hl = APP.highlights.find(h => h.ref.startsWith(`${bookObj.name} ${APP.currentChapter}:${v.verse}`));
      if (hl) { if (hl.style === 'underline' || hl.style === 'underline-double') row.classList.add('mark-' + hl.style); else if (hl.color) row.classList.add('hl-' + hl.color); }
      if (APP.selectedVerses.some(selected => selected.verse === v.verse && selected.book === APP.currentBook && selected.chapter === APP.currentChapter)) row.classList.add('is-selected');

      // Nettoyer les symboles spéciaux au début (¶)
      const cleanText = String(v.text || '').replace(/^[¶\s]+/, '');

      row.innerHTML = `<sup class="eb-verse-num">${v.verse}</sup><span>${cleanText}</span>`;

      row.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVerseSelection(row, v.verse, cleanText);
      });

      container.appendChild(row);
    });

    if (scrollToVerse) {
      setTimeout(() => {
        const targetRow = container.querySelector(`[data-verse="${scrollToVerse}"]`);
        if (targetRow) {
          targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetRow.classList.add('is-selected');
        }
      }, 150);
    }
  }

  // Zoom tactile à deux doigts dans le lecteur biblique.
  let readerPinchStartDistance=null, readerPinchStartSize=null;
  function initReaderPinchZoom() {
    const container=document.getElementById('reader-verses-container'); if(!container || container.dataset.pinchZoomBound) return;
    container.dataset.pinchZoomBound='1';
    const distance=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
    container.addEventListener('touchstart',e=>{if(e.touches.length===2){readerPinchStartDistance=distance(e.touches);readerPinchStartSize=Number(localStorage.getItem('ebiblia_reader_font_size'))||17;}},{passive:true});
    container.addEventListener('touchmove',e=>{if(e.touches.length===2&&readerPinchStartDistance){const next=Math.min(30,Math.max(13,Math.round(readerPinchStartSize*(distance(e.touches)/readerPinchStartDistance))));document.documentElement.style.setProperty('--eb-reader-font-size',next+'px');e.preventDefault();}},{passive:false});
    container.addEventListener('touchend',()=>{if(readerPinchStartDistance!==null){const value=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--eb-reader-font-size'))||17;localStorage.setItem('ebiblia_reader_font_size',String(value));readerPinchStartDistance=null;readerPinchStartSize=null;}});
  }

  // -------------------------------------------------------------
  // LECTURE LOCALE TTS — utilise la voix installée par défaut
  // sur le téléphone, sans connexion Internet.
  // -------------------------------------------------------------
  let ttsPlaying = false;

  function getReaderText() {
    return Array.from(document.querySelectorAll('#reader-verses-container .eb-verse-row'))
      .map(row => {
        const num = row.querySelector('.eb-verse-num')?.textContent?.trim() || '';
        const text = row.querySelector('span')?.textContent?.trim() || '';
        return num ? num + '. ' + text : text;
      })
      .filter(Boolean)
      .join(' ');
  }

  function stopBibleTTS() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    ttsPlaying = false;
    const btn = document.getElementById('reader-tts-btn');
    if (btn) {
      btn.title = 'Lire le chapitre';
      btn.setAttribute('aria-label', 'Lire le chapitre');
      btn.innerHTML = '<svg class="eb-icon"><use href="#icon-play"></use></svg>';
    }
  }

  function toggleBibleTTS() {
    if (!('speechSynthesis' in window)) {
      showToast('La lecture vocale TTS n’est pas disponible sur cet appareil.');
      return;
    }

    if (ttsPlaying) {
      stopBibleTTS();
      return;
    }

    const text = getReaderText();
    if (!text) {
      showToast('Aucun texte biblique à lire.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      ttsPlaying = true;
      const btn = document.getElementById('reader-tts-btn');
      if (btn) {
        btn.title = 'Arrêter la lecture';
        btn.setAttribute('aria-label', 'Arrêter la lecture');
        btn.innerHTML = '<svg class="eb-icon"><use href="#icon-stop"></use></svg>';
      }
    };

    utterance.onend = stopBibleTTS;
    utterance.onerror = stopBibleTTS;

    // Le moteur de synthèse vocale est celui fourni par Android/Chrome
    // ou par le moteur TTS configuré par défaut sur le téléphone.
    window.speechSynthesis.speak(utterance);
  }

  function toggleVerseSelection(rowElement, verseNum, verseText) {
    const isSelected = rowElement.classList.contains('is-selected');
    const existingToolbar = document.getElementById('verse-floating-toolbar');
    if (existingToolbar) existingToolbar.remove();

    if (isSelected) {
      APP.selectedVerses = APP.selectedVerses.filter(selected => selected.verse !== verseNum || selected.book !== APP.currentBook || selected.chapter !== APP.currentChapter);
    } else {
      APP.selectedVerses.push({ book: APP.currentBook, chapter: APP.currentChapter, verse: verseNum, text: verseText });
    }

    APP.selectedVerse = APP.selectedVerses[0] || null;
    if (!APP.selectedVerses.length) return;
    document.querySelectorAll('.eb-verse-row').forEach(row => {
      row.classList.toggle('is-selected', APP.selectedVerses.some(item => Number(item.verse) === Number(row.dataset.verse)));
    });

    // Créer la barre d'action du verset
    const toolbar = document.createElement('div');
    toolbar.id = 'verse-floating-toolbar';
    toolbar.className = 'eb-verse-toolbar';
    toolbar.innerHTML = `
      <span class="eb-selection-count">${APP.selectedVerses.length} sélectionné${APP.selectedVerses.length > 1 ? 's' : ''}</span>
      <button class="eb-toolbar-btn" data-action="hl-orange" title="Surligner Orange"><span class="eb-hl-dot eb-hl-orange"></span></button>
      <button class="eb-toolbar-btn" data-action="hl-purple" title="Surligner Violet"><span class="eb-hl-dot eb-hl-purple"></span></button>
      <button class="eb-toolbar-btn" data-action="hl-green" title="Surligner Vert"><span class="eb-hl-dot eb-hl-green"></span></button>
      <button class="eb-toolbar-btn" data-action="underline" title="Souligner"><span style="font-weight:800;text-decoration:underline;">U</span></button>
      <button class="eb-toolbar-btn" data-action="underline-double" title="Double soulignement"><span style="font-weight:800;text-decoration:underline;text-decoration-style:double;">U</span></button>
      <button class="eb-toolbar-btn" data-action="note" title="Ajouter une note"><svg class="eb-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></button>
      <button class="eb-toolbar-btn" data-action="bookmark" title="Sauvegarder"><svg class="eb-icon" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg></button>
      <button class="eb-toolbar-btn" data-action="compare" title="Comparer"><svg class="eb-icon" viewBox="0 0 24 24"><path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg></button>
      <button class="eb-toolbar-btn" data-action="share" title="Partager"><svg class="eb-icon" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg></button>
      <button class="eb-toolbar-btn" data-action="leona" title="Demander à Léona"><svg class="eb-icon" viewBox="0 0 24 24"><path d="M12 2L9.5 7.5 4 10l5.5 2.5L12 18l2.5-5.5L20 10l-5.5-2.5z"/></svg></button>
      <button class="eb-toolbar-btn" data-action="copy" title="Copier"><svg class="eb-icon" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></button>
    `;

    toolbar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleVerseAction(btn.dataset.action);
      });
    });

    rowElement.appendChild(toolbar);
  }

  function handleVerseAction(action) {
    const selected = APP.selectedVerses.length ? APP.selectedVerses : (APP.selectedVerse ? [APP.selectedVerse] : []);
    if (!selected.length) return;
    const bookObj = APP.books.find(b => b.id === selected[0].book) || APP.books[0];
    const refs = selected.map(item => `${(APP.books.find(b => b.id === item.book) || bookObj).name} ${item.chapter}:${item.verse}`);
    const ref = refs.join(', ');
    const text = selected.map(item => item.text).join('\n\n');

    if (action.startsWith('hl-')) {
      const color = action.replace('hl-', '');
      selected.forEach((item, index) => APP.highlights.unshift({ id: Date.now() + index, color, ref: refs[index], text: item.text }));
      setStored('ebiblia_highlights_v3', APP.highlights);
      showToast(`${selected.length} verset${selected.length > 1 ? 's' : ''} surligné${selected.length > 1 ? 's' : ''}`);
      renderBibleReader();
    } else if (action === 'underline' || action === 'underline-double') {
      selected.forEach((item, index) => APP.highlights.unshift({ id: Date.now() + index, style: action, ref: refs[index], text: item.text }));
      setStored('ebiblia_highlights_v3', APP.highlights);
      showToast(action === 'underline' ? 'Soulignement appliqué.' : 'Double soulignement appliqué.');
      renderBibleReader();
    } else if (action === 'note') {
      openNoteModal(ref, text);
    } else if (action === 'bookmark') {
      selected.forEach((item, index) => APP.bookmarks.unshift({ id: Date.now() + index, ref: refs[index], text: item.text }));
      setStored('ebiblia_bookmarks_v3', APP.bookmarks);
      showToast(`${selected.length} verset${selected.length > 1 ? 's' : ''} ajouté${selected.length > 1 ? 's' : ''} aux favoris`);
    } else if (action === 'compare') {
      showView('compare', { verse: ref });
    } else if (action === 'leona') {
      showView('leona');
      sendLeonaQuestion(`Peux-tu m'expliquer le sens et le contexte de ${ref} : "${text}" ?`);
    } else if (action === 'share') {
      const shareText = selected.map((item, index) => `${refs[index]} — "${item.text}"`).join('\n\n');
      shareContent('E-BIBLIA', shareText);
    } else if (action === 'copy') {
      navigator.clipboard?.writeText(selected.map((item, index) => `${refs[index]} — "${item.text}"`).join('\n\n'));
      showToast(`${selected.length} verset${selected.length > 1 ? 's' : ''} copié${selected.length > 1 ? 's' : ''}`);
    }
  }

  function nextChapter() {
    const bookObj = APP.books.find(b => b.id === APP.currentBook || b.file === APP.currentBook) || APP.books[0];
    if (APP.currentChapter < bookObj.chapters) {
      APP.currentChapter++;
      renderBibleReader();
    } else {
      const nextIdx = APP.books.findIndex(b => b.id === APP.currentBook || b.file === APP.currentBook) + 1;
      if (nextIdx < APP.books.length) {
        APP.currentBook = APP.books[nextIdx].id;
        APP.currentChapter = 1;
        renderBibleReader();
      }
    }
  }

  function prevChapter() {
    if (APP.currentChapter > 1) {
      APP.currentChapter--;
      renderBibleReader();
    } else {
      const prevIdx = APP.books.findIndex(b => b.id === APP.currentBook || b.file === APP.currentBook) - 1;
      if (prevIdx >= 0) {
        APP.currentBook = APP.books[prevIdx].id;
        APP.currentChapter = APP.books[prevIdx].chapters;
        renderBibleReader();
      }
    }
  }

  // -------------------------------------------------------------
  // RECONNAISSANCE DE RÉFÉRENCES BIBLIQUES
  // -------------------------------------------------------------
  const BOOK_ALIASES = {
    'genese': 'GEN', 'genèse': 'GEN', 'gen': 'GEN', 'ge': 'GEN', 'gn': 'GEN',
    'exode': 'EXO', 'exod': 'EXO', 'exo': 'EXO', 'ex': 'EXO',
    'levitique': 'LEV', 'lévitique': 'LEV', 'lev': 'LEV', 'lv': 'LEV',
    'nombres': 'NUM', 'nom': 'NUM', 'nomb': 'NUM', 'num': 'NUM', 'nb': 'NUM',
    'deuteronome': 'DEU', 'deutéronome': 'DEU', 'deut': 'DEU', 'deu': 'DEU', 'dt': 'DEU',
    'josue': 'JOS', 'josué': 'JOS', 'josh': 'JOS', 'jos': 'JOS',
    'juges': 'JDG', 'jug': 'JDG', 'judg': 'JDG', 'jg': 'JDG',
    'ruth': 'RUT', 'rut': 'RUT', 'rt': 'RUT',
    '1 samuel': '1SA', '1samuel': '1SA', '1sam': '1SA', '1sa': '1SA',
    '2 samuel': '2SA', '2samuel': '2SA', '2sam': '2SA', '2sa': '2SA',
    '1 rois': '1KI', '1rois': '1KI', '1kgs': '1KI', '1ki': '1KI', '1r': '1KI',
    '2 rois': '2KI', '2rois': '2KI', '2kgs': '2KI', '2ki': '2KI', '2r': '2KI',
    '1 chroniques': '1CH', '1chroniques': '1CH', '1chr': '1CH', '1ch': '1CH',
    '2 chroniques': '2CH', '2chroniques': '2CH', '2chr': '2CH', '2ch': '2CH',
    'esdras': 'EZR', 'ezra': 'EZR', 'esd': 'EZR', 'ezr': 'EZR',
    'nehemie': 'NEH', 'néhémie': 'NEH', 'neh': 'NEH',
    'esther': 'EST', 'esth': 'EST', 'est': 'EST',
    'job': 'JOB', 'jb': 'JOB',
    'psaumes': 'PSA', 'psaume': 'PSA', 'ps': 'PSA', 'psa': 'PSA',
    'proverbes': 'PRO', 'proverbe': 'PRO', 'prov': 'PRO', 'pro': 'PRO', 'pr': 'PRO',
    'ecclesiaste': 'ECC', 'ecclésiaste': 'ECC', 'eccl': 'ECC', 'ecc': 'ECC',
    'cantique': 'SNG', 'cantiques': 'SNG', 'cantique des cantiques': 'SNG', 'song': 'SNG', 'ct': 'SNG',
    'esaie': 'ISA', 'ésaïe': 'ISA', 'isaie': 'ISA', 'isaïe': 'ISA', 'isa': 'ISA', 'es': 'ISA',
    'jeremie': 'JER', 'jérémie': 'JER', 'jer': 'JER', 'jr': 'JER',
    'lamentations': 'LAM', 'lamentation': 'LAM', 'lam': 'LAM',
    'ezekiel': 'EZK', 'ézéchiel': 'EZK', 'ezk': 'EZK', 'ez': 'EZK',
    'daniel': 'DAN', 'dan': 'DAN', 'da': 'DAN',
    'osee': 'HOS', 'osée': 'HOS', 'hos': 'HOS', 'os': 'HOS',
    'joel': 'JOL', 'joël': 'JOL', 'jol': 'JOL',
    'amos': 'AMO', 'am': 'AMO',
    'abdias': 'OBD', 'obad': 'OBD', 'obd': 'OBD',
    'jonas': 'JON', 'jonah': 'JON', 'jon': 'JON',
    'michee': 'MIC', 'michée': 'MIC', 'mic': 'MIC',
    'nahum': 'NAM', 'nah': 'NAM',
    'habacuc': 'HAB', 'hab': 'HAB',
    'sophonie': 'ZEP', 'zeph': 'ZEP',
    'aggee': 'HAG', 'aggée': 'HAG', 'hag': 'HAG',
    'zacharie': 'ZEC', 'zech': 'ZEC', 'zac': 'ZEC',
    'malachie': 'MAL', 'mal': 'MAL',
    'matthieu': 'MAT', 'matt': 'MAT', 'mat': 'MAT', 'mt': 'MAT',
    'marc': 'MRK', 'mark': 'MRK', 'mc': 'MRK',
    'luc': 'LUK', 'luke': 'LUK', 'lc': 'LUK',
    'jean': 'JHN', 'john': 'JHN', 'jn': 'JHN', 'jhn': 'JHN',
    'actes': 'ACT', 'act': 'ACT', 'ac': 'ACT',
    'romains': 'ROM', 'rom': 'ROM', 'rm': 'ROM',
    '1 corinthiens': '1CO', '1corinthiens': '1CO', '1cor': '1CO', '1co': '1CO',
    '2 corinthiens': '2CO', '2corinthiens': '2CO', '2cor': '2CO', '2co': '2CO',
    'galates': 'GAL', 'gal': 'GAL', 'ga': 'GAL',
    'ephesiens': 'EPH', 'éphésiens': 'EPH', 'eph': 'EPH',
    'philippiens': 'PHP', 'phil': 'PHP', 'php': 'PHP', 'ph': 'PHP',
    'colossiens': 'COL', 'col': 'COL',
    '1 thessaloniciens': '1TH', '1thess': '1TH', '1th': '1TH',
    '2 thessaloniciens': '2TH', '2thess': '2TH', '2th': '2TH',
    '1 timothee': '1TI', '1 timothée': '1TI', '1tim': '1TI', '1ti': '1TI',
    '2 timothee': '2TI', '2 timothée': '2TI', '2tim': '2TI', '2ti': '2TI',
    'tite': 'TIT', 'tit': 'TIT',
    'philemon': 'PHM', 'philémon': 'PHM', 'phlm': 'PHM',
    'hebreux': 'HEB', 'hébreux': 'HEB', 'heb': 'HEB',
    'jacques': 'JAS', 'jas': 'JAS', 'jac': 'JAS',
    '1 pierre': '1PE', '1pierre': '1PE', '1pet': '1PE', '1pe': '1PE',
    '2 pierre': '2PE', '2pierre': '2PE', '2pet': '2PE', '2pe': '2PE',
    '1 jean': '1JN', '1jean': '1JN', '1john': '1JN', '1jn': '1JN',
    '2 jean': '2JN', '2jean': '2JN', '2john': '2JN', '2jn': '2JN',
    '3 jean': '3JN', '3jean': '3JN', '3john': '3JN', '3jn': '3JN',
    'jude': 'JUD', 'jud': 'JUD',
    'apocalypse': 'REV', 'apoc': 'REV', 'rev': 'REV', 'ap': 'REV'
  };

  function parseVerseReference(input) {
    if (!input || typeof input !== 'string') return null;
    const clean = input.trim().toLowerCase();

    // Format 1: "Jean 3:16", "1 Jean 1:9", "Psaumes 23:1", "Ps 23:1"
    const mVerse = clean.match(/^([1-3]?\s*[a-zà-ÿ]+)\s*(\d+)[:\s,.]+(\d+)/i);
    if (mVerse) {
      const bookKey = mVerse[1].trim().toLowerCase();
      const chNum = parseInt(mVerse[2], 10);
      const vsNum = parseInt(mVerse[3], 10);
      const bookId = BOOK_ALIASES[bookKey] || APP.books.find(b =>
        b.name.toLowerCase() === bookKey ||
        b.id.toLowerCase() === bookKey ||
        b.file.toLowerCase() === bookKey
      )?.id;

      if (bookId) {
        const bookObj = APP.books.find(b => b.id === bookId);
        return { bookId: bookObj.id, bookName: bookObj.name, chapter: chNum, verse: vsNum };
      }
    }

    // Format 2: "Jean 3", "Psaumes 23"
    const mChap = clean.match(/^([1-3]?\s*[a-zà-ÿ]+)\s*(\d+)$/i);
    if (mChap) {
      const bookKey = mChap[1].trim().toLowerCase();
      const chNum = parseInt(mChap[2], 10);
      const bookId = BOOK_ALIASES[bookKey] || APP.books.find(b =>
        b.name.toLowerCase() === bookKey ||
        b.id.toLowerCase() === bookKey ||
        b.file.toLowerCase() === bookKey
      )?.id;

      if (bookId) {
        const bookObj = APP.books.find(b => b.id === bookId);
        return { bookId: bookObj.id, bookName: bookObj.name, chapter: chNum, verse: null };
      }
    }

    return null;
  }

  // -------------------------------------------------------------
  // VUE COMPARER DES VERSIONS (Screen 3 & 10)
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // PARTAGE UNIFIÉ — partage natif Android/iOS + Web Share API
  // -------------------------------------------------------------
  async function shareContent(title, text, url = '') {
    const payload = { title: title || 'E-BIBLIA', text: text || '' };
    if (url) payload.url = url;

    try {
      if (window.Capacitor?.isPluginAvailable?.('Share') && window.Capacitor?.Plugins?.Share) {
        await window.Capacitor.Plugins.Share.share(payload);
        return true;
      }
      if (navigator.share) {
        await navigator.share(payload);
        return true;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText([text, url].filter(Boolean).join('\n'));
        showToast('Contenu copié : vous pouvez le partager depuis votre application de messagerie.');
        return true;
      }
    } catch (error) {
      if (error?.name !== 'AbortError' && error?.message !== 'Share canceled') {
        console.warn('Partage indisponible :', error);
      }
    }
    return false;
  }

  // -------------------------------------------------------------
  // CONTENU « POUR AUJOURD'HUI » — Gemini + cache local
  // -------------------------------------------------------------
  const DAILY_CONTENT_STORAGE_KEY = 'ebiblia_daily_content_v1';
  function dailyDateKey(date = new Date()) {
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
  }
  function readDailyContent() {
    try { return JSON.parse(localStorage.getItem(DAILY_CONTENT_STORAGE_KEY) || 'null'); } catch(e) { return null; }
  }
  function saveDailyContent(content) { try { localStorage.setItem(DAILY_CONTENT_STORAGE_KEY, JSON.stringify(content)); } catch(e) {} }
  function escapeDaily(value) { const d=document.createElement('div'); d.textContent=value == null ? '' : String(value); return d.innerHTML; }
  function renderDailyContent(content = readDailyContent()) {
    const body=document.getElementById('daily-content-body'), dateEl=document.getElementById('daily-content-date'), statusEl=document.getElementById('daily-content-status');
    if(!body || !dateEl || !statusEl) return;
    if(!content || content.dateKey !== dailyDateKey()) {
      dateEl.textContent=navigator.onLine ? 'Génération du contenu du jour…' : 'Hors connexion — aucun contenu du jour en cache';
      statusEl.textContent=navigator.onLine ? 'Génération…' : 'Hors connexion';
      body.innerHTML='<div class="eb-daily-loading">Préparation de votre méditation du jour…</div>'; return;
    }
    dateEl.textContent=content.dateKey;
    statusEl.textContent=navigator.onLine ? 'Actualisé' : 'Hors connexion — contenu conservé';
    body.innerHTML='<article class="eb-daily-verse"><div class="eb-daily-verse-ref">'+escapeDaily(content.reference)+'</div><div class="eb-daily-verse-text">« '+escapeDaily(content.verse)+' »</div><div class="eb-daily-offline">'+escapeDaily(content.versionName || 'Louis Segond 1910')+'</div></article><div class="eb-daily-section-label">Méditation</div><p class="eb-daily-copy">'+escapeDaily(content.meditation)+'</p><div class="eb-daily-section-label">Prière</div><p class="eb-daily-copy">'+escapeDaily(content.prayer)+'</p>';
  }
  function parseDailyJson(text) {
    const cleaned=String(text||'').replace(/^\\`\\`\\`json\\s*/i,'').replace(/\\`\\`\\s*$/,'').trim();
    const start=cleaned.indexOf('{'), end=cleaned.lastIndexOf('}');
    if(start<0 || end<=start) throw new Error('Réponse Gemini non JSON.');
    return JSON.parse(cleaned.slice(start,end+1));
  }
  async function generateDailyContentWithGemini() {
    const config=window.EBIBLIA_CONFIG || {}; if(!config.API_KEY) throw new Error('Clé Gemini non configurée.'); if(!navigator.onLine) throw new Error('Connexion Internet indisponible.');
    const books=APP.books.map(b=>b.id+'='+b.name).join(', ');
    const model=config.GEMINI_MODEL || 'gemini-3-flash-preview';
    const endpoint='https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent?key='+encodeURIComponent(config.API_KEY);
    const payload={systemInstruction:{parts:[{text:'Tu es le rédacteur quotidien de E-BIBLIA. Réponds en français, avec fidélité biblique et ton pastoral. Ne cite jamais un verset de mémoire. Choisis un livre de la liste et renvoie uniquement un JSON valide avec title, bookId, chapter, verse, meditation et prayer.'}]},contents:[{role:'user',parts:[{text:'Date locale: '+dailyDateKey()+'\nLivres disponibles: '+books+'\nChoisis un passage pertinent pour la méditation du jour.'}]}]};
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await response.json(); if(!response.ok) throw new Error(data?.error?.message || ('Erreur Gemini ('+response.status+').'));
    const generated=parseDailyJson((data?.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join(''));
    const book=APP.books.find(b=>b.id===generated.bookId), chapter=Number(generated.chapter), verseNumber=Number(generated.verse);
    if(!book || !Number.isInteger(chapter) || !Number.isInteger(verseNumber) || chapter<1 || chapter>book.chapters || verseNumber<1) throw new Error('Référence quotidienne invalide.');
    const verseObj=(await fetchVersionChapter('LSG',book.id,chapter)||[]).find(v=>Number(v.verse)===verseNumber);
    if(!verseObj?.text) throw new Error('Verset non disponible dans la Bible locale.');
    return {dateKey:dailyDateKey(),title:String(generated.title||'Méditation du jour'),reference:book.name+' '+chapter+':'+verseNumber,verse:String(verseObj.text).replace(/^[¶\s]+/,'').trim(),versionName:'Louis Segond 1910',meditation:String(generated.meditation||''),prayer:String(generated.prayer||'')};
  }
  let dailyContentInProgress=false, dailyContentTimer=null;
  async function refreshDailyContent(force=false) {
    const cached=readDailyContent();
    if(!force && cached?.dateKey===dailyDateKey()){ renderDailyContent(cached); return; }
    renderDailyContent(cached); if(dailyContentInProgress || !navigator.onLine) return; dailyContentInProgress=true;
    try { const fresh=await generateDailyContentWithGemini(); saveDailyContent(fresh); renderDailyContent(fresh); }
    catch(error) { console.warn('E-BIBLIA: contenu quotidien non actualisé:',error); if(cached) renderDailyContent(cached); }
    finally { dailyContentInProgress=false; }
  }
  function scheduleDailyContent() {
    if(dailyContentTimer) clearTimeout(dailyContentTimer);
    const now=new Date(), next=new Date(now); next.setHours(24,0,2,0);
    dailyContentTimer=setTimeout(async()=>{ await refreshDailyContent(true); scheduleDailyContent(); },Math.max(1000,next.getTime()-now.getTime()));
  }

  // -------------------------------------------------------------
  // VERSET DU JOUR — chargé depuis bible-data, stable pour la journée
  // -------------------------------------------------------------
  function dailyVerseSeed(date = new Date()) {
    const key = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  async function loadDailyVerse() {
    const refEl = document.querySelector('#view-home .eb-verse-ref');
    const quoteEl = document.querySelector('#view-home .eb-verse-quote');
    const card = document.querySelector('#view-home .eb-verse-card');
    if (!refEl || !quoteEl) return;

    const seed = dailyVerseSeed();
    const book = APP.books[seed % APP.books.length];
    const chapter = (Math.floor(seed / APP.books.length) % book.chapters) + 1;
    const version = APP.currentVersion || 'LSG';

    let verses = await fetchVersionChapter(version, book.id, chapter);
    if (!verses?.length && version !== 'LSG') {
      verses = await fetchVersionChapter('LSG', book.id, chapter);
    }
    if (!verses?.length) return;

    const verseIndex = Math.floor(seed / (APP.books.length * book.chapters)) % verses.length;
    const verse = verses[verseIndex];
    if (!verse?.text) return;

    const cleanText = String(verse.text).replace(/<[^>]*>/g, '').trim();
    const reference = book.name + ' ' + chapter + ':' + verse.verse;
    refEl.textContent = reference;
    quoteEl.textContent = '« ' + cleanText + ' »';

    const shareButton = card?.querySelector('[data-share]');
    if (shareButton) {
      shareButton.dataset.shareTitle = 'Verset du jour — E-BIBLIA';
      shareButton.dataset.shareText = reference + ' — "' + cleanText + '"';
    }
  }

  async function fetchVersionVerse(versionCode, bookId, chapter, verse) {
    const data = await fetchVersionChapter(versionCode, bookId, chapter);
    if (!data) return null;
    const verseObj = data.find(v => Number(v.verse) === Number(verse));
    return verseObj?.text ? String(verseObj.text).replace(/^[¶\\s]+/, '') : null;
  }

  // Convertit une sélection comme "Jean 3:16, Jean 3:17, Jean 3:18"
  // en références individuelles afin que TOUS les versets sélectionnés
  // soient affichés dans la comparaison.
  function parseCompareReferences(verseRef) {
    const refs = Array.isArray(verseRef)
      ? verseRef
      : String(verseRef || '').split(/\\s*,\\s*/).filter(Boolean);

    const parsed = [];
    refs.forEach(ref => {
      const p = parseVerseReference(String(ref).trim());
      if (p && p.verse !== null && p.verse !== undefined) {
        const key = `${p.bookId}|${p.chapter}|${p.verse}`;
        if (!parsed.some(x => `${x.bookId}|${x.chapter}|${x.verse}` === key)) {
          parsed.push(p);
        }
      }
    });
    return parsed;
  }

  async function renderCompareView(verseRef = 'Jean 3:16') {
    const list = document.getElementById('compare-cards-list');
    if (!list) return;

    list.innerHTML = '<div style="text-align:center;padding:24px;color:var(--eb-text-secondary);">Chargement des versions...</div>';

    // Récupérer la totalité de la sélection, pas uniquement le premier verset.
    let refs = parseCompareReferences(verseRef);

    // Si la sélection n'est pas passée dans l'URL, utiliser le verset courant.
    if (!refs.length) {
      refs = [{
        bookId: APP.currentBook,
        bookName: (APP.books.find(b => b.id === APP.currentBook)?.name || 'Genèse'),
        chapter: APP.currentChapter,
        verse: 1
      }];
    }

    const cards = [];

    // Une carte par version, contenant TOUS les versets sélectionnés.
    for (const [code, meta] of Object.entries(APP.versions)) {
      const verses = [];

      for (const ref of refs) {
        const text = await fetchVersionVerse(code, ref.bookId, ref.chapter, ref.verse);
        verses.push({
          ...ref,
          text: text || 'Verset indisponible dans cette version locale.'
        });
      }

      cards.push({
        code,
        name: meta.name,
        verses
      });
    }

    list.innerHTML = '';

    cards.forEach(item => {
      const card = document.createElement('div');
      card.className = 'eb-compare-card';

      const versesHtml = item.verses.map((v, verseIndex) => `
        <div class="eb-compare-verse-block" data-version="${escapeHtml(item.code)}" data-book="${escapeHtml(v.bookId)}" data-chapter="${v.chapter}" data-verse="${v.verse}" style="padding:10px 0;border-bottom:1px solid var(--eb-border);cursor:pointer;" title="Ouvrir ce verset dans cette version">
          <div class="eb-compare-ref">${escapeHtml(v.bookName)} ${v.chapter}:${v.verse}</div>
          <p class="eb-compare-text" style="margin-bottom:0;">${escapeHtml(v.text)}</p>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="eb-compare-top">
          <span class="eb-version-tag">${item.code}</span>
          <span class="eb-version-name">${item.name}</span>
        </div>
        <div class="eb-compare-selected-count" style="font-size:12px;color:var(--eb-text-secondary);margin:6px 0 2px;">
          ${item.verses.length} verset${item.verses.length > 1 ? 's' : ''} sélectionné${item.verses.length > 1 ? 's' : ''}
        </div>
        ${versesHtml}
      `;

      list.appendChild(card);

      // Cliquer sur le texte d'un verset ouvre directement la Bible
      // sur ce verset ET dans la version de la carte sélectionnée.
      card.querySelectorAll('.eb-compare-verse-block').forEach(block => {
        block.addEventListener('click', () => {
          const version = block.dataset.version;
          const book = block.dataset.book;
          const chapter = Number(block.dataset.chapter);
          const verse = Number(block.dataset.verse);

          APP.currentVersion = version;
          APP.currentBook = book;
          APP.currentChapter = chapter;
          APP.selectedVerses = [];
          APP.selectedVerse = null;

          showView('reader', {
            book,
            chapter,
            verse
          });
        });
      });
    });
  }

  // -------------------------------------------------------------
  // VUE RECHERCHE DANS BIBLE-DATA (Screen 7 & 14)
  // -------------------------------------------------------------
  const POPULAR_SEARCH_FILES = [
    'John', 'Matt', 'Luke', 'Mark', 'Rom', 'Ps', 'Prov', 'Gen', 'Isa',
    '1Cor', '2Cor', 'Gal', 'Eph', 'Phil', 'Col', 'Heb', 'Jas', '1Pet', '1John', 'Rev',
    'Exod', 'Deut', 'Josh', '1Sam', '2Sam', '1Kgs', '2Kgs', 'Eccl', 'Jer', 'Dan'
  ];

  async function searchBibleData(query) {
    const raw = String(query || '').trim();
    if (!raw || raw.length < 2) return [];

    // 1. Détection et extraction de référence biblique directe (ex: Jean 3:16, Ps 23)
    const parsed = parseVerseReference(raw);
    if (parsed) {
      const bookObj = APP.books.find(b => b.id === parsed.bookId) || APP.books[0];
      const data = await fetchVersionBook(APP.currentVersion, bookObj.file);
      if (data && data.chapters) {
        const chapter = data.chapters.find(c => Number(c.chapter) === Number(parsed.chapter));
        if (chapter && chapter.verses) {
          if (parsed.verse) {
            const v = chapter.verses.find(item => Number(item.verse) === Number(parsed.verse));
            if (v) {
              const cleanText = String(v.text || '').replace(/^[¶\s]+/, '');
              return [{
                code: APP.currentVersion,
                name: APP.versions[APP.currentVersion].name,
                bookId: bookObj.id,
                bookName: bookObj.name,
                chapter: parsed.chapter,
                verse: parsed.verse,
                ref: `${bookObj.name} ${parsed.chapter}:${parsed.verse}`,
                text: cleanText,
                isDirectReference: true
              }];
            }
          } else {
            return chapter.verses.slice(0, 10).map(v => ({
              code: APP.currentVersion,
              name: APP.versions[APP.currentVersion].name,
              bookId: bookObj.id,
              bookName: bookObj.name,
              chapter: parsed.chapter,
              verse: v.verse,
              ref: `${bookObj.name} ${parsed.chapter}:${v.verse}`,
              text: String(v.text || '').replace(/^[¶\s]+/, ''),
              isDirectReference: true
            }));
          }
        }
      }
    }

    // 2. Recherche textuelle dans les fichiers bible-data
    const normalized = raw.toLowerCase();
    const matches = [];

    const orderedFiles = [
      ...POPULAR_SEARCH_FILES,
      ...SEARCH_BOOK_FILES.filter(f => !POPULAR_SEARCH_FILES.includes(f))
    ];

    for (const file of orderedFiles) {
      if (matches.length >= 40) break;
      const bookData = await fetchVersionBook(APP.currentVersion, file);
      if (!bookData || !bookData.chapters) continue;

      const bookMeta = APP.books.find(b => b.file === file) || { id: file, name: bookData.book_name || file };

      for (const chapter of bookData.chapters) {
        if (matches.length >= 40) break;
        for (const verse of (chapter.verses || [])) {
          const cleanText = String(verse.text || '').replace(/^[¶\s]+/, '');
          const ref = `${bookMeta.name} ${chapter.chapter}:${verse.verse}`;
          if (cleanText.toLowerCase().includes(normalized) || ref.toLowerCase().includes(normalized)) {
            matches.push({
              code: APP.currentVersion,
              name: APP.versions[APP.currentVersion].name,
              bookId: bookMeta.id,
              bookName: bookMeta.name,
              chapter: chapter.chapter,
              verse: verse.verse,
              ref: ref,
              text: cleanText
            });
            if (matches.length >= 40) break;
          }
        }
      }
    }

    return matches;
  }

  function renderSearchView() {
    const searchInput = document.getElementById('search-input-field');
    const resultsContainer = document.getElementById('search-results-area');
    if (!searchInput || !resultsContainer) return;

    let searchRequest = 0;
    async function executeSearch(query) {
      if (!query || query.trim().length < 2) {
        document.getElementById('search-default-sections').style.display = 'block';
        resultsContainer.innerHTML = '';
        return;
      }

      document.getElementById('search-default-sections').style.display = 'none';
      resultsContainer.innerHTML = '<div style="text-align:center;padding:24px;color:var(--eb-text-secondary);">Recherche en cours dans la Bible...</div>';

      const q = query.toLowerCase().trim();
      const requestId = ++searchRequest;
      const matches = await searchBibleData(q);
      if (requestId !== searchRequest) return;

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="text-align:center;padding:30px;color:var(--eb-text-secondary);">Aucun verset trouvé pour « ${escapeHtml(query)} ».</div>`;
        return;
      }

      resultsContainer.innerHTML = '';
      matches.forEach(m => {
        const item = document.createElement('div');
        item.className = 'eb-compare-card';
        item.style.cursor = 'pointer';
        item.innerHTML = `
          <div class="eb-compare-top">
            <span class="eb-version-tag">${m.code}</span>
            <span class="eb-version-name">${m.name}</span>
            ${m.isDirectReference ? '<span class="eb-badge-blue" style="font-size:10px;padding:2px 8px;border-radius:10px;margin-left:auto;">Passage exact</span>' : ''}
          </div>
          <div class="eb-compare-ref" style="color:var(--eb-accent);font-weight:700;">${m.ref}</div>
          <p class="eb-compare-text">${highlightMatch(m.text, q)}</p>
        `;
        item.addEventListener('click', () => {
          APP.currentBook = m.bookId;
          APP.currentChapter = m.chapter;
          showView('reader', { book: m.bookId, chapter: m.chapter, verse: m.verse });
        });
        resultsContainer.appendChild(item);
      });
    }

    searchInput.oninput = (e) => executeSearch(e.target.value);
  }

  function highlightMatch(text, query) {
    const reg = new RegExp(`(${query})`, 'gi');
    return text.replace(reg, '<span style="background:rgba(245,158,11,0.3);color:var(--eb-text);border-radius:2px;padding:0 2px;">$1</span>');
  }

  // -------------------------------------------------------------
  // VUE NOTES (Screen 15)
  // -------------------------------------------------------------
  function renderNotesView() {
    const list = document.getElementById('notes-cards-list');
    if (!list) return;
    list.innerHTML = '';

    if (APP.notes.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--eb-text-secondary);">Aucune note enregistrée.</div>';
      return;
    }

    APP.notes.forEach(note => {
      const card = document.createElement('div');
      card.className = 'eb-note-card';
      card.innerHTML = `
        <div class="eb-note-header">
          <span class="eb-note-ref">${note.ref}</span>
          <span class="eb-note-date">${note.date}</span>
        </div>
        <p class="eb-note-body">${escapeHtml(note.text)}</p>
      `;
      list.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // VUE MÉDITATION — carnet biblique approfondi
  // -------------------------------------------------------------
  function formatMeditationDate(value) {
    if (!value) return '';
    try { return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value + 'T00:00:00')); }
    catch (e) { return value; }
  }

  function openMeditationModal() {
    const dateInput = document.getElementById('meditation-modal-date');
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
    ['meditation-modal-theme','meditation-modal-author','meditation-modal-verses','meditation-modal-notes','meditation-modal-prayer'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    openModal('modal-new-meditation');
  }

  function saveNewMeditation() {
    const theme = document.getElementById('meditation-modal-theme')?.value.trim();
    const author = document.getElementById('meditation-modal-author')?.value.trim();
    const date = document.getElementById('meditation-modal-date')?.value;
    const versesRaw = document.getElementById('meditation-modal-verses')?.value.trim();
    const notes = document.getElementById('meditation-modal-notes')?.value.trim();
    const prayer = document.getElementById('meditation-modal-prayer')?.value.trim();
    if (!theme || !date || !notes) { showToast('Veuillez renseigner le thème, la date et vos notes.'); return; }
    APP.meditations.unshift({ id: Date.now(), theme, author: author || 'Moi', date, verses: versesRaw ? versesRaw.split(/\\n+/).map(v => v.trim()).filter(Boolean) : [], notes, prayer });
    setStored('ebiblia_meditations_v1', APP.meditations);
    closeModal('modal-new-meditation');
    showToast('Méditation enregistrée');
    renderMeditationView();
  }

  function renderMeditationView() {
    const list = document.getElementById('meditation-cards-list');
    if (!list) return;
    list.innerHTML = '';
    if (!APP.meditations.length) {
      list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--eb-text-secondary);">Aucune méditation enregistrée. Appuyez sur + pour commencer.</div>';
      return;
    }
    APP.meditations.forEach(m => {
      const card = document.createElement('article'); card.className = 'eb-note-card';
      const verses = m.verses?.length ? '<div style="margin-top:10px;color:var(--eb-accent);font-size:12px;font-weight:700;">VERSETS</div><div style="margin-top:5px;line-height:1.6;">' + m.verses.map(v => '<div>• ' + escapeHtml(v) + '</div>').join('') + '</div>' : '';
      card.innerHTML = '<div class="eb-note-header"><span class="eb-note-ref">' + escapeHtml(m.theme) + '</span><span class="eb-note-date">' + escapeHtml(formatMeditationDate(m.date)) + '</span></div>' +
        '<div style="font-size:12px;color:var(--eb-text-secondary);margin-bottom:8px;">Auteur : ' + escapeHtml(m.author) + '</div>' + verses +
        '<div style="margin-top:12px;white-space:pre-wrap;line-height:1.65;">' + escapeHtml(m.notes) + '</div>' +
        (m.prayer ? '<div style="margin-top:12px;padding:10px;border-left:3px solid var(--eb-accent);background:var(--eb-card-inner);border-radius:8px;white-space:pre-wrap;"><strong>Application / prière</strong><br>' + escapeHtml(m.prayer) + '</div>' : '');
      list.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // VUE SURBRILLANCES (Screen 16)
  // -------------------------------------------------------------
  function renderHighlightsView() {
    const list = document.getElementById('highlights-cards-list');
    if (!list) return;
    list.innerHTML = '';

    if (APP.highlights.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--eb-text-secondary);">Aucun passage surligné.</div>';
      return;
    }

    APP.highlights.forEach(h => {
      const card = document.createElement('div');
      card.className = 'eb-highlight-card';
      card.innerHTML = `
        <span class="eb-hl-swatch eb-hl-${h.color}"></span>
        <div class="eb-hl-info">
          <div class="eb-hl-ref">${h.ref}</div>
          <p class="eb-hl-text">${escapeHtml(h.text)}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        showView('reader');
      });
      list.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // VUE VERSETS / FAVORIS (Screen 17)
  // -------------------------------------------------------------
  function renderBookmarksView() {
    const list = document.getElementById('bookmarks-cards-list');
    if (!list) return;
    list.innerHTML = '';

    if (APP.bookmarks.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--eb-text-secondary);">Aucun verset sauvegardé.</div>';
      return;
    }

    APP.bookmarks.forEach(b => {
      const card = document.createElement('div');
      card.className = 'eb-saved-verse-card';
      card.innerHTML = `
        <div class="eb-bookmark-circle">
          <svg class="eb-icon" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <div class="eb-hl-info">
          <div class="eb-hl-ref">${b.ref}</div>
          <p class="eb-hl-text">${escapeHtml(b.text)}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        showView('reader');
      });
      list.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // VUE STATISTIQUES (Screen 18)
  // -------------------------------------------------------------
  function renderStatsView() {
    const streakEl = document.getElementById('stats-streak-num');
    const daysEl = document.getElementById('stats-days-num');
    if (streakEl) streakEl.textContent = APP.streak;
    if (daysEl) daysEl.textContent = APP.activeDays;
  }

  // -------------------------------------------------------------
  // VUE PRIÈRE (Screen 20)
  // -------------------------------------------------------------
  function renderPrayersView() {
    const list = document.getElementById('prayers-cards-list');
    if (!list) return;
    list.innerHTML = '';

    const filtered = APP.prayerFilter === 'all'
      ? APP.prayers
      : APP.prayerFilter === 'answered'
        ? APP.prayers.filter(p => p.answered)
        : APP.prayers.filter(p => !p.answered);

    if (filtered.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--eb-text-secondary);">Aucune prière dans cette section.</div>';
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'eb-prayer-card';
      const badgeClass = p.color === 'purple' ? 'eb-badge-purple' : p.color === 'orange' ? 'eb-streak-pill' : 'eb-badge-blue';

      card.innerHTML = `
        <div class="eb-prayer-icon ${badgeClass}">
          <svg class="eb-icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <div class="eb-prayer-details">
          <div class="eb-prayer-title">${escapeHtml(p.title)}</div>
          <p class="eb-prayer-text">${escapeHtml(p.text)}</p>
        </div>
      `;
      list.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // LÉONA IA — ORBE NÉON ET CHAT (Screens 5 & 12)
  // -------------------------------------------------------------
  let orbCanvas, orbCtx, orbAnimId;
  function initLeonaOrb() {
    orbCanvas = document.getElementById('leona-orb-canvas');
    if (!orbCanvas) return;
    orbCtx = orbCanvas.getContext('2d');
    orbCanvas.width = 170;
    orbCanvas.height = 170;

    let t = 0;
    cancelAnimationFrame(orbAnimId);

    function draw() {
      t += 0.035;
      orbCtx.clearRect(0, 0, 170, 170);

      const cx = 85;
      const cy = 85;

      // Halo externe violet-cyan
      const grad = orbCtx.createRadialGradient(cx, cy, 20, cx, cy, 80);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      orbCtx.fillStyle = grad;
      orbCtx.beginPath();
      orbCtx.arc(cx, cy, 80, 0, Math.PI * 2);
      orbCtx.fill();

      // Anneaux concentriques ondulants
      for (let r = 0; r < 4; r++) {
        orbCtx.beginPath();
        const radius = 35 + r * 11 + Math.sin(t * 3 + r) * 3;
        orbCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        orbCtx.strokeStyle = r % 2 === 0 ? 'rgba(56, 189, 248, 0.85)' : 'rgba(168, 85, 247, 0.85)';
        orbCtx.lineWidth = 2;
        orbCtx.shadowBlur = 12;
        orbCtx.shadowColor = r % 2 === 0 ? '#38bdf8' : '#a855f7';
        orbCtx.stroke();
      }

      // Onde sonore horizontale pulsante
      orbCtx.beginPath();
      orbCtx.moveTo(25, cy);
      for (let x = 25; x <= 145; x += 4) {
        const dist = Math.abs(x - cx);
        const amp = Math.max(0, (60 - dist) / 60) * 14 * Math.sin(t * 5 + x * 0.1);
        orbCtx.lineTo(x, cy + amp);
      }
      orbCtx.strokeStyle = '#ffffff';
      orbCtx.lineWidth = 2.5;
      orbCtx.shadowBlur = 8;
      orbCtx.shadowColor = '#ffffff';
      orbCtx.stroke();

      orbAnimId = requestAnimationFrame(draw);
    }

    draw();
  }

  async function sendLeonaQuestion(question) {
    const chatContainer = document.getElementById('leona-chat-messages');
    const input = document.getElementById('leona-input-text');
    if (!question && input) question = input.value.trim();
    if (!question) return;

    if (input) input.value = '';

    // Message utilisateur
    const userMsg = document.createElement('div');
    userMsg.className = 'eb-chat-msg eb-msg-user';
    userMsg.textContent = question;
    chatContainer.appendChild(userMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Indicateur de réponse
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'eb-chat-msg eb-msg-leona';
    loadingMsg.textContent = 'Léona étudie votre question...';
    chatContainer.appendChild(loadingMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      if (!window.EBibliaAI?.askGemini) throw new Error('Le moteur Gemini n’est pas chargé.');
      const answer = await window.EBibliaAI.askGemini(question);
      loadingMsg.innerHTML = window.EBibliaAI.renderAIResponse(answer);
    } catch (error) {
      loadingMsg.textContent = `Léona n’a pas pu joindre Gemini : ${error.message}`;
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // -------------------------------------------------------------
  // UTILITAIRES & MODALES
  // -------------------------------------------------------------
  function showToast(msg) {
    let toast = document.getElementById('eb-global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'eb-global-toast';
      toast.className = 'eb-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2400);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('is-open');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('is-open');
  }

  let pickerTestamentFilter = 'all';
  let pickerBookSearchQuery = '';

  function openBookPicker() {
    const container = document.getElementById('modal-book-picker-list');
    if (!container) return;
    container.innerHTML = '';

    // Barre d'onglets de filtrage Ancien / Nouveau Testament
    const filterRow = document.createElement('div');
    filterRow.className = 'eb-pills-row';
    filterRow.style.marginBottom = '12px';
    filterRow.innerHTML = `
      <button class="eb-pill ${pickerTestamentFilter === 'all' ? 'is-active' : ''}" data-testament="all">Tous (66)</button>
      <button class="eb-pill ${pickerTestamentFilter === 'AT' ? 'is-active' : ''}" data-testament="AT">Ancien Testament (39)</button>
      <button class="eb-pill ${pickerTestamentFilter === 'NT' ? 'is-active' : ''}" data-testament="NT">Nouveau Testament (27)</button>
    `;

    // Champ de recherche rapide de livre
    const searchWrap = document.createElement('div');
    searchWrap.style.marginBottom = '12px';
    searchWrap.innerHTML = `
      <input type="text" id="picker-book-search-input" placeholder="Filtrer un livre (ex: Psaumes, Rom, Jean)..." value="${escapeHtml(pickerBookSearchQuery)}" style="width:100%;padding:10px 14px;border-radius:12px;border:1px solid var(--eb-border);background:var(--eb-card-inner);color:var(--eb-text);font-size:14px;outline:none;">
    `;

    const grid = document.createElement('div');
    grid.className = 'eb-book-grid';

    function renderList() {
      grid.innerHTML = '';
      const filtered = APP.books.filter(b => {
        if (pickerTestamentFilter !== 'all' && b.testament !== pickerTestamentFilter) return false;
        if (pickerBookSearchQuery) {
          const q = pickerBookSearchQuery.toLowerCase().trim();
          return b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.file.toLowerCase().includes(q);
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--eb-text-secondary);font-size:13px;">Aucun livre trouvé</div>';
        return;
      }

      filtered.forEach(b => {
        const chip = document.createElement('button');
        chip.className = 'eb-book-chip' + (b.id === APP.currentBook ? ' is-active' : '');
        chip.innerHTML = `<span>${b.name}</span><small style="opacity:0.7">${b.chapters} ch</small>`;
        chip.addEventListener('click', () => {
          openChapterPicker(b);
        });
        grid.appendChild(chip);
      });
    }

    container.appendChild(filterRow);
    container.appendChild(searchWrap);
    container.appendChild(grid);

    filterRow.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        filterRow.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        pickerTestamentFilter = btn.dataset.testament;
        renderList();
      });
    });

    const searchInput = document.getElementById('picker-book-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        pickerBookSearchQuery = e.target.value;
        renderList();
      });
    }

    renderList();
    openModal('modal-book-picker');
  }

  function openChapterPicker(book) {
    const container = document.getElementById('modal-book-picker-list');
    if (!container) return;
    container.innerHTML = `
      <div style="margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;">
        <button id="btn-back-to-books" style="font-size:13px;color:var(--eb-accent);font-weight:700;background:none;border:none;cursor:pointer;">‹ Tous les livres</button>
        <strong style="font-size:16px;">${book.name}</strong>
      </div>
    `;

    document.getElementById('btn-back-to-books')?.addEventListener('click', openBookPicker);

    const grid = document.createElement('div');
    grid.className = 'eb-chapter-grid';

    for (let c = 1; c <= book.chapters; c++) {
      const btn = document.createElement('button');
      btn.className = 'eb-chapter-num' + (book.id === APP.currentBook && c === APP.currentChapter ? ' is-active' : '');
      btn.textContent = c;
      btn.addEventListener('click', () => {
        APP.currentBook = book.id;
        APP.currentChapter = c;
        closeModal('modal-book-picker');
        renderBibleReader();
      });
      grid.appendChild(btn);
    }

    container.appendChild(grid);
  }

  function openVersionPicker() {
    const container = document.getElementById('modal-version-list');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(APP.versions).forEach(([code, meta]) => {
      const row = document.createElement('div');
      row.className = 'eb-menu-row';
      row.innerHTML = `
        <span class="eb-version-tag">${code}</span>
        <span class="eb-menu-label">${meta.name}</span>
        ${code === APP.currentVersion ? '<span style="color:var(--eb-accent);font-weight:700;">✓</span>' : ''}
      `;
      row.addEventListener('click', () => {
        APP.currentVersion = code;
        closeModal('modal-version-picker');
        renderBibleReader();
        showToast(`Version changée : ${code}`);
      });
      container.appendChild(row);
    });

    openModal('modal-version-picker');
  }

  function openNoteModal(ref = '', defaultText = '') {
    const refInput = document.getElementById('note-modal-ref');
    const textInput = document.getElementById('note-modal-text');
    if (refInput) refInput.value = ref;
    if (textInput) textInput.value = defaultText;
    openModal('modal-new-note');
  }

  function saveNewNote() {
    const ref = document.getElementById('note-modal-ref')?.value.trim();
    const text = document.getElementById('note-modal-text')?.value.trim();
    if (!ref || !text) {
      showToast('Veuillez remplir la référence et la note.');
      return;
    }

    const today = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
    APP.notes.unshift({ id: Date.now(), ref, date: today, text });
    setStored('ebiblia_notes_v3', APP.notes);
    closeModal('modal-new-note');
    showToast('Note enregistrée avec succès');
    if (APP.currentView === 'notes') renderNotesView();
  }

  function openPrayerModal() {
    openModal('modal-new-prayer');
  }

  function saveNewPrayer() {
    const title = document.getElementById('prayer-modal-title')?.value.trim();
    const text = document.getElementById('prayer-modal-text')?.value.trim();
    if (!title || !text) {
      showToast('Veuillez donner un titre et le contenu de votre prière.');
      return;
    }

    APP.prayers.unshift({ id: Date.now(), title, text, answered: false, color: 'blue' });
    setStored('ebiblia_prayers_v3', APP.prayers);
    closeModal('modal-new-prayer');
    showToast('Prière ajoutée au journal');
    if (APP.currentView === 'prayers') renderPrayersView();
  }

  // -------------------------------------------------------------
  // INITIALISATION AU CHARGEMENT DU DOM
  // -------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Appliquer le thème : préférence explicite, sinon préférence du téléphone.
    if (!localStorage.getItem('ebiblia_theme') && window.matchMedia) APP.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(APP.theme);
    if (!localStorage.getItem('ebiblia_theme') && window.matchMedia) { const media=window.matchMedia('(prefers-color-scheme: dark)'); media.addEventListener?.('change', e => { if (!localStorage.getItem('ebiblia_theme')) applyTheme(e.matches ? 'dark' : 'light'); }); }

    // 2. Gestion des onglets principaux (5 onglets)
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showView(el.dataset.tab);
      });
    });

    // 3. Navigation directe vers sous-pages (Recherche, Notes, etc.)
    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showView(el.dataset.navigate);
      });
    });

    // 4. Boutons retour
    document.querySelectorAll('[data-back]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showView(el.dataset.back || 'home');
      });
    });

    // 4 bis. Partage : tous les boutons portant data-share utilisent
    // la feuille de partage native de l'appareil lorsqu'elle est disponible.
    document.addEventListener('click', (e) => {
      const shareButton = e.target.closest('[data-share]');
      if (!shareButton) return;
      e.preventDefault();
      e.stopPropagation();
      const title = shareButton.dataset.shareTitle || 'E-BIBLIA';
      const text = shareButton.dataset.shareText || '';
      if (text) shareContent(title, text);
    });

    // 5. Contrôles du lecteur biblique
    document.getElementById('reader-prev-btn')?.addEventListener('click', prevChapter);
    document.getElementById('reader-next-btn')?.addEventListener('click', nextChapter);
    document.getElementById('reader-pill-prev')?.addEventListener('click', prevChapter);
    document.getElementById('reader-pill-next')?.addEventListener('click', nextChapter);
    document.getElementById('reader-book-picker')?.addEventListener('click', openBookPicker);
    document.getElementById('reader-version-badge')?.addEventListener('click', openVersionPicker);
    document.getElementById('reader-tts-btn')?.addEventListener('click', toggleBibleTTS);

    // 6. Basculeur de thème
    document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);
    document.getElementById('setting-theme-row')?.addEventListener('click', toggleTheme);

    // 7. Méditation : ouverture et enregistrement du carnet biblique.
    document.getElementById('btn-new-meditation')?.addEventListener('click', openMeditationModal);
    document.getElementById('btn-save-meditation')?.addEventListener('click', saveNewMeditation);

    // 8. Filtres des plans
    document.querySelectorAll('#plans-filter-pills .eb-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#plans-filter-pills .eb-pill').forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        APP.plansFilter = pill.dataset.filter;
      });
    });

    // 9. Filtres de prière
    document.querySelectorAll('#prayer-filter-pills .eb-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#prayer-filter-pills .eb-pill').forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        APP.prayerFilter = pill.dataset.filter;
        renderPrayersView();
      });
    });

    // 10. Suggestions Léona IA
    document.querySelectorAll('.eb-leona-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.prompt || chip.textContent.trim();
        sendLeonaQuestion(text);
      });
    });

    document.getElementById('leona-send-btn')?.addEventListener('click', () => sendLeonaQuestion());
    document.getElementById('leona-input-text')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendLeonaQuestion();
    });

    // 11. Boutons de don
    document.querySelectorAll('.eb-amount-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.eb-amount-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        APP.activeDonationAmount = btn.textContent.trim();
      });
    });

    document.getElementById('btn-execute-donation')?.addEventListener('click', () => {
      showToast(`Merci pour votre soutien de ${APP.activeDonationAmount} à E-BIBLIA !`);
    });

    // 12. Sauvegardes de modales
    document.getElementById('btn-save-note-modal')?.addEventListener('click', saveNewNote);
    document.getElementById('btn-save-prayer-modal')?.addEventListener('click', saveNewPrayer);

    // 13. Fermeture des modales
    document.querySelectorAll('.eb-modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-open');
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.dataset.closeModal);
      });
    });

    // 14. Démarrage de l'application selon l'ancre URL ou par défaut Accueil
    const initialView = window.location.hash.replace('#', '') || 'home';
    showView(initialView);
    loadDailyVerse();
    refreshDailyContent(false);
    scheduleDailyContent();
    window.addEventListener('online', () => refreshDailyContent(false));
  });

  // Exportation globale pour compatibilité
  window.EBibliaApp = APP;
  window.EBiblia = {
    showView,
    toggleTheme,
    applyTheme,
    showToast
  };
})();
