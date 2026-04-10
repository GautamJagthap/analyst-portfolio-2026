/* ============================
   LOAD DATA & RENDER
   ============================ */

fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
        renderMeta(data.meta);
        renderHero(data.hero, data.meta);
        renderMarquee(data.marquee);
        renderIntro(data.about.intro);
        renderExperience(data.about.experience, data.about.education);
        renderSkills(data.about.skills);
        renderResume(data.about.resume);
        renderProjects(data.projects);
        renderContact(data.contact);
        renderFooter(data.footer, data.meta);

        // Init interactions after DOM is populated
        initCursor();
        initNav();
        initTabs();
        initScrollReveal();
        initContactForm();
        initSmoothScroll();
    })
    .catch((err) => console.error('Failed to load data.json:', err));


/* ============================
   RENDER FUNCTIONS
   ============================ */

function renderMeta(meta) {
    document.title = meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
    document.getElementById('navLogo').textContent = meta.logo;
}

function renderHero(hero, meta) {
    const tag = document.getElementById('heroTag');
    tag.textContent = meta.availableText;

    const name = document.getElementById('heroName');
    name.innerHTML = `${hero.firstName}<span>${hero.lastName}</span>`;

    const role = document.getElementById('heroRole');
    role.innerHTML = `${hero.role} <em>&amp;</em> ${hero.roleAccent}`;

    document.getElementById('heroDesc').textContent = hero.description;
}

function renderMarquee(items) {
    const track = document.getElementById('marqueeTrack');
    // Duplicate for seamless infinite loop
    const doubled = [...items, ...items];
    track.innerHTML = doubled
        .map((item) => `<div><span>✦</span> ${item}</div>`)
        .join('');
}

function renderIntro(intro) {
    // Headline (supports HTML tags like <strong>)
    document.getElementById('introBig').innerHTML = intro.headline;

    // Bio paragraphs
    const bioEl = document.getElementById('introBio');
    bioEl.innerHTML = intro.bio
        .map((p) => `<p class="intro-body">${p}</p>`)
        .join('');

    // Stats
    const statsEl = document.getElementById('introStats');
    statsEl.innerHTML = intro.stats
        .map(
            (s) => `
      <div class="stat-cell">
        <div class="stat-num">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`
        )
        .join('');

    // Status card
    const statusEl = document.getElementById('statusCard');
    statusEl.innerHTML = `
    <div class="status-indicator">
      <div class="dot"></div>
      <span class="status-text">${intro.status.badge}</span>
    </div>
    <div class="status-role">${intro.status.role}</div>
    <div class="status-desc">${intro.status.targets}</div>
  `;

    // Interests list
    const interestsEl = document.getElementById('interestsList');
    interestsEl.innerHTML = intro.interests
        .map((item) => `<li>${item}</li>`)
        .join('');
}

function renderExperience(experiences, education) {
    // Timeline
    const timeline = document.getElementById('expTimeline');
    timeline.innerHTML = experiences
        .map(
            (exp) => `
      <div class="exp-item">
        <div class="exp-date">${exp.date}</div>
        <div class="exp-role">${exp.role}</div>
        <div class="exp-company">${exp.company}</div>
        <div class="exp-desc">${exp.description}</div>
        <div class="exp-tags">
          ${exp.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>`
        )
        .join('');

    // Education card
    const eduEl = document.getElementById('eduCard');
    eduEl.innerHTML = `
    <div>
      <div class="edu-degree">${education.degree}</div>
      <div class="edu-college">${education.college}</div>
      <div class="edu-year">${education.year}</div>
    </div>
    <div class="edu-badge">${education.badge}</div>
  `;
}

function renderSkills(skills) {
    const grid = document.getElementById('skillsGrid');
    grid.innerHTML = skills
        .map(
            (group, i) => `
      <div class="skill-group reveal${i % 3 !== 0 ? ' reveal-delay-' + (i % 3) : ''}">
        <div class="skill-group-icon">${group.icon}</div>
        <div class="skill-group-title">${group.title}</div>
        <div class="skill-pills">
          ${group.pills.map((p) => `<span class="skill-pill">${p}</span>`).join('')}
        </div>
      </div>`
        )
        .join('');
}

