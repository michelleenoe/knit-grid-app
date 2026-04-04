type SectionTitleProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title__heading-row">
        <h1 className="section-title__heading">{title}</h1>
        {action ? <div className="section-title__actions">{action}</div> : null}
      </div>
      {subtitle ? (
        <p className="section-title__subtitle">{subtitle}</p>
      ) : null}
    </div>
  );
}
