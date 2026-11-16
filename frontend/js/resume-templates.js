// Resume templates — shared (Resume Builder editor, template picker aur public /resume.html teeno yahi use karte hain)
// 5 templates, sab single-column aur ATS-friendly (koi table/image/icon nahi, sirf plain text)
(function () {
  var TEMPLATES = [
    { id: 'modern',    name: 'Modern',    desc: 'Clean centered header with a serif body. A safe, balanced choice for software and IT roles.' },
    { id: 'classic',   name: 'Classic',   desc: 'Traditional left-aligned layout with clear section rules. Works for every company and every role.' },
    { id: 'executive', name: 'Executive', desc: 'Navy header band with a sharp sans-serif body. Looks professional for service and product companies.' },
    { id: 'compact',   name: 'Compact',   desc: 'Dense, one-page-friendly layout. Best when you have many projects and skills to fit on a single page.' },
    { id: 'elegant',   name: 'Elegant',   desc: 'Soft teal accents with generous spacing. Stands out while staying fully readable by ATS software.' }
  ];

  // Sample resume (sirf preview ke liye) — realistic B.Tech fresher, taaki template ka asli look dikhe
  var SAMPLE = {
    name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/rahulsharma', github: 'github.com/rahulsharma',
    education: [
      { institution: 'KIIT University', degree: 'B.Tech in Computer Science and Engineering', location: 'Bhubaneswar, Odisha', startDate: '2022', endDate: '2026', cgpa: '8.9/10' },
      { institution: 'City Public School', degree: 'Class XII (CBSE), PCM, 92%', location: 'New Delhi', startDate: '2020', endDate: '2022', cgpa: '' }
    ],
    experience: [
      { company: 'Tech Solutions Pvt Ltd', role: 'Software Developer Intern', location: 'Remote', startDate: 'Jun 2025', endDate: 'Aug 2025',
        bullets: [
          'Developed 3 REST APIs using Node.js and Express, serving 500+ daily active users',
          'Optimized MongoDB queries and added indexing, reducing average response time by 35%',
          'Wrote unit tests with Jest, raising code coverage from 40% to 78%'
        ] }
    ],
    projects: [
      { title: 'Placement Prep Tracker', techStack: 'React, Node.js, MongoDB', bullets: [
        'Built a full-stack web app used by 200+ students to track DSA progress and mock test scores',
        'Implemented JWT authentication and role-based access, securing 12 API endpoints' ] },
      { title: 'Smart Attendance System', techStack: 'Python, OpenCV, Flask', bullets: [
        'Designed a face-recognition attendance system with 94% accuracy on a 60-student dataset',
        'Automated report generation, cutting manual attendance work by 5 hours per week' ] },
      { title: 'Expense Splitter App', techStack: 'Java, Spring Boot, MySQL', bullets: [
        'Developed a group expense app with 8 REST endpoints and a normalized MySQL schema' ] }
    ],
    skills: [
      { category: 'Languages', items: 'Java, Python, C++, JavaScript, SQL' },
      { category: 'Web & Frameworks', items: 'React, Node.js, Express, Spring Boot' },
      { category: 'Databases & Tools', items: 'MongoDB, MySQL, Git, Postman, Docker' },
      { category: 'Core CS', items: 'DSA, OOP, DBMS, Operating Systems, Computer Networks' }
    ],
    achievements: [
      { title: 'College Hackathon 2025 — Winner', org: 'KIIT Tech Fest', bullets: ['Ranked 1st among 40+ teams for a campus safety web application'] },
      { title: 'Solved 450+ DSA problems', org: 'LeetCode and PlacementSphere', bullets: [] }
    ]
  };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // Builder ke updatePreview jaisa hi structure (h1, rp-contact, rp-sec-title, rp-entry-top, rp-sub, ul/li)
  function render(d) {
    d = d || SAMPLE;
    var h = '<h1>' + esc(d.name || 'Your Name') + '</h1>';
    h += '<div class="rp-contact">' + [d.email, d.phone, d.linkedin, d.github].filter(Boolean).map(esc).join(' | ') + '</div>';
    function bl(b) { return b && b.length ? '<ul>' + b.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : ''; }

    if (d.education && d.education.length) {
      h += '<div class="rp-sec-title">Education</div>';
      d.education.forEach(function (e) {
        h += '<div class="rp-entry-top"><b>' + esc(e.institution) + '</b><span>' + esc(e.location) + '</span></div>';
        h += '<div class="rp-sub">' + esc(e.degree) + (e.cgpa ? ', CGPA: ' + esc(e.cgpa) : '') + ' — ' + esc(e.startDate) + ' to ' + esc(e.endDate) + '</div>';
      });
    }
    if (d.experience && d.experience.length) {
      h += '<div class="rp-sec-title">Experience</div>';
      d.experience.forEach(function (e) {
        h += '<div class="rp-entry-top"><b>' + esc(e.company) + ' — ' + esc(e.role) + '</b><span>' + esc(e.startDate) + ' to ' + esc(e.endDate) + '</span></div>' + bl(e.bullets);
      });
    }
    if (d.projects && d.projects.length) {
      h += '<div class="rp-sec-title">Projects</div>';
      d.projects.forEach(function (p) {
        h += '<div class="rp-entry-top"><b>' + esc(p.title) + '</b><span>' + esc(p.techStack) + '</span></div>' + bl(p.bullets);
      });
    }
    if (d.skills && d.skills.length) {
      h += '<div class="rp-sec-title">Skills</div>';
      d.skills.forEach(function (s) {
        if (s.category || s.items) h += '<div style="font-size:0.76rem;margin-bottom:0.15rem"><b>' + esc(s.category) + ':</b> ' + esc(s.items) + '</div>';
      });
    }
    if (d.achievements && d.achievements.length) {
      h += '<div class="rp-sec-title">Achievements &amp; Leadership</div>';
      d.achievements.forEach(function (a) {
        h += '<div class="rp-entry-top"><b>' + esc(a.title) + '</b><span>' + esc(a.org) + '</span></div>' + bl(a.bullets);
      });
    }
    return h;
  }

  // @Q = sirf .rt-paper (picker/landing), @P = .rt-paper aur builder ka #resume-preview dono
  var CSS = [
    '.rt-paper{background:#fff;color:#111;padding:2.2rem 2rem;font-family:Georgia,serif;font-size:.82rem;line-height:1.5;text-align:left;box-sizing:border-box}',
    '.rt-paper h1{font-size:1.5rem;text-align:center;margin:0 0 .2rem;letter-spacing:.02em;font-weight:bold;color:#111;font-family:inherit;text-transform:none}',
    '.rt-paper .rp-contact{text-align:center;font-size:.7rem;color:#444;margin-bottom:.9rem}',
    '.rt-paper .rp-sec-title{font-size:.82rem;font-weight:bold;letter-spacing:.04em;border-bottom:1.2px solid #222;margin:.85rem 0 .4rem;padding-bottom:2px;text-transform:uppercase;color:#111}',
    '.rt-paper .rp-entry-top{display:flex;justify-content:space-between;gap:.75rem;font-size:.8rem}',
    '.rt-paper .rp-sub{font-size:.75rem;font-style:italic;color:#333;margin-bottom:.15rem}',
    '.rt-paper ul{margin:.2rem 0 .6rem 1.1rem;padding:0;list-style:disc}',
    '.rt-paper li{font-size:.76rem;margin-bottom:.12rem;color:#111}',
    '.rt-paper.classic h1{text-align:left;font-size:1.7rem}',
    '.rt-paper.classic .rp-contact{text-align:left}',

    /* Executive — navy header band, sans-serif */
    '@P.executive{font-family:Calibri,"Segoe UI",Arial,Helvetica,sans-serif;padding:0 0 1.5rem;line-height:1.45}',
    '@P.executive h1{background:#14213d;color:#fff;text-align:left;margin:0;padding:1.5rem 2rem .25rem;font-size:1.65rem;letter-spacing:.06em;text-transform:uppercase;font-family:inherit}',
    '@P.executive .rp-contact{background:#14213d;color:#d3dbec;text-align:left;margin:0 0 .6rem;padding:0 2rem 1.15rem;font-size:.72rem}',
    '@P.executive .rp-sec-title{color:#14213d;border-bottom:2px solid #14213d;margin:1.05rem 2rem .45rem;font-size:.82rem;letter-spacing:.1em;font-weight:700}',
    '@P.executive .rp-entry-top{margin:0 2rem;color:#111}',
    '@P.executive .rp-sub{margin:0 2rem .2rem;font-style:normal;color:#444}',
    '@P.executive ul{margin:.2rem 2rem .6rem 3.2rem}',
    '@P.executive > div[style]{margin-left:2rem !important;margin-right:2rem !important}',

    /* Compact — dense, Arial, boxed section labels */
    '@P.compact{font-family:Arial,Helvetica,sans-serif;font-size:.76rem;line-height:1.35;padding:1.35rem 1.6rem}',
    '@P.compact h1{text-align:left;font-size:1.35rem;margin:0;letter-spacing:0;font-family:inherit}',
    '@P.compact .rp-contact{text-align:left;font-size:.68rem;margin-bottom:.45rem;color:#333}',
    '@P.compact .rp-sec-title{font-size:.7rem;background:#eceff3;border-bottom:none;border-left:3px solid #111;padding:2px 7px;margin:.6rem 0 .3rem;letter-spacing:.07em}',
    '@P.compact .rp-entry-top{font-size:.75rem}',
    '@P.compact .rp-sub{font-size:.7rem;font-style:normal;color:#444}',
    '@P.compact ul{margin:.12rem 0 .4rem 1rem;list-style:square}',
    '@P.compact li{font-size:.72rem;margin-bottom:.05rem}',

    /* Elegant — teal accent, airy serif */
    '@P.elegant{font-family:"Palatino Linotype",Palatino,Georgia,serif;padding:2.4rem 2.2rem;line-height:1.6}',
    '@P.elegant h1{text-align:left;font-size:1.95rem;font-weight:400;color:#0f766e;letter-spacing:.03em;margin:0 0 .1rem;font-family:inherit}',
    '@P.elegant .rp-contact{text-align:left;color:#555;font-size:.72rem;margin-bottom:1.1rem}',
    '@P.elegant .rp-sec-title{border-bottom:none;color:#0f766e;letter-spacing:.16em;font-size:.76rem;margin:1.15rem 0 .55rem;padding-bottom:7px;position:relative}',
    '@P.elegant .rp-sec-title::after{content:"";position:absolute;left:0;bottom:0;width:38px;height:2px;background:#0f766e}',
    '@P.elegant .rp-sub{color:#0f766e;font-style:normal}',
    '@P.elegant .rp-entry-top span{font-style:italic;color:#555;font-weight:400}',

    /* Thumbnail helpers (picker + landing) */
    '.rt-thumb{position:relative;overflow:hidden;background:#fff;aspect-ratio:600/760}',
    '.rt-scale{width:600px;transform-origin:top left;pointer-events:none}'
  ].join('\n').replace(/@P([^{]+)\{/g, function (m, sel) { return '.rt-paper' + sel + ',#resume-preview' + sel + '{'; });

  function injectCSS() {
    if (document.getElementById('rt-css')) return;
    var st = document.createElement('style'); st.id = 'rt-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }
  injectCSS();

  // Thumbnail ko container ki width ke hisaab se scale karo (poora resume chhota karke dikhata hai)
  function fitThumbs(root) {
    (root || document).querySelectorAll('.rt-thumb').forEach(function (t) {
      var s = t.clientWidth / 600, sc = t.firstElementChild;
      if (sc && s) sc.style.transform = 'scale(' + s + ')';
    });
  }
  window.addEventListener('resize', function () { fitThumbs(); });

  window.ResumeTemplates = {
    list: TEMPLATES,
    sample: SAMPLE,
    render: render,
    paperHTML: function (tpl, data) { return '<div class="rt-paper ' + tpl + '">' + render(data || SAMPLE) + '</div>'; },
    thumbHTML: function (tpl) { return '<div class="rt-thumb"><div class="rt-scale"><div class="rt-paper ' + tpl + '">' + render(SAMPLE) + '</div></div></div>'; },
    fitThumbs: fitThumbs
  };
})();
