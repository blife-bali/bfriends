'use client';

interface AlertDialogProps {
  title?: string;
  message: string;
  onClose: () => void;
}

export default function AlertDialog({ title = 'Notice', message, onClose }: AlertDialogProps) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p style={{ color: 'var(--admin-dark-silver)', fontSize: 15 }}>{message}</p>
        <div className="admin-modal-actions">
          <button onClick={onClose} className="admin-btn admin-btn-primary">OK</button>
        </div>
      </div>
    </div>
  );
}
