import { IProductCategory } from '../types';

interface UpsertCategoryFormProps {
  initialValue: IProductCategory | null;
}

const UpsertCategoryForm = ({ initialValue }: UpsertCategoryFormProps) => {
  return <h1>{JSON.stringify(initialValue)}</h1>;
};

export default UpsertCategoryForm;
