(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{21:function(e,t,n){},23:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),s=n(14),i=n.n(s),l=(n(21),n(9)),o=n.p+"static/media/loading.706124a2.gif",a=n(15),d=n(2),j=n(1),u=function(e){var t=e.code,n=e.context,c=e.message,r=e.selector,s=t.split(" ");return Object(j.jsxs)("tr",{className:"block",children:[Object(j.jsx)("th",{children:s[3]}),Object(j.jsx)("th",{style:{textAlign:"left",padding:"10px"},children:c}),Object(j.jsx)("th",{style:{textAlign:"left",padding:"10px"},children:n}),Object(j.jsx)("th",{style:{textAlign:"left",padding:"10px"},children:r})]})};function h(e){var t=e.setContainer,n=e.setErrorArry,c=e.setStatus;e.Status;return Object(j.jsxs)("div",{style:{display:"flex",flexDirection:"column",placeItems:"center",width:"100vw"},children:[Object(j.jsx)("h1",{children:"site tester"}),Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),c(!1);var r={method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e.target.children.url.value})};fetch("/getTestResults",r).then((function(e){return e.json()})).then((function(e){var r=[],s=[];e.forEach((function(e){var t=e.code.replaceAll("WCAG2AA Principl1 Guidlin",""),n=(t=(t=(t=t.replaceAll("WCAG2AA Principl2 Guidlin","")).replaceAll("WCAG2AA Principl3 Guidlin","")).replaceAll("WCAG2AA Principl4 Guidlin","")).split(" ");r.push(n[1])})),r.sort().forEach((function(e){s.includes(e)||s.push(e)})),n(s),console.log(s),t(e),c(!0)}))},style:{width:"100vw",display:"flex",justifyContent:"center"},children:[Object(j.jsx)("input",{type:"url",name:"url",id:"url",placeholder:"Enter Url to Test",style:{width:"70%"}}),Object(j.jsx)("input",{type:"submit",value:"OK"})]})]})}n(23);function p(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)([]),i=Object(l.a)(s,2),p=i[0],b=i[1],x=Object(c.useState)(!1),f=Object(l.a)(x,2),O=f[0],g=f[1],y=p.map((function(e){return Object(j.jsx)("p",{style:{marginLeft:"3%"},children:e})}));return Object(j.jsx)(a.a,{children:Object(j.jsx)(d.c,{children:Object(j.jsxs)(d.a,{path:"/",children:[Object(j.jsx)(h,{Container:n,setContainer:r,setErrorArry:b,status:O,setStatus:g}),Object(j.jsx)("div",{style:{display:"flex",placeItems:"center",margin:"auto",justifyContent:"center"},children:y}),console.log(O),!1===O?Object(j.jsxs)("div",{style:{width:"100vw",display:"flex",justifyContent:"center"},children:[" ",Object(j.jsx)("img",{src:o,alt:"logo"})," "]}):Object(j.jsxs)("table",{style:{margin:"auto",border:"1px solid black",width:"90%"},children:[Object(j.jsxs)("tr",{className:"block",children:[Object(j.jsx)("th",{children:"Code"}),Object(j.jsx)("th",{children:"message"}),Object(j.jsx)("th",{children:"context"}),Object(j.jsx)("th",{children:"selector"})]}),n.sort((function(e,t){return e.code>t.code?1:-1})).map((function(e,t){return Object(j.jsx)(u,{code:e.code,message:e.message,context:e.context,selector:e.selector,setErrorArry:b,ErrorArry:p},t)}))]})]})})})}var b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,33)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),s(e),i(e)}))};i.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(p,{})}),document.getElementById("root")),b()}},[[32,1,2]]]);
//# sourceMappingURL=main.1abcf5cf.chunk.js.map