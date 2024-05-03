import { useState } from "react";
import BillModal from "../modals/bill-modal";

const TableBody = ({ tableData, columns, onUpdateData }) => {
  const [editCell, setEditCell] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderRow, setSelectedOrderRow] = useState(null); // State to store selected row

  const renderCellContent = (accessor, data) => {
    if (accessor === "statue") {
      return statueCellContent(accessor, data);
    } else if (accessor === "[productData]") {
      return productsCellContent(data);
    } else {
      return nullCellContent(accessor, data);
    }
  };

  // Paid Status
  const statueCellContent = (accessor, data) => {
    const isEditing =
      editCell && editCell.accessor === accessor && editCell.rowId === data._id;

    const handleChange = (e) => {
      const { value } = e.target;
      onUpdateData({
        ...tableData,
        data: tableData.data.map((row) =>
          row._id === data._id ? { ...row, [accessor]: value } : row
        ),
      });
    };

    if (isEditing) {
      return (
        <select value={data[accessor]} onChange={handleChange}>
          <option value="Paid">Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>
      );
    } else {
      return data[accessor] === true ? "Paid" : "Not Paid";
    }
  };

  // Order Products
  const productsCellContent = (data) => {
    return (
      <div
        className="p-px font-semibold rounded cursor-pointer bg-orange-300/60"
        onClick={() => {
          setSelectedOrderRow(data); // Set selected row when clicked
          setIsModalOpen(true);
        }}>
        view order
      </div>
    );
  };

  // No Accessor
  const nullCellContent = (accessor, data) => {
    return data[accessor] ? data[accessor] : "——";
  };

  const handleCellClick = (rowId, accessor) => {
    setEditCell({ rowId, accessor });
  };

  // const handleChange = (e, rowId, accessor) => {
  //   const { value } = e.target;
  //   const newDataState = [...tableData.data];
  //   const row = newDataState.find((row) => row._id === rowId);
  //   row[accessor] = value;
  //   onUpdateData({ ...tableData, data: newDataState });
  //   console.log(`Row ${rowId}, Accessor ${accessor}, Value ${value}`);
  // };

  return (
    <tbody>
      {tableData.data.map((data) => (
        <tr key={data._id}>
          {columns.map(({ accessor }) => (
            <td
              key={accessor}
              className="border-t border-r border-r-gray-700 border-white px-2 py-2.5 overflow-x-auto hide-scrollbar"
              onClick={() => handleCellClick(data._id, accessor)}>
              {renderCellContent(accessor, data)}
              {/* Pass data as selectedData */}
            </td>
          ))}
        </tr>
      ))}

      {selectedOrderRow && (
        <BillModal
          data={selectedOrderRow}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </tbody>
  );
};

export default TableBody;
