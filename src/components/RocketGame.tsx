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
  angle: number;
}

const RocketGame: FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketImageRef = useRef<HTMLDivElement>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
  const rocketRef = useRef<RocketPosition>({x: 0, y: 0, vx: 0, vy: 0, angle: 0});
  const keysPressed = useRef<Record<string, boolean>>({});
  const particlesRef = useRef<Particle[]>([]);
  const particleIdRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const ROCKET_SPEED = 5;
  const FRICTION = 0.95;
  const MAX_SPEED = 10;
  const BOUNDARY_MARGIN = 50;
  const ROCKET_SIZE = 48;
  const COLLISION_RADIUS = 30;
  const PARTICLE_SIZE = 1.5;

  // Initialize sizes on mount
  useEffect(() => {
    const updateSizes = () => {
      if (typeof window !== 'undefined') {
        setCanvasSize({width: window.innerWidth, height: window.innerHeight});
        rocketRef.current = {x: window.innerWidth - 100, y: 20, vx: 0, vy: 0, angle: 0};
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
      if (key === 'ESCAPE') {
        setIsGameActive(false);
        return;
      }
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

      // Calculate rotation angle based on velocity (pointing in direction of movement)
      // Add 90 to rotate from right-pointing to up-pointing (W = up)
      if (Math.abs(rocketRef.current.vx) > 0.1 || Math.abs(rocketRef.current.vy) > 0.1) {
        rocketRef.current.angle = Math.atan2(rocketRef.current.vy, rocketRef.current.vx) * (180 / Math.PI) + 90;
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

      // Update rocket display position directly on DOM (avoid state update lag)
      if (rocketImageRef.current) {
        rocketImageRef.current.style.left = `${rocketRef.current.x - ROCKET_SIZE / 2}px`;
        rocketImageRef.current.style.top = `${rocketRef.current.y - ROCKET_SIZE / 2}px`;
        rocketImageRef.current.style.transform = `rotate(${rocketRef.current.angle}deg)`;
      }

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

      // Update particles and check collisions with rocket
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Collision detection with rocket
        const dx = p.x - rocketRef.current.x;
        const dy = p.y - rocketRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < COLLISION_RADIUS && distance > 0) {
          // Scatter particle away from rocket
          const angle = Math.atan2(dy, dx);
          const speed = 8;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          p.life = Math.min(1, p.life + 0.3); // Extend life on collision
        }

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
            ctx.arc(p.x, p.y, PARTICLE_SIZE, 0, Math.PI * 2);
            ctx.fill();
          });
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

      {/* Rocket - Moves with game position */}
      {isGameActive && canvasSize.width > 0 ? (
        <div
          className="fixed z-[102] cursor-pointer group"
          ref={rocketImageRef}
          style={{
            left: '0px',
            top: '0px',
            transform: 'rotate(0deg)',
            transition: 'none',
          }}>
          <Image
            alt="Rocket"
            height={ROCKET_SIZE}
            priority
            src={rocket}
            width={ROCKET_SIZE}
          />
        </div>
      ) : (
        <div
          className="fixed top-4 right-8 z-[101] cursor-pointer group"
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
              height={30}
              priority
              src={rocket}
              width={30}
            />
          </button>

        </div>
      )}

      {/* Control hint when active */}
      {isGameActive && (
        <div className="fixed top-4 right-4 z-[101] text-xs text-[#a0f0df] font-semibold bg-black/50 px-3 py-2 rounded whitespace-nowrap">
          WASD to move | ESC to exit
        </div>
      )}
    </>
  );
});

RocketGame.displayName = 'RocketGame';
export default RocketGame;
