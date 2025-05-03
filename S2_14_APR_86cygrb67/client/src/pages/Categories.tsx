import { Typography } from '@mui/material';
import CategoryList from '../components/categories/CategoryList';

const Categories = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <CategoryList />
    </div>
  );
};

export default Categories;