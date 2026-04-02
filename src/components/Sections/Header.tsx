import {Dialog, Transition} from '@headlessui/react';
import {Bars3BottomRightIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useEffect,useMemo, useRef, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

interface Position {
  x: number;
  y: number;
}

export const headerID = 'headerNav';

const Header: FC = memo(() => {
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);

  // ✅ Only include valid section IDs from data.ts
  const navSections = useMemo<SectionId[]>(
    () => [SectionId.About, SectionId.Experience, SectionId.Projects, SectionId.Skills, SectionId.Contact],
    [],
  );

  const intersectionHandler = useCallback((section: SectionId | null) => {
    section && setCurrentSection(section);
  }, []);

  useNavObserver(navSections.map(section => `#${section}`).join(','), intersectionHandler);

  return (
    <>
      <MobileNav currentSection={currentSection} navSections={navSections} />
      <DesktopNav currentSection={currentSection} navSections={navSections} />
    </>
  );
});

const DesktopNav: FC<{navSections: SectionId[]; currentSection: SectionId | null}> = memo(
  ({navSections, currentSection}) => {
    const baseClass =
      'px-4 py-2 rounded-md font-semibold first-letter:uppercase text-sm transition duration-300 focus:outline-none focus-visible:ring-2';
    const activeClass = classNames(baseClass, 'text-[#a0f0df] bg-[#a0f0df]/10 border border-[#a0f0df]/30');
    const inactiveClass = classNames(baseClass, 'text-neutral-300 hover:text-[#a0f0df] hover:bg-white/5');

    return (
      <header
        className="fixed top-0 z-50 hidden w-full bg-black/60 backdrop-blur-md shadow-md border-b border-[#a0f0df]/10 p-4 sm:block"
        id={headerID}>
        <nav className="flex justify-center gap-x-4">
          {navSections.map(section => {
            if (section === SectionId.Contact) {
              return <InteractiveContactNavItem current={section === currentSection} key={section} />;
            }
            return (
              <NavItem
                activeClass={activeClass}
                current={section === currentSection}
                inactiveClass={inactiveClass}
                key={section}
                section={section}
              />
            );
          })}
        </nav>
      </header>
    );
  },
);

