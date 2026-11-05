import ResourceEditorPage from '../shared/ResourceEditorPage.jsx';
import { resources } from '../../utils/resources.js';

export default function UserEditorPage() {
  return <ResourceEditorPage resource={resources.users} />;
}
