import React, { useRef, useEffect, useState, useMemo } from 'react';

const StackedBalls = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);
    const ballsRef = useRef([]);
    const ballsCreatedRef = useRef(false);

    // useEffect(() => {
    //     const handleResize = () => setWindowWidth(window.innerWidth);
    //     handleResize(); // 👈 Set initial width immediately
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    const skillsData = [
        { text: 'DIGITAL BRAND\nPRESENCE', color: '#FFC107', size: 'large' },
        { text: 'MARKET &\nCOMPETITOR\nANALYSIS', color: '#FFC107', size: 'large' },
        { text: 'BRAND\nSTORYTELLING', color: '#FFC107', size: 'medium' },
        { text: 'SEO', color: '#fb64b6', size: 'small' },
        { text: 'PPC', color: '#fb64b6', size: 'small' },
        { text: 'GOOGLE\nADS', color: '#fb64b6', size: 'medium' },
        { text: 'SOCIAL MEDIA\nMARKETING', color: '#FFC107', size: 'large' },
        { text: 'CONTENT\nCREATION', color: '#FFC107', size: 'medium' },
        { text: 'REMARKETING\nCAMPAIGN', color: '#fb64b6', size: 'medium' },
        { text: 'GOOGLE\nRANKING', color: '#fb64b6', size: 'medium' },
        { text: 'INFLUENCER\nMARKETING', color: '#FFC107', size: 'large' },
        { text: 'MOBILE APP\nDEVELOPMENT', color: '#fb64b6', size: 'large' },
        { text: 'BOOKING &\nRESERVATION\nINTEGRATION', color: '#fb64b6', size: 'large' },
        { text: 'Email Marketing', color: '#FFC107', size: 'large' }
    ];

    // const getSizeRadius = (size) => {
    //     switch (size) {
    //         case 'small': return windowWidth > 1200 ? 55 : windowWidth > 900 ? 40 : 25;
    //         case 'medium': return windowWidth > 1200 ? 75 : windowWidth > 900 ? 60 : 45;
    //         case 'large': return windowWidth > 1200 ? 95 : windowWidth > 900 ? 80 : 60;
    //         default: return windowWidth > 1200 ? 65 : windowWidth > 900 ? 50 : 35;
    //     }
    // };
    const getSizeRadius = (size) => {
        const w = window.innerWidth;
        switch (size) {
            case 'small': return w > 1200 ? 55 : w > 900 ? 40 : 25;
            case 'medium': return w > 1200 ? 75 : w > 900 ? 60 : 45;
            case 'large': return w > 1200 ? 95 : w > 900 ? 80 : 60;
            default: return w > 1200 ? 65 : w > 900 ? 50 : 35;
        }
    };

    useEffect(() => {
        const loadMatter = async () => {
            const Matter = await import('matter-js');
            const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

            if (!canvasRef.current || !containerRef.current) return;
            const canvas = canvasRef.current;
            const container = containerRef.current.parentElement;

            const getActualDimensions = () => {
                const computedStyle = window.getComputedStyle(container);
                const width = parseFloat(computedStyle.width);
                const height = parseFloat(computedStyle.height);
                return { width, height };
            };

            const { width, height } = getActualDimensions();

            canvas.width = width;
            canvas.height = height;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            const engine = Engine.create();
            engine.world.gravity.y = 0.8;
            engineRef.current = engine;

            const render = Render.create({
                canvas,
                engine,
                options: { width: width, height: height, wireframes: false, background: 'transparent' }
            });
            renderRef.current = render;

            const boundaries = [
                Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }),
                Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),
                Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true })
            ];
            World.add(engine.world, boundaries);

            const mouse = Mouse.create(render.canvas);
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (!isTouchDevice) {
                const mouseConstraint = MouseConstraint.create(engine, {
                    mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: { visible: false }
                    }
                });
                World.add(engine.world, mouseConstraint);
            }

            Events.on(render, 'afterRender', () => {
                const ctx = render.canvas.getContext('2d');
                ballsRef.current.forEach(b => {
                    if (!b.body) return;
                    const p = b.body.position;
                    const r = b.body.circleRadius;
                    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(b.body.angle);
                    ctx.beginPath(); ctx.arc(0, 0, r, 0, 2 * Math.PI); ctx.fillStyle = b.color; ctx.fill();
                    ctx.fillStyle = '#fff';

                    // Improved font size calculation - bigger minimum for small balls
                    // const fontSize = r <= 55 ? Math.max(16, r * 0.3) : Math.max(10, r * 0.22);
                    const baseFontSize = r <= 55 ? r * 0.3 : r * 0.22;
                    let fontSize;
                    if (window.innerWidth <= 600) {
                        fontSize = baseFontSize * 0.6;
                    } else if (window.innerWidth <= 900) {
                        fontSize = baseFontSize * 0.8;
                    } else {
                        fontSize = baseFontSize;
                    }
                    fontSize = Math.max(8, fontSize);
                    ctx.font = `bold ${fontSize}px Arial`;
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

                    const lines = b.text.split('\n');
                    const lh = Math.max(12, fontSize * 1.1);
                    const start = -(lines.length - 1) * lh / 2;
                    lines.forEach((l, i) => ctx.fillText(l, 0, start + i * lh));
                    ctx.restore();
                });
            });

            const runner = Runner.create(); runnerRef.current = runner;
            Runner.run(runner, engine);
            Render.run(render);

            const createBalls = () => {
                ballsRef.current.forEach(b => World.remove(engine.world, b.body));
                const balls = skillsData.map((skill, i) => {
                    const r = getSizeRadius(skill.size);
                    const x = Math.random() * (width - 2 * r) + r;
                    const y = -r - i * 80;
                    const body = Bodies.circle(x, y, r, { restitution: 0.6, friction: 0.8 });
                    return { body, text: skill.text, color: skill.color };
                });
                ballsCreatedRef.current = true;
                ballsRef.current = balls;
                World.add(engine.world, balls.map(b => b.body));
            };

            const observer = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting && !ballsCreatedRef.current) {
                        createBalls();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(container);

            return () => {
                observer.disconnect();
                Runner.stop(runner);
                Render.stop(render);
                Engine.clear(engine);
            };
        };
        loadMatter();
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (renderRef.current && containerRef.current) {
                const container = containerRef.current.parentElement;
                const computedStyle = window.getComputedStyle(container);
                const width = parseFloat(computedStyle.width);
                const height = parseFloat(computedStyle.height);

                const canvas = renderRef.current.canvas;
                canvas.width = width;
                canvas.height = height;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';

                renderRef.current.options.width = width;
                renderRef.current.options.height = height;
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);



    const isTouchDevice = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }, []);




    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full ${isTouchDevice ? 'pointer-events-none' : 'pointer-events-auto'}`} />
        </div>
    );
};

export default StackedBalls;