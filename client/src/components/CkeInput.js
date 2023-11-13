import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

export default function CkeInput() {
  const [description, setDescription] = useState();
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
      const onSubmit = () => {
        console.log(description);
        postData("http://localhost:5000/contacts", {description}).then((response) => {
          console.log(response); // JSON data parsed by `data.json()` call
        });
      };
  return (
    <>
    <div className='App'>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onReady={ ( editor ) => {
          console.log( "CKEditor5 React Component is ready to use!", editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( data );
          setDescription(data );
        } }
    
      />
      <button onClick={ onSubmit }>Submit</button>
          </div>
      </>);
}
