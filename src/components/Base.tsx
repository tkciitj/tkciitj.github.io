import {FC, memo, PropsWithChildren} from 'react';

const Base: FC<PropsWithChildren> = memo(({children}) => {
  return (
    <div className="min-h-screen w-full bg-grid bg-black text-white transition-colors duration-300">
      {/* Glass overlay for subtle blur and glow */}
      <div className="fixed inset-0 z-0 bg-white/5 backdrop-blur-sm backdrop-saturate-150" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

Base.displayName = 'Base';
export default Base;
