import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CkeInput from "./CkeInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function FormData() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [textValue, setTextValue] = useState("");

  async function postData(url = "", data = {}) {
    console.log(data);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onSubmit = (data) => {
    console.log(data);
    postData("http://localhost:5000/contacts", data).then((response) => {
      console.log(response); // JSON data parsed by `data.json()` call
    });
  };

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <>
      <div className="d-flex flex-wrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("name")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("email", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input value="submit" type="submit" />
        </form>
        <div className="m-2">{/* <CkeInput/> */}</div>
      </div>
    </>
  );
}

export default FormData;
