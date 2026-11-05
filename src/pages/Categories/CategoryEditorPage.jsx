import ResourceEditorPage from '../shared/ResourceEditorPage.jsx';
import { resources } from '../../utils/resources.js';

export default function CategoryEditorPage() {
  return <ResourceEditorPage resource={resources.categories} />;
}
