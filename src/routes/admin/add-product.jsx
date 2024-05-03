import { useState } from "react";

import { GetCategories } from "../../actions/get-categories";
import { GetProducts } from "../../actions/get-products";
import { GetSubCategories } from "../../actions/get-subcategories";
import ProductForm from "../../components/admin/product-form";
import ProductList from "../../components/admin/product-list";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  GetSubCategories({
    setSubCategories,
  });

  const { isLoading } = GetCategories({
    setCategories,
  });

  const { refetch } = GetProducts({ setProducts });

  return (
    <section className="flex flex-col items-center px-4 my-5 text-2xl font-semibold text-white">
      <h1 className="self-center font-extrabold tracking-wider">
        All Products
      </h1>
      <div className="my-6 bg-[#000000] bg-opacity-70 container">
        <ProductList products={products} refetch={refetch} />
      </div>

      <ProductForm
        categories={categories.data}
        subcategories={subcategories.data}
        refetch={refetch}
        isLoading={isLoading}
      />
    </section>
  );
};

export default AddProduct;
