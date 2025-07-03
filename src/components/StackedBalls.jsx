import React, { useRef, useEffect } from 'react';

const StackedBalls = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);
    const ballsRef = useRef([]);
    const ballsCreatedRef = useRef(false);

    const skillsData = [
        { text: 'NODE.JS,\nEXPRESS.JS,\nDJANGO', color: '#fb64b6', size: 'large' },
        { text: 'MYSQL,\nFIREBASE', color: '#fb64b6', size: 'medium' },
        { text: 'ANGULAR,\nLARAVEL', color: '#fb64b6', size: 'medium' },
        { text: 'REACT,\nVUE.JS,\nNEXT.JS', color: '#fb64b6', size: 'large' },
        { text: 'WORDPRESS,\nELEMENTOR,\nHEADLESS CMS', color: '#fb64b6', size: 'large' },
        { text: 'VANILLA JS,\nTYPESCRIPT', color: '#fb64b6', size: 'medium' },
        { text: 'THREE.JS,\nANIME.JS,\nGSAP', color: '#fb64b6', size: 'large' },
        { text: 'C#', color: '#fb64b6', size: 'small' },
        { text: 'WEBFLOW', color: '#fb64b6', size: 'medium' },
        { text: 'FRAMER,\nTILDA,\nREADYMAG,\nWIX STUDIO', color: '#fb64b6', size: 'large' },
        { text: 'RESEARCH &\nANALYTICS', color: '#FFC107', size: 'large' },
        { text: 'STRATEGY', color: '#FFC107', size: 'large' },
        { text: 'AI', color: '#FFC107', size: 'small' },
        { text: 'BRAND\nIDENTITY', color: '#FFC107', size: 'medium' },
        { text: 'TRENDS', color: '#FFC107', size: 'medium' },
        { text: 'FEATURE\nINSIGHTS', color: '#FFC107', size: 'large' },
        { text: 'ART DIRECTION', color: '#FFC107', size: 'large' },
        { text: '3D', color: '#FFC107', size: 'small' },
        { text: 'TESTING', color: '#FFC107', size: 'medium' }
    ];

    const getSizeRadius = (size) => {
        switch (size) {
            case 'small': return 55;
            case 'medium': return 75;
            case 'large': return 95;
            default: return 65;
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
            World.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }));

            Events.on(render, 'afterRender', () => {
                const ctx = render.canvas.getContext('2d');
                ballsRef.current.forEach(b => {
                    if (!b.body) return;
                    const p = b.body.position;
                    const r = b.body.circleRadius;
                    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(b.body.angle);
                    ctx.beginPath(); ctx.arc(0, 0, r, 0, 2 * Math.PI); ctx.fillStyle = b.color; ctx.fill();
                    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.max(10, r * 0.22)}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    const lines = b.text.split('\n');
                    const lh = Math.max(12, r * 0.22);
                    const start = -(lines.length - 1) * lh / 2;
                    lines.forEach((l,i) => ctx.fillText(l, 0, start + i * lh));
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
                World.add(engine.world, balls.map(b=>b.body));
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

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-auto" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default StackedBalls;