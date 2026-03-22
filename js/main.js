/* ============================================
   RaTrading Academy — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
        highlightActiveNav();
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE MENU =====
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== ACTIVE NAV HIGHLIGHT =====
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) {
                current = sec.id;
            }
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===== HERO CANVAS (Animated Chart Lines) =====
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H;
        let lines = [];
        let animFrame;

        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }

        class CandleLine {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * W;
                this.y = H * 0.2 + Math.random() * H * 0.6;
                this.points = [];
                this.speed = 0.3 + Math.random() * 0.5;
                this.color = Math.random() > 0.5 ? '#D4AF37' : '#00D084';
                this.opacity = 0.1 + Math.random() * 0.25;
                // Generate zigzag path
                let curX = this.x, curY = this.y;
                for (let i = 0; i < 80; i++) {
                    curX += 8 + Math.random() * 6;
                    curY += (Math.random() - 0.5) * 40;
                    curY = Math.max(H * 0.1, Math.min(H * 0.9, curY));
                    this.points.push({ x: curX, y: curY });
                }
                this.maxLen = this.points.length;
                this.drawLen = 0;
            }
            draw() {
                if (this.drawLen < this.maxLen) {
                    this.drawLen += this.speed;
                } else {
                    this.reset();
                    return;
                }
                const end = Math.floor(this.drawLen);
                if (end < 2) return;
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.moveTo(this.points[0].x, this.points[0].y);
                for (let i = 1; i < end; i++) {
                    ctx.lineTo(this.points[i].x, this.points[i].y);
                }
                ctx.stroke();
                ctx.restore();
            }
        }

        // Grid lines
        function drawGrid() {
            ctx.save();
            ctx.globalAlpha = 0.04;
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 60) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }
            for (let y = 0; y < H; y += 60) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }
            ctx.restore();
        }

        function init() {
            resize();
            lines = [];
            for (let i = 0; i < 5; i++) {
                const l = new CandleLine();
                l.drawLen = Math.random() * l.maxLen * 0.5;
                lines.push(l);
            }
        }

        function animate() {
            ctx.clearRect(0, 0, W, H);
            drawGrid();
            lines.forEach(l => l.draw());
            animFrame = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => { clearTimeout(window._resizeTimer); window._resizeTimer = setTimeout(init, 200); });
        init();
        animate();
    }

    // ===== AOS (Animate on Scroll) =====
    const aosElements = document.querySelectorAll('[data-aos]');
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    aosElements.forEach(el => aosObserver.observe(el));

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            // Open current if was closed
            if (!isOpen) item.classList.add('open');
        });
    });

    // ===== CASE SLIDER =====
    const slider = document.getElementById('casesSlider');
    const dotsContainer = document.getElementById('sliderDots');
    const cards = slider ? slider.querySelectorAll('.case-card') : [];
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();

    function getSlidesPerView() {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 900) return 2;
        return 4;
    }

    function getMaxSlide() {
        return Math.ceil(cards.length / slidesPerView) - 1;
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const total = getMaxSlide() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(idx) {
        slidesPerView = getSlidesPerView();
        currentSlide = Math.max(0, Math.min(idx, getMaxSlide()));
        if (slider) {
            const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 0;
            slider.style.transform = `translateX(-${currentSlide * slidesPerView * cardWidth}px)`;
            slider.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
        });
    }

    document.getElementById('prevCase')?.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    document.getElementById('nextCase')?.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    window.addEventListener('resize', () => {
        slidesPerView = getSlidesPerView();
        createDots();
        goToSlide(0);
    });

    createDots();

    // Auto slide
    let autoSlideTimer = setInterval(() => {
        const max = getMaxSlide();
        goToSlide(currentSlide >= max ? 0 : currentSlide + 1);
    }, 4000);

    slider?.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    slider?.addEventListener('mouseleave', () => {
        autoSlideTimer = setInterval(() => {
            const max = getMaxSlide();
            goToSlide(currentSlide >= max ? 0 : currentSlide + 1);
        }, 4000);
    });

    // ===== CASE CHARTS =====
    function drawCaseChart(id, type) {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.offsetWidth || 260;
        const H = 100;
        canvas.width = W;
        canvas.height = H;

        // Generate price data
        const points = [];
        let price = type === 'long' ? 30 : 70;
        const entryIdx = 12;
        for (let i = 0; i < 35; i++) {
            if (i === entryIdx) {
                // Entry consolidation
                price += (Math.random() - 0.5) * 4;
            } else if (i < entryIdx) {
                price += (Math.random() - 0.52) * 6;
            } else {
                price += (type === 'long' ? 1.5 : -1.5) + (Math.random() - 0.5) * 4;
            }
            price = Math.max(5, Math.min(95, price));
            points.push(price);
        }

        const minP = Math.min(...points), maxP = Math.max(...points);
        const scaleY = (p) => H - ((p - minP) / (maxP - minP + 1)) * (H - 10) - 5;
        const scaleX = (i) => (i / (points.length - 1)) * W;

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        if (type === 'long') {
            grad.addColorStop(0, 'rgba(0, 208, 132, 0.15)');
            grad.addColorStop(1, 'rgba(0, 208, 132, 0)');
        } else {
            grad.addColorStop(0, 'rgba(255, 99, 99, 0.15)');
            grad.addColorStop(1, 'rgba(255, 99, 99, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(scaleX(0), H);
        points.forEach((p, i) => ctx.lineTo(scaleX(i), scaleY(p)));
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();

        // Line
        ctx.strokeStyle = type === 'long' ? '#00D084' : '#FF6363';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(scaleX(i), scaleY(p));
            else ctx.lineTo(scaleX(i), scaleY(p));
        });
        ctx.stroke();

        // Entry marker
        const ex = scaleX(entryIdx), ey = scaleY(points[entryIdx]);
        ctx.beginPath();
        ctx.arc(ex, ey, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Entry label
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.fillText('ENTRY', ex - 14, ey - 10);

        // TP marker
        const tpIdx = points.length - 3;
        const tx = scaleX(tpIdx), ty = scaleY(points[tpIdx]);
        ctx.beginPath();
        ctx.arc(tx, ty, 5, 0, Math.PI * 2);
        ctx.fillStyle = type === 'long' ? '#00D084' : '#FF6363';
        ctx.fill();
        ctx.fillStyle = type === 'long' ? '#00D084' : '#FF6363';
        ctx.fillText('TP', tx - 6, ty - 10);
    }

    drawCaseChart('caseChart1', 'long');
    drawCaseChart('caseChart2', 'short');
    drawCaseChart('caseChart3', 'long');
    drawCaseChart('caseChart4', 'long');

    // ===== WIN RATE ANIMATION =====
    const wrCircle = document.querySelector('.wr-progress');
    if (wrCircle) {
        const wrObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate from 0 to 65%
                    // Circumference: 2 * π * 88 ≈ 553
                    const circ = 553;
                    wrCircle.style.strokeDasharray = `0 800`;
                    setTimeout(() => {
                        wrCircle.style.strokeDasharray = `${circ * 0.65} 800`;
                    }, 300);
                    wrObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        wrObserver.observe(wrCircle.closest('.winrate-visual'));
    }

    // ===== COUNTER ANIMATION =====
    function animateCounter(el, target, duration = 2000) {
        const start = 0;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    }

    // Observe stats
    const statNums = document.querySelectorAll('.stat-num');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroObserver.unobserve(entry.target);
            }
        });
    });

    // ===== PROGRESS BARS ANIMATION =====
    const progressFills = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const target = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => { fill.style.width = target; }, 200);
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    progressFills.forEach(f => {
        const orig = f.style.width;
        f.setAttribute('data-width', orig);
        f.style.width = '0%';
        progressObserver.observe(f);
    });

    // ===== PARTICLE EFFECT ON HERO BUTTONS =====
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--mouse-x', x + 'px');
            btn.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ===== TYPING EFFECT for hero subtitle =====
    // (subtle, already rendered text)

    // ===== TOUCH SWIPE FOR SLIDER =====
    let touchStartX = 0, touchEndX = 0;
    slider?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    slider?.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        }
    });

    // ===== GLOWING BORDER ON HOVER (Course Blocks) =====
    document.querySelectorAll('.course-block').forEach(block => {
        block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            block.style.setProperty('--glow-x', x + '%');
            block.style.setProperty('--glow-y', y + '%');
        });
    });

    // ===== CONSOLE BRANDING =====
    console.log('%c RaTrading Academy ', 'background: #D4AF37; color: #0F1419; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
    console.log('%c Торговля Против Толпы | Smart Money Concepts ', 'color: #00D084; font-size: 12px;');

    console.log('✅ RaTrading Academy website loaded successfully');
});
