import React from "react";

const ErrorBlock = ({
  code,
  context,
  message,
  selector,
  
 
}) => {
  const newCode = code.split(" ");
//   setErrorArry(newCode[3]);

 


  return (
    <tr className="block">
      <th>{newCode[3]}</th>
      <th style={{textAlign: 'left' , padding: '10px'}}>{message}</th>
      <th style={{textAlign: 'left',padding: '10px'}}>{context}</th>
      <th style={{textAlign: 'left', padding: '10px'}}>{selector}</th>
    </tr>
  );
};

export default ErrorBlock;
