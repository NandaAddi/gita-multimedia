import React, { useEffect } from 'react';
import Icon from './Icons';

export default function Modal({
  isOpen,
  onClose,
  icon = 'star',
  tint = 'gold',
  title,
  text,
  actions = []
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="modal">
        <div className={`modal-ic ${tint}`}>
          <Icon name={icon} size={30} />
        </div>
        {title && <h3>{title}</h3>}
        {text && <p>{text}</p>}
        {actions.length > 0 && (
          <div className="modal-actions">
            {actions.map((act, i) => (
              <button
                key={i}
                className={`btn ${
                  act.kind === 'primary'
                    ? 'btn-primary'
                    : act.kind === 'danger'
                    ? 'btn-danger'
                    : 'btn-ghost'
                }`}
                onClick={act.onClick}
              >
                {act.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
