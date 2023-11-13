import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { getmenu } from "../../plugins/redux/reducers/TableReducer";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AddMaintenance } from "./AddMaintenance";
import { useEffect, useState } from "react";
import axios from "../../plugins/axios";

function MaintenanceTable() {
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const datas = await axios.get("getAllMaintenance");
        if (datas?.data?.success) {
          console.log("datas.data.success", datas.data.success);
          setMaintenance(datas.data.success);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  const columns = [
    {
      name: "Impact on the Restaurant",
      selector: (row) => row.impact,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
    },
    {
      name: "Start Date",
      selector: (row) => row.closeDates0,
    },
    {
      name: "End Date",
      selector: (row) => row.closeDates1,
    },
  ];

  const data = maintenance.map(({ impact, price, comment, closeDates }) => {
    return {
      impact,
      comment,
      price,
      closeDates0: closeDates[0].split("T")[0],
      closeDates1: closeDates[1].split("T")[0],
    };
  });

  return (
    <div>
      <AddMaintenance />
      <DataTable pagination columns={columns} data={data} />
    </div>
  );
}

export default MaintenanceTable;
