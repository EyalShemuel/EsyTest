const express = require("express");
const app = express();
const path = require("path");
const pa11y = require("pa11y");
const bp = require("body-parser");
const { getLinksSecondTime, getPageLinks } = require("./getLinksSecondTime");
const extractDomain = require("@tech_userreport.com/extractdomain");
const deleteArrDuplicates = require("delete-arr-duplicates");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, ".", "/client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client", "build"));
});
//
app.post("/getTestResults", async (req, res) => {
  try {
    const theUrl = req.body.url;
    if (!theUrl) {
      throw Error("did`t enter url");
    } else {
      console.log("entered");
      const testResult = await pa11yCall(theUrl);
      let Results = changeResult(testResult);

      res.send(Results);
    }
    // callGetAllSitLinks(theUrl);
  } catch (error) {
    console.error(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client", "build"));
});

const callGetAllSitLinks = async (theUrl) => {
  let LinksArry = [];
  var TempLinksArry = [];

  // get the baseDomain
  const baseDomain = extractDomain(theUrl);

  //run first time and gets page links
  const firstScan = await getPageLinks(baseDomain, LinksArry, theUrl);

  // console.log(LinksArry)

  ///////////////////////////////////////////////////////
  let numberOfLinks = firstScan.length;
  console.log("first run number of links:", numberOfLinks);
  ///////////////////////////////////////////////////////

  const filteredLinkArray = await getLinksSecondTime(baseDomain, firstScan);

  let finaleLinkArray = deleteArrDuplicates(filteredLinkArray);
  console.log("the 0 answer:", finaleLinkArray.length);
  /* 
  const filteredLinkArray1 = await filteredLinkArrayFunction(
    filteredLinkArray,
    baseDomain
  );
  console.log("the 1 answer:", filteredLinkArray1.length);

  const filteredLinkArray2 = filteredLinkArrayFunction(
    filteredLinkArray1,
    baseDomain
  );
  console.log("the 2 answer:", filteredLinkArray2.length);

  const filteredLinkArray3 = filteredLinkArrayFunction(
    filteredLinkArray2,
    baseDomain
  );
  console.log("the 3 answer:", filteredLinkArray3.length); */
};

const pa11yCall = async (theUrl) => {
  try {
    console.log("calling pa11y....");
    if (theUrl === "") throw new Error("empty url");
    return await pa11y(theUrl, {
      chromeLaunchConfig: { args: ["--no-sandbox"] },
    }).then((results) => {
      return results;
    });
  } catch (error) {
    console.log(error);
  }
};

const changeResult = (testResult) => {
  console.log(testResult.issues);
  if (testResult) throw new Error("problem with test result");
  try {
    testResult.issues = testResult.issues.map((block) =>
      block.type === "error"
        ? {
            code: block.code.replaceAll(".", " "),
            message: block.message,
            context: block.context,
            selector: block.selector,
          }
        : block
    );
    testResult = testResult.map((block) =>
      block
        ? {
            code: block.code.replaceAll(block.code[27], ""),
            message: block.message,
            context: block.context,
            selector: block.selector,
          }
        : block
    );
    testResult = testResult.map((block) =>
      block
        ? {
            code: block.code.replaceAll("_", "."),
            message: block.message,
            context: block.context,
            selector: block.selector,
          }
        : block
    );
    return testResult;
  } catch (error) {
    console.log(error);
  }
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const filteredLinkArrayFunction = async (filteredLinkArray, baseDomain) => {
  if (filteredLinkArray.length > 0) {
    console.log("ok to go");
  }
  sleep(10000);
  function reject() {
    console.log("error");
  }
  let myp = new promises(
    (getLinksSecondTime, reject) =>
      getLinksSecondTime(baseDomain, filteredLinkArray),
    reject()
  );

  deleteArrDuplicates(myp);
  return;
};
/*  */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Live On Port: ${PORT}`));

// map example
/* 
 tasks.map((task) =>
        task.id === id ? { ...task, remainder: !task.remainder } : task
      )
*/
////////////////////////////////
