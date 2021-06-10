import React, { useState } from "react";
import loading from "./loading.gif"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // eslint-disable-next-line
  Link,  
} from "react-router-dom";
// components
import ErrorBlock from "./components/ErrorBlock";
import { GetUrl } from "./components/GetUrl";
//Css
import "./App.css";

export default function App() {
  const [Container, setContainer] = useState([]);
  const [ErrorArry, setErrorArry] = useState([]);
  const [status, setStatus] = useState(false);
  const listedErrorItems = ErrorArry.map((item) => (<p  style={{ marginLeft:'3%'}}>{item}</p>));
  return (
    <Router>
      <Switch>
        <Route path="/">
          <GetUrl
            Container={Container}
            setContainer={setContainer}           
            setErrorArry={setErrorArry}
            status = {status}
            setStatus={setStatus}
            
          />

<div style={{display:'flex' ,placeItems:'center', margin:'auto',justifyContent: 'center'}}>
{listedErrorItems}
</div>
         
{console.log(status)}
{status===false? <div style={{width: "100vw", display: "flex", justifyContent: "center" }}> <img src={loading}  alt="logo" /> </div>:<table style={{margin:'auto' , border:'1px solid black' , width:'90%'}}>
<tr className="block">
      <th>Code</th>
      <th>message</th>
      <th>context</th>
      <th>selector</th>
    </tr>
  {Container.sort((a, b) => (a.code > b.code ? 1 : -1)).map(
            (line, index) => (
              <ErrorBlock
                key={index}
                code={line.code}
                message={line.message}
                context={line.context}
                selector={line.selector}
                setErrorArry={setErrorArry}
                ErrorArry={ErrorArry}
                
              />
            )
          )}
</table>}
          
        </Route>
      </Switch>
    </Router>
  );
}
