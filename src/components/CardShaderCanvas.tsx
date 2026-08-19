import React, { useEffect, useRef } from 'react';

interface FlameColorPalette {
  core: [number, number, number];   // Hot glowing crest highlight
  mid: [number, number, number];    // Main burning fire body
  base: [number, number, number];   // Deep bottom plasma
}

export const hexToRgb01 = (hex: string): [number, number, number] => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
};

// Rich, large burning flame palettes matching React Bits Shader Card
export const FLAME_PALETTES: Record<string, FlameColorPalette> = {
  // Iconic React Bits Pro Purple Flame
  'default': {
    core: hexToRgb01('#e879f9'), // Luminous magenta/pink flame crest
    mid: hexToRgb01('#7c3aed'),  // Electric vivid violet-purple
    base: hexToRgb01('#2e1065'), // Deep royal violet bottom
  },
  'purple-flame': {
    core: hexToRgb01('#f5d0fe'),
    mid: hexToRgb01('#8b5cf6'),
    base: hexToRgb01('#3b0764'),
  },
  'tech-1': {
    // Sapphire & Electric Cyan Fire (Frontend)
    core: hexToRgb01('#7dd3fc'),
    mid: hexToRgb01('#0284c7'),
    base: hexToRgb01('#082f49'),
  },
  'tech-2': {
    // Crimson & Velvet Rose Fire (Backend)
    core: hexToRgb01('#fda4af'),
    mid: hexToRgb01('#e11d48'),
    base: hexToRgb01('#4c0519'),
  },
  'tech-3': {
    // Electric Purple & Amethyst Fire (Web3)
    core: hexToRgb01('#e879f9'),
    mid: hexToRgb01('#7c3aed'),
    base: hexToRgb01('#2e1065'),
  },
  'tech-4': {
    // Emerald & Jade Ghost Fire (Databases)
    core: hexToRgb01('#6ee7b7'),
    mid: hexToRgb01('#059669'),
    base: hexToRgb01('#022c22'),
  },
  'tech-5': {
    // Solar Amber & Gold Fire (Leadership)
    core: hexToRgb01('#fde68a'),
    mid: hexToRgb01('#d97706'),
    base: hexToRgb01('#451a03'),
  },
  'tech-6': {
    // Cyber Magenta & Violet Fire (Tools & AI)
    core: hexToRgb01('#f0abfc'),
    mid: hexToRgb01('#c026d3'),
    base: hexToRgb01('#4a044e'),
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

  // Multi-octave FBM for organic volumetric flame crest
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = rot * p * 2.05 + vec2(0.0, -u_time * 0.95); // upward rising buoyancy
      a *= 0.48;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = st;
    p.x *= aspect;

    // Time variables
    float t = u_time * 0.8;

    // Multi-layer domain warping for turbulent, lively flame tongues
    vec2 q = vec2(
      fbm(vec2(p.x * 2.1, p.y * 1.6 - t * 0.5)),
      fbm(vec2(p.x * 2.1 + 5.2, p.y * 1.6 - t * 0.6))
    );

    vec2 r = vec2(
      fbm(vec2(p.x * 2.5 + 3.0 * q.x, p.y * 1.8 - t * 0.7)),
      fbm(vec2(p.x * 2.5 + 3.0 * q.y + 3.4, p.y * 1.8 - t * 0.7))
    );

    float flameNoise = fbm(vec2(p.x * 2.8 + 3.6 * r.x, p.y * 2.2 - t * 0.85));

    // Large flame height: covers bottom ~65% of the card with organic mountain-like peaks
    // Peak rises higher on the right side (matching React Bits Shader Card reference)
    float rightBias = smoothstep(0.0, 1.0, st.x) * 0.22;
    float mouseLift = (1.0 - u_mouse.y) * 0.12;
    float flameHeight = 0.56 + rightBias + flameNoise * 0.32 + q.x * 0.14 + mouseLift;

    // Vertical distance from flame crest (positive = inside flame, negative = above flame)
    float dist = flameHeight - st.y;

    // Organic flame alpha falloff at upper crest
    float flameAlpha = smoothstep(-0.16, 0.08, dist);

    // Internal flame stratification (crest highlight -> vivid mid body -> deep base)
    float crestFactor = smoothstep(-0.06, 0.18, dist);
    float deepFactor  = smoothstep(0.22, 0.65, dist);

    // Color ramp
    vec3 col = mix(u_color_mid, u_color_core, smoothstep(0.0, 0.25, dist) * (1.0 - deepFactor * 0.7));
    col = mix(col, u_color_base, deepFactor * 0.65);

    // Thermal luminescent bloom on crest boundary
    float crestGlow = exp(-abs(dist) * 9.0) * 0.6;
    col += u_color_core * crestGlow;

    // Overall alpha with intensity multiplier on hover
    float alpha = flameAlpha * 0.96 * u_intensity;
    alpha = clamp(alpha, 0.0, 0.98);

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
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.7, y: 0.5 });
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
        gl.uniform1f(uIntensity, isHovered ? 1.2 : 1.0);

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
        isHovered ? 'opacity-100 scale-[1.03]' : 'opacity-90'
      } ${className}`}
      style={{ 
        filter: 'blur(8px)', 
        willChange: 'transform, opacity',
      }}
    />
  );
};
