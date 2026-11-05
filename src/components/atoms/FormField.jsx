export default function FormField({ field, value, onChange }) {
  const id = `field-${field.name}`;
  const commonProps = {
    id,
    name: field.name,
    value: value ?? '',
    onChange,
    required: field.required,
    min: field.min,
    step: field.step,
    autoComplete: field.type === 'password' ? 'new-password' : undefined,
  };

  return (
    <label className="form-field" htmlFor={id}>
      <span>{field.label}{field.required && <span aria-hidden="true"> *</span>}</span>
      {field.type === 'textarea' ? (
        <textarea {...commonProps} rows="4" />
      ) : (
        <input {...commonProps} type={field.type ?? 'text'} />
      )}
    </label>
  );
}
