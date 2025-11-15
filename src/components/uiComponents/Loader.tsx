/**
 * Loader Component
 * Indicador de carga responsive
 */

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeStyles = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export function Loader({ size = 'md', text }: LoaderProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-4 py-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`${sizeStyles[size]} animate-spin rounded-full border-4 border-surface border-t-primary`}
        aria-hidden="true"
      />
      {text ? (
        <p className="text-text-secondary text-sm sm:text-base">{text}</p>
      ) : (
        <span className="sr-only">Loading...</span>
      )}
    </div>
  );
}
