import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { GetProductWithId } from "../../actions/get-products";
import SizeFields from "../../components/admin/size-fields";
import Button from "../../components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [price_basic, setPrice_basic] = useState("");
  const [price_md, setPrice_md] = useState("");
  const [price_lg, setPrice_lg] = useState("");

  const [sizes, setSizes] = useState("1");
  const [imagePreview, setImagePreview] = useState();

  GetProductWithId({ setProduct, id });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageCover: null,
    price: [],
  });

  const setPriceBySize = (size, price) => {
    const sizeMap = {
      basic: setPrice_basic,
      md: setPrice_md,
      lg: setPrice_lg,
    };
    const setter = sizeMap[size];
    if (setter) setter(price);
  };

  useEffect(() => {
    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        title: product.result.title || "",
        description: product.result.description || "",
        price: product.result.price || [],
      }));

      setImagePreview(
        product.result?.imageCover.replace(
          "undefined/",
          `${import.meta.env.VITE_REACT_IMAGES_URL}/`
        )
      );

      // Set sizes state to the length of the price array
      setSizes(product.result.price.length.toString());

      product.result.price.forEach((item) => {
        setPriceBySize(item.size, item.pr);
      });
    }
  }, [product]);

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    // Handling Form Data
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    if (formData.imageCover) {
      formdata.append("imageCover", formData.imageCover);
    }
    formdata.append("price.0.pr", price_basic);
    formdata.append("price.0.size", "basic");
    if (price_md) {
      formdata.append("price.1.pr", price_md);
      formdata.append("price.1.size", "md");
    }
    if (price_lg) {
      formdata.append("price.2.pr", price_lg);
      formdata.append("price.2.size", "lg");
    }

    // API Request
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/products/${id}`,
        formdata
      );
      toast.success("Product Updated Successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Error occurred: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageCover: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!product)
    return (
      <div className="overflow-hidden text-3xl text-white">Loading....</div>
    );

  return (
    <form
      className="flex flex-col items-center gap-4 mx-10 ml-auto text-white mt-14"
      onSubmit={onSubmit}>
      <p className="text-3xl font-semibold tracking-wider text-white">
        Edit:
        <span className="p-1 font-bold rounded bg-white/20">
          {product.result.title}
        </span>
      </p>
      <div className="flex flex-row gap-6">
        {/* Title & Description */}
        <div className="flex flex-col gap-6">
          <label htmlFor="Title" className="text-xl font-bold">
            Title
          </label>
          <input
            required
            className="w-full h-10 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg xl:h-12 focus:border-white bg-opacity-70"
            placeholder="Enter Description"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className="text-xl font-bold">
            Description
          </label>
          <textarea
            required
            className="pt-3 pl-3 m-0 overflow-y-auto text-base bg-black border border-red-300 rounded-lg hide-scrollbar min-h-[78px] max-h-[78px] focus:border-white bg-opacity-70"
            placeholder="Enter Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col items-center gap-6">
          <label htmlFor="Image Preview" className="text-xl font-bold">
            Image Preview
          </label>
          <div
            className="flex items-center justify-start px-2 text-base text-gray-300 bg-black border border-red-300 rounded-lg cursor-pointer min-h-12 max-h-fit text-clip focus:border-white hover:cursor-pointer bg-opacity-70 group"
            onClick={() => document.querySelector(".image").click()}>
            <input
              type="file"
              accept="image/*"
              value={""}
              className="hidden image"
              disabled={formData.imageCover}
              onChange={handleImageChange}
            />
            {!formData.imageCover ? (
              <span className="flex items-center justify-between gap-2 transition duration-300 image group-hover:text-green-300">
                <p>New Image</p>
                <ImagePlus />
              </span>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 truncate max-w-52">
                <p className="items-start py-1 overflow-hidden text-blue-500 text-ellipsis">
                  {imagePreview ? formData.imageCover.name : "Current Image"}
                </p>
                <Trash2
                  className="overflow-visible hover:text-red-400 "
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      imageCover: null,
                    }));
                    setImagePreview(
                      product.result?.imageCover.replace(
                        "undefined/",
                        `${import.meta.env.VITE_REACT_IMAGES_URL}/`
                      )
                    );
                  }}
                  size={20}
                />
              </div>
            )}
          </div>
          <img
            src={imagePreview ? imagePreview : "/No_Preview.png"}
            alt="image preview"
            className="flex h-48 rounded w-44"
          />
        </div>

        {/* Sizes & Submit Button*/}
        <div className="flex flex-col items-center gap-y-6">
          <label htmlFor="Prices" className="text-xl font-bold">
            Prices
          </label>
          <select
            required
            name="size"
            value={sizes}
            className="relative input-field"
            onChange={(e) => setSizes(e.target.value)}>
            <option value="" disabled>
              Select Size
            </option>
            <option value="1">Size: basic</option>
            <option value="2">Sizes: basic, md</option>
            <option value="3">Sizes: basic, md, lg</option>
          </select>
          <SizeFields
            sizes={sizes}
            price_basic={price_basic}
            setPrice_basic={setPrice_basic}
            price_md={price_md}
            setPrice_md={setPrice_md}
            price_lg={price_lg}
            setPrice_lg={setPrice_lg}
          />
          {/* Submit button */}
          <Button
            text="Update"
            type="submit"
            disabled={formData.title === "" || formData.description === ""}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
