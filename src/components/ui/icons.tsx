interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

export function MailIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

export function PhoneIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5.5 4h3l1.7 4.2-2.1 1.7a12.5 12.5 0 0 0 6 6l1.7-2.1L20 15.5v3a1.8 1.8 0 0 1-2 1.8C10.6 19.6 4.4 13.4 3.7 6a1.8 1.8 0 0 1 1.8-2z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" />
      <path d="M9 8.6c-.5 2.6 3.8 6.9 6.4 6.4l.6-1.6-2-1-.9.8a6.3 6.3 0 0 1-2.5-2.5l.8-.9-1-2z" strokeWidth="1.4" />
    </svg>
  );
}

export function CopyIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M5.5 14.5h-.3a1.7 1.7 0 0 1-1.7-1.7V6.2a1.7 1.7 0 0 1 1.7-1.7h6.6a1.7 1.7 0 0 1 1.7 1.7v.3" />
    </svg>
  );
}

export function CheckIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3.5 12h16" />
      <path d="M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.6" r="2.2" />
    </svg>
  );
}

export function PlayIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
