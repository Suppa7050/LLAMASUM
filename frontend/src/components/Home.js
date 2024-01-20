// import React from "react";
// const Home = () =>{
//     return(
//         <div>hi hello</div>
//     );
// };
// export default Home;

// import React, { useState } from 'react';

// const Home = () => {
//   const [elements, setElements] = useState([]);

//   const handleButtonClick = () => {
//     // Create a new element (you can customize this based on your needs)
//     const newElement = <div key={elements.length + 1}>New Element</div>;

//     // Update the state to include the new element
//     setElements([...elements, newElement]);
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Add Element</button>
//       {/* Render the elements from the state */}
//       {elements}
//     </div>
//   );
// };

// export default Home;



// working
// import React, { useState, useRef } from 'react';

// const Home = () => {
//   const [files, setFiles] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const newFile = event.target.files[0];
//     setFiles([...files, newFile]);
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Add Files</button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//       {files.map((file, index) => (
//         <div key={index}>{file.name}</div>
//       ))}
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from 'react';

// const Home = () => {
//   const [files, setFiles] = useState([]);
//   const handleButtonClick = () => {
//     // const newFile = <input type='file' id={`file-${files.length + 1}`} />;
//     const newFile=document.createElement("input");
//     newFile.type="file";
//     newFile.id=`file-${files.length + 1}`;
//     console.log(newFile);
//     newFile.click();
//     newFile.addEventListener('change', (event) => {
//       const selectedFile = event.target.files[0];
//       // Now you can work with the selected file
//       console.log(selectedFile);
//       setFiles(files.push(selectedFile));

//     });
//     // console.log(newFile.formTarget.files[0]);
//     // document.getElementById(`file-${files.length + 1}`).click();
//     // setFiles([...files,newFile]);
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Add Files</button>
//       {files.map((file) => (
//         <div>{file}</div>
//       ))}
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from 'react';

// const Home = () => {
//   const [files, setFiles] = useState([]);
//   const handleButtonClick = () => {
//     // const newFile = <input type='file' id={`file-${files.length + 1}`} />;
//     const newFile=document.createElement("input");
//     newFile.type="file";
//     newFile.id=`file-${files.length + 1}`;
//     console.log(newFile);
//     newFile.click();
//     // console.log(newFile.formTarget.files[0]);
//     // document.getElementById(`file-${files.length + 1}`).click();
//     newFile.addEventListener('change', (event) => {
//       const selectedFile = event.target.files[0];
//       // Now you can work with the selected file
//       console.log(files);
//       files.push(newFile);
//       console.log(files);
//       setFiles(files);

//     });
    
//     // console.log(files)
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Add Files</button>
//       {files.map((file) => (
//         <div>{file.name}</div>
//       ))}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({settext}) => {
  const [files, setFiles] = useState([]);
  const nav=useNavigate();
  const handleButtonClick = () => {
    const newFile = document.createElement("input");
    newFile.type = "file";
    newFile.id = `file-${files.length + 1}`;
    newFile.accept="application/pdf";
    newFile.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      if(selectedFile.type!=="application/pdf")
      {
        alert("Invalid document. Please upload PDF file");
        return;
      }
      // Use the functional form of setFiles to ensure you are updating based on the previous state
      setFiles(prevFiles => [...prevFiles, selectedFile]);
    });

    newFile.click();
  };
  const submitFiles= async(event)=>{
    event.preventDefault();
    nav("/loading");
    console.log("called");
    console.log(typeof settext);
    console.log(settext);
    let headersList = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
     }
     
     let bodyContent = new FormData();
     for(let i of files)
     {
      bodyContent.append("file" ,i);
     }
     console.log("befor");
     try {
      let response = await fetch("https://llamasum-backend.onrender.com/summary", { 
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      let data = await response.text();
      let summary=JSON.parse(data)["body"]
      console.log(summary);
      if(summary==="SimErr")
      {
        nav("/");
        alert("Please give similar documents(of same domain)");
        return;
      }
      settext(summary);
      nav("/summary");

    } catch (error) {
      console.error('Fetch error:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
      }
    }
    
  }
  const deleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  return (
    <div className='total'>
        <div className='center_div'>
          <h1 className='project_name'>Llama2 Multi-Document Summerization</h1>
          <div className='center_div_child'>
            <button className='add_file' onClick={handleButtonClick}>Add PDF Files</button>
            <div className='file_names_cover'>
              {files.map((file, index) => (
                <div className='file_names' key={index}><span onClick={() => deleteFile(index)}></span>{file.name}</div>
                
              ))}
            </div>
            <form onSubmit={submitFiles}>
            <input type='submit' className='btn btn-success'/>
            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Home;
