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
  const progress = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)); };
  const wide = () => innerWidth > 1000;

  // Videos only play while on screen (and never under reduced motion).
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && !reduce) { if (v.preload === "none") v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
  }), { threshold: .25 });
  $$("video[data-inview]").forEach(v => vio.observe(v));

  /* ---------- hero picker (temporary, while choosing) ---------- */
  const picker = $(".picker");
  if (picker && (new URLSearchParams(location.search).has("hero") || localStorage.getItem("hero"))) {
    picker.hidden = false;
    const mark = () => $$("button", picker).forEach(b => b.classList.toggle("on", b.dataset.pick === root.dataset.hero));
    $$("button", picker).forEach(b => b.onclick = () => { root.dataset.hero = b.dataset.pick; localStorage.setItem("hero", b.dataset.pick); mark(); scrollTo(0, 0); frame(); });
    mark();
  }

  /* ---------- hero 1 · window that opens to the edges ---------- */
  const hw = $(".hw");
  if (hw) {
    const media = $(".hw-media", hw), vids = $$("video", media), cap = $("[data-cap]", hw);
    let cur = 0;
    const show = i => {
      vids.forEach((v, j) => { v.classList.toggle("on", j === i); if (j !== i) v.pause(); });
      const v = vids[i];
      $(".hw-cap-name", cap).textContent = v.dataset.name;
      $(".hw-cap-desc", cap).textContent = cap.classList.contains("full") ? v.dataset.desc : "Now playing";
      cap.href = v.dataset.url;
      if (!reduce) { v.currentTime = 0; v.play().catch(() => {}); }
      const n = vids[(i + 1) % vids.length]; if (n.preload === "none") n.preload = "auto";
    };
    vids.forEach((v, i) => v.addEventListener("ended", () => { if (i === cur) { cur = (cur + 1) % vids.length; show(cur); } }));
    if (vids.length) show(0);
    if (!reduce) {
      hw.classList.add("live");
      let full = false;
      onScroll.push(() => {
        if (root.dataset.hero && root.dataset.hero !== "window") return;
        if (!wide()) { media.style.removeProperty("--s"); hw.style.removeProperty("--o"); return; }
        const p = progress(hw), s0 = parseFloat(getComputedStyle(hw).getPropertyValue("--s0")) || .58, s = s0 + (1 - s0) * ease(clamp(p / .7));
        media.style.setProperty("--s", s.toFixed(4));
        hw.style.setProperty("--o", clamp(1 - p / .3).toFixed(3));
        const f = p > .72;
        if (f !== full) { full = f; cap.classList.toggle("full", f); show(cur); }
      });
    }
  }

  /* ---------- hero 2 · ring of frames ---------- */
  const ring = $(".hr-ring");
  if (ring) {
    const fr = $$(".hr-f", ring), lede = $(".hr-lede", ring), def = lede.innerHTML;
    const place = () => {
      const w = ring.clientWidth, h = ring.clientHeight, phone = w < 700;
      const list = phone ? fr.slice(0, 12) : fr;
      fr.forEach(f => f.style.display = list.includes(f) ? "" : "none");
      list.forEach((f, i) => {
        let x, y, a;
        if (phone) {
          // two arcs: six frames above the text, six below
          const top = i < list.length / 2, k = top ? i : i - list.length / 2, n = list.length / 2;
          a = top ? Math.PI + (k + .5) / n * Math.PI : (k + .5) / n * Math.PI;
          const cy = top ? w * .66 : h - w * .5;
          x = (w / 2 + w * .58 * Math.cos(a)) / w; y = (cy + w * .36 * Math.sin(a)) / h;
        } else {
          a = (i / list.length) * Math.PI * 2 - Math.PI / 2;
          x = .5 + .42 * Math.cos(a); y = .5 + .38 * Math.sin(a);
        }
        const depth = (Math.sin(a) + 1) / 2; // 0 at the top, 1 at the bottom
        f.style.left = (x * 100) + "%"; f.style.top = (y * 100) + "%";
        f.style.setProperty("--w", ((phone ? 70 : 104) + depth * (phone ? 24 : 54)) + "px");
        f.style.setProperty("--rot", (Math.cos(a) * -9).toFixed(1) + "deg");
        f.style.setProperty("--i", i);
      });
    };
    place(); addEventListener("resize", place);
    requestAnimationFrame(() => requestAnimationFrame(() => ring.classList.add("ready")));
    fr.forEach(f => {
      const on = () => { ring.classList.add("focus"); fr.forEach(x => x.classList.toggle("cur", x === f)); lede.innerHTML = `<b>${esc(f.dataset.name)}</b>${esc(f.dataset.desc)}`; };
      const off = () => { ring.classList.remove("focus"); lede.innerHTML = def; };
      f.addEventListener("mouseenter", on); f.addEventListener("focus", on);
      f.addEventListener("mouseleave", off); f.addEventListener("blur", off);
    });
  }

  /* ---------- hero 3 · sentence split by a frame ---------- */
  const hs = $(".hs");
  if (hs) {
    const strip = $("[data-strip]", hs), items = $$(".hs-item", strip);
    let step = 0;
    const go = i => { step = i; strip.style.transform = `translateY(${-i * 100 / items.length}%)`; };
    if (!reduce && items.length > 1) {
      hs.classList.add("live");
      onScroll.push(() => {
        if (root.dataset.hero !== "reel") return;
        if (!wide()) return;
        const i = Math.min(items.length - 1, Math.floor(progress(hs) * items.length));
        if (i !== step) go(i);
      });
      setInterval(() => { if (!wide() && root.dataset.hero === "reel") go((step + 1) % items.length); }, 3200);
    }
  }

  /* ---------- receipts and counting numbers ---------- */
  $$(".fx .num, .fx .how-m").forEach(b => b.addEventListener("click", () => {
    const fx = b.closest(".fx"), open = fx.classList.toggle("open");
    $$(".num, .how-m", fx).forEach(x => x.setAttribute("aria-expanded", open));
  }));
  if (!reduce) {
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
    if (reduce) { fl.classList.add("in"); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fl.classList.add("in"); io.disconnect(); } }), { threshold: .35 });
    io.observe(fl);
  });

  /* ---------- section entrances ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    const sel = ".h2:not(.hero-t), .how-head .lede, .projects > .sub, .fx, .gh, .rows li, .posts li, .connect, .ph-text > *, .facts .fact, .ph-media, .prose > *, .figs > *";
    const els = $$(sel).filter(el => !el.closest(".hero"));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    let last = null, n = 0;
    els.forEach(el => { n = el.parentElement === last ? n + 1 : 0; last = el.parentElement; el.style.setProperty("--d", Math.min(n, 8) * 70 + "ms"); el.setAttribute("data-reveal", ""); });
    requestAnimationFrame(() => requestAnimationFrame(() => els.forEach(el => io.observe(el))));

    // Headlines rise line by line out of a mask.
    $$(".hw-title, .hr-title, .ph h1").forEach(h => {
      const lines = h.innerHTML.split(/<br\s*\/?>/i);
      h.innerHTML = lines.map((l, i) => `<span class="mask" style="--d:${120 + i * 110}ms"><span>${l}</span></span>`).join("");
      requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add("in")));
    });

    // The closing name is cut into stripes that slide into register as the page ends (after Space Type Generator).
    const crop = $(".crop");
    if (crop) {
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
      li.addEventListener("mouseenter", e => { img.classList.remove("ready"); dz.src = li.dataset.dither || ""; img.src = li.dataset.thumb; if (img.complete) img.classList.add("ready"); peek.classList.add("on"); x = tx = e.clientX + 24; y = ty = e.clientY - 90; });
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
