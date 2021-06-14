import React from "react";
import axios from "axios";
import arrayUniq from "array-uniq";

export function GetUrl({ setContainer, setErrorArry, setStatus, Status }) {
  const HandelSubmit = (event) => {
    event.preventDefault();
    setStatus(false);
    const requestOptions = {
      url: event.target.children.url.value,
    };

    axios.post("getTestResults", requestOptions).then((results) => {
      const { data } = results;
      const codeArray = data.map((errorLine) => errorLine.code);
      const uniqueNewDada = arrayUniq(codeArray);
      setErrorArry(uniqueNewDada.sort());
      setContainer(data);
      setStatus(true);
    });
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
