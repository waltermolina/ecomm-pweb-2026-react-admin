import ResourceListPage from '../shared/ResourceListPage.jsx';
import { resources } from '../../utils/resources.js';

export default function CategoriesPage() {
  return <ResourceListPage resource={resources.categories} />;
}