const InteractiveContactNavItem: FC<{current: boolean}> = memo(({current}) => {
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState<Position>({x: 0, y: 0});
  const [mousePos, setMousePos] = useState<Position>({x: -999, y: -999});
  const staticElementRef = useRef<HTMLButtonElement>(null);
  const floatingElementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const baseClass =
    'px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 cursor-grab active:cursor-grabbing inline-block whitespace-nowrap';
  const activeClass = classNames(baseClass, 'text-[#a0f0df] bg-[#a0f0df]/10 border border-[#a0f0df]/30');
  const inactiveClass = classNames(baseClass, 'text-neutral-300 hover:text-[#a0f0df] hover:bg-white/5');

  const handleMouseDown = useCallback(() => {
    if (!staticElementRef.current) return;

    // Detach and start floating
    setIsFloating(true);

    const rect = staticElementRef.current.getBoundingClientRect();
    setPosition({
      x: rect.left,
      y: rect.top,
    });
  }, []);

  // Global mouse move listener for tracking cursor position
  useEffect(() => {
    if (!isFloating) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({x: e.clientX, y: e.clientY});
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isFloating]);

  // Avoidance and floating animation
  useEffect(() => {
    if (!isFloating || !floatingElementRef.current) return;

    const animate = () => {
      setPosition(prevPos => {
        const elementSize = floatingElementRef.current?.getBoundingClientRect() || {width: 100, height: 40};
        const elementCenterX = prevPos.x + elementSize.width / 2;
        const elementCenterY = prevPos.y + elementSize.height / 2;

        const dx = elementCenterX - mousePos.x;
        const dy = elementCenterY - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 120; // Distance at which the button starts avoiding

        if (distance < minDistance && distance > 0) {
          // Move away from mouse
          const angle = Math.atan2(dy, dx);
          const speed = (minDistance - distance) * 0.5; // Speed increases as mouse gets closer
          const newX = prevPos.x + Math.cos(angle) * speed;
          const newY = prevPos.y + Math.sin(angle) * speed;

          return {x: newX, y: newY};
        }

        // Gentle floating animation when not avoiding
        const floatX = Math.sin(Date.now() * 0.001) * 2;
        const floatY = Math.cos(Date.now() * 0.0008) * 2;

        return {
          x: prevPos.x + floatX * 0.1,
          y: prevPos.y + floatY * 0.1,
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isFloating, mousePos]);

  const floatingStyle = useMemo(
    () => ({
      pointerEvents: isFloating ? ('auto' as const) : ('none' as const),
    }),
    [isFloating],
  );

  const floatingDivStyle = useMemo(
    () => ({
      left: `${position.x}px`,
      top: `${position.y}px`,
      transition: isFloating ? 'none' : 'left 0.3s ease, top 0.3s ease',
    }),
    [position.x, position.y, isFloating],
  );

  const rotatedLinkStyle = useMemo(
    () => ({
      transform: 'rotate(-45deg)',
      transformOrigin: 'center' as const,
      boxShadow: '0 20px 25px -5px rgba(160, 240, 223, 0.3)',
    }),
    [],
  );

  const staticLinkStyle = useMemo(
    () => ({
      display: 'inline-block' as const,
      transform: 'rotate(-45deg)',
      transformOrigin: 'center' as const,
    }),
    [],
  );

  return (
    <div className="relative" style={floatingStyle}>
      {isFloating && (
        <div
          className="fixed z-[9999] pointer-events-auto"
          ref={floatingElementRef}
          style={floatingDivStyle}>
          <Link
            className={classNames(activeClass, 'hover:shadow-xl')}
            href={`/#${SectionId.Contact}`}
            style={rotatedLinkStyle}>
            Contact Me
          </Link>
        </div>
      )}

      {!isFloating && (
        <button
          className={classNames(current ? activeClass : inactiveClass, 'hover:shadow-lg border-0 bg-transparent p-0')}
          onClick={handleMouseDown}
          ref={staticElementRef}
          style={staticLinkStyle}
          type="button">
          Contact Me
        </button>
      )}
    </div>
  );
});

InteractiveContactNavItem.displayName = 'InteractiveContactNavItem';

const MobileNav: FC<{navSections: SectionId[]; currentSection: SectionId | null}> = memo(
  ({navSections, currentSection}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
      setIsOpen(prev => !prev);
    }, []);

    const baseClass =
      'p-2 rounded-md text-base font-semibold first-letter:uppercase transition-colors duration-300 focus:outline-none';
    const activeClass = classNames(baseClass, 'text-[#a0f0df] bg-[#a0f0df]/10');
    const inactiveClass = classNames(baseClass, 'text-neutral-200 hover:text-[#a0f0df] hover:bg-white/5');

    return (
      <>
        <button
          aria-label="Menu Button"
          className="fixed right-4 top-3 z-40 rounded-md bg-[#a0f0df] p-2 ring-offset-gray-800/60 hover:bg-[#64d5ca] focus:outline-none focus:ring-0 sm:hidden shadow-lg"
          onClick={toggleOpen}>
          <Bars3BottomRightIcon className="h-7 w-7 text-black" />
          <span className="sr-only">Open sidebar</span>
        </button>

        <Transition.Root as={Fragment} show={isOpen}>
          <Dialog as="div" className="fixed inset-0 z-40 flex sm:hidden" onClose={toggleOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="relative w-4/5 max-w-xs bg-black/90 backdrop-blur-xl shadow-lg p-6 border-r border-[#a0f0df]/20">
                <nav className="flex flex-col gap-y-4">
                  {navSections.map(section => (
                    <NavItem
                      activeClass={activeClass}
                      current={section === currentSection}
                      inactiveClass={inactiveClass}
                      key={section}
                      onClick={toggleOpen}
                      section={section}
                    />
                  ))}
                </nav>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </>
    );
  },
);

const NavItem: FC<{
  section: SectionId;
  current: boolean;
  activeClass: string;
  inactiveClass: string;
  onClick?: () => void;
}> = memo(({section, current, inactiveClass, activeClass, onClick}) => {
  // Convert section id to readable label
  const label = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <Link
      className={classNames(current ? activeClass : inactiveClass)}
      href={`/#${section}`}
      key={section}
      onClick={onClick}>
      {label}
    </Link>
  );
});

Header.displayName = 'Header';
export default Header;
