import ResourceEditorPage from '../shared/ResourceEditorPage.jsx';
import { resources } from '../../utils/resources.js';

export default function ProductEditorPage() {
  return <ResourceEditorPage resource={resources.products} />;
}
