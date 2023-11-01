import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormData from "../components/FormData";
import Header from "../components/Header";
import { Counter } from "../features/counter/Counter";

function Home() {
  return (
    <>
      <div className="container  bg-info">
      <Header />
        <h1>Welcome to School Contacts App</h1>
        <Link to={"/schools"}>
          <Button variant="outline-primary">Go to School</Button>
        </Link>
        <Link to={"/contacts"}>
          <Button variant="outline-primary">Go to Contacts</Button>
        </Link>
        <div  className="container d-flex justify-content-between">

      <FormData />
      <Counter/>
        </div>
      </div>
    </>
  );
}

export default Home;
