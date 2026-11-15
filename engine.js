/* Motor del sitio. Lee window.SITE (config.js) y arma toda la página. No hace falta tocarlo. */
(function () {
  "use strict";
  var C = window.siteMerge(window.SITE_DEFAULTS, window.SITE || {});
  var T = C.theme, UI = C.ui, R = C.release, cats = C.cats || [];
  var $ = function (s) { return document.querySelector(s); };
  var state = { cat: 0, sel: {} };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function safeUrl(u) { u = String(u == null ? "" : u).trim(); return /^[\s\x00-\x1f]*(javascript|data|vbscript):/i.test(u) ? "#" : u; }
  function isHttp(u) { return /^https?:/i.test(String(u || "")); }
  function hexRgb(h) { h = String(h || "").replace("#", ""); if (h.length === 3) h = h.replace(/./g, "$&$&"); var n = parseInt(h, 16); return (h.length !== 6 || isNaN(n)) ? "0 0 0" : (n >> 16 & 255) + " " + (n >> 8 & 255) + " " + (n & 255); }

  /* Texto con formato mínimo: **negrita**, [texto](url), {ver}, {date}, saltos de línea */
  function inline(t) {
    var s = esc(t);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, a, u) {
      return '<a href="' + safeUrl(u) + '"' + (isHttp(u) ? ' target="_blank" rel="noopener"' : "") + ">" + a + "</a>";
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/\{ver\}/g, "<span data-ver>" + esc(R.fallbackVer) + "</span>");
    s = s.replace(/\{date\}/g, "<span data-reldate>" + esc(R.fallbackDate) + "</span>");
    return s.replace(/\n/g, "<br>");
  }

  /* ---------- Tema y metadatos ---------- */
  function applyTheme() {
    var r = document.documentElement.style, v = {
      "--bg-dark": T.bgDark, "--bg-mid": T.bgMid, "--bg-light": T.bgLight, "--tan": T.tan, "--cream": T.cream, "--dim": T.dim,
      "--boot-bg": T.bootBg, "--btn-top": T.btnTop, "--btn-bottom": T.btnBottom, "--btn-hot-top": T.btnHoverTop, "--btn-hot-bottom": T.btnHoverBottom,
      "--tan-rgb": hexRgb(T.tan), "--deep-rgb": hexRgb(T.deep), "--shade-rgb": hexRgb(T.shade),
      "--display": '"' + T.displayFont + '", Georgia, serif', "--body": '"' + T.bodyFont + '", Georgia, serif',
      "--base-size": (T.baseSize || 17) + "px"
    };
    for (var k in v) r.setProperty(k, v[k]);
    if (T.fontsUrl && !document.querySelector('link[href="' + T.fontsUrl.replace(/"/g, "") + '"]')) {
      var l = document.createElement("link"); l.rel = "stylesheet"; l.href = T.fontsUrl; document.head.appendChild(l);
    }
  }
  function applyMeta() {
    var m = C.meta;
    document.documentElement.lang = m.lang || "es";
    if (m.title) document.title = m.title;
  }

  /* ---------- Arte de las carátulas ---------- */
  var artN = 0;
  function rng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; var t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function art(a, b, motif, seed) {
    var r = rng(seed || 1), g = "", i, x, y, gold = "hsla(" + C.fx.artGold + ",", id = "g" + (++artN);
    function c(h, l) { return "hsla(" + h + ",52%," + l + "%,1)"; }
    if (motif === "lozenge") { for (y = 0; y < 9; y++) for (x = 0; x < 6; x++) { var cx = x * 40 + (y % 2 ? 20 : 0), cy = y * 36; g += '<polygon points="' + cx + "," + (cy - 16) + " " + (cx + 14) + "," + cy + " " + cx + "," + (cy + 16) + " " + (cx - 14) + "," + cy + '" fill="' + (r() < .5 ? gold + (.1 + r() * .2).toFixed(2) + ")" : "none") + '" stroke="' + gold + '.3)" stroke-width="1.5"/>'; } }
    else if (motif === "checker") { for (y = 0; y < 15; y++) for (x = 0; x < 10; x++) if ((x + y) % 2 === 0) g += '<rect x="' + x * 20 + '" y="' + y * 20 + '" width="20" height="20" fill="' + gold + (.07 + r() * .1).toFixed(2) + ')"/>'; }
    else if (motif === "stripes") { for (i = -4; i < 14; i++) g += '<rect x="' + (i * 20) + '" y="0" width="' + (6 + r() * 8).toFixed(0) + '" height="300" fill="' + gold + (.08 + r() * .16).toFixed(2) + ')" transform="skewX(-18)"/>'; }
    else if (motif !== "none") { for (i = 1; i <= 9; i++) g += '<circle cx="100" cy="120" r="' + i * 16 + '" fill="none" stroke="' + gold + (.1 + i * .035).toFixed(2) + ')" stroke-width="' + (1 + r() * 2).toFixed(1) + '"/>'; }
    var frame = '<rect x="8" y="8" width="184" height="284" fill="none" stroke="' + gold + '.45)" stroke-width="1.5"/><rect x="13" y="13" width="174" height="274" fill="none" stroke="' + gold + '.2)" stroke-width="1"/>';
    return '<svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c(a, 32) + '"/><stop offset="1" stop-color="' + c(b, 11) + '"/></linearGradient></defs><rect width="200" height="300" fill="url(#' + id + ')"/>' + g + frame + "</svg>";
  }

  /* ---------- Bloques de las páginas de texto ---------- */
  function newTab(l) { return !l.dl && !l.same && !/^(#|mailto:)/i.test(String(l.url || "#")); }
  function linkAttrs(l) {
    var u = l.url || "#";
    return 'href="' + esc(safeUrl(u)) + '"' + (l.dl ? ' data-dl="' + esc(l.dl) + '"' : "") + (newTab(l) ? ' target="_blank" rel="noopener"' : "");
  }
  var BLOCKS = {
    hero: function (b) { return '<div class="hero">' + (b.icon ? '<img class="hero-icon" src="' + esc(b.icon) + '" alt="">' : "") + "<div><h1>" + esc(b.title) + "</h1>" + (b.subtitle ? '<div class="by">' + esc(b.subtitle) + "</div>" : "") + "</div></div>"; },
    h1: function (b) { return "<h1>" + esc(b.text) + "</h1>"; },
    h2: function (b) { return "<h2>" + esc(b.text) + "</h2>"; },
    p: function (b) { return '<p class="' + (b.style === "note" ? "note" : b.style === "ver" ? "ver" : "") + '">' + inline(b.text) + "</p>"; },
    buttons: function (b) { return '<div class="btns">' + (b.items || []).map(function (l) { return "<a class=\"btn" + (l.small ? "" : " big") + '" ' + linkAttrs(l) + ">" + esc(l.label) + "</a>"; }).join("") + "</div>"; },
    features: function (b) { return '<div class="features">' + (b.columns || []).map(function (c) { return "<div><h3>" + esc(c.title) + "</h3><ul>" + (c.items || []).map(function (i) { return "<li>" + inline(i) + "</li>"; }).join("") + "</ul></div>"; }).join("") + "</div>"; },
    faq: function (b) { return '<div class="faq">' + (b.items || []).map(function (i) { return "<details><summary>" + esc(i.q) + "</summary><p>" + inline(i.a) + "</p></details>"; }).join("") + "</div>"; },
    log: function (b) { return '<div class="log">' + (b.entries || []).map(function (e) { return '<article class="entry"><div class="when">' + esc(e.when) + "</div><div><h3>" + esc(e.title) + "</h3><p>" + inline(e.text) + "</p></div></article>"; }).join("") + "</div>"; },
    news: function (b) {
      var items = (C.news || []).filter(function (n) { return !b.only || n[b.only]; });
      if (b.limit) items = items.slice(0, +b.limit);
      return BLOCKS.log({ entries: items });
    },
    rows: function (b) {
      return '<div class="rows">' + (b.rows || []).map(function (r) {
        var k = '<span class="k">' + esc(r.label) + "</span>", ext = isHttp(r.url) ? ' target="_blank" rel="noopener"' : "";
        if (r.whole && r.url) return '<a class="row" href="' + esc(safeUrl(r.url)) + '"' + ext + ">" + k + '<span class="v">' + esc(r.value) + '</span><span class="go">↗</span></a>';
        var v = r.url ? '<a class="v" href="' + esc(safeUrl(r.url)) + '"' + ext + ">" + esc(r.value) + "</a>" : '<span class="v">' + esc(r.value) + "</span>";
        return '<div class="row">' + k + v + (r.copy ? '<button class="copy" type="button" data-copy="' + esc(r.copy) + '">' + esc(UI.copy) + "</button>" : "") + "</div>";
      }).join("") + "</div>";
    },
    defs: function (b) { return '<dl class="now">' + (b.items || []).map(function (i) { return "<dt>" + esc(i.term) + "</dt><dd>" + inline(i.text) + "</dd>"; }).join("") + "</dl>"; },
    html: function (b) { return b.html || ""; }
  };
  function renderPage(c) {
    return '<div class="doc' + (c.wide ? " wide" : "") + '">' + (c.blocks || []).map(function (b) { var f = BLOCKS[b.type]; return f ? f(b) : ""; }).join("") + "</div>";
  }

  /* ---------- Estructura ---------- */
  applyTheme(); applyMeta();
  var pills = $("#pills"), spot = $("#spot"), stage = $("#stage");
  $(".brand").textContent = C.brand;
  $("#boot-name").textContent = C.brand;
  $("#prev").textContent = UI.keyPrev; $("#prev").setAttribute("aria-label", UI.prevLabel);
  $("#next").textContent = UI.keyNext; $("#next").setAttribute("aria-label", UI.nextLabel);
  pills.setAttribute("aria-label", UI.tabsLabel);
  $("#totop").textContent = UI.toTop;
  $(".toggles").setAttribute("aria-label", UI.soundGroup);
  $("#tog-music .lbl").textContent = UI.music; $("#tog-music").title = UI.musicTitle; $("#tog-music").setAttribute("aria-label", UI.musicTitle);
  $("#tog-sfx .lbl").textContent = UI.sfx; $("#tog-sfx").title = UI.sfxTitle; $("#tog-sfx").setAttribute("aria-label", UI.sfxTitle);
  var rootTitle = document.title;
  function renderFooter() {
    var links = curSec ? [{ label: curSec.backLabel || ("← " + C.brand), url: "#" }] : (C.footer || []);
    $(".bar-left").innerHTML = links.map(function (f) {
      return f.url ? '<a class="url" href="' + esc(safeUrl(f.url)) + '"' + (isHttp(f.url) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(f.label) + "</a>" : '<span class="url">' + esc(f.label) + "</span>";
    }).join(" ");
  }
  if (!(C.audio.music || C.audio.click) || !C.audio.toggles) $(".toggles").hidden = true;
  else { $("#tog-music").hidden = !C.audio.music; $("#tog-sfx").hidden = !C.audio.click; }

  /* ---------- Sonido y música ---------- */
  var prefs = { music: lsGet("deck-music") !== "0", sfx: lsGet("deck-sfx") !== "0" };
  var music = null, click = null, gesture = false, lastClick = 0;
  if (C.audio.music) { music = new Audio(C.audio.music); music.loop = true; music.volume = C.audio.musicVolume; music.preload = "none"; }
  if (C.audio.click) { click = new Audio(C.audio.click); click.preload = "auto"; }
  function playMusic() { if (music && prefs.music && gesture && music.paused) { var p = music.play(); if (p && p.catch) p.catch(function () {}); } }
  function sfx() {
    if (!prefs.sfx || !click) return;
    var n = Date.now(); if (n - lastClick < 50) return; lastClick = n;
    var a = click.cloneNode(); a.volume = C.audio.clickVolume; var p = a.play(); if (p && p.catch) p.catch(function () {});
  }
  function syncToggles() {
    $("#tog-music").setAttribute("aria-pressed", prefs.music ? "true" : "false");
    $("#tog-sfx").setAttribute("aria-pressed", prefs.sfx ? "true" : "false");
  }
  ["pointerdown", "keydown", "touchend"].forEach(function (ev) { addEventListener(ev, function () { gesture = true; playMusic(); }, { passive: true }); });
  $("#tog-music").addEventListener("click", function () {
    prefs.music = !prefs.music; lsSet("deck-music", prefs.music ? "1" : "0"); syncToggles(); gesture = true;
    if (!music) return;
    if (prefs.music) playMusic(); else music.pause();
    sfx();
  });
  $("#tog-sfx").addEventListener("click", function () { prefs.sfx = !prefs.sfx; lsSet("deck-sfx", prefs.sfx ? "1" : "0"); syncToggles(); sfx(); });
  document.addEventListener("visibilitychange", function () { if (!music) return; if (document.hidden) music.pause(); else playMusic(); });
  syncToggles();

  /* ---------- Categorías, secciones y paneles ---------- */
  function isGrid(c) { return c.type === "grid"; }
  function isSec(c) { return c.type === "section"; }
  var curSec = null;   // sección abierta (null = menú principal)
  function curList() { return curSec ? (curSec.cats || []) : cats; }
  function allCats(arr, out) { out = out || []; (arr || []).forEach(function (c) { out.push(c); if (isSec(c)) allCats(c.cats, out); }); return out; }
  allCats(cats).forEach(function (c) {
    if (isSec(c)) return;
    var sec = document.createElement("section");
    sec.setAttribute("role", "tabpanel"); sec.hidden = true;
    if (isGrid(c)) { sec.innerHTML = '<div class="games' + (c.wide ? " wide" : "") + '"></div>'; c._games = sec.firstChild; c._sel = 0; }
    else sec.innerHTML = renderPage(c);
    stage.appendChild(sec); c._panel = sec;
  });
  function renderPills() {
    pills.replaceChildren();
    curList().forEach(function (c) {
      var b = document.createElement("button");
      b.className = "pill"; b.type = "button"; b.setAttribute("role", "tab");
      b.innerHTML = '<span class="label">' + esc(c.label) + "</span>" + (isGrid(c) ? '<span class="count">' + (c.items || []).length + "</span>" : "");
      b.addEventListener("click", function () { show(curSec, curList().indexOf(c)); sfx(); });
      pills.appendChild(b); c._tab = b;
    });
  }

  function mk(it) { return (it.kind || "") + (it.year ? (it.kind ? " · " : "") + it.year : ""); }
  function build(cat) {
    (cat.items || []).forEach(function (it, i) {
      var A = it.art || {}, links = it.links || [], el = document.createElement(links.length ? "a" : "div");
      el.className = "box" + (cat.wide ? " wide" : ""); el.tabIndex = 0;
      if (links.length) { el.href = safeUrl(links[0].url); if (newTab(links[0])) { el.target = "_blank"; el.rel = "noopener"; } }
      el.setAttribute("aria-label", it.name || "");
      el.innerHTML = '<div class="thumb"><div class="art">' + art(A.a == null ? 28 : A.a, A.b == null ? 20 : A.b, A.motif, A.seed) + '</div><div class="glyph">' + esc(it.glyph) + '</div></div>' +
        '<div class="txt"><div class="title">' + esc(it.name) + '</div><div class="mob"><span class="mk"></span><span class="md">' + esc(it.desc) + "</span></div></div>";
      var thumb = el.querySelector(".thumb"), glyph = el.querySelector(".glyph");
      it._el = el;
      it._fill = function () { el.querySelector(".mk").textContent = mk(it); };
      it._fill();
      if (it.icon) {
        var im = new Image(); im.className = "icon" + (it.iconRound ? " round" : ""); im.alt = "";
        im.onload = function () { glyph.hidden = true; thumb.insertBefore(im, glyph); };
        im.src = it.icon;
      }
      if (it.img) {
        var sh = new Image(); sh.className = "shot"; sh.alt = "";
        sh.onerror = function () { if (it.imgFallback && sh.src.indexOf(it.imgFallback) < 0) sh.src = it.imgFallback; };
        sh.onload = function () { el.classList.add("has-shot"); if (!it.keepGlyph) glyph.hidden = true; if (!sh.parentNode) thumb.insertBefore(sh, glyph); };
        sh.src = it.img;
      }
      el.addEventListener("mouseenter", function () { select(cat, i, false); });
      el.addEventListener("focus", function () { if (cat._sel !== i) select(cat, i, false); });
      el.addEventListener("click", sfx);
      cat._games.appendChild(el);
    });
  }
  allCats(cats).forEach(function (c) { if (isGrid(c)) build(c); });

  function cur() { return curList()[state.cat]; }
  function boxes() { var c = cur(); return c && isGrid(c) ? Array.prototype.slice.call(c._games.children) : []; }

  function updateSpot() {
    var c = cur();
    if (!c || !isGrid(c) || !(c.items || []).length) { spot.hidden = true; return; }
    spot.hidden = false;
    var it = c.items[c._sel] || c.items[0];
    $("#spot-title").textContent = it.name || "";
    $("#spot-meta").textContent = mk(it);
    $("#spot-desc").textContent = it.desc || "";
    $("#spot-chips").innerHTML = (it.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("");
    $("#spot-actions").innerHTML = (it.links || []).map(function (l) { return '<a class="btn" ' + linkAttrs(l) + ">" + esc(l.label) + "</a>"; }).join("");
  }

  function select(cat, i, scroll) {
    if (cur() !== cat) return;
    var list = boxes(); if (!list.length) return;
    i = Math.max(0, Math.min(list.length - 1, i));
    list.forEach(function (b, k) { b.classList.toggle("selected", k === i); });
    cat._sel = i;
    if (scroll) { list[i].focus({ preventScroll: true }); list[i].scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    updateSpot();
  }

  /* Muestra la categoría i de la sección sec (null = menú principal) */
  function show(sec, i) {
    if (sec !== curSec || !pills.children.length) {
      curSec = sec; renderPills();
      $(".brand").textContent = sec ? (sec.brand || sec.label) : C.brand;
      document.title = sec && sec.title ? sec.title : rootTitle;
      renderFooter();
    }
    var l = curList(); if (!l.length) return;
    i = (i + l.length) % l.length;
    if (isSec(l[i])) return show(l[i], 0);
    state.cat = i;
    allCats(cats).forEach(function (c) { if (c._panel) c._panel.hidden = true; });
    l.forEach(function (c, k) { c._tab.setAttribute("aria-selected", k === i ? "true" : "false"); });
    var c = l[i]; c._panel.hidden = false;
    stage.scrollTop = 0; window.scrollTo(0, 0);
    if (isGrid(c)) select(c, c._sel || 0, false); else updateSpot();
    if (c._tab.scrollIntoView) c._tab.scrollIntoView({ block: "nearest", inline: "center" });
    try { history.replaceState(null, "", "#" + (sec ? sec.id + "/" : "") + c.id); } catch (e) {}
  }
  /* Paso con Q/E: en el menú principal se saltean las secciones */
  function step(d) {
    var l = curList(), i = state.cat, n = l.length;
    for (var k = 0; k < n; k++) { i = (i + d + n) % n; if (!isSec(l[i])) break; }
    show(curSec, i);
  }

  function colsOf(list) { if (!list.length) return 1; var top = list[0].offsetTop, n = 0; for (var k = 0; k < list.length; k++) { if (list[k].offsetTop === top) n++; else break; } return n || 1; }

  var kPrev = String(UI.keyPrev).toLowerCase(), kNext = String(UI.keyNext).toLowerCase();
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key, tag = e.target && e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SUMMARY") return;
    if (k.toLowerCase() === kPrev) { step(-1); sfx(); return; }
    if (k.toLowerCase() === kNext) { step(1); sfx(); return; }
    if (k === "Escape") { show(curSec, 0); var f0 = cur(); if (f0 && isGrid(f0)) select(f0, 0, true); sfx(); return; }
    var cat = cur(), list = boxes(); if (!list.length) return;
    var cur_ = cat._sel, n = colsOf(list), next = null;
    if (k === "ArrowRight") next = cur_ + 1;
    else if (k === "ArrowLeft") next = cur_ - 1;
    else if (k === "ArrowDown") next = (cur_ + n < list.length) ? cur_ + n : (Math.floor(cur_ / n) < Math.floor((list.length - 1) / n) ? list.length - 1 : cur_);
    else if (k === "ArrowUp") next = cur_ - n;
    else if (k === "Home") next = 0;
    else if (k === "End") next = list.length - 1;
    else if (k === "Enter" && (tag === "BODY" || (e.target.classList && e.target.classList.contains("box")))) { e.preventDefault(); list[cur_].click(); return; }
    if (next != null) { e.preventDefault(); if (next >= 0 && next < list.length && next !== cur_) { select(cat, next, true); sfx(); } }
  });

  $("#totop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); sfx(); });
  $("#prev").addEventListener("click", function () { step(-1); sfx(); });
  $("#next").addEventListener("click", function () { step(1); sfx(); });

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".copy"); if (!btn || btn.dataset.copy == null) return;
    function done(ok) { btn.textContent = ok ? UI.copied : UI.selectIt; setTimeout(function () { btn.textContent = UI.copy; }, 1600); }
    function sel() { var v = btn.parentNode.querySelector(".v"), r = document.createRange(); r.selectNodeContents(v); var s = getSelection(); s.removeAllRanges(); s.addRange(r); done(false); }
    try { navigator.clipboard.writeText(btn.dataset.copy).then(function () { done(true); }, sel); } catch (err) { sel(); }
  });

  /* ---------- Última versión (GitHub Releases) ---------- */
  function applyRelease(j) {
    var tag = j.tag_name || "";
    var date = j.published_at ? new Date(j.published_at).toLocaleDateString(R.locale || "es-AR", { day: "numeric", month: "long", year: "numeric" }) : "";
    Array.prototype.forEach.call(document.querySelectorAll("[data-ver]"), function (el) { if (tag) el.textContent = tag; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-reldate]"), function (el) { if (date) el.textContent = date; });
    var found = {};
    Object.keys(R.assets || {}).forEach(function (key) {
      var re; try { re = new RegExp(R.assets[key], "i"); } catch (e) { return; }
      (j.assets || []).some(function (a) { if (re.test(a.name)) { found[key] = a.browser_download_url; return true; } });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-dl]"), function (el) { var u = found[el.getAttribute("data-dl")]; if (u) el.href = u; });
    allCats(cats).forEach(function (c) {
      (c.items || []).forEach(function (it) {
        if (it.live && tag) it.year = (R.liveLabel || "{ver}").replace("{ver}", tag);
        (it.links || []).forEach(function (l) { if (l.dl && found[l.dl]) l.url = found[l.dl]; });
        if (it._el && it.links && it.links.length && it._el.tagName === "A") it._el.href = safeUrl(it.links[0].url);
        if (it._fill) it._fill();
      });
    });
    updateSpot();
  }
  function loadRelease() {
    if (!R.enabled || !R.repo) return;
    var key = "site-release-" + R.repo, cached = lsGet(key);
    try { if (cached) { var o = JSON.parse(cached); if (o && Date.now() - o.t < (R.cacheMinutes || 60) * 60000) { applyRelease(o.d); return; } } } catch (e) {}
    if (!window.fetch) return;
    fetch("https://api.github.com/repos/" + R.repo + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) { lsSet(key, JSON.stringify({ t: Date.now(), d: { tag_name: j.tag_name, published_at: j.published_at, assets: (j.assets || []).map(function (a) { return { name: a.name, browser_download_url: a.browser_download_url }; }) } })); applyRelease(j); })
      .catch(function () {});
  }

  /* ---------- Arranque ---------- */
  function fromHash() {
    var h = (location.hash || "").slice(1); if (C.aliases && C.aliases[h]) h = C.aliases[h];
    var p = h.split("/");
    for (var k = 0; k < cats.length; k++) if (cats[k].id === p[0]) {
      if (!isSec(cats[k])) return { sec: null, i: k };
      var sub = cats[k].cats || [], j = 0; for (var m = 0; m < sub.length; m++) if (sub[m].id === p[1]) j = m;
      return { sec: cats[k], i: j };
    }
    return null;
  }
  var r0 = fromHash(); show(r0 ? r0.sec : null, r0 ? r0.i : 0);
  window.addEventListener("hashchange", function () {
    var r = fromHash();
    if (r) { if (r.sec !== curSec || cur() !== curList()[r.i]) show(r.sec, r.i); }
    else if (curSec) show(null, 0);
  });
  loadRelease();
  var boot = $("#boot");
  if (boot) {
    if (!C.fx.boot.enabled) boot.remove();
    else { var ms = Math.max(0, +C.fx.boot.ms || 0); boot.style.animationDelay = (ms / 1000) + "s"; setTimeout(function () { boot.remove(); }, ms + 500); }
  }

  /* ---------- Brasas de fondo ---------- */
  var cv = $("#dust"), ctx = cv.getContext("2d"), W, H, parts = [], raf;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(max-width: 700px)").matches;
  if (!C.fx.dust.enabled) { cv.remove(); return; }
  function size() { var dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function seedP() { parts = []; var n = Math.round(Math.min(C.fx.dust.max, W * H / 20000)); for (var i = 0; i < n; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 1.6, v: .1 + Math.random() * .25, a: .12 + Math.random() * .4, p: Math.random() * 6 }); }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i]; if (!reduce) { p.y -= p.v; p.x += Math.sin(t / 2500 + p.p) * .15; if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; } }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fillStyle = "rgba(" + C.fx.dust.color + "," + p.a + ")"; ctx.fill();
    }
    if (!reduce) raf = requestAnimationFrame(draw);
  }
  size(); seedP(); draw(0);
  addEventListener("resize", function () { size(); seedP(); if (reduce) draw(0); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) raf = requestAnimationFrame(draw); });
})();
