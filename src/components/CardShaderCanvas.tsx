import React, { useEffect, useRef } from 'react';

interface FlameColorPalette {
  core: [number, number, number];   // Hot glowing inner flame
  mid: [number, number, number];    // Main burning fire body
  base: [number, number, number];   // Surrounding aura
}

export const hexToRgb01 = (hex: string): [number, number, number] => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
};

// Vibrant Burning Purple/Violet Flame Palette (matching React Bits Pro Shader Card)
export const FLAME_PALETTES: Record<string, FlameColorPalette> = {
  'default': {
    core: hexToRgb01('#ffffff'), // Pure hot white flame center
    mid: hexToRgb01('#c026d3'),  // Blazing electric magenta/purple
    base: hexToRgb01('#7e22ce'), // Deep glowing violet plasma
  },
  'purple-flame': {
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#a855f7'),
    base: hexToRgb01('#6b21a8'),
  },
  'tech-1': {
    // Sapphire & Cyan Electric Fire (Frontend)
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#00b4d8'),
    base: hexToRgb01('#0077b6'),
  },
  'tech-2': {
    // Ruby & Velvet Rose Fire (Backend)
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#f43f5e'),
    base: hexToRgb01('#9f1239'),
  },
  'tech-3': {
    // Mystic Electric Violet Fire (Web3)
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#a855f7'),
    base: hexToRgb01('#6b21a8'),
  },
  'tech-4': {
    // Emerald & Jade Ghost Fire (Databases)
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#10b981'),
    base: hexToRgb01('#047857'),
  },
  'tech-5': {
    // Solar Amber & Gold Fire (Leadership)
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#f59e0b'),
    base: hexToRgb01('#b45309'),
  },
  'tech-6': {
    // Cyber Magenta Fire (Tools & AI)
    core: hexToRgb01('#ffffff'),
    mid: hexToRgb01('#d946ef'),
    base: hexToRgb01('#86198f'),
  },
};

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_color_core;
  uniform vec3 u_color_mid;
  uniform vec3 u_color_base;
  uniform float u_intensity;

  // 2D Hash & Noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // 4-octave FBM with upward flame drift
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = rot * p * 2.1 + vec2(0.0, -u_time * 1.35); // Lively rising flame speed
      a *= 0.48;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = st;
    p.x *= aspect;

    // Position flame blob on right side (React Bits Shader Card signature layout)
    vec2 flameOrigin = vec2(0.68 * aspect, 0.42);
    vec2 mouseOffset = (u_mouse - vec2(0.5)) * 0.15;
    flameOrigin += vec2(mouseOffset.x * aspect, mouseOffset.y);

    float dist = length(p - flameOrigin);

    // Multi-layer domain warping for turbulent licking flame dynamics
    vec2 q = vec2(
      fbm(p * 2.2 + vec2(0.0, -u_time * 0.85)),
      fbm(p * 2.2 + vec2(5.2, 1.3) + vec2(0.0, -u_time * 1.05))
    );

    vec2 r = vec2(
      fbm(p * 2.6 + 3.0 * q + vec2(1.7, 9.2)),
      fbm(p * 2.6 + 3.0 * q + vec2(8.3, 2.8))
    );

    float flame = fbm(p * 3.0 + 3.8 * r);

    // Billowing flame silhouette
    float upwardTendril = clamp((p.y - 0.15) * 1.5, 0.0, 1.8);
    float shape = (flame * 0.95 + q.x * 0.45) - dist * 1.45 + upwardTendril * 0.4;

    // Glowing flame intensity stages
    float outerAura = smoothstep(-0.25, 0.42, shape);
    float midFlame  = smoothstep(0.08, 0.52, shape);
    float hotCore   = smoothstep(0.35, 0.72, shape);

    // Color ramp: Base violet plasma -> Mid electric fire -> Hot blazing core
    vec3 col = mix(u_color_base, u_color_mid, midFlame);
    col = mix(col, u_color_core, hotCore);

    // High-dynamic-range thermal bloom
    col += u_color_mid * (outerAura * 0.5);
    col += u_color_core * (hotCore * 0.85);

    // Alpha: Bright and vivid on right, softly blending on edges
    float alpha = outerAura * u_intensity;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

interface CardShaderCanvasProps {
  cardId: string;
  isHovered?: boolean;
  className?: string;
  forcePurpleTheme?: boolean;
}

export const CardShaderCanvas: React.FC<CardShaderCanvasProps> = ({
  cardId,
  isHovered = false,
  className = '',
  forcePurpleTheme = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.7, y: 0.4 });
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: true, 
      antialias: true, 
      powerPreference: 'low-power' 
    });
    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uColorCore = gl.getUniformLocation(program, 'u_color_core');
    const uColorMid = gl.getUniformLocation(program, 'u_color_mid');
    const uColorBase = gl.getUniformLocation(program, 'u_color_base');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');

    const paletteKey = forcePurpleTheme ? 'purple-flame' : (FLAME_PALETTES[cardId] ? cardId : 'purple-flame');
    const palette = FLAME_PALETTES[paletteKey] || FLAME_PALETTES['purple-flame'];

    gl.uniform3fv(uColorCore, palette.core);
    gl.uniform3fv(uColorMid, palette.mid);
    gl.uniform3fv(uColorBase, palette.base);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        mouseRef.current = { x, y };
      }
    };

    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animationId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      if (isVisibleRef.current) {
        const elapsed = (now - startTime) * 0.001;
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uIntensity, isHovered ? 1.25 : 1.0);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (parentEl) {
        parentEl.removeEventListener('mousemove', handleMouseMove);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [cardId, isHovered, forcePurpleTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ${
        isHovered ? 'opacity-100 scale-105' : 'opacity-85'
      } ${className}`}
      style={{ 
        filter: 'blur(10px)', 
        willChange: 'transform, opacity',
      }}
    />
  );
};
