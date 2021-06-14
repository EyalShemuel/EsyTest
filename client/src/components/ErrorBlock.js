import React from "react";

const ErrorBlock = ({ code, context, message, selector }) => {
  return (
    <tr className="block">
      <th>{code}</th>
      <th style={{ textAlign: "left", padding: "10px" }}>{message}</th>
      <th style={{ textAlign: "left", padding: "10px" }}>{context}</th>
      <th style={{ textAlign: "left", padding: "10px" }}>{selector}</th>
    </tr>
  );
};
//test
export default ErrorBlock;
