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
}

interface ParticleSystemProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  colors?: string[];
  density?: number;
  mouseInfluence?: number;
  interactive?: boolean;
}

const ParticleSystem: FC<ParticleSystemProps> = memo(
  ({
    text,
    fontSize = 120,
    fontFamily = 'Arial, sans-serif',
    colors = ['#a0f0df', '#64d5ca', '#3baaa0'],
    density = 3,
    mouseInfluence = 150,
    interactive = true,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({x: 0, y: 0});
    const animationRef = useRef<number>();
    const [isClient, setIsClient] = useState(false);

    // Initialize particles from text
    const initializeParticles = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear previous particles
      particlesRef.current = [];

      // Set up text rendering
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#a0f0df';

      // Get text metrics
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      // Create image data for text
      canvas.width = Math.max(textWidth + 100, canvas.clientWidth);
      canvas.height = Math.max(textHeight + 100, canvas.clientHeight);

      // Draw text off-screen to create particle positions
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

      // Get pixel data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // Create particles from text pixels
      for (let i = 0; i < data.length; i += 4 * density) {
        if (data[i + 3] > 128) {
          // Alpha channel check
          const pixelIndex = Math.floor(i / 4);
          const x = pixelIndex % tempCanvas.width;
          const y = Math.floor(pixelIndex / tempCanvas.width);

          const particle: Particle = {
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            ax: 0,
            ay: 0,
            baseX: x,
            baseY: y,
            size: Math.random() * 2 + 1,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          };

          particlesRef.current.push(particle);
        }
      }
    };

    // Animation loop
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 15, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach(particle => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (interactive && distance < mouseInfluence) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseInfluence - distance) / mouseInfluence;
          particle.ax = -Math.cos(angle) * force * 0.5;
          particle.ay = -Math.sin(angle) * force * 0.5;
        } else {
          // Attraction to base position
          const bx = particle.baseX - particle.x;
          const by = particle.baseY - particle.y;
          const baseDistance = Math.sqrt(bx * bx + by * by);

          particle.ax = (bx / baseDistance) * 0.02;
          particle.ay = (by / baseDistance) * 0.02;
        }

        // Apply friction
        particle.vx *= 0.92;
        particle.vy *= 0.92;

        // Apply acceleration
        particle.vx += particle.ax;
        particle.vy += particle.ay;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Calculate life based on distance from base
        const distFromBase = Math.sqrt(
          Math.pow(particle.x - particle.baseX, 2) + Math.pow(particle.y - particle.baseY, 2),
        );
        particle.life = Math.max(0.3, 1 - distFromBase / 200);

        // Draw particle
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    // Handle window resize
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

    // Initialize on mount
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isClient) return;

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      initializeParticles(canvas);
      animate();

      if (interactive) {
        window.addEventListener('mousemove', handleMouseMove);
      }
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
        className="w-full h-full block"
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
