import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
}

export default function Button({ children, href, onClick, variant = "solid", external, className = "" }: ButtonProps) {
  const styles =
    variant === "solid"
      ? "bg-accent text-void hover:bg-accent-soft hover:shadow-glow-amber border border-transparent"
      : "border border-ink/25 text-ink hover:border-accent hover:text-accent hover:shadow-glow-amber bg-transparent";

  const cls = `inline-flex items-center gap-3 rounded-button px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 ${styles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={cls}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} className={cls} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
