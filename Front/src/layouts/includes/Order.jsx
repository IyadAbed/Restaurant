import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { getmenu } from "../../plugins/redux/reducers/TableReducer";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AddMaintenance } from "./AddMaintenance";

function Order() {
  const menu = useSelector(getmenu);
  console.log(menu);

  const columns = [
    {
      name: "",
      selector: (row) => row.image,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.discreption,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Action",
      selector: (row) => row.id,
    },
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: `Are you sure to delete this User ?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` User was Deleted Successfully`, "", "success");
      } else Swal.fire("Cancel", "", "error");
    });
  };

  const data = menu.map(({ name, _id, discreption, price, image }) => {
    return {
      name,
      id: (
        <div className="tooltip tooltip-error text-white" data-tip="Delete">
          <button
            onClick={() => handleDelete(_id)}
            className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
          >
            <AiOutlineDelete className="text-red-500 text-[18px]" />
          </button>
        </div>
      ),
      price,
      discreption,
      image: <img src={image} className="h-12"></img>,
    };
  });

  return (
    <div>
      <DataTable pagination columns={columns} data={data} />
    </div>
  );
}

export default Order;
