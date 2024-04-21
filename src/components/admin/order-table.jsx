import TableBody from "./order-table-body";
import TableHead from "./order-table-head";
import { useSortableTable } from "./useSortableTable";

const columns = [
  {
    label: "User ID",
    accessor: "userID",
    sortable: false,
  },
  {
    label: "Order",
    accessor: "[productData]",
    sortable: false,
    CellData: ({ row }) => (
      <div className="flex items-start gap-1">
        <p className="rounded bg-white/50">
          {row.original.productData.map((product) => product.title).join(", ")}
        </p>
        <p className="bg-gray-300 rounded">
          {row.original.productData.map((product) => product.scale).join(", ")}
        </p>
        <p className="text-white rounded bg-black/70">
          x
          {row.original.productData
            .map((product) => product.quantity)
            .join(", ")}
        </p>
      </div>
    ),
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
  //TODO: tableData = orders
  //TODO: setTableData = setOrders

  const [orders, setOrders, handleSorting] = useSortableTable();

  const updateOrderData = (newData) => {
    setOrders(newData);
  };

  return (
    <table className="table border-4 table-fixed">
      <caption className="self-center py-5 text-2xl font-extrabold tracking-wider">
        Orders
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
