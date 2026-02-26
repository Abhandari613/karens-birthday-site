'use client';

import { useEffect, useRef } from 'react';

// ─── Bokeh Orb configuration ───────────────────────────────────────────────
const ORB_CONFIG = [
    { top: '5%', left: '10%', w: 320, h: 280, color: 'rgba(63,81,181,0.55)', dur: 32, del: 0, ox: 60, oy: -40 },
    { top: '20%', left: '75%', w: 260, h: 260, color: 'rgba(230,74,25,0.35)', dur: 27, del: -8, ox: -50, oy: 50 },
    { top: '55%', left: '5%', w: 200, h: 220, color: 'rgba(255,202,40,0.30)', dur: 38, del: -15, ox: 70, oy: -60 },
    { top: '70%', left: '80%', w: 280, h: 240, color: 'rgba(26,35,126,0.60)', dur: 24, del: -5, ox: -40, oy: -30 },
    { top: '40%', left: '45%', w: 360, h: 300, color: 'rgba(63,81,181,0.25)', dur: 44, del: -20, ox: 30, oy: 50 },
    { top: '85%', left: '30%', w: 200, h: 180, color: 'rgba(230,74,25,0.25)', dur: 30, del: -12, ox: -60, oy: -20 },
    { top: '10%', left: '50%', w: 150, h: 160, color: 'rgba(255,202,40,0.20)', dur: 36, del: -7, ox: 50, oy: 30 },
    { top: '60%', left: '60%', w: 240, h: 200, color: 'rgba(46,125,50,0.20)', dur: 29, del: -18, ox: -30, oy: -50 },
    { top: '30%', left: '20%', w: 180, h: 200, color: 'rgba(63,81,181,0.30)', dur: 41, del: -3, ox: 40, oy: -40 },
    { top: '80%', left: '65%', w: 140, h: 140, color: 'rgba(255,112,67,0.25)', dur: 22, del: -14, ox: -45, oy: 35 },
] as const;

// ─── Floating emoji layer ───────────────────────────────────────────────────
const EMOJI_CONFIG = [
    { emoji: '🌸', left: '8%', dur: 22, del: 0, size: '1.4rem', sway: 40 },
    { emoji: '✨', left: '18%', dur: 18, del: -6, size: '1.0rem', sway: -30 },
    { emoji: '🌿', left: '30%', dur: 26, del: -12, size: '1.6rem', sway: 50 },
    { emoji: '🎊', left: '44%', dur: 20, del: -3, size: '1.2rem', sway: -40 },
    { emoji: '🌺', left: '58%', dur: 30, del: -9, size: '1.5rem', sway: 35 },
    { emoji: '⭐', left: '70%', dur: 16, del: -15, size: '1.0rem', sway: -50 },
    { emoji: '🌸', left: '82%', dur: 24, del: -4, size: '1.3rem', sway: 45 },
    { emoji: '✨', left: '92%', dur: 19, del: -11, size: '0.9rem', sway: -35 },
    { emoji: '🎉', left: '25%', dur: 34, del: -7, size: '1.1rem', sway: 60 },
    { emoji: '🌿', left: '75%', dur: 28, del: -17, size: '1.4rem', sway: -55 },
] as const;

// ─── Canvas particle system ─────────────────────────────────────────────────
interface Particle {
    x: number;
    y: number;
    vy: number;       // upward velocity
    vx: number;       // horizontal drift
    radius: number;
    opacity: number;
    opacityDir: number;
    color: string;
    life: number;
    maxLife: number;
}

const PARTICLE_COLORS = [
    'rgba(255,202,40,',   // gold
    'rgba(255,255,255,',  // white
    'rgba(200,180,255,',  // lavender
    'rgba(255,160,100,',  // terracotta-soft
];

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
    const maxLife = 200 + Math.random() * 300;
    return {
        x: Math.random() * canvasWidth,
        y: canvasHeight + Math.random() * 100,
        vy: 0.3 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        radius: 1 + Math.random() * 2.5,
        opacity: 0,
        opacityDir: 1,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        life: 0,
        maxLife,
    };
}

export default function AmbientBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const PARTICLE_COUNT = 55;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Seed initial particles spread at different y positions
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = createParticle(canvas.width, canvas.height);
            p.y = Math.random() * canvas.height;   // scatter vertically at start
            p.life = Math.random() * p.maxLife;
            particles.push(p);
        }

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y -= p.vy;
                p.life += 1;

                // Fade in during first 20% of life, fade out during last 20%
                const progress = p.life / p.maxLife;
                if (progress < 0.2) {
                    p.opacity = progress / 0.2 * 0.85;
                } else if (progress > 0.8) {
                    p.opacity = ((1 - progress) / 0.2) * 0.85;
                } else {
                    p.opacity = 0.85;
                }

                // Recycle when past top or dead
                if (p.y < -20 || p.life >= p.maxLife) {
                    particles[i] = createParticle(canvas.width, canvas.height);
                    continue;
                }

                // Draw glowing dot
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
                grd.addColorStop(0, `${p.color}${p.opacity})`);
                grd.addColorStop(1, `${p.color}0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
            }

            animId = requestAnimationFrame(tick);
        };

        tick();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
        >
            {/* ── L2: Bokeh orbs ──────────────────────────────────────── */}
            <div className="absolute inset-0 overflow-hidden">
                {ORB_CONFIG.map((orb, i) => (
                    <div
                        key={i}
                        className="ambient-orb"
                        style={{
                            top: orb.top,
                            left: orb.left,
                            width: orb.w,
                            height: orb.h,
                            background: orb.color,
                            '--orb-duration': `${orb.dur}s`,
                            '--orb-delay': `${orb.del}s`,
                            '--orb-x': `${orb.ox}px`,
                            '--orb-y': `${orb.oy}px`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* ── L3: Canvas particle sparkles ─────────────────────────── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.7 }}
            />

            {/* ── L4: Floating emoji petals ────────────────────────────── */}
            {EMOJI_CONFIG.map((e, i) => (
                <span
                    key={i}
                    className="ambient-emoji"
                    style={{
                        '--emoji-duration': `${e.dur}s`,
                        '--emoji-delay': `${e.del}s`,
                        '--emoji-size': e.size,
                        '--emoji-left': e.left,
                        '--sway-x': `${e.sway}px`,
                    } as React.CSSProperties}
                >
                    {e.emoji}
                </span>
            ))}

            {/* ── L5: SVG noise + radial vignette ─────────────────────── */}
            <svg
                className="absolute inset-0 w-full h-full ambient-noise"
                xmlns="http://www.w3.org/2000/svg"
                style={{ mixBlendMode: 'overlay' }}
            >
                <filter id="noise-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise-filter)" opacity="0.4" />
            </svg>

            {/* Radial vignette to pull edges into darkness */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(10,10,30,0.55) 100%)',
                }}
            />
        </div>
    );
}
