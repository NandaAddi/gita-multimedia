import React from 'react';

export const ICONS = {
  check: (
    <polyline
      points="20 6 9 17 4 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cross: (
    <path
      d="M18 6 6 18M6 6l12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  ),
  heart: (
    <path
      fill="currentColor"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  ),
  star: (
    <path
      fill="currentColor"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  ),
  flame: (
    <path
      d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 1.072-.424 2.133-1.566 2.5-3 .833 1.5 3.5 3.765 3.5 6.5A4.5 4.5 0 0 1 6 12.5c0-1.035.61-2.28 1.5-3 .5 1 .5 2 1 2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="currentColor" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </>
  ),
  vol: (
    <>
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
      <path
        d="M15.5 8.7a4.5 4.5 0 0 1 0 6.6M18.2 6.2a8 8 0 0 1 0 11.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  ),
  volOff: (
    <>
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
      <path
        d="M22 9l-6 6M16 9l6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  ),
  trophy: (
    <path
      d="M8 21h8M12 17v4M7 3h10v6a5 5 0 0 1-10 0V3zM7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M12 7.2V12l3.2 1.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </>
  ),
  chev: (
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chart: (
    <path
      d="M5 20v-6M12 20V5M19 20v-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  ),
  leaf: (
    <>
      <path d="M20 4C10.5 4.5 5 9.5 5 16a5 5 0 0 0 5 5C16.5 21 20.5 14 20 4z" fill="currentColor" />
      <path
        d="M6.5 19.5C9 14 13 10 18.5 6.5"
        fill="none"
        stroke="rgba(255,255,255,.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  form: (
    <path
      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v0zm0 6h6m-6 4h4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
};

export default function Icon({ name, size = 24, className = '', style = {} }) {
  const content = ICONS[name];
  if (!content) return null;

  return (
    <svg
      className={`ic ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
