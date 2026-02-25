interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  lines?: number;
}

export default function SkeletonLoader({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: SkeletonLoaderProps) {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  const variantClass = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }[variant];

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '16px' : '200px')
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClass} ${variantClass}`}
            style={{
              width: i === lines - 1 ? '75%' : '100%',
              height: style.height
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      style={style}
    />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border-2 border-[#F7F9F9] overflow-hidden">
      <SkeletonLoader height="192px" />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <SkeletonLoader variant="text" width="60px" />
          <SkeletonLoader variant="text" width="80px" />
        </div>
        <SkeletonLoader variant="text" height="28px" className="mb-3" />
        <SkeletonLoader variant="text" lines={3} className="mb-4" />
        <SkeletonLoader variant="text" width="120px" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border-2 border-[#F7F9F9] overflow-hidden">
      <SkeletonLoader height="224px" />
      <div className="p-5 sm:p-6">
        <SkeletonLoader variant="text" height="32px" className="mb-3" />
        <SkeletonLoader variant="text" lines={2} className="mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <SkeletonLoader variant="circular" width="20px" height="20px" />
              <SkeletonLoader variant="text" width="85%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroImageSkeleton() {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px]">
      <SkeletonLoader className="w-full h-full rounded-2xl" />
    </div>
  );
}
