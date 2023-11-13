import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { getmenu } from "../../plugins/redux/reducers/TableReducer";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AddMaintenance } from "./AddMaintenance";
import axios from "../../plugins/axios";
import { useEffect, useState } from "react";
import { ClassNames } from "@emotion/react";

function Order() {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const datas = await axios.get("getAllOrder");
        if (datas?.data?.success) {
          console.log(datas.data.success);
          setorders(datas.data.success);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  const columns = [
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "phoneNumber",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "serveTime",
      selector: (row) => row.serveTime,
    },
    // {
    //   name: "itemServeHour",
    //   selector: (row) => row.itemServeHour,
    // },
    // {
    //   name: "itemName",
    //   selector: (row) => row.itemName,
    // },
    // {
    //   name: "itemQuantity",
    //   selector: (row) => row.itemQuantity,
    // },
    {
      name: "items",
      selector: (row) => row.items,
      cell: (row) => (
        <div ClassNames="flex flex-col overflow-scroll">
          {row.items.map((item, index) => (
            <div key={index}>
              <p>Item: {item.id.name}</p>
              <p>Serve Hour: {item.serveHour}</p>
              <p>Quantity: {item.quantity}</p>
              <br />
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "OrderNumber",
      selector: (row) => row.id,
    },
  ];

  const data = orders.map(
    ({ name, phoneNumber, serveTime, price, items, _id }) => {
      // const formattedItems = items.map(
      //   (item) => `${item.quantity} ${item.id.name} (${item.serveHour})`
      // );

      return {
        name,
        phoneNumber,
        price,
        serveTime: serveTime.split("T")[0],
        items,
        id: _id,
      };
    }
  );

  return (
    <div>
      <DataTable
        selectableRows
        fixedHeader
        pagination
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default Order;
