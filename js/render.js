/**
 * render.js — reads PORTFOLIO (data.js) and populates the DOM.
 * Keeps content out of the markup so editing data.js is enough
 * to update the site.
 */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  function renderAbout() {
    $('#aboutSummary').textContent = PORTFOLIO.about.summary;
    $('#aboutStatement').textContent = '"' + PORTFOLIO.about.statement + '"';
  }

  function renderJourney() {
    const list = $('#journeyList');
    PORTFOLIO.journey.forEach((step) => {
      const li = el('li');
      li.innerHTML = `<div class="t-label">${step.label}</div><div class="t-detail">${step.detail}</div>`;
      list.appendChild(li);
    });
  }

  function renderExperience() {
    const wrap = $('#experienceList');
    PORTFOLIO.experience.forEach((job) => {
      const card = el('div', 'exp-card');
      card.innerHTML = `
        <div class="exp-head">
          <div>
            <div class="exp-role">${job.role}</div>
            <div class="exp-company">${job.company}</div>
          </div>
          <div class="exp-period">${job.period}</div>
        </div>
        <div class="exp-stack">${job.stack.map(s => `<span class="tag">${s}</span>`).join('')}</div>
        <ul class="exp-points">${job.points.map(p => `<li>${p}</li>`).join('')}</ul>
      `;
      wrap.appendChild(card);
    });
  }

  function renderTech() {
    const grid = $('#techGrid');
    Object.entries(PORTFOLIO.skills).forEach(([cat, items]) => {
      const block = el('div', 'tech-cat');
      block.innerHTML = `<h3>${cat}</h3><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      grid.appendChild(block);
    });
  }

  function renderProjects() {
    const wrap = $('#projectList');
    PORTFOLIO.projects.forEach((p) => {
      const card = el('div', 'project-card');
      card.id = 'project-' + p.id;
      card.innerHTML = `
        <div class="project-top">
          <div>
            <div class="project-title">${p.title}</div>
            <div class="project-subtitle">${p.subtitle}</div>
          </div>
          <div class="project-links">
            ${p.live ? `<a class="btn btn-primary" href="${p.live}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ''}
            <a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener noreferrer">View source</a>
          </div>
        </div>
        <div class="exp-stack">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-body">
          <ul class="project-points">${p.points.map(pt => `<li>${pt}</li>`).join('')}</ul>
          <div class="project-flow">${p.flow.map(f => `<div class="flow-node">${f}</div>`).join('')}</div>
        </div>
      `;
      wrap.appendChild(card);
    });
  }

  function renderExperiments() {
    $('#experimentsIntro').textContent = PORTFOLIO.experiments.intro;
    const grid = $('#experimentsGrid');
    PORTFOLIO.experiments.items.forEach((it) => {
      const card = el('div', 'experiment-card');
      card.innerHTML = `<h3>${it.label}</h3><p>${it.detail}</p>`;
      grid.appendChild(card);
    });
  }

  function renderSignal() {
    $('#signalIntro').textContent = PORTFOLIO.signal.intro;
    const tl = $('#signalTimeline');
    PORTFOLIO.signal.milestones.forEach((m) => {
      const li = el('li');
      li.innerHTML = `<div class="s-label">${m.label}</div><div class="s-detail">${m.detail}</div>`;
      tl.appendChild(li);
    });
    const yt = $('#signalYoutube');
    yt.href = PORTFOLIO.socialLinks.youtube.url;
    const ig = $('#signalInstagram');
    ig.href = PORTFOLIO.socialLinks.instagram.url;
  }

  function renderBeyond() {
    const grid = $('#beyondGrid');
    PORTFOLIO.beyond.forEach((b) => {
      const item = el('div', 'beyond-item');
      item.innerHTML = `<div class="b-label">${b.label}</div><div class="b-detail">${b.detail}</div>`;
      grid.appendChild(item);
    });
  }

  function renderFuture() {
    $('#futureHeading').textContent = PORTFOLIO.future.heading;
    const list = $('#futureList');
    PORTFOLIO.future.items.forEach((i) => {
      list.appendChild(el('li', null, i));
    });
  }

  function renderResume() {
    $('#resumeView').href = PORTFOLIO.resume.path;
    const dl = $('#resumeDownload');
    dl.href = PORTFOLIO.resume.path;
    dl.download = PORTFOLIO.resume.fileName;

    const eduList = $('#eduList');
    PORTFOLIO.education.forEach((e) => {
      const li = el('li');
      li.innerHTML = `<div class="edu-degree">${e.degree}</div><div class="edu-period">${e.period}</div><div class="edu-detail">${e.detail}</div>`;
      eduList.appendChild(li);
    });
    const certList = $('#certList');
    PORTFOLIO.certifications.forEach((c) => {
      const li = el('li', null, c);
      certList.appendChild(li);
    });
  }

  function renderSocial() {
    const grid = $('#socialGrid');
    Object.values(PORTFOLIO.socialLinks).forEach((s) => {
      const a = el('a', 'social-card');
      a.href = s.url;
      if (!s.url.startsWith('mailto:')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `<span class="sc-label">${s.label}</span><span class="sc-purpose">${s.purpose}</span>`;
      grid.appendChild(a);
    });
  }

  function renderContact() {
    $('#contactHeading').textContent = PORTFOLIO.contact.heading;
    $('#contactBody').textContent = PORTFOLIO.contact.body;
    $('#contactEmail').href = PORTFOLIO.socialLinks.email.url;
    $('#contactLinkedin').href = PORTFOLIO.socialLinks.linkedin.url;
    $('#contactGithub').href = PORTFOLIO.socialLinks.github.url;
  }

  function renderWaveform() {
    const svg = $('#waveform');
    const points = 64;
    let d1 = 'M0,100 ';
    let d2 = 'M0,100 ';
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * 1200;
      const seed = Math.sin(i * 0.7) * 40 + Math.sin(i * 0.35) * 25;
      d1 += `L${x},${100 + seed} `;
      d2 += `L${x},${100 + seed * 0.5 * Math.cos(i * 0.2)} `;
    }
    svg.innerHTML = `<path d="${d1}"></path><path d="${d2}" opacity="0.4"></path>`;
  }

  function renderAll() {
    renderAbout();
    renderJourney();
    renderExperience();
    renderTech();
    renderProjects();
    renderExperiments();
    renderSignal();
    renderBeyond();
    renderFuture();
    renderResume();
    renderSocial();
    renderContact();
    renderWaveform();
  }

  document.addEventListener('DOMContentLoaded', renderAll);
})();
