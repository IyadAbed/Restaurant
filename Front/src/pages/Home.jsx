import { useState } from "react";
import CreateOrder from "../containers/CreateOrder";
import Landing from "../containers/Landing";
import Menu from "../containers/Menu";

function Home() {
  const [selectedDate, setSelectedDate] = useState(false);
  return (
    <>
      <Landing />
      <Menu selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <CreateOrder selectedDate={selectedDate} />
    </>
  );
}

export default Home;
