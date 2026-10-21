import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook untuk mengelola status dan toggle layar penuh (Fullscreen)
 * Kompatibel dengan desktop, IFP, tablet, dan ponsel.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const checkFullscreen = useCallback(() => {
    const doc = document;
    return !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      const doc = document;
      const docEl = doc.documentElement;
      const isFS = checkFullscreen();

      if (!isFS) {
        const req =
          docEl.requestFullscreen ||
          docEl.webkitRequestFullscreen ||
          docEl.mozRequestFullScreen ||
          docEl.msRequestFullscreen;
        if (req) {
          await req.call(docEl);
        }
      } else {
        const ex =
          doc.exitFullscreen ||
          doc.webkitExitFullscreen ||
          doc.mozCancelFullScreen ||
          doc.msExitFullscreen;
        if (ex) {
          await ex.call(doc);
        }
      }
    } catch (err) {
      console.warn('[useFullscreen] Gagal mengubah mode layar penuh:', err);
    }
  }, [checkFullscreen]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(checkFullscreen());
    };

    // Sinkronisasi status awal
    setIsFullscreen(checkFullscreen());

    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];

    events.forEach(evt => document.addEventListener(evt, handleFsChange));
    return () => {
      events.forEach(evt => document.removeEventListener(evt, handleFsChange));
    };
  }, [checkFullscreen]);

  return { isFullscreen, toggleFullscreen };
}

export default useFullscreen;
