import ResourceListPage from '../shared/ResourceListPage.jsx';
import { resources } from '../../utils/resources.js';

export default function UsersPage() {
  return <ResourceListPage resource={resources.users} />;
}
