import { useEffect, useState } from "react";

import { deleteItem } from "../../actions/delete-item";
import { GetCategories } from "../../actions/get-categories";
import CategoryForm from "../../components/admin/category-form";
import CategoryList from "../../components/admin/category-list";

const AddCategory = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { refetch } = GetCategories({
    setCategories,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 mx-5 my-5 text-2xl font-semibold text-white">
      <h1 className="self-center font-extrabold tracking-wider">
        All Categories
      </h1>

      <CategoryList
        categories={categories}
        deleteItem={deleteItem}
        refetch={refetch}
      />
      <CategoryForm categories={categories} refetch={refetch} />
    </section>
  );
};

export default AddCategory;
