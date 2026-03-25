 
    //data
    const timeline = [
      {
        year:"2024 – Present",
        title:"Software Engineer",
        org:"Self Employed",
    desc:"Building scalable backend services with Python, Django and JavaScript, leading API design for client-facing products. ",
        type:"work"
      },
      {
        year:"2023 – Present",
        title:"Freelance Web Developer",
        org:"Self Employed",
        desc:"Delivered responsive websites and Django-based dashboards for small businesses and startups. Collaborated on a team of 4 to implement new features and optimize performance.",
        type:"work"
      },
      {
        year:"2023 – 2025",
        title:"Freelance Web Developer",
        org:"Nairobi Institute of Business Studies",
        desc:"Focused on sytem design and backend development using Django,Networking and Data Communication. Implemented REST APIs, database models, and admin interfaces.",
        type:"education"
      },
      {
        year:"2019 – 2022",
        title:"Kenya Certificate of Secondary Education",
        org:"Elburgon D.E.B High School",
        desc:"Focused on mathematics and STEM units. Graduated with C+ mean grade.",
        type:"education"
      },
    ];

    const skills = [
      {
        title:"Python",icon:"🐍",description:"Automation scripts, data processing pipelines, and REST APIs with clean, Pythonic code.",tags:["Flask","FastAPI","Scripting"]},
      {
        title:"Django",icon:"🎯",description:"Full-stack web applications with Django's ORM, auth system, and admin interface.",tags:["ORM","REST","Templates"]},
      {
        title:"C",icon:"⚙️",description:"Low-level systems programming, memory management, and performance-critical applications.",tags:["Systems","Embedded","POSIX"]},
      {
        title:"C++",icon:"🔧",description:"Object-oriented design, STL containers, and high-performance computing solutions.",tags:["OOP","STL","Performance"]},
      {
        title:"HTML & CSS",icon:"🎨",description:"Semantic markup, responsive layouts, and accessible interfaces following web standards.",tags:["Responsive","A11y","Flexbox"]},
      {
        title:"JavaScript",icon:"⚡",description:"Interactive frontends, DOM manipulation, async patterns, and modern ES6+ features.",tags:["ES6+","Async","DOM"]},
    ];

    const projects = [
      {
        title:"M-Chama System",icon:"🚀",description:"An automated digitized financial management system",tags:["JavaScript","Django","React.js"]},
      {
        title:"Task Pipeline Engine",icon:"🚀",description:"A distributed task queue built with Python and Redis, handling 12k+ jobs per minute with retry logic.",tags:["Python","Redis","Docker"]},
      {
        title:"E-Commerce Platform",icon:"🛒",description:"Full-stack Django marketplace with Stripe payments, inventory management, and admin dashboards.",tags:["Django","PostgreSQL","Stripe"]},
      {
        title:"Memory Allocator",icon:"🧠",description:"Custom malloc implementation in C with buddy allocation, achieving 3x throughput vs glibc in benchmarks.",tags:["C","Systems","Linux"]},
      {
        title:"Real-Time Chat App",icon:"💬",description:"WebSocket-based messaging platform with typing indicators, read receipts, and file sharing.",tags:["JavaScript","Node.js","WebSocket"]},
      {
        title:"Portfolio CMS",icon:"📝",description:"Headless CMS with a Django REST backend and a vanilla JS frontend with lazy-loaded images.",tags:["Django","REST","JavaScript"]},
    ];

    // Smooth scroll
    function smoothScroll(e, sel) {
      e.preventDefault();
      document.querySelector(sel)?.scrollIntoView({behavior:'smooth'});
    }

    // Navbar scroll
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    }, {passive:true});

    // Section reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold:0.15});
    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

    // Timeline
    (function renderTimeline() {
      const container = document.getElementById('timeline');
      container.innerHTML = '<div class="timeline-line"></div>' + timeline.map((entry, i) => {
        const isLeft = i % 2 === 0;
        const dotClass = entry.type === 'education' ? 'tl-dot edu' : 'tl-dot';
        const badge = entry.type === 'work' ? '💼 Work' : '🎓 Education';
        return `
        <div class="tl-entry" style="opacity:0;transform:translateY(16px);filter:blur(4px);transition:all .6s cubic-bezier(.16,1,.3,1) ${0.15+i*0.1}s" data-reveal>
          <div class="${dotClass}"></div>
          <div class="tl-spacer"></div>
          ${isLeft ? `
            <div class="tl-year-desktop" style="justify-content:flex-end;display:none"><span>${entry.year}</span></div>
            <div class="tl-card-mobile"><div class="tl-card"><span class="year">${entry.year}</span><span class="type-badge">${badge}</span><h3>${entry.title}</h3><p class="org">${entry.org}</p><p class="desc">${entry.desc}</p></div></div>
          ` : `
            <div class="tl-year-desktop" style="justify-content:flex-end;display:none"><span>${entry.year}</span></div>
            <div class="tl-card-mobile"><div class="tl-card"><span class="year">${entry.year}</span><span class="type-badge">${badge}</span><h3>${entry.title}</h3><p class="org">${entry.org}</p><p class="desc">${entry.desc}</p></div></div>
          `}
          <div class="tl-card" style="display:none"><span class="year">${entry.year}</span><span class="type-badge">${badge}</span><h3>${entry.title}</h3><p class="org">${entry.org}</p><p class="desc">${entry.desc}</p></div>
        </div>`;
      }).join('');

      // Handle desktop layout via media query
      function updateTimelineLayout() {
        const isDesktop = window.matchMedia('(min-width:640px)').matches;
        document.querySelectorAll('.tl-entry').forEach((el, i) => {
          const isLeft = i % 2 === 0;
          const desktopYear = el.querySelector('.tl-year-desktop');
          const mobileCard = el.querySelector('.tl-card-mobile');
          const desktopCard = el.querySelector(':scope > .tl-card');

          if (isDesktop) {
            el.style.gridTemplateColumns = '1fr 1fr';
            if (desktopYear) desktopYear.style.display = 'flex';
            if (mobileCard) mobileCard.style.display = 'none';
            if (desktopCard) {
              desktopCard.style.display = 'block';
              if (isLeft) {
                desktopYear.style.justifyContent = 'flex-end';
                desktopYear.style.order = '1';
                desktopCard.style.order = '2';
                desktopCard.style.textAlign = 'left';
              } else {
                desktopYear.style.justifyContent = 'flex-start';
                desktopYear.style.order = '2';
                desktopCard.style.order = '1';
                desktopCard.style.textAlign = 'right';
              }
            }
          } else {
            el.style.gridTemplateColumns = '40px 1fr';
            if (desktopYear) desktopYear.style.display = 'none';
            if (mobileCard) mobileCard.style.display = 'block';
            if (desktopCard) desktopCard.style.display = 'none';
          }
        });
      }
      updateTimelineLayout();
      window.addEventListener('resize', updateTimelineLayout);

      // Reveal timeline entries when about section becomes visible
      const aboutObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          document.querySelectorAll('[data-reveal]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.filter = 'blur(0)';
          });
        }
      }, {threshold:0.15});
      aboutObs.observe(document.getElementById('about'));
    })();

    // Carousel builder
    function buildCarousel(items, carouselId, dotsId, arrowsId) {
      let active = 0;
      const area = document.getElementById(carouselId);
      const dotsContainer = document.getElementById(dotsId);
      const arrowsContainer = document.getElementById(arrowsId);

      // Render cards
      items.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.innerHTML = `
          ${item.icon ? `<span class="icon">${item.icon}</span>` : ''}
          <h3>${item.title}</h3>
          <p class="card-desc">${item.description}</p>
          <div class="tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        `;
        card.addEventListener('click', () => { active = i; update(); });
        area.appendChild(card);
      });

      // Dots
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to card ${i+1}`);
        dot.addEventListener('click', () => { active = i; update(); });
        dotsContainer.appendChild(dot);
      });

      // Arrows
      arrowsContainer.innerHTML = '<button class="arrow-btn" aria-label="Previous">←</button><button class="arrow-btn" aria-label="Next">→</button>';
      arrowsContainer.children[0].addEventListener('click', () => { active = (active - 1 + items.length) % items.length; update(); });
      arrowsContainer.children[1].addEventListener('click', () => { active = (active + 1) % items.length; update(); });

      // Touch
      let touchStart = null;
      area.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, {passive:true});
      area.addEventListener('touchend', e => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? (active = (active+1)%items.length) : (active = (active-1+items.length)%items.length); update(); }
        touchStart = null;
      });

      function update() {
        const cards = area.querySelectorAll('.carousel-card');
        cards.forEach((card, i) => {
          const diff = i - active;
          const wrapped = ((diff + items.length) % items.length);
          const norm = wrapped > items.length / 2 ? wrapped - items.length : wrapped;
          if (norm === 0) {
            Object.assign(card.style, {transform:'translateX(0) scale(1)',opacity:'1',filter:'blur(0px)',zIndex:'10',boxShadow:'var(--card-shadow-hover)'});
          } else {
            const dir = norm > 0 ? 1 : -1;
            const abs = Math.abs(norm);
            const offset = dir * Math.min(abs,3) * 140;
            const scale = Math.max(0.7, 1 - abs * 0.1);
            const op = Math.max(0, 1 - abs * 0.3);
            const blur = Math.min(abs * 2, 6);
            Object.assign(card.style, {transform:`translateX(${offset}px) scale(${scale})`,opacity:String(op),filter:`blur(${blur}px)`,zIndex:String(10-abs),boxShadow:'var(--card-shadow)'});
          }
        });
        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('active', i === active);
        });
      }
      update();
    }

    buildCarousel(skills, 'skills-carousel', 'skills-dots', 'skills-arrows');
    buildCarousel(projects, 'projects-carousel', 'projects-dots', 'projects-arrows');

    
    function handleContactSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        document.getElementById('contact-form').reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        showToast('Message sent! I\'ll get back to you soon.');
      }, 1200);
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
    }
    (function() {
    emailjs.init("rKf8R1ZwMr9cveDJF"); 
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('status-msg');
    
    btn.innerText = 'Sending...';

    // These IDs must match exactly what you see in your EmailJS dashboard
    const serviceID = 'service_fnw0vkh';
    const templateID = 'template_v5f1x1b';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'Send Message';
            status.style.color = "green";
            status.innerText = 'Success! I will get back to you soon.';
            this.reset(); // Clears the form
        }, (err) => {
            btn.innerText = 'Send Message';
            status.style.color = "red";
            status.innerText = 'Failed to send. Please try again.';
            console.log(JSON.stringify(err));
        });
});