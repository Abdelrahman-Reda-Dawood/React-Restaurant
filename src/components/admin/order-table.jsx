import TableBody from "./order-table-body";
import TableHead from "./order-table-head";
import Button from "../../components/ui/button";

import { useSortableTable } from "./useSortableTable";
import toast from "react-hot-toast";
import axios from "axios";

const columns = [
  {
    label: "Order",
    accessor: "[productData]",
    sortable: false,
  },
  {
    label: "Phone",
    accessor: "userphone",
    sortable: false,
  },
  {
    label: "Date",
    accessor: "Date",
    sortable: true,
  },
  {
    label: "Governate",
    accessor: "governate",
    sortable: true,
  },
  {
    label: "State",
    accessor: "state",
    sortable: true,
  },
  {
    label: "Address",
    accessor: "address",
    sortable: false,
  },
  {
    label: "Payment Method",
    accessor: "TypeOfPayment",
    sortable: true,
  },
  {
    label: "Price",
    accessor: "TotalPrice",
    sortable: false,
  },
  {
    label: "Paid",
    accessor: "statue",
    sortable: true,
  },
];

const OrderTable = () => {
  const [orders, setOrders, handleSorting] = useSortableTable();
  // const [paidStatus, setPaidStatus] = "Not Paid";

  const updateOrderData = (newData) => {
    console.log(orders.data[0].statue);
    setOrders(newData);
  };

  // const onUpdate = async () => {
  //   try {
  //     await axios.put(`${import.meta.env.VITE_REACT_API_URL}/sells`, {});
  //     toast.success("Order Updated successfully.");
  //   } catch (error) {
  //     console.error("Error Updating Order:", error);
  //     toast.error("Error Updating Order.");
  //   }
  // };

  return (
    <table className="table border-4 table-fixed">
      <caption className="py-5 text-2xl font-extrabold tracking-wider">
        Orders
        <span className="flex justify-end">
          <Button
            text={"Update Table"}
            onClick={() => toast.error("Not working yet")}
          />
        </span>
      </caption>
      {orders && (
        <>
          <TableHead {...{ columns, handleSorting }} />
          <TableBody
            onUpdateData={updateOrderData}
            columns={columns}
            tableData={orders}
          />
        </>
      )}
    </table>
  );
};
export default OrderTable;
