import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      {description ? (
        <p className="empty-state__description">{description}</p>
      ) : null}
      {action ? <div className="page-actions">{action}</div> : null}
    </div>
  );
}
