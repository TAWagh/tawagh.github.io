/**
 * PORTFOLIO ENGINE
 * High-Performance Modular Architecture
 */
const PortfolioApp = (() => {
    // Shared State
    const state = {
        mouse: { x: -1000, y: -1000, radius: 250 },
        ripples: [],
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        time: 0
    };

    // Canvas Module - Optimized for zero GC pauses in animation loop
    const CanvasEngine = {
        init() {
            this.canvas = document.getElementById('interactive-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            if (!this.ctx) return;
            this.mesh = [];
            this.waveColor = '#00acac'; // Default fallback (Teal)
            this.waveOpacityMax = 0.15;
            
            this.updateThemeColor();
            this.resize();
            this.buildMesh(); // Pre-calculate coordinates to prevent memory leak
            this.events();
            this.animate();
        },
        updateThemeColor() {
            // Cached on load and toggle to avoid computing styles 60x a second
            const computedStyle = getComputedStyle(document.body);
            this.waveColor = computedStyle.getPropertyValue('--wave-color').trim() || computedStyle.getPropertyValue('--color-accent').trim() || '#00acac';
            this.waveOpacityMax = parseFloat(computedStyle.getPropertyValue('--wave-opacity').trim()) || 0.15;
        },
        buildMesh() {
            this.mesh = [];
            const rows = 95, cols = 90, spacingX = 110, spacingZ = 25, focalLength = 850;
            for (let iz = 0; iz < rows; iz++) {
                const rowPoints = [];
                const z = iz * spacingZ;
                const scale = focalLength / (focalLength + z);
                for (let ix = 0; ix < cols; ix++) {
                    const x = (ix - cols / 2) * spacingX;
                    // Store static math, only dynamic y/px/py get calculated in loop
                    rowPoints.push({ ix, iz, x, scale, px: 0, py: 0 });
                }
                this.mesh.push(rowPoints);
            }
        },
        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        },
        events() {
            window.addEventListener('resize', () => this.resize());
            
            // Listen globally on window to capture events behind transparent content
            window.addEventListener('mousemove', (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; });
            document.addEventListener('mouseleave', () => { state.mouse.x = -1000; state.mouse.y = -1000; });
            window.addEventListener('mousedown', (e) => { 
                if (!state.prefersReducedMotion) state.ripples.push({ x: e.clientX, y: e.clientY, radius: 0, life: 1 });
            });
        },
        animate() {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.width, this.height);
            state.time += state.prefersReducedMotion ? 0.003 : 0.012;

            for (let i = state.ripples.length - 1; i >= 0; i--) {
                state.ripples[i].radius += 14;
                state.ripples[i].life -= 0.012;
                if (state.ripples[i].life <= 0) state.ripples.splice(i, 1);
            }

            const offsetY = this.height * 0.45;
            const rows = this.mesh.length;
            const cols = this.mesh[0].length;

            // Update existing objects instead of creating new ones
            for (let iz = 0; iz < rows; iz++) {
                for (let ix = 0; ix < cols; ix++) {
                    let p = this.mesh[iz][ix];
                    let y = Math.sin(p.ix * 0.12 + state.time) * Math.cos(p.iz * 0.08 + state.time) * 60 + Math.sin(p.ix * 0.04 - state.time * 0.6) * 20;
                    y += p.iz * 3.5;
                    
                    p.px = this.width / 2 + p.x * p.scale;
                    p.py = offsetY + y * p.scale;

                    if (!state.prefersReducedMotion) {
                        const dx = state.mouse.x - p.px;
                        const dy = state.mouse.y - p.py;
                        const dist = Math.hypot(dx, dy);
                        if (dist < state.mouse.radius) {
                            y -= Math.exp(-(dist*dist)/(2*100*100)) * 150;
                            p.py = offsetY + y * p.scale;
                        }
                        for (const r of state.ripples) {
                            const rdx = r.x - p.px;
                            const rdy = r.y - p.py;
                            const rdist = Math.hypot(rdx, rdy);
                            const distToRing = Math.abs(rdist - r.radius);
                            if (distToRing < 120) {
                                y -= Math.exp(-(distToRing*distToRing)/(2*40*40)) * 180 * r.life;
                                p.py = offsetY + y * p.scale;
                            }
                        }
                    }
                }
            }

            ctx.lineWidth = 1;
            
            for (let iz = 0; iz < rows - 1; iz++) {
                ctx.beginPath();
                for (let ix = 0; ix < cols; ix++) {
                    let p = this.mesh[iz][ix];
                    ix === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
                }
                let depthAlpha = Math.max(0.01, 1 - (iz / rows)) * this.waveOpacityMax;
                ctx.save();
                ctx.globalAlpha = depthAlpha;
                ctx.strokeStyle = this.waveColor;
                ctx.stroke();
                ctx.restore();
            }
            requestAnimationFrame(() => this.animate());
        }
    };

    // UI Module - Optimized DOM measurements
    const UIController = {
        init() {
            this.perspectiveToggle();
            this.scrollProgress();
            this.backToTop();
            this.copyEmailButtons();
            this.smoothSectionLinks();
            this.intersection();
        },
        perspectiveToggle() {
            const toggleContainer = document.querySelector('.perspective-toggle-container');
            const techLabel = document.getElementById('techLabel');
            const businessLabel = document.getElementById('businessLabel');
            if (!toggleContainer || !techLabel || !businessLabel) return;

            const setPerspective = (perspective) => {
                const isTechnology = perspective === 'technology';
                document.body.classList.toggle('light-mode', !isTechnology);

                if (isTechnology) {
                    businessLabel.classList.remove('active');
                    businessLabel.setAttribute('aria-pressed', 'false');
                    techLabel.classList.add('active');
                    techLabel.setAttribute('aria-pressed', 'true');
                } else {
                    businessLabel.classList.add('active');
                    businessLabel.setAttribute('aria-pressed', 'true');
                    techLabel.classList.remove('active');
                    techLabel.setAttribute('aria-pressed', 'false');
                }

                toggleContainer.classList.toggle('is-technology', isTechnology);
                CanvasEngine.updateThemeColor(); // Sync canvas color on swap
            };

            // Ensure UI + theme are correct on initial load.
            setPerspective(document.body.classList.contains('light-mode') ? 'business' : 'technology');
            businessLabel.addEventListener('click', () => setPerspective('business'));
            techLabel.addEventListener('click', () => setPerspective('technology'));
        },
        scrollProgress() {
            const track = document.getElementById('track');
            const wrapper = document.querySelector('.horizontal-scroll-wrapper');
            if (!track || !wrapper) return;
            const STACK_LAYOUT_BREAKPOINT = 992;
            let currentX = 0, targetX = 0;
            
            // Cache DOM metrics to prevent forcing reflow in animation frame
            let tWidth = 0, vWidth = 0, vHeight = 0, wOffsetTop = 0, wScrollHeight = 0;

            const updateMetrics = () => {
                vWidth = window.innerWidth;
                vHeight = window.innerHeight;
                if (vWidth > STACK_LAYOUT_BREAKPOINT) {
                    tWidth = track.scrollWidth;
                    wrapper.style.height = `${tWidth - vWidth + vHeight}px`;
                    wOffsetTop = wrapper.offsetTop;
                    wScrollHeight = wrapper.scrollHeight;
                } else {
                    wrapper.style.height = 'auto';
                    track.style.transform = 'none';
                }
                calculateTarget();
            };

            const calculateTarget = () => {
                if (vWidth > STACK_LAYOUT_BREAKPOINT) {
                    const scrollRange = wScrollHeight - vHeight;
                    if (scrollRange <= 0) {
                        targetX = 0;
                        return;
                    }
                    const progress = Math.max(0, Math.min(1, (window.scrollY - wOffsetTop) / scrollRange));
                    targetX = progress * (tWidth - vWidth);
                }
            };

            window.addEventListener('resize', updateMetrics);
            window.addEventListener('scroll', calculateTarget, { passive: true });
            
            // Initial calculation after paints
            setTimeout(updateMetrics, 50);

            const run = () => {
                if (vWidth > STACK_LAYOUT_BREAKPOINT && Math.abs(targetX - currentX) > 0.05) {
                    currentX += (targetX - currentX) * 0.1;
                    track.style.transform = `translate3d(${-currentX}px, 0, 0)`;
                }
                requestAnimationFrame(run);
            };
            run();
        },
        backToTop() {
            const btn = document.getElementById('backToTop');
            if (!btn) return;
            window.addEventListener('scroll', () => {
                btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.6);
            }, { passive: true });
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: state.prefersReducedMotion ? 'auto' : 'smooth' });
            });
        },
        smoothSectionLinks() {
            document.querySelectorAll('a[href^="#"]').forEach((link) => {
                link.addEventListener('click', (event) => {
                    const targetId = link.getAttribute('href');
                    if (!targetId || targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (!target) return;

                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: state.prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                });
            });
        },
        copyEmailButtons() {
            const fallbackCopy = (text) => {
                const tempInput = document.createElement('textarea');
                tempInput.value = text;
                tempInput.setAttribute('readonly', '');
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            };

            document.querySelectorAll('[data-copy-email]').forEach((btn) => {
                btn.addEventListener('click', async (event) => {
                    event.preventDefault();
                    const email = btn.getAttribute('data-copy-email');
                    if (!email) return;

                    try {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            await navigator.clipboard.writeText(email);
                        } else {
                            fallbackCopy(email);
                        }
                    } catch {
                        fallbackCopy(email);
                    }

                    const originalText = btn.textContent;
                    btn.textContent = 'Copied';
                    setTimeout(() => {
                        btn.textContent = originalText;
                    }, 1200);
                });
            });
        },
        intersection() {
            if (!('IntersectionObserver' in window)) {
                document.querySelectorAll('.project-content').forEach((content) => content.classList.add('visible'));
                return;
            }

            const obs = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const content = entry.target.querySelector('.project-content');
                    if (content) content.classList.add('visible');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.project-panel').forEach((panel) => obs.observe(panel));
        }
    };

    return {
        start() {
            CanvasEngine.init();
            UIController.init();
        }
    };
})();

document.addEventListener('DOMContentLoaded', PortfolioApp.start);


