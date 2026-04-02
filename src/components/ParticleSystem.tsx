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

interface TextItem {
  text: string;
  fontSize: number;
  yOffset?: number;
}

interface ParticleSystemProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  colors?: string[];
  textItems?: TextItem[];
}

const ParticleSystem: FC<ParticleSystemProps> = memo(
  ({
    text,
    fontSize = 50,
    fontFamily = 'Arial, sans-serif',
    colors = ['#a0f0df', '#64d5ca', '#3baaa0'],
    textItems,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({x: 0, y: 0});
    const clickRef = useRef({x: 0, y: 0, isPressed: false});
    const animationRef = useRef<number>();
    const [isClient, setIsClient] = useState(false);

    // Prepare text items to render
    const itemsToRender: TextItem[] = textItems ||
      (text ? [{text, fontSize, yOffset: 0}] : []);

    const initializeParticles = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      particlesRef.current = [];

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Create temporary canvas to render text
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Render all text items on temp canvas
      itemsToRender.forEach(item => {
        tempCtx.font = `bold ${item.fontSize}px ${fontFamily}`;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        const yPos = tempCanvas.height / 2 + (item.yOffset || 0);
        tempCtx.fillText(item.text, tempCanvas.width / 2, yPos);
      });

      // Get image data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // Collect all text pixels
      const textPixels: Array<{x: number; y: number}> = [];
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 200) {
          const pixelIndex = Math.floor(i / 4);
          const x = pixelIndex % tempCanvas.width;
          const y = Math.floor(pixelIndex / tempCanvas.width);
          textPixels.push({x, y});
        }
      }

      if (textPixels.length === 0) return;

      // Create minimal particles per text pixel - just 1 for performance
      textPixels.forEach(pixel => {
        const colorIndex = Math.floor(Math.random() * colors.length);

        // Spawn from left side only for flowing effect
        const startY = pixel.y + (Math.random() - 0.5) * 80;
        const startX = pixel.x - 200 - Math.random() * 100;

        const particle: Particle = {
          x: startX,
          y: startY,
          vx: 0,
          vy: 0,
          baseX: pixel.x,
          baseY: pixel.y,
          size: Math.random() * 0.6 + 0.2,
          life: 0,
          color: colors[colorIndex],
          forming: true,
        };

        particlesRef.current.push(particle);
      });

      console.log(`Initialized ${particlesRef.current.length} particles from ${textPixels.length} text pixels`);
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas aggressively for crispest display
      ctx.fillStyle = 'rgba(15, 15, 15, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach(particle => {
        if (particle.forming) {
          // Move towards base position with very fast convergence
          const dx = particle.baseX - particle.x;
          const dy = particle.baseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 1) {
            // Very fast flowing motion for instant accumulation
            const speed = Math.min(distance * 0.18, 12);
            particle.vx = (dx / distance) * speed;
            particle.vy = (dy / distance) * speed;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life = Math.min(particle.life + 0.08, 1);
          } else {
            particle.forming = false;
            particle.life = 1;
            particle.x = particle.baseX;
            particle.y = particle.baseY;
            particle.vx = 0;
            particle.vy = 0;
          }
        } else {
          // Check if mouse is being clicked (black hole mode)
          if (clickRef.current.isPressed) {
            // Attract to click point (black hole)
            const cdx = clickRef.current.x - particle.x;
            const cdy = clickRef.current.y - particle.y;
            const clickDistance = Math.sqrt(cdx * cdx + cdy * cdy);

            if (clickDistance > 1) {
              // Very strong attraction towards click point
              const speed = Math.min(clickDistance * 0.25, 15);
              particle.vx = (cdx / clickDistance) * speed;
              particle.vy = (cdy / clickDistance) * speed;
            } else {
              particle.vx *= 0.95;
              particle.vy *= 0.95;
            }
          } else {
            // Normal behavior: hover repulsion and base attraction
            const mdx = particle.x - mouse.x;
            const mdy = particle.y - mouse.y;
            const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mouseDistance < 200) {
              // Repel from mouse
              const angle = Math.atan2(mdy, mdx);
              const force = (200 - mouseDistance) / 200;
              particle.vx = Math.cos(angle) * force * 4;
              particle.vy = Math.sin(angle) * force * 4;
            } else {
              // Attract back to base position
              const dx = particle.baseX - particle.x;
              const dy = particle.baseY - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance > 1) {
                particle.vx *= 0.92;
                particle.vy *= 0.92;
                particle.vx += (dx / distance) * 0.05;
                particle.vy += (dy / distance) * 0.05;
              } else {
                particle.vx *= 0.95;
                particle.vy *= 0.95;
              }
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

    const handleMouseDown = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        clickRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          isPressed: true,
        };
      }
    };

    const handleMouseUp = () => {
      clickRef.current.isPressed = false;
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

      // Use full viewport dimensions to allow particles to scatter freely
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initializeParticles(canvas);
      animate();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('resize', handleResize);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', handleResize);
      };
    }, [isClient, itemsToRender]);

    if (!isClient) return null;

    return (
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      />
    );
  },
);

ParticleSystem.displayName = 'ParticleSystem';
export default ParticleSystem;
