import {useRouter} from 'next/router';
import {FC, memo, PropsWithChildren, useEffect} from 'react';

const Base: FC<PropsWithChildren> = memo(({children}) => {
  const router = useRouter();

  useEffect(() => {
    // Add or remove show-grid class based on current page
    const isHomepage = router.pathname === '/';
    if (isHomepage) {
      document.body.classList.remove('show-grid');
    } else {
      document.body.classList.add('show-grid');
    }

    return () => {
      document.body.classList.remove('show-grid');
    };
  }, [router.pathname]);

  return (
    <div className="min-h-screen w-full bg-black text-white transition-colors duration-300">
      {/* Glass overlay for subtle blur and glow */}
      <div className="fixed inset-0 z-0 bg-white/5 backdrop-blur-sm backdrop-saturate-150" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

Base.displayName = 'Base';
export default Base;
