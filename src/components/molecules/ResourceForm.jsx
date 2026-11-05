import { useEffect, useState } from 'react';
import FormField from '../atoms/FormField.jsx';

export default function ResourceForm({
  resource,
  initialValues = {},
  onSubmit,
  submitting,
  isEditing = false,
}) {
  const [values, setValues] = useState({});
  const [error, setError] = useState('');
  const fields = resource.fields.filter((field) => !(field.createOnly && isEditing));

  useEffect(() => {
    setValues(Object.fromEntries(fields.map((field) => [field.name, initialValues[field.name] ?? ''])));
  }, [initialValues, resource]);

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const invalidField = fields.find(
      (field) => field.required && !String(values[field.name] ?? '').trim(),
    );
    if (invalidField) {
      setError(`${invalidField.label} es obligatorio.`);
      return;
    }

    const payload = Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.type === 'number' ? Number(values[field.name]) : values[field.name].trim(),
      ]),
    );

    try {
      await onSubmit(payload);
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <form className="resource-form" onSubmit={handleSubmit}>
      {error && <p className="form-error" role="alert">{error}</p>}
      {fields.map((field) => (
        <FormField key={field.name} field={field} value={values[field.name]} onChange={handleChange} />
      ))}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
