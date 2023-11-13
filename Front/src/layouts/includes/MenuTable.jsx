import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getmenu } from "../../plugins/redux/reducers/TableReducer";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AddMenu } from "./AddMenu";
import axios from "../../plugins/axios";

function MenuTable() {
  const menu = useSelector(getmenu);
  const dispatch = useDispatch();

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
      title: `Are you sure to delete this Item ?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:5500/deleteItem/" + id)
          .then((response) => {
            console.log(response.data);
            Swal.fire(` Item was Deleted Successfully`, "", "success");
            dispatch(getAll());
          })
          .catch((error) => console.log(error.message));
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
      image: <img src={image} className="w-24"></img>,
    };
  });

  return (
    <div>
      <AddMenu />
      <DataTable pagination columns={columns} data={data} />
    </div>
  );
}

export default MenuTable;
