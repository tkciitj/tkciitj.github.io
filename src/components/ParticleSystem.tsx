import {FC, memo, useEffect, useRef, useState} from 'react';

/* eslint-disable react-hooks/exhaustive-deps */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  life: number;
  color: string;
  forming: boolean;
}

interface ParticleSystemProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  colors?: string[];
}

const ParticleSystem: FC<ParticleSystemProps> = memo(
  ({
    text,
    fontSize = 200,
    fontFamily = 'Arial, sans-serif',
    colors = ['#a0f0df', '#64d5ca', '#3baaa0', '#ff6b9d', '#c06c84'],
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({x: 0, y: 0});
    const animationRef = useRef<number>();
    const [isClient, setIsClient] = useState(false);
    const timeRef = useRef(0);

    const initializeParticles = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      particlesRef.current = [];

      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Create temporary canvas to get text pixel positions
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

      // Create particles at text positions
      const textParticles: Particle[] = [];
      for (let i = 0; i < data.length; i += 4 * 6) {
        if (data[i + 3] > 128) {
          const pixelIndex = Math.floor(i / 4);
          const baseX = pixelIndex % tempCanvas.width;
          const baseY = Math.floor(pixelIndex / tempCanvas.width);

          const colorIndex = Math.floor(Math.random() * colors.length);

          textParticles.push({
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            baseX,
            baseY,
            size: Math.random() * 1.5 + 0.5,
            life: 0,
            color: colors[colorIndex],
            forming: true,
          });
        }
      }

      // Create particles starting from edges
      textParticles.forEach(textParticle => {
        for (let i = 0; i < 1; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 400 + 200;
          const startX = canvas.width / 2 + Math.cos(angle) * distance;
          const startY = canvas.height / 2 + Math.sin(angle) * distance;

          const particle: Particle = {
            x: startX,
            y: startY,
            vx: 0,
            vy: 0,
            baseX: textParticle.baseX,
            baseY: textParticle.baseY,
            size: textParticle.size,
            life: 0,
            color: textParticle.color,
            forming: true,
          };

          particlesRef.current.push(particle);
        }
      });
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      timeRef.current++;

      // Clear canvas with fade
      ctx.fillStyle = 'rgba(15, 15, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach(particle => {
        if (particle.forming) {
          // Move towards base position
          const dx = particle.baseX - particle.x;
          const dy = particle.baseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 2) {
            const speed = Math.min(distance * 0.08, 8);
            particle.vx = (dx / distance) * speed;
            particle.vy = (dy / distance) * speed;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life = Math.min(particle.life + 0.02, 1);
          } else {
            particle.forming = false;
            particle.life = 1;
            particle.x = particle.baseX;
            particle.y = particle.baseY;
            particle.vx = 0;
            particle.vy = 0;
          }
        } else {
          // Check mouse hover repulsion
          const mdx = particle.x - mouse.x;
          const mdy = particle.y - mouse.y;
          const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDistance < 150) {
            const angle = Math.atan2(mdy, mdx);
            const force = (150 - mouseDistance) / 150;
            particle.vx = Math.cos(angle) * force * 3;
            particle.vy = Math.sin(angle) * force * 3;
          } else {
            // Return to base position slowly
            const dx = particle.baseX - particle.x;
            const dy = particle.baseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
              particle.vx *= 0.92;
              particle.vy *= 0.92;
              particle.vx += (dx / distance) * 0.02;
              particle.vy += (dy / distance) * 0.02;
            } else {
              particle.vx *= 0.95;
              particle.vy *= 0.95;
            }
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        // Draw particle
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

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

    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
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

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }, [isClient, text]);

    if (!isClient) return null;

    return (
      <canvas
        className="w-full h-full block cursor-default"
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
