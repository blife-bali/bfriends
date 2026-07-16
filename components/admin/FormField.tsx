'use client';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'number';
  value: string | number | boolean;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  /** Short note under the field explaining where it appears on the site */
  hint?: string;
}

function FieldHint({ hint }: { hint?: string }) {
  if (!hint) return null;
  return <p className="admin-field-hint">{hint}</p>;
}

export default function FormField({ label, name, type = 'text', value, onChange, options, placeholder, required, hint }: FormFieldProps) {
  if (type === 'checkbox') {
    return (
      <div className="admin-form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textTransform: 'none', fontWeight: 400 }}>
          <input
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          {label}
        </label>
        <FieldHint hint={hint} />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="admin-form-group">
        <label>{label}</label>
        <select name={name} value={String(value)} onChange={(e) => onChange(e.target.value)}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <FieldHint hint={hint} />
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="admin-form-group">
        <label>{label}</label>
        <textarea
          name={name}
          value={String(value || '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
        <FieldHint hint={hint} />
      </div>
    );
  }

  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={String(value || '')}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        required={required}
      />
      <FieldHint hint={hint} />
    </div>
  );
}
