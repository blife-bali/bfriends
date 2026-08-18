'use client';

interface Column<T extends object> {
  key: string;
  label: string;
  render?(value: unknown, row: T): React.ReactNode;
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onEdit?(row: T): void;
  onDelete?(row: T): void;
}

export default function DataTable<T extends object>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="admin-empty">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={String((row as { id?: unknown }).id ?? i)}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render((row as Record<string, unknown>)[col.key], row)
                    : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  <div className="admin-table-actions">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="admin-btn admin-btn-secondary admin-btn-sm">
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="admin-btn admin-btn-danger admin-btn-sm">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
