(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Scroll work is batched into one frame.
  const onScroll = [];
  let ticking = false;
  const frame = () => { ticking = false; onScroll.forEach(f => f()); };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener("resize", frame);
  if (!reduce && window.Lenis) {
    const lenis = new Lenis({ lerp: .11, wheelMultiplier: 1, anchors: true, autoRaf: true });
    window.__lenis = lenis;
  }
  const ready = () => requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("ready")));
  if (reduce || !document.fonts) ready(); else Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(ready);

  /* ---------- a bar that steps aside on the way down and returns on the way up ---------- */
  const bar = $(".bar");
  if (bar) {
    const dock = document.createElement("div"); dock.className = "dock"; dock.setAttribute("aria-hidden", "true");
    const copy = bar.cloneNode(true); copy.classList.remove("over"); copy.querySelectorAll("a").forEach(a => a.tabIndex = -1);
    dock.append(copy); document.body.append(dock);
    let lastY = scrollY;
    onScroll.push(() => {
      const y = scrollY, up = y < lastY - 2, down = y > lastY + 2;
      if (y < innerHeight * .8 || down) dock.classList.remove("show");
      else if (up) dock.classList.add("show");
      lastY = y;
    });
    // mark the section you are in
    const links = [...bar.querySelectorAll('a[href^="#"]'), ...copy.querySelectorAll('a[href^="#"]')];
    const secs = [...new Set(links.map(a => a.getAttribute("href")))].map(h => document.querySelector(h)).filter(Boolean);
    if (secs.length) {
      const sio = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id));
      }), { rootMargin: "-45% 0px -50% 0px" });
      secs.forEach(s => sio.observe(s));
    }
  }


  // Videos only play while on screen (and never under reduced motion).
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && !reduce) { if (v.preload === "none") v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
  }), { threshold: .25 });
  $$("video[data-inview]").forEach(v => vio.observe(v));

  /* ---------- hero · the title resolves from 1-bit noise, and a lens shows the raw signal again ---------- */
  const hx = $(".hx");
  if (hx) {
    const head = $(".hx-head", hx), h1 = $(".hx-t", hx), cv = $(".hx-c", hx), ctx = cv.getContext("2d");
    const CELL = 3;                                     // one dither dot = 3 css px
    const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5) / 16); // 4x4 Bayer
    let W = 0, H = 0, alpha = null, img = null, ink = [38, 37, 30];

    // Draw the real title, line by line, into a small offscreen bitmap: one pixel per dither cell.
    const sample = () => {
      const r = head.getBoundingClientRect();
      W = Math.ceil(r.width / CELL); H = Math.ceil(r.height / CELL);
      cv.width = W; cv.height = H; cv.style.width = W * CELL + "px"; cv.style.height = H * CELL + "px";
      const off = document.createElement("canvas"); off.width = W; off.height = H;
      const o = off.getContext("2d"), cs = getComputedStyle(h1);
      o.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) / CELL}px ${cs.fontFamily}`;
      o.textBaseline = "alphabetic";
      // place every glyph where the browser laid it out, so tracking and kerning match the real title
      const range = document.createRange();
      $$(".hx-l", h1).forEach(l => {
        const node = l.firstChild, text = node.textContent;
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") continue;
          range.setStart(node, i); range.setEnd(node, i + 1);
          const cr = range.getBoundingClientRect(), m = o.measureText(text[i]);
          const asc = m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) / CELL * .8, desc = m.fontBoundingBoxDescent ?? 0;
          o.fillText(text[i], (cr.left - r.left) / CELL, (cr.top - r.top) / CELL + (cr.height / CELL - (asc + desc)) / 2 + asc);
        }
      });
      const d = o.getImageData(0, 0, W, H).data;
      alpha = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) alpha[i] = d[i * 4 + 3] / 255;
      img = ctx.createImageData(W, H);
      const c = cs.color.match(/\d+/g); if (c) ink = c.slice(0, 3).map(Number);
    };

    // noise(x, y) in 0..1 says how far a cell is from the clean signal
    const render = noise => {
      const px = img.data; let k = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++, k += 4) {
        const n = noise(x, y), i = y * W + x;
        if (n < 0) { px[k + 3] = 0; continue; }
        const v = alpha[i] * (1 - n * .55) + (Math.random() - .5) * n * 1.25;
        const on = v > B[(x & 3) + ((y & 3) << 2)];
        px[k] = ink[0]; px[k + 1] = ink[1]; px[k + 2] = ink[2]; px[k + 3] = on ? 255 : 0;
      }
      ctx.putImageData(img, 0, 0);
    };

    // 1 · on load: from noise to type in about 1.6 s, like a model settling on an answer
    const resolve = () => {
      sample(); hx.classList.add("dither");
      const t0 = performance.now(), dur = 1700;
      const step = now => {
        const k = clamp((now - t0) / dur), n = Math.pow(1 - k, 2.2);
        render(() => n);
        if (k < 1) requestAnimationFrame(step);
        else setTimeout(() => { hx.classList.remove("dither"); lensReady = true; }, 120);
      };
      requestAnimationFrame(step);
    };
    let lensReady = false;
    if (root.classList.contains("ready")) resolve();
    else new MutationObserver((_, o) => { if (root.classList.contains("ready")) { o.disconnect(); resolve(); } }).observe(root, { attributes: true, attributeFilter: ["class"] });

    // 2 · on desktop: a lens over the title shows it as raw, noisy signal
    if (fine) {
      const R = 84 / CELL; let mx = -1e4, my = -1e4, live = 0, raf = 0, inside = false;
      const lens = () => {
        raf = 0;
        if (!lensReady) return;
        const t = performance.now() / 1000;
        const grow = clamp(live);
        render((x, y) => {
          const d = Math.hypot(x - mx, y - my) / (R * grow + .001);
          return d > 1 ? -1 : .25 + .45 * (1 - d) + .08 * Math.sin(t * 6 + x * .3);
        });
        const r = R * grow * CELL;
        h1.style.maskImage = h1.style.webkitMaskImage = `radial-gradient(circle ${r}px at ${mx * CELL}px ${my * CELL}px, transparent 98%, #000 100%)`; // taste-skill-ignore: a mask, not a visible gradient
        live += inside ? .12 : -.12;
        if (live > 0) raf = requestAnimationFrame(lens);
        else { live = 0; cv.classList.remove("live"); h1.style.maskImage = h1.style.webkitMaskImage = ""; }
      };
      head.addEventListener("pointermove", e => {
        const r = head.getBoundingClientRect();
        mx = (e.clientX - r.left) / CELL; my = (e.clientY - r.top) / CELL;
        if (!inside) { inside = true; live = Math.max(live, .01); cv.classList.add("live"); }
        if (!raf) raf = requestAnimationFrame(lens);
      });
      head.addEventListener("pointerleave", () => { inside = false; if (!raf) raf = requestAnimationFrame(lens); });
      addEventListener("resize", () => { if (lensReady) sample(); });
    }
  }

  /* ---------- receipts and counting numbers ---------- */
  $$(".fx .num, .fx .how-m").forEach(b => b.addEventListener("click", () => {
    const fx = b.closest(".fx"), open = fx.classList.toggle("open");
    $$(".num, .how-m", fx).forEach(x => x.setAttribute("aria-expanded", open));
  }));
  {
    const cio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; cio.unobserve(e.target);
      const el = e.target, txt = el.dataset.count, m = txt.match(/^([^\d]*)([\d.,]+)(.*)$/);
      if (!m) return;
      const end = parseFloat(m[2].replace(",", "")), dec = (m[2].split(".")[1] || "").length, t0 = performance.now(), dur = 1400;
      const tick = t => {
        const k = ease(clamp((t - t0) / dur));
        el.textContent = m[1] + (end * k).toFixed(dec) + m[3];
        if (k < 1) requestAnimationFrame(tick); else el.textContent = txt;
      };
      requestAnimationFrame(tick);
    }), { threshold: .6 });
    $$("[data-count]").forEach(el => cio.observe(el));
  }

  /* ---------- the flow diagram draws itself ---------- */
  $$("[data-flow]").forEach(fl => {
    $$(".node", fl).forEach((n, i) => { n.style.setProperty("--nd", i * 140 + "ms"); n.style.setProperty("--cd", i * 140 + 300 + "ms"); });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fl.classList.add("in"); io.disconnect(); } }), { threshold: .35 });
    io.observe(fl);
  });

  /* ---------- section entrances ---------- */
  if ("IntersectionObserver" in window) {
    const sel = ".how-head .lede, .projects > .sub, .gidx, .fx > :not(.pic), .gh p, .gh h3, .rows li, .posts li, .connect .lede, .connect .actions, .connect li, .colophon, .ph-text > :not(h1), .facts .fact, .prose > *, .figs figcaption, .bm-head .lede, .next-text > *";
    const els = $$(sel).filter(el => !el.closest(".hero"));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    let last = null, n = 0;
    els.forEach(el => { n = el.parentElement === last ? n + 1 : 0; last = el.parentElement; el.style.setProperty("--d", Math.min(n, 8) * 70 + "ms"); el.setAttribute("data-reveal", ""); });
    $$(".h2, .bm h1, .nf h1").forEach(h => { h.innerHTML = `<span class="mask"><span>${h.innerHTML}</span></span>`; els.push(h); });
    $$(".fx .pic, .ph-media, .figs figure, .next-img").forEach((el, i) => { el.setAttribute("data-clip", ""); els.push(el); });
    requestAnimationFrame(() => requestAnimationFrame(() => els.forEach(el => io.observe(el))));


    // The closing name is cut into stripes that slide into register as the page ends (after Space Type Generator).
    const crop = $(".crop");
    if (crop && !reduce) {
      const N = 7, word = crop.textContent.trim();
      crop.classList.add("striped");
      const bands = Array.from({ length: N }, (_, i) => {
        const s = document.createElement("span"); s.className = "st"; s.textContent = word;
        s.style.setProperty("--a", (i / N * 100) + "%"); s.style.setProperty("--b", Math.max(0, 100 - (i + 1) / N * 100 - .8) + "%"); // a hair of overlap hides the seams
        crop.append(s); return s;
      });
      onScroll.push(() => {
        const left = document.documentElement.scrollHeight - innerHeight - scrollY, k = clamp(left / (innerHeight * .7));
        bands.forEach((b, i) => b.style.setProperty("--x", ((i % 2 ? 1 : -1) * (1 + i * .35) * k * 9).toFixed(2) + "vw"));
      });
    }
  }

  /* ---------- project rows show a preview that follows the pointer ---------- */
  if (fine) {
    const peek = document.createElement("div"); peek.className = "peek"; peek.innerHTML = "<img class='pd' alt=''><img class='pc' alt=''>";
    document.body.append(peek);
    const dz = $(".pd", peek), img = $(".pc", peek);
    img.onload = () => img.classList.add("ready");
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => { x += (tx - x) * .18; y += (ty - y) * .18; peek.style.setProperty("--x", x + "px"); peek.style.setProperty("--y", y + "px"); raf = Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0; };
    $$(".rows li[data-thumb]").forEach(li => {
      li.addEventListener("mouseenter", e => { if (li.dataset.ratio) peek.style.setProperty("--ar", li.dataset.ratio); img.classList.remove("ready"); dz.src = li.dataset.dither || ""; img.src = li.dataset.thumb; if (img.complete) img.classList.add("ready"); peek.classList.add("on"); x = tx = e.clientX + 24; y = ty = e.clientY - 90; });
      li.addEventListener("mousemove", e => { tx = e.clientX + 24; ty = e.clientY - 90; if (!raf) raf = requestAnimationFrame(loop); });
      li.addEventListener("mouseleave", () => peek.classList.remove("on"));
    });
  }

  onScroll.forEach(f => f());

  /* ---------- new repos appear by themselves ---------- */
  const rows = $("#new-rows");
  if (!rows) return;
  const known = new Set($$("[data-repo]").map(li => li.dataset.repo.toLowerCase()));
  (async () => {
    let repos;
    try {
      const c = JSON.parse(sessionStorage.getItem("gh-repos") || "null");
      if (c && Date.now() - c.t < 36e5) repos = c.d;
      else {
        const r = await fetch("https://api.github.com/users/Gjusev/repos?sort=pushed&per_page=100");
        if (!r.ok) return;
        repos = (await r.json()).map(r => ({ n: r.name, d: r.description, u: r.html_url, f: r.fork, a: r.archived, p: r.pushed_at, l: r.language }));
        sessionStorage.setItem("gh-repos", JSON.stringify({ t: Date.now(), d: repos }));
      }
    } catch { return; }
    const fresh = repos.filter(r => !r.f && !r.a && !known.has(r.n.toLowerCase()) && !/^gjusev(\.github\.io)?$/i.test(r.n));
    if (!fresh.length) return;
    rows.innerHTML = fresh.map(r => `<li><a class="name" href="${esc(r.u)}">${esc(r.n)} <span aria-hidden="true">↗</span></a><span class="desc">${esc(r.d || "")}</span><span class="meta">${r.l ? `<b>${esc(r.l)}</b>` : ""}<span class="new-date">${esc(r.p.slice(0, 10))}</span></span></li>`).join("");
    rows.closest(".group").hidden = false;
  })();
})();
