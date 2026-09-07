/**
 * os.js — NIKHIL.OS
 * A small local command/search interface over the portfolio data.
 * No external API calls, no fabricated answers: every result maps
 * to a real section, project or link already in data.js. If a query
 * doesn't match anything, it says so honestly.
 */
(function () {
  let INDEX = [];

  function buildIndex() {
    const add = (title, sub, targetId, keywords) => {
      INDEX.push({ title, sub, targetId, keywords: keywords.toLowerCase() });
    };

    add('Journey', 'How Nikhil got here', 'journey', 'journey path story physics mca bsc route college education background');
    add('Experience — Hexaphor Technologies', 'MERN Stack Developer Intern', 'experience', 'internship experience hexaphor mern react node mongodb express job work');
    add('Experience — Web Bocket', 'Python Full Stack Developer Intern', 'experience', 'internship experience web bocket python django drf job work internships');
    add('Tech Stack', 'Languages, frameworks, tools', 'tech', 'tech stack skills technologies languages frameworks python javascript react django');
    add('Gossiphy', 'Full-stack social media platform', 'project-gossiphy', 'gossiphy project social media django feed auth crud');
    add('Progress AI', 'Personalized learning assistant', 'project-progress-ai', 'progress ai project llm nlp learning assistant ai project');
    add('AI Experiments', 'JARVIS-inspired & personal AI/IoT experiments', 'experiments', 'ai experiments jarvis iron man iot lab experimental');
    add('Signal — Music', 'Singing, covers, YouTube & Instagram', 'signal', 'music signal singing covers youtube instagram voice song');
    add('Beyond the Code', 'Curiosity, persistence, family, music', 'beyond', 'beyond the code personality who is nikhil person human');
    add('Résumé', 'View or download the résumé PDF', 'resume', 'resume cv download pdf education certifications nptel');
    add('Elsewhere — Social links', 'GitHub, LinkedIn, LeetCode, YouTube, Instagram', 'social', 'social links github linkedin leetcode contact profile');
    add('Contact', 'Get in touch with Nikhil', 'contact', 'contact email reach hire collaborate');
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    return INDEX
      .map((item) => {
        let score = 0;
        terms.forEach((t) => {
          if (item.keywords.includes(t)) score += 1;
          if (item.title.toLowerCase().includes(t)) score += 2;
        });
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }

  function renderResults(results, query) {
    const box = document.getElementById('osResults');
    box.innerHTML = '';
    if (!query.trim()) {
      box.innerHTML = '<div class="os-empty">Start typing to search the portfolio — projects, skills, internships, music, contact.</div>';
      return;
    }
    if (results.length === 0) {
      box.innerHTML = `<div class="os-empty">Nothing in the portfolio matches "${query}". Try "projects", "internships", "AI", or "music".</div>`;
      return;
    }
    results.slice(0, 8).forEach((r, i) => {
      const row = document.createElement('div');
      row.className = 'os-result' + (i === 0 ? ' active' : '');
      row.setAttribute('role', 'option');
      row.tabIndex = 0;
      row.innerHTML = `<span class="r-title">${r.title}</span><span class="r-sub">${r.sub}</span>`;
      row.addEventListener('click', () => goTo(r.targetId));
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') goTo(r.targetId);
      });
      box.appendChild(row);
    });
  }

  function goTo(targetId) {
    closePanel();
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openPanel() {
    document.getElementById('osPanel').hidden = false;
    document.getElementById('osOverlay').hidden = false;
    const input = document.getElementById('osInput');
    input.value = '';
    renderResults([], '');
    setTimeout(() => input.focus(), 30);
  }

  function closePanel() {
    document.getElementById('osPanel').hidden = true;
    document.getElementById('osOverlay').hidden = true;
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildIndex();
    document.getElementById('osOpenBtn').addEventListener('click', openPanel);
    document.getElementById('osCloseBtn').addEventListener('click', closePanel);
    document.getElementById('osOverlay').addEventListener('click', closePanel);
    document.getElementById('osInput').addEventListener('input', (e) => {
      renderResults(search(e.target.value), e.target.value);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPanel();
      }
    });
  });
})();
