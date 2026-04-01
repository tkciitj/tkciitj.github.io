import {FC, memo, useEffect, useRef, useState} from 'react';

/* eslint-disable react-hooks/exhaustive-deps */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  baseX: number;
  baseY: number;
  size: number;
  life: number;
  color: string;
  colorIndex: number;
  colorChangeTimer: number;
}

interface BlackHole {
  x: number;
  y: number;
  radius: number;
  active: boolean;
}

interface ParticleSystemProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  colors?: string[];
  density?: number;
  interactive?: boolean;
}

const ParticleSystem: FC<ParticleSystemProps> = memo(
  ({
    text,
    fontSize = 120,
    fontFamily = 'Arial, sans-serif',
    colors = ['#a0f0df', '#64d5ca', '#3baaa0', '#ff6b9d', '#c06c84', '#6c567b'],
    density = 8,
    interactive = true,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({x: 0, y: 0});
    const blackHoleRef = useRef<BlackHole>({x: 0, y: 0, radius: 80, active: false});
    const animationRef = useRef<number>();
    const [isClient, setIsClient] = useState(false);

    // Initialize particles from text
    const initializeParticles = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      particlesRef.current = [];

      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#a0f0df';

      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      canvas.width = Math.max(textWidth + 100, canvas.clientWidth);
      canvas.height = Math.max(textHeight + 100, canvas.clientHeight);

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCtx.font = ctx.font;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillStyle = 'white';
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4 * density) {
        if (data[i + 3] > 128) {
          const pixelIndex = Math.floor(i / 4);
          const x = pixelIndex % tempCanvas.width;
          const y = Math.floor(pixelIndex / tempCanvas.width);
          const colorIndex = Math.floor(Math.random() * colors.length);

          const particle: Particle = {
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            ax: 0,
            ay: 0,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            life: 1,
            color: colors[colorIndex],
            colorIndex,
            colorChangeTimer: Math.random() * 60 + 40,
          };

          particlesRef.current.push(particle);
        }
      }
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(15, 15, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const blackHole = blackHoleRef.current;

      particles.forEach(particle => {
        particle.colorChangeTimer--;
        if (particle.colorChangeTimer <= 0) {
          const newColorIndex = Math.floor(Math.random() * colors.length);
          particle.colorIndex = newColorIndex;
          particle.color = colors[newColorIndex];
          particle.colorChangeTimer = Math.random() * 60 + 40;
        }

        let attractX = particle.baseX;
        let attractY = particle.baseY;
        let attractionStrength = 0.02;

        if (blackHole.active) {
          const dx = blackHole.x - particle.x;
          const dy = blackHole.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < blackHole.radius * 3) {
            attractX = blackHole.x;
            attractY = blackHole.y;
            attractionStrength = 0.15 * (1 - distance / (blackHole.radius * 3));
          }
        }

        const bx = attractX - particle.x;
        const by = attractY - particle.y;
        const distance = Math.sqrt(bx * bx + by * by);

        if (distance > 0.1) {
          particle.ax = (bx / distance) * attractionStrength;
          particle.ay = (by / distance) * attractionStrength;
        }

        particle.vx *= 0.94;
        particle.vy *= 0.94;

        particle.vx += particle.ax;
        particle.vy += particle.ay;

        particle.x += particle.vx;
        particle.y += particle.vy;

        const distFromBase = Math.sqrt(
          Math.pow(particle.x - particle.baseX, 2) + Math.pow(particle.y - particle.baseY, 2),
        );
        particle.life = Math.max(0.2, 1 - distFromBase / 250);

        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (blackHole.active) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#a0f0df';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(blackHole.x, blackHole.y, blackHole.radius + 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (canvasRef.current && interactive) {
        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        blackHoleRef.current = {
          x: clickX,
          y: clickY,
          radius: 80,
          active: true,
        };

        setTimeout(() => {
          blackHoleRef.current.active = false;
        }, 3000);
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initializeParticles(canvas);
      }
    };

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isClient) return;

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      initializeParticles(canvas);
      animate();

      if (interactive) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleMouseClick);
      }
      window.addEventListener('resize', handleResize);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleMouseClick);
        window.removeEventListener('resize', handleResize);
      };
    }, [isClient, text]);

    if (!isClient) return null;

    return (
      <canvas
        className="w-full h-full block cursor-pointer"
        ref={canvasRef}
        style={{
          display: 'block',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
        }}
      />
    );
  },
);

ParticleSystem.displayName = 'ParticleSystem';
export default ParticleSystem;