function renderResume(resume) {
    const el = document.getElementById('resumePreview');
    el.innerHTML = `
    <div class="resume-icon">📄</div>
    <div class="resume-title">${resume.title}</div>
    <div class="resume-desc">${resume.description}</div>
    <a href="${resume.downloadUrl}" class="resume-btn">↓ Download Resume</a>
  `;
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects
        .map(
            (p, i) => `
      <div class="project-card ${p.size} reveal${i % 3 !== 0 ? ' reveal-delay-' + (i % 3) : ''}">
        <div class="project-num">${p.id}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-footer">
          <div class="exp-tags">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            ${p.links
                    .map((l) => `<a href="${l.url}" class="project-link" target="_blank">${l.label} ↗</a>`)
                    .join('')}
          </div>
        </div>
      </div>`
        )
        .join('');
}

function renderContact(contact) {
    // Heading (supports HTML like <em>)
    document.getElementById('contactHeading').innerHTML = contact.heading;
    document.getElementById('contactDesc').textContent = contact.description;

    const linksEl = document.getElementById('contactLinks');
    linksEl.innerHTML = contact.links
        .map(
            (l) => `
      <a href="${l.href}" class="contact-link-item" target="${l.href.startsWith('mailto') ? '_self' : '_blank'}">
        <span class="contact-link-icon">${l.icon}</span>
        <div>
          <span class="contact-link-label">${l.label}</span>
          <span class="contact-link-val">${l.value}</span>
        </div>
      </a>`
        )
        .join('');
}

function renderFooter(footer, meta) {
    document.getElementById('footerCopy').textContent = meta.copyright;

    const linksEl = document.getElementById('footerLinks');
    linksEl.innerHTML = footer.links
        .map(
            (l) => `<a href="${l.href}" target="${l.href.startsWith('mailto') ? '_self' : '_blank'}">${l.label}</a>`
        )
        .join('');
}


/* ============================
   CUSTOM CURSOR
   ============================ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';

        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}


/* ============================
   NAV — SCROLL + ACTIVE LINKS + HAMBURGER
   ============================ */
function initNav() {
    const nav = document.getElementById('nav');

    /* ---- Hamburger button ---- */
    const hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
    <span class="bar bar-top"></span>
    <span class="bar bar-mid"></span>
    <span class="bar bar-bot"></span>
  `;
    nav.appendChild(hamburger);

    /* ---- Drawer overlay ---- */
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
    <button class="nav-drawer-close" aria-label="Close menu">✕</button>
    <nav class="nav-drawer-links">
      <a href="#hero"     class="drawer-link" style="--i:0">Home</a>
      <a href="#about"    class="drawer-link" style="--i:1">About</a>
      <a href="#projects" class="drawer-link" style="--i:2">Projects</a>
      <a href="#contact"  class="drawer-link" style="--i:3">Contact</a>
      <a href="#contact"  class="drawer-link drawer-cta" style="--i:4">Hire Me</a>
    </nav>
  `;
    document.body.appendChild(drawer);

    /* ---- Open / close helpers ---- */
    function openDrawer() {
        drawer.classList.add('open');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ---- Event listeners ---- */
    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });

    // Close button inside drawer
    drawer.querySelector('.nav-drawer-close').addEventListener('click', closeDrawer);

    // Close when any nav link is clicked
    drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeDrawer);
    });

    // Close on backdrop click (clicking outside the links panel)
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    /* ---- Scroll: frosted nav ---- */
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ---- Scroll: active nav link highlight ---- */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((s) => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        document.querySelectorAll('.nav-links a').forEach((link) => {
            link.style.color =
                link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
        });
    });
}


/* ============================
   ABOUT — TAB SWITCHING
   ============================ */
function initTabs() {
    document.querySelectorAll('.about-tab').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.about-tab').forEach((b) => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById('tab-' + btn.dataset.tab);
            if (panel) {
                panel.classList.add('active');
                // Trigger reveal for elements inside newly shown tab
                panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
            }
        });
    });
}


/* ============================
   SCROLL REVEAL
   ============================ */
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        },
        { threshold: 0.1 }
    );

    // Observe existing + any dynamically added .reveal elements
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Re-observe after a tick to catch dynamically rendered elements
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);
}

// contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    emailjs.init("v3hY0WCkb8ka17MTf");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.form-submit');
        const original = btn.textContent;

        btn.textContent = 'Sending...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        emailjs.send("service_6b1t6bj", "template_1wnryye", {
            user_name: document.getElementById("name").value,
            user_email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        })
            .then(() => {
                btn.textContent = 'Message Sent ✓';
                form.reset();
            })
            .catch((error) => {
                console.log("FULL ERROR:", JSON.stringify(error, null, 2));
                btn.textContent = 'Failed';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.opacity = '';
                    btn.disabled = false;
                }, 3000);
            });
    });
}

/* ============================
   SMOOTH SCROLL
   ============================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}