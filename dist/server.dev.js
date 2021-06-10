"use strict";

var express = require("express");

var app = express();

var path = require('path');

var pa11y = require("pa11y");

var bp = require("body-parser");

var _require = require("./getLinksSecondTime"),
    getLinksSecondTime = _require.getLinksSecondTime,
    getPageLinks = _require.getPageLinks;

var extractDomain = require("@tech_userreport.com/extractdomain");

var deleteArrDuplicates = require("delete-arr-duplicates");

app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
})); // app.use(express.static(path.join(__dirname, "./", "client", "build","index.html")));

app.get("/", function (req, res) {
  // console.log("path: ",(path.join(__dirname, "./client", "build")));
  res.sendFile(path.join(__dirname, "./client", "build", "index.html"));
}); // 

app.post("/getTestResults", function _callee(req, res) {
  var theUrl, testResult, Results;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          theUrl = req.body.url;

          if (theUrl) {
            _context.next = 6;
            break;
          }

          throw Error("did`t enter url");

        case 6:
          console.log('entered');
          _context.next = 9;
          return regeneratorRuntime.awrap(pa11yCall(theUrl));

        case 9:
          testResult = _context.sent;
          Results = changeResult(testResult);
          res.send(Results);

        case 12:
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client", "build"));
});

var callGetAllSitLinks = function callGetAllSitLinks(theUrl) {
  var LinksArry, TempLinksArry, baseDomain, firstScan, numberOfLinks, filteredLinkArray, finaleLinkArray;
  return regeneratorRuntime.async(function callGetAllSitLinks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          LinksArry = [];
          TempLinksArry = []; // get the baseDomain

          baseDomain = extractDomain(theUrl); //run first time and gets page links

          _context2.next = 5;
          return regeneratorRuntime.awrap(getPageLinks(baseDomain, LinksArry, theUrl));

        case 5:
          firstScan = _context2.sent;
          // console.log(LinksArry)
          ///////////////////////////////////////////////////////
          numberOfLinks = firstScan.length;
          console.log("first run number of links:", numberOfLinks); ///////////////////////////////////////////////////////

          _context2.next = 10;
          return regeneratorRuntime.awrap(getLinksSecondTime(baseDomain, firstScan));

        case 10:
          filteredLinkArray = _context2.sent;
          finaleLinkArray = deleteArrDuplicates(filteredLinkArray);
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

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var pa11yCall = function pa11yCall(theUrl) {
  return regeneratorRuntime.async(function pa11yCall$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!(theUrl === "")) {
            _context3.next = 3;
            break;
          }

          throw new Error("empty url");

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(pa11y(theUrl).then(function (results) {
            return results;
          }));

        case 5:
          return _context3.abrupt("return", _context3.sent);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var changeResult = function changeResult(testResult) {
  try {
    testResult = testResult.issues.map(function (block) {
      return block.type === "error" ? {
        code: block.code.replaceAll(".", " "),
        message: block.message,
        context: block.context,
        selector: block.selector
      } : block;
    });
    testResult = testResult.map(function (block) {
      return block ? {
        code: block.code.replaceAll(block.code[27], ""),
        message: block.message,
        context: block.context,
        selector: block.selector
      } : block;
    });
    testResult = testResult.map(function (block) {
      return block ? {
        code: block.code.replaceAll("_", "."),
        message: block.message,
        context: block.context,
        selector: block.selector
      } : block;
    });
    return testResult;
  } catch (error) {
    console.log(error);
  }
};

function sleep(milliseconds) {
  var date = Date.now();
  var currentDate = null;

  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var filteredLinkArrayFunction = function filteredLinkArrayFunction(filteredLinkArray, baseDomain) {
  var reject, myp;
  return regeneratorRuntime.async(function filteredLinkArrayFunction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          reject = function _ref() {
            console.log("error");
          };

          if (filteredLinkArray.length > 0) {
            console.log("ok to go");
          }

          sleep(10000);
          myp = new promises(function (getLinksSecondTime, reject) {
            return getLinksSecondTime(baseDomain, filteredLinkArray);
          }, reject());
          deleteArrDuplicates(myp);
          return _context4.abrupt("return");

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};
/*  */


var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  return console.log("Server Live On Port: ".concat(PORT));
}); // map example

/* 
 tasks.map((task) =>
        task.id === id ? { ...task, remainder: !task.remainder } : task
      )
*/
////////////////////////////////