// import Loader from "../components/Loader";
import TableOverview from "../components/TableOverview";
import { Outlet, useNavigation } from "react-router-dom";
import { Aside } from "./includes/Aside";

function AdminLayout() {
  // const navigation = useNavigation();
  // const isLoading = navigation.state === "loading";

  return (
    <>
      {/* {isLoading && <Loader />} */}

      <Aside />

      <div className="overflow-scroll">
        <main className="p-4 px-8  md:ml-60 h-auto py-20 mt-2 ">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
