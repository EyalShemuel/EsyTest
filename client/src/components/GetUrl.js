import React from "react";

export function GetUrl({ setContainer, setErrorArry ,setStatus,Status}) {
  // setStatus(false);
 
  const HandelSubmit = (event) => {
    event.preventDefault();
    setStatus(false);
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: event.target.children.url.value }),
    };
    
    fetch("/getTestResults", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const newDada = [];
        const uniqueNewDada = [];
        console.log(data)
      /*   data.forEach((item) =>
        { let minimalCode =   item.code.replaceAll("WCAG2AA Principl1 Guidlin", "")
              minimalCode = minimalCode.replaceAll("WCAG2AA Principl2 Guidlin", "")
              minimalCode = minimalCode.replaceAll("WCAG2AA Principl3 Guidlin", "")
              minimalCode = minimalCode.replaceAll("WCAG2AA Principl4 Guidlin", "")
             const splitCode = minimalCode.split(' ');

       
        newDada.push(splitCode[1])} 
        );*/

       

        data.sort().forEach((c) => {
          if (!uniqueNewDada.includes(c)) {
            uniqueNewDada.push(c);
          }
        });
       
        setErrorArry(uniqueNewDada);
        console.log(uniqueNewDada);
        setContainer(data);
        setStatus(true);
      })
      
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        width: "100vw",
      }}
    >
      <h1>site tester</h1>
      <form
        onSubmit={HandelSubmit}
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <input
          type="url"
          name="url"
          id="url"
          placeholder="Enter Url to Test"
          style={{ width: "70%" }}
        />
        <input type="submit" value="OK" />
      </form>
    </div>
  );
}
