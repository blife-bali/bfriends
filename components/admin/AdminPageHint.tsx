type HintVariant = 'live' | 'partial' | 'unused';

const VARIANT_LABEL: Record<HintVariant, string> = {
  live: 'On the website',
  partial: 'Partially used',
  unused: 'Not on the website',
};

export default function AdminPageHint({
  variant = 'live',
  children,
}: {
  variant?: HintVariant;
  children: React.ReactNode;
}) {
  return (
    <aside className={`admin-page-hint admin-page-hint--${variant}`} role="note">
      <span className="admin-page-hint-label">{VARIANT_LABEL[variant]}</span>
      <div className="admin-page-hint-body">{children}</div>
    </aside>
  );
}
