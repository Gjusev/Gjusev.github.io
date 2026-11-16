(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const base = document.querySelector('link[rel=stylesheet]').href.replace(/assets\/style\.css.*$/, "");

  // A silent loop is decoration: under reduced motion it stays on its poster frame.
  if (reduce) document.querySelectorAll("video[autoplay]").forEach(v => { v.removeAttribute("autoplay"); v.pause(); });

  // Receipts: every number opens the setup it was measured on.
  document.querySelectorAll(".fx .num").forEach(b => b.addEventListener("click", () => {
    const open = b.closest(".fx").classList.toggle("open");
    b.setAttribute("aria-expanded", open);
  }));

  // The picture inside the headline cycles through real project posters.
  const frame = document.querySelector("[data-rotate]");
  if (frame && !reduce) {
    const imgs = [["forecast-banner.webp", "forecast-arena poster: AI vs Reality"], ["laya-triage.webp", "laya-triage poster: 0.84. Measured."], ["voice-evals.webp", "voice-evals poster with a green sound wave"]];
    let i = 0;
    const next = new Image();
    setInterval(() => {
      i = (i + 1) % imgs.length;
      const img = frame.querySelector("img");
      next.src = base + "assets/work/" + imgs[i][0];
      next.decode().then(() => {
        img.classList.add("out");
        setTimeout(() => { img.src = next.src; img.alt = imgs[i][1]; img.classList.remove("out"); }, 600);
      }).catch(() => {});
    }, 3800);
  }

  // Entrances: heading, then text, then picture, staggered once per section.
  if (!reduce && "IntersectionObserver" in window) {
    const sel = ".hero .line, .hero .intro, .h2, .projects > .sub, .fx, .gh, .rows li, .posts li, .writing > .sub, .connect, .crop";
    const els = [...document.querySelectorAll(sel)];
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in"); io.unobserve(e.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    let last = null, n = 0;
    els.forEach(el => {
      const parent = el.parentElement;
      n = parent === last ? n + 1 : 0; last = parent;
      el.style.setProperty("--d", Math.min(n, 8) * 70 + "ms");
      el.setAttribute("data-reveal", "");
    });
    // Let the hidden state paint first so the entrance really transitions.
    requestAnimationFrame(() => requestAnimationFrame(() => els.forEach(el => io.observe(el))));
  }

  // New repos appear by themselves until they are added to _data/projects.yml.
  const rows = document.getElementById("new-rows");
  if (!rows) return;
  const known = new Set([...document.querySelectorAll("[data-repo]")].map(li => li.dataset.repo.toLowerCase()));
  const key = "gh-repos", esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  (async () => {
    let repos;
    try {
      const c = JSON.parse(sessionStorage.getItem(key) || "null");
      if (c && Date.now() - c.t < 36e5) repos = c.d;
      else {
        const r = await fetch("https://api.github.com/users/Gjusev/repos?sort=pushed&per_page=100");
        if (!r.ok) return;
        repos = (await r.json()).map(r => ({ n: r.name, d: r.description, u: r.html_url, f: r.fork, a: r.archived, p: r.pushed_at, l: r.language }));
        sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: repos }));
      }
    } catch { return; }
    const fresh = repos.filter(r => !r.f && !r.a && !known.has(r.n.toLowerCase()) && !/^gjusev(\.github\.io)?$/i.test(r.n));
    if (!fresh.length) return;
    rows.innerHTML = fresh.map(r => `<li><a class="name" href="${esc(r.u)}">${esc(r.n)}</a><span class="desc">${esc(r.d || "")}</span><span class="meta">${r.l ? `<b>${esc(r.l)}</b>` : ""}<span class="new-date">${esc(r.p.slice(0, 10))}</span></span></li>`).join("");
    rows.closest(".group").hidden = false;
  })();
})();
