/* Valores por defecto de la configuración. Lo que no esté en config.js se toma de acá. */
(function (root) {
  var DEFAULTS = {
    meta: { lang: "es", title: "", description: "", url: "", image: "", icon: "icon.png", ogTitle: "", twitterCard: "summary" },
    brand: "",
    theme: {
      bgDark: "#2a1a0d", bgMid: "#4a2f17", bgLight: "#6b4521",
      tan: "#c4955f", cream: "#f1e2c4", dim: "#d3bd98",
      deep: "#140a03", shade: "#1e1208", bootBg: "#1d1109",
      btnTop: "#8a5a2b", btnBottom: "#5e3a1a", btnHoverTop: "#a06b35", btnHoverBottom: "#6e4521",
      fontsUrl: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=MedievalSharp&display=swap",
      displayFont: "Cinzel", bodyFont: "MedievalSharp", baseSize: 17
    },
    fx: {
      boot: { enabled: true, ms: 1000 },
      dust: { enabled: true, max: 60, color: "245,196,120" },
      artGold: "36,58%,64%"
    },
    audio: { music: "", click: "", musicVolume: 0.28, clickVolume: 0.5, toggles: true },
    footer: [],
    release: {
      enabled: false, repo: "", cacheMinutes: 60, locale: "es-AR",
      liveLabel: "Última versión {ver}", fallbackVer: "", fallbackDate: "", assets: {}
    },
    ui: {
      prevLabel: "Categoría anterior", nextLabel: "Categoría siguiente", tabsLabel: "Categorías",
      soundGroup: "Sonido", music: "Música", musicTitle: "Música de fondo", sfx: "Sonido", sfxTitle: "Sonido de click",
      copy: "Copiar", copied: "Copiado", selectIt: "Seleccionalo", toTop: "↑ Categorías", keyPrev: "Q", keyNext: "E"
    },
    aliases: {},
    news: [],
    cats: []
  };

  function isObj(o) { return o && typeof o === "object" && !Array.isArray(o); }
  function merge(a, b) {
    var r = {}, k;
    for (k in a) r[k] = isObj(a[k]) ? merge(a[k], {}) : a[k];
    for (k in b) r[k] = (isObj(b[k]) && isObj(r[k])) ? merge(r[k], b[k]) : b[k];
    return r;
  }

  root.SITE_DEFAULTS = DEFAULTS;
  root.siteMerge = merge;
  if (typeof module !== "undefined" && module.exports) module.exports = { DEFAULTS: DEFAULTS, merge: merge };
})(typeof window !== "undefined" ? window : globalThis);
