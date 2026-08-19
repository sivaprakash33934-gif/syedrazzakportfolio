import CountUp from "../motion/CountUp";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCard({ value, suffix, label }: StatCardProps) {
  return (
    <div className="group border-l-2 border-line py-2 pl-5 transition-colors duration-500 hover:border-accent lg:pl-7">
      <CountUp
        value={value}
        suffix={suffix}
        className="font-mono text-5xl font-semibold leading-none tracking-tight text-ink transition-colors duration-500 group-hover:text-accent-soft lg:text-6xl"
      />
      <p className="kicker mt-4">{label}</p>
    </div>
  );
}
