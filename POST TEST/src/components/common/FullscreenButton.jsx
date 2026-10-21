import React from 'react';
import Icon from './Icons';
import useFullscreen from '../../hooks/useFullscreen';

export default function FullscreenButton({ className = 'icon-btn', size = 22, style = {} }) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <button
      type="button"
      className={className}
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
      title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
      style={style}
    >
      <Icon name={isFullscreen ? 'fullscreenExit' : 'fullscreen'} size={size} />
    </button>
  );
}
