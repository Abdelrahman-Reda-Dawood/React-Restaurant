import { ShoppingBag, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { deleteItem } from "../../actions/delete-item";
import { useProductPreviewModal } from "../../hooks/use-preview-modal";
import Currency from "./currency";
import IconButton from "./icon-button";

const ProductCard = ({ data, image = "visible", button = "add", refetch }) => {
  const previewModal = useProductPreviewModal();
  const navigate = useNavigate();

  const onPreview = (e) => {
    e.preventDefault();
    previewModal.onOpen(data);
  };

  const onEdit = () => {
    navigate(`/admin/products/${data.id}`);
  };

  const onDelete = () => {
    deleteItem({ id: data._id, routeName: "products" }).then(() => {
      refetch();
    });
  };

  const imgURL =
    data.imageCover !=
    // Handle No Image Case
    "undefined/products/null"
      ? data.imageCover?.replace(
          "undefined",
          `${import.meta.env.VITE_REACT_IMAGES_URL}`
        )
      : "/logo.png";

  return (
    <section
      className="flex justify-center m-1 text-white capitalize"
      onClick={onPreview}>
      <div className="w-full p-1 border border-orange-200 border-opacity-50 rounded-lg cursor-pointer bg-white/30 group">
        {image == "visible" && (
          <img
            src={imgURL}
            alt="cart Item"
            className="w-full bg-white rounded aspect-square"
          />
        )}
        {/* Title & Cateogry */}
        <div className="flex items-center gap-1 mt-2 overflow-x-auto hide-scrollbar md:flex-row xs:flex-col md:gap-4 xs:gap-1">
          <h5
            className={`font-semibold text-nowrap xl:text-lg md:text-base sm:text-sm xs:text-xs`}>
            {data.title}
          </h5>
          <div className="flex items-center justify-between w-full">
            {image == "visible" && (
              <p className="p-1 text-sm text-orange-300 rounded bg-black/50 w-fit h-fit">
                {data.category?.name}
              </p>
            )}
            {button == "add" && (
              <ShoppingBag className="block p-1 overflow-visible text-black transition bg-orange-300 border-2 border-red-300 rounded-full md:hidden size-auto hover:border-orange-600 hover:scale-105" />
            )}
          </div>
        </div>
        {/* Prices & Button */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex mt-1 text-[10px] gap-1 hide-scrollbar overflow-x-auto">
            {/* Basic Price */}
            <div className="flex flex-col items-center p-1 rounded bg-white/20">
              <p className="text-gray-300">Basic</p>
              <Currency value={data.price[0]?.pr} />
            </div>
            {/* Mid Price */}
            {data.price[1] && (
              <div className="flex flex-col items-center p-1 rounded bg-white/20">
                <p className="text-gray-300">Medium</p>
                <Currency value={data.price[1].pr} />
              </div>
            )}
            {/* Large Price */}
            {data.price[2] && (
              <div className="flex flex-col items-center p-1 rounded bg-white/20">
                <p className="text-gray-300">Large</p>
                <Currency value={data.price[2].pr} />
              </div>
            )}
          </div>
          {/* Admin or User View */}
          {button == "add" ? (
            <ShoppingBag className="hidden overflow-visible text-black transition bg-orange-300 border-2 border-red-300 rounded-full md:block size-auto lg:p-2 md:p-1 hover:border-orange-600 hover:scale-105" />
          ) : (
            <div className="flex gap-px">
              <IconButton
                className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
                onClick={onEdit}
                icon={<SquarePen size={15} />}
              />
              <IconButton
                className="p-1 px-2 transition border border-orange-300 rounded-full bg-black/70 hover:border-red-800 hover:scale-105"
                onClick={onDelete}
                icon={<Trash2 size={15} />}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
