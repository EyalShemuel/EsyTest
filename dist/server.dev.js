"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* to operate on heruko:
heroku buildpacks:clear
heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
heroku buildpacks:add --index 1 heroku/nodejs

 return await pa11y(theUrl, {
      chromeLaunchConfig: { args: ["--no-sandbox",'--disable-setuid-sandbox'] },
    })
*/
var express = require("express");

var app = express();

var path = require("path");

var pa11y = require("pa11y");

var bp = require("body-parser");

var _require = require("./getLinksSecondTime"),
    getLinksSecondTime = _require.getLinksSecondTime,
    getPageLinks = _require.getPageLinks;

var extractDomain = require("@tech_userreport.com/extractdomain");

var deleteArrDuplicates = require("delete-arr-duplicates");

var _require2 = require("heroku-keep-awake"),
    wakeDyno = _require2.wakeDyno;

var DYNO_URL = "https://esytest.herokuapp.com/";
var opts = {
  interval: 29,
  logging: false,
  stopTimes: {
    start: "00:00",
    end: "06:00"
  }
};
app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, ".", "/client", "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client", "build"));
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
          console.log("entered");
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
          console.log("calling pa11y....");

          if (!(theUrl === "")) {
            _context3.next = 4;
            break;
          }

          throw new Error("empty url");

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(pa11y(theUrl, {
            chromeLaunchConfig: {
              args: ["--no-sandbox", "--disable-setuid-sandbox"]
            }
          }).then(function (results) {
            return results;
          }));

        case 6:
          return _context3.abrupt("return", _context3.sent);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var changeResult = function changeResult(testResult) {
  var issues = testResult.issues;
  if (!issues) throw new Error("problem with test result");

  try {
    var changedResult = [];
    changedResult = _toConsumableArray(issues.map(function (block) {
      if (block.type === "error") {
        var code = block.code.split(".")[3].replace("_", ".").replace("_", ".");
        return {
          code: code,
          message: block.message,
          context: block.context,
          selector: block.selector
        };
      } else {
        return block;
      }
    }));
    return changedResult;
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


var PORT = process.env.PORT || 4000; // app.listen(PORT, () => console.log(`Server Live On Port: ${PORT}`));

app.listen(PORT, function () {
  wakeDyno(DYNO_URL, opts);
  console.log("Server Live On Port: ".concat(PORT));
}); // map example

/* 
 tasks.map((task) =>
        task.id === id ? { ...task, remainder: !task.remainder } : task
      )
*/
////////////////////////////////