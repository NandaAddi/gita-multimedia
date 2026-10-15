import React from 'react';

export default function Mascot({ party = false, cheer = false, className = '' }) {
  const classes = ['mascot', party ? 'party' : '', cheer ? 'cheer' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg className={classes} viewBox="0 0 240 232" aria-label="Oli si burung hantu">
      <path d="M120 40 C120 26 129 17 144 15 C144 30 135 39 120 40 Z" fill="#58CC02" />
      <path d="M120 40 C120 28 112 20 99 18 C99 31 107 39 120 40 Z" fill="#46A302" />
      <rect x="116.5" y="32" width="7" height="20" rx="3.5" fill="#46A302" />
      <path d="M55 74 L38 34 L86 52 Z" fill="#58CC02" />
      <path d="M185 74 L202 34 L154 52 Z" fill="#58CC02" />
      <ellipse cx="97" cy="220" rx="15" ry="8" fill="#FF9600" />
      <ellipse cx="143" cy="220" rx="15" ry="8" fill="#FF9600" />
      <ellipse cx="120" cy="136" rx="88" ry="86" fill="#58CC02" />
      <path d="M36 128 C22 150 28 176 48 188 C56 168 60 148 58 132 Z" fill="#46A302" />
      <path d="M204 128 C218 150 212 176 192 188 C184 168 180 148 182 132 Z" fill="#46A302" />
      <ellipse cx="120" cy="158" rx="54" ry="54" fill="#89E219" />
      <g className="eye">
        <circle cx="90" cy="104" r="31" fill="#fff" />
        <g className="pupil">
          <circle cx="90" cy="104" r="11.5" fill="#3C3C3C" />
          <circle cx="94.5" cy="99" r="4" fill="#fff" />
        </g>
      </g>
      <g className="eye">
        <circle cx="150" cy="104" r="31" fill="#fff" />
        <g className="pupil">
          <circle cx="150" cy="104" r="11.5" fill="#3C3C3C" />
          <circle cx="154.5" cy="99" r="4" fill="#fff" />
        </g>
      </g>
      <path d="M105 134 C105 128 135 128 135 134 C135 144 127 154 120 154 C113 154 105 144 105 134 Z" fill="#FF9600" />
      <g className="hat" transform="rotate(-8 116 44)">
        <path d="M90 56 L116 6 L142 52 Z" fill="#FF4B4B" />
        <circle cx="116" cy="8" r="7" fill="#1CB0F6" />
        <path d="M99 38 L136 45" stroke="#FFC800" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
