import React, { useEffect, useRef } from 'react';

export interface RippleGridCanvasProps {
  /** Jarak antar titik grid dalam pixel (default: 32) */
  spacing?: number;
  /** Radius pengaruh riak dari kursor dalam pixel (default: 220) */
  radius?: number;
  /** Warna dasar titik saat idle (default: 'rgba(255, 255, 255, 0.08)') */
  baseColor?: string;
  /** Kecepatan penyebaran gelombang sinus (default: 0.0035) */
  speed?: number;
  /** Amplitudo pergeseran posisi titik (default: 8) */
  amplitude?: number;
  /** Background canvas (default: '#0a0a0f') */
  backgroundColor?: string;
  /** Gunakan listener global di window agar merespons ke seluruh halaman (default: true) */
  globalTracking?: boolean;
  /** ClassName tambahan untuk canvas */
  className?: string;
}

export const RippleGridCanvas: React.FC<RippleGridCanvasProps> = ({
  spacing = 32,
  radius = 220,
  baseColor = 'rgba(255, 255, 255, 0.08)',
  speed = 0.0035,
  amplitude = 8,
  backgroundColor = '#0a0a0f',
  globalTracking = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simpan titik-titik dasar grid dalam Float32Array (x0, y0 berpasangan)
  const gridPointsRef = useRef<Float32Array | null>(null);
  const gridCountRef = useRef<number>(0);

  // Status kursor mouse & touch
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    intensity: 0, // lerp 0 -> 1 saat aktif, 1 -> 0 saat leave
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement || document.body;
    const isTransparent = backgroundColor === 'transparent' || backgroundColor === '';

    const ctx = canvas.getContext('2d', { alpha: isTransparent });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // 1. Menghitung dan menyimpan posisi grid dasar
    const calculateGrid = () => {
      const rect = globalTracking
        ? { width: window.innerWidth, height: window.innerHeight }
        : parent.getBoundingClientRect();
      
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = (height - (rows - 1) * spacing) / 2;

      const totalDots = cols * rows;
      gridCountRef.current = totalDots;

      const points = new Float32Array(totalDots * 2);
      let idx = 0;

      for (let r = 0; r < rows; r++) {
        const y = startY + r * spacing;
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacing;
          points[idx] = x;
          points[idx + 1] = y;
          idx += 2;
        }
      }

      gridPointsRef.current = points;
    };

    calculateGrid();

    // 2. Mouse & Touch handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (globalTracking) {
        mouseRef.current.targetX = e.clientX;
        mouseRef.current.targetY = e.clientY;
      } else {
        const rect = parent.getBoundingClientRect();
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
      }
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        if (globalTracking) {
          mouseRef.current.targetX = e.touches[0].clientX;
          mouseRef.current.targetY = e.touches[0].clientY;
        } else {
          const rect = parent.getBoundingClientRect();
          mouseRef.current.targetX = e.touches[0].clientX - rect.left;
          mouseRef.current.targetY = e.touches[0].clientY - rect.top;
        }
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    const targetEventElement = globalTracking ? window : parent;

    targetEventElement.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
    targetEventElement.addEventListener('mouseleave', handleMouseLeave as EventListener, { passive: true });
    targetEventElement.addEventListener('touchmove', handleTouchMove as EventListener, { passive: true });
    targetEventElement.addEventListener('touchend', handleTouchEnd as EventListener, { passive: true });
    targetEventElement.addEventListener('touchcancel', handleTouchEnd as EventListener, { passive: true });

    window.addEventListener('resize', calculateGrid, { passive: true });

    // 3. Render Loop (Subtle, elegant monochrome dots aligned with Hero)
    const baseRadius = 1.3;
    const maxRadius = 3.2;
    const waveFreq = 0.045;
    const radiusSq = radius * radius;
    const TWO_PI = Math.PI * 2;

    const render = (timestamp: number) => {
      const points = gridPointsRef.current;
      const count = gridCountRef.current;

      if (!points || count === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const mouse = mouseRef.current;
      const targetIntensity = mouse.active ? 1 : 0;
      mouse.intensity += (targetIntensity - mouse.intensity) * 0.06;

      if (mouse.x < -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;
      }

      const mx = mouse.x;
      const my = mouse.y;
      const intensity = mouse.intensity;
      const timePhase = timestamp * speed;

      // Background clear
      if (isTransparent) {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Reset shadow for batch drawing
      ctx.shadowBlur = 0;

      // Optimasi gambar titik idle
      ctx.fillStyle = baseColor;
      ctx.beginPath();

      const hasActiveRipple = intensity > 0.005;

      for (let i = 0; i < count; i++) {
        const pIdx = i * 2;
        const x0 = points[pIdx];
        const y0 = points[pIdx + 1];

        if (!hasActiveRipple) {
          ctx.moveTo(x0 + baseRadius, y0);
          ctx.arc(x0, y0, baseRadius, 0, TWO_PI);
          continue;
        }

        const dx = x0 - mx;
        const dy = y0 - my;
        const distSq = dx * dx + dy * dy;

        if (distSq >= radiusSq) {
          ctx.moveTo(x0 + baseRadius, y0);
          ctx.arc(x0, y0, baseRadius, 0, TWO_PI);
        }
      }
      ctx.fill();

      // Render titik-titik ripple dengan warna monokrom abu-putih redup dan subtle
      if (hasActiveRipple) {
        for (let i = 0; i < count; i++) {
          const pIdx = i * 2;
          const x0 = points[pIdx];
          const y0 = points[pIdx + 1];

          const dx = x0 - mx;
          const dy = y0 - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const normDist = dist / radius;

            const envelope = Math.cos(normDist * Math.PI * 0.5) * intensity;
            const wave = Math.sin(dist * waveFreq - timePhase);
            const crestFactor = (wave + 1) * 0.5;

            // 1. Radial Displacement
            let dirX = 0;
            let dirY = 0;
            if (dist > 0.001) {
              dirX = dx / dist;
              dirY = dy / dist;
            }
            const shift = wave * amplitude * envelope;
            const renderX = x0 + dirX * shift;
            const renderY = y0 + dirY * shift;

            // 2. Modulasi Ukuran Titik
            const dotSize = baseRadius + (maxRadius - baseRadius) * envelope * (0.3 + 0.7 * crestFactor);

            // 3. Warna Pink Neon Bercahaya (Neon Pink #ff2d87 / rgba(255, 45, 135))
            const alpha = Math.min(0.15 + 0.65 * envelope * (0.35 + 0.65 * crestFactor), 0.95).toFixed(3);

            // Glowing Neon Pink shadow untuk puncak gelombang
            if (crestFactor > 0.6 && envelope > 0.3) {
              ctx.shadowColor = `rgba(255, 45, 135, 0.85)`;
              ctx.shadowBlur = Math.round(10 * envelope * crestFactor);
            } else {
              ctx.shadowBlur = 0;
            }

            // Gradasi warna titik: dari pink magenta lembut ke pink neon terang di puncak
            if (crestFactor > 0.7) {
              ctx.fillStyle = `rgba(255, 90, 180, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(255, 45, 135, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(renderX, renderY, dotSize, 0, TWO_PI);
            ctx.fill();
          }
        }
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', calculateGrid);
      targetEventElement.removeEventListener('mousemove', handleMouseMove as EventListener);
      targetEventElement.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      targetEventElement.removeEventListener('touchmove', handleTouchMove as EventListener);
      targetEventElement.removeEventListener('touchend', handleTouchEnd as EventListener);
      targetEventElement.removeEventListener('touchcancel', handleTouchEnd as EventListener);
    };
  }, [spacing, radius, baseColor, speed, amplitude, backgroundColor, globalTracking]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};
