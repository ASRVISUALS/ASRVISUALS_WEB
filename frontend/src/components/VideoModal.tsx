import { motion } from 'framer-motion';
import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';

type VideoModalProps = {
  videoId: string;
  title: string;
  onClose: () => void;
};

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export default function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      previousActiveElement?.focus();
    };
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusableElements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <motion.div
      className="our-work-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={dialogRef}
        className="our-work-modal-content"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <h2 id="video-modal-title" className="sr-only">{title}</h2>
        <button ref={closeButtonRef} type="button" className="our-work-modal-close" onClick={onClose} aria-label="Close video">
          &times;
        </button>
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}