import React, { useEffect, useRef } from 'react';

interface ShaderColorPalette {
  primary: [number, number, number];   // RGB in 0..1
  secondary: [number, number, number]; // RGB in 0..1
  highlight: [number, number, number]; // RGB in 0..1
}

// Convert Hex to RGB 0..1
export const hexToRgb01 = (hex: string): [number, number, number] => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
};

export const SHADER_PALETTES: Record<string, ShaderColorPalette> = {
  'tech-1': {
    // Sapphire & Electric Cyan (Frontend)
    primary: hexToRgb01('#0f2b5c'),
    secondary: hexToRgb01('#0284c7'),
    highlight: hexToRgb01('#38bdf8'),
  },
  'tech-2': {
    // Crimson Noir & Rose (Backend)
    primary: hexToRgb01('#4c0519'),
    secondary: hexToRgb01('#be123c'),
    highlight: hexToRgb01('#fb7185'),
  },
  'tech-3': {
    // Mystic Violet & Amethyst (Web3)
    primary: hexToRgb01('#2e1065'),
    secondary: hexToRgb01('#6d28d9'),
    highlight: hexToRgb01('#a78bfa'),
  },
  'tech-4': {
    // Deep Emerald & Mint (Database)
    primary: hexToRgb01('#022c22'),
    secondary: hexToRgb01('#047857'),
    highlight: hexToRgb01('#34d399'),
  },
  'tech-5': {
    // Amber & Topaz Gold (Leadership)
    primary: hexToRgb01('#451a03'),
    secondary: hexToRgb01('#b45309'),
    highlight: hexToRgb01('#fbbf24'),
  },
  'tech-6': {
    // Cyber Magenta & Indigo (Tools & AI)
    primary: hexToRgb01('#3b0764'),
    secondary: hexToRgb01('#7e22ce'),
    highlight: hexToRgb01('#c084fc'),
  },
};

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Organic fluid wave calculations
    float t = u_time * 0.45;
    vec2 p = st * 1.8;

    // Smooth sinusoidal fluid displacement
    float q = sin(p.x * 2.2 + t * 0.7 + sin(p.y * 2.8 + t * 0.5));
    float r = cos(p.y * 2.0 - t * 0.6 + cos(p.x * 2.4 + t * 0.4));
    float s = sin((p.x + p.y) * 1.5 + t * 0.9);

    // Mouse influence
    vec2 mouseNorm = u_mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
    float mouseDist = length(st - mouseNorm);
    float mouseRipple = sin(mouseDist * 10.0 - t * 2.0) * exp(-mouseDist * 3.0) * 0.25;

    float fluidFactor = smoothstep(-1.2, 1.2, q + r * 0.6 + s * 0.5 + mouseRipple);

    // Color gradient mixing
    vec3 col = mix(u_color1, u_color2, fluidFactor);
    col = mix(col, u_color3, smoothstep(0.3, 0.9, s + mouseRipple));

    // Dark moody vignette: bottom-left & top-right aura
    float cornerGlow = length(st - vec2(0.8, 0.2)) * 0.8;
    float alpha = smoothstep(0.0, 0.85, fluidFactor) * (1.1 - cornerGlow * 0.4);
    alpha = clamp(alpha * 0.75, 0.0, 0.85);

    gl_FragColor = vec4(col, alpha);
  }
`;

interface CardShaderCanvasProps {
  cardId: string;
  isHovered?: boolean;
  className?: string;
}

export const CardShaderCanvas: React.FC<CardShaderCanvasProps> = ({
  cardId,
  isHovered = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
    if (!gl) return;

    // Compile Shader helper
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

    // Quad geometry covering whole viewport
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

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uColor3 = gl.getUniformLocation(program, 'u_color3');

    // Set Colors based on Card ID
    const palette = SHADER_PALETTES[cardId] || SHADER_PALETTES['tech-1'];
    gl.uniform3fv(uColor1, palette.primary);
    gl.uniform3fv(uColor2, palette.secondary);
    gl.uniform3fv(uColor3, palette.highlight);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Resize handler
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

    // Intersection observer to only render when visible in viewport
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    // Mouse movement listener on parent
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
    let startTime = performance.now();

    const render = (now: number) => {
      if (isVisibleRef.current) {
        const elapsed = (now - startTime) * 0.001;
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

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
  }, [cardId]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
        isHovered ? 'opacity-90 scale-105' : 'opacity-65'
      } ${className}`}
      style={{ filter: 'blur(28px)', willChange: 'transform, opacity' }}
    />
  );
};
