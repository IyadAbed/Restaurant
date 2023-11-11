import Header from "../components/Header";
import Loader from "../components/Loader";
import TableOverview from "../components/TableOverview";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  // const navigation = useNavigation();
  // const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* {isLoading && <Loader />} */}

      <Header />

      <div className="overflow-scroll">
        <main className="bg-amber-50">
          <Outlet />
        </main>
      </div>

      <TableOverview />
    </div>
  );
}

export default AppLayout;
