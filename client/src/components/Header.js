import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const count = useSelector((state) => state.counter.value);

  return (
    <div className="container-fluid d-flex justify-content-between border border-red bg-danger">
      <div className="m-2">
        <h1>Header Section</h1>
      </div>
      <div className=" d-flex justify-content-center align-items-center">
        <h2>Counter: {count}</h2>
      </div>
    </div>
  );
}

export default Header;
