'use client';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Konfirmasi</h3>
        <p style={{ color: 'var(--admin-dark-silver)', fontSize: 15 }}>{message}</p>
        <div className="admin-modal-actions">
          <button onClick={onCancel} className="admin-btn admin-btn-outline">Batal</button>
          <button onClick={onConfirm} className="admin-btn admin-btn-danger">Hapus</button>
        </div>
      </div>
    </div>
  );
}
