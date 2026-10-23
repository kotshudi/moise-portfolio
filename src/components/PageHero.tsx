import type { ReactNode } from "react";
export default function PageHero({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">{label}</p>
        <h1>
          {title}
          <span> {accent}</span>
        </h1>
        <p className="page-lead">{description}</p>
      </div>
    </section>
  );
}
export function SectionHeading({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="section-label">{label}</p>
      <h2>{children}</h2>
    </div>
  );
}
