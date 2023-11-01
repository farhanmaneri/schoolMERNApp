import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [contacts, setContacts] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    fetecContact();
  }, []);

  const fetecContact = async () => {
    setLoading(true);
    try {
      let res = await fetch("http://localhost:5000/contacts");
      console.log(res);
      if (res.ok) {
        let data = await res.json();
        setContacts(data);
        console.log(data);
      } else {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <h1>loading....</h1>
      ) : error ? (
        <>
          <h3> Error {error} </h3>
        </>
      ) : (
        <>
          <div className="container d-flex justify-content-center m-2">
            <h1>Schools Detail</h1>
          </div>
          <div className="container d-flex justify-content-center m-2">
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="outline-success" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
          {contacts &&
            contacts.data.map((user, index) => {
              return (
                <>
                  <ul>
                    <li style={{ listStyle: "none" }} key={index}>
                      {index + 1}.Name: {user.name} Email: {user.email}
                    </li>
                  </ul>
                </>
              );
            })}
        </>
      )}
    </>
  );
}

export default Contact;
