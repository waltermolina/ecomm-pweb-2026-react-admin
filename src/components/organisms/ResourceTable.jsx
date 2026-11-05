import { Link } from 'react-router-dom';
import { getRecordId } from '../../utils/format.js';

export default function ResourceTable({ resource, items, onDelete }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>{resource.columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Acciones</th></tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const id = getRecordId(item);
            return (
              <tr key={id ?? index}>
                {resource.columns.map((column) => (
                  <td key={column.key}>{column.value ? column.value(item) : item[column.key] ?? '—'}</td>
                ))}
                <td className="table-actions">
                  <Link className="text-link" to={`/${resource.path}/${id}`}>Editar</Link>
                  <button className="text-button text-danger" onClick={() => onDelete(item)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
