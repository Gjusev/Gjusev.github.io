// Latest public non-fork repos, straight from the GitHub API (cached 1h to stay under the 60 req/h anonymous limit).
(async () => {
  const el = document.getElementById("repos");
  if (!el) return;
  const user = el.dataset.user, key = "repos:" + user;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let repos;
  try {
    const c = JSON.parse(sessionStorage.getItem(key) || "null");
    if (c && Date.now() - c.t < 36e5) repos = c.d;
    else {
      const r = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=100`);
      if (!r.ok) throw new Error(r.status);
      repos = await r.json();
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: repos }));
    }
  } catch { return; } // keep the static fallback link
  const rows = repos.filter(r => !r.fork && !r.archived && r.name !== user && r.name !== `${user}.github.io`)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 8);
  el.innerHTML = rows.map(r => `<li><a class="card" href="${esc(r.html_url)}">
    <h3>${esc(r.name)} <span aria-hidden="true">↗</span></h3>
    <p>${esc(r.description || "")}</p>
    <p class="meta">${r.language ? `<span>${esc(r.language)}</span>` : ""}${r.stargazers_count ? `<span>★ ${r.stargazers_count}</span>` : ""}<span>${esc(r.pushed_at.slice(0, 10))}</span></p>
  </a></li>`).join("") + `<li class="muted"><a href="https://github.com/${user}?tab=repositories">All ${repos.length} public repos →</a></li>`;
})();
