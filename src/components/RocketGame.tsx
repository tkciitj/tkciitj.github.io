import Image from 'next/image';
import {FC, memo, useCallback, useEffect, useRef, useState} from 'react';

import rocket from '../images/rocket.png';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface RocketPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const RocketGame: FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
  const rocketRef = useRef<RocketPosition>({x: 0, y: 0, vx: 0, vy: 0});
  const keysPressed = useRef<Record<string, boolean>>({});
  const particlesRef = useRef<Particle[]>([]);
  const particleIdRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const ROCKET_SPEED = 3;
  const FRICTION = 0.95;
  const MAX_SPEED = 8;
  const BOUNDARY_MARGIN = 50;

  // Initialize sizes on mount
  useEffect(() => {
    const updateSizes = () => {
      if (typeof window !== 'undefined') {
        setCanvasSize({width: window.innerWidth, height: window.innerHeight});
        rocketRef.current = {x: window.innerWidth - 100, y: 50, vx: 0, vy: 0};
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    if (!isGameActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['W', 'A', 'D', 'S'].includes(key)) {
        keysPressed.current[key] = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['W', 'A', 'D', 'S'].includes(key)) {
        keysPressed.current[key] = false;
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isGameActive]);

  // Game loop
  useEffect(() => {
    if (!isGameActive || canvasSize.width === 0) return;

    const gameLoop = () => {
      // Update velocity based on keys pressed
      if (keysPressed.current['W']) {
        rocketRef.current.vy = Math.max(rocketRef.current.vy - ROCKET_SPEED, -MAX_SPEED);
      }
      if (keysPressed.current['S']) {
        rocketRef.current.vy = Math.min(rocketRef.current.vy + ROCKET_SPEED, MAX_SPEED);
      }
      if (keysPressed.current['A']) {
        rocketRef.current.vx = Math.max(rocketRef.current.vx - ROCKET_SPEED, -MAX_SPEED);
      }
      if (keysPressed.current['D']) {
        rocketRef.current.vx = Math.min(rocketRef.current.vx + ROCKET_SPEED, MAX_SPEED);
      }

      // Apply friction
      rocketRef.current.vx *= FRICTION;
      rocketRef.current.vy *= FRICTION;

      // Update position
      rocketRef.current.x += rocketRef.current.vx;
      rocketRef.current.y += rocketRef.current.vy;

      // Keep within bounds
      const maxX = canvasSize.width - BOUNDARY_MARGIN;
      const maxY = canvasSize.height - BOUNDARY_MARGIN;
      rocketRef.current.x = Math.max(BOUNDARY_MARGIN, Math.min(maxX, rocketRef.current.x));
      rocketRef.current.y = Math.max(BOUNDARY_MARGIN, Math.min(maxY, rocketRef.current.y));

      // Create particles from rocket thrust
      if (
        keysPressed.current['W'] ||
        keysPressed.current['A'] ||
        keysPressed.current['D'] ||
        keysPressed.current['S']
      ) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            id: particleIdRef.current++,
            x: rocketRef.current.x + Math.random() * 20 - 10,
            y: rocketRef.current.y + Math.random() * 20 - 10,
            vx: (Math.random() - 0.5) * 4 - rocketRef.current.vx * 0.3,
            vy: (Math.random() - 0.5) * 4 - rocketRef.current.vy * 0.3,
            life: 1,
          });
        }
      }

      // Update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vx *= 0.98;
        p.vy *= 0.98;
        return p.life > 0;
      });

      // Render
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw particles
          particlesRef.current.forEach(p => {
            ctx.fillStyle = `rgba(160, 240, 223, ${p.life * 0.6})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
          });

          // Draw rocket indicator (since actual image overlay is in JSX)
          ctx.fillStyle = 'rgba(160, 240, 223, 0.2)';
          ctx.beginPath();
          ctx.arc(rocketRef.current.x, rocketRef.current.y, 25, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(160, 240, 223, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGameActive, canvasSize]);

  const handleRocketClick = useCallback(() => {
    setIsGameActive(!isGameActive);
    setShowTooltip(false);
  }, [isGameActive]);

  const handleRocketHover = useCallback(
    (isHovering: boolean) => {
      if (!isGameActive) {
        setShowTooltip(isHovering);
      }
    },
    [isGameActive],
  );

  return (
    <>
      {/* Full-screen canvas for particles and game rendering */}
      {canvasSize.width > 0 && (
        <canvas
          className="fixed inset-0 z-[100] pointer-events-none"
          height={canvasSize.height}
          ref={canvasRef}
          style={{width: '100vw', height: '100vh'}}
          width={canvasSize.width}
        />
      )}

      {/* Rocket - Always visible */}
      <div
        className="fixed top-12 right-8 z-[101] cursor-pointer group"
        onMouseEnter={() => handleRocketHover(true)}
        onMouseLeave={() => handleRocketHover(false)}>
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#a0f0df] text-black text-xs rounded-lg whitespace-nowrap font-semibold shadow-lg">
            Nothing here, Just scroll down!
          </div>
        )}

        {/* Rocket Image */}
        <button
          className="relative w-12 h-12 hover:scale-110 transition-transform duration-200 focus:outline-none"
          onClick={handleRocketClick}
          type="button">
          <Image
            alt="Rocket Easter Egg"
            className={`transition-opacity duration-300 ${isGameActive ? 'opacity-70' : 'opacity-100'}`}
            height={48}
            priority
            src={rocket}
            width={48}
          />

          {/* Active indicator */}
          {isGameActive && <div className="absolute inset-0 border-2 border-[#a0f0df] rounded-full animate-pulse" />}
        </button>

        {/* Control hint when active */}
        {isGameActive && (
          <div className="absolute top-16 right-0 text-xs text-[#a0f0df] font-semibold bg-black/50 px-2 py-1 rounded whitespace-nowrap">
            W/A/D to move
          </div>
        )}
      </div>
    </>
  );
});

RocketGame.displayName = 'RocketGame';
export default RocketGame;
