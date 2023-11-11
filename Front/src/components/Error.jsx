// import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Errors() {
  // const error = useRouteError();
  // console.log(error);

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center">
      <h1>Something went wrong 😢</h1>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Errors;
