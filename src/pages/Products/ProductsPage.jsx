import ResourceListPage from '../shared/ResourceListPage.jsx';
import { resources } from '../../utils/resources.js';

export default function ProductsPage() {
  return <ResourceListPage resource={resources.products} />;
}
