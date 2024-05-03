import Modal from "./modal";
import Currency from "../../components/ui/currency";

const BillModal = ({ data, isOpen, onClose }) => {
  // console.log(data);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6 p-4">
        <h2 className="font-serif text-xl font-semibold tracking-wider">
          Order Details
        </h2>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-5">
            <div className="flex gap-2 p-1 font-semibold text-black bg-white rounded w-fit">
              <p>Order Date:</p>
              <p className="p-px rounded bg-orange-300/60">{data.Date}</p>
            </div>

            <div className="flex gap-2 p-1 font-semibold text-black bg-white rounded w-fit">
              <p>Total Price:</p>
              <span className="p-px rounded bg-orange-300/60">
                <Currency value={data.TotalPrice} />
              </span>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex gap-2 p-1 font-semibold text-black bg-white rounded w-fit">
              <p>Order Type:</p>
              <p className="p-px rounded bg-orange-300/60">{data.orderType}</p>
            </div>

            <div className="flex gap-2 p-1 font-semibold text-black bg-white rounded w-fit">
              <p>Order Type:</p>
              <p className="p-px rounded bg-orange-300/60">{data.statue}</p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden border border-gray-300 rounded-lg">
          {/* Table Head */}
          <div className="flex justify-between px-2 py-2 space-x-8 font-semibold text-black bg-gray-200">
            <p>Item</p>
            <p>Dough</p>
            <p>Quantity</p>
            <p>Scale</p>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-300">
            {data.productData.map((item) => (
              <div key={item._id} className="flex justify-between px-3 py-2">
                <p>{item.title}</p>
                <p>{item.doughType ? item.doughType : "----"}</p>
                <p>{item.quantity}</p>
                <p>{item.scale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default BillModal;
