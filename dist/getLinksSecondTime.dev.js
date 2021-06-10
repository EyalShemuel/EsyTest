"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var deleteArrDuplicates = require("delete-arr-duplicates");

var extractDomain = require("@tech_userreport.com/extractdomain");

var axios = require("axios");

var jsdom = require("jsdom");

var JSDOM = jsdom.JSDOM;

function getLinksSecondTime(baseDomain, LinksArry) {
  var test, flatArray, filteredLinkArray;
  return regeneratorRuntime.async(function getLinksSecondTime$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Promise.all(LinksArry.map(function _callee(link) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(getPageLinks(baseDomain, LinksArry, link));

                  case 2:
                    return _context.abrupt("return", _context.sent);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 3:
          test = _context2.sent;
          flatArray = _toConsumableArray(test).flat();
          filteredLinkArray = deleteArrDuplicates(flatArray.flat());
          return _context2.abrupt("return", filteredLinkArray);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log("/////////////////////////////////////////////////////////////////////////////////////////////////////////////");
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function get_url_extension(src) {
  return (src = src.substr(1 + src.lastIndexOf("/")).split("?")[0]).split("#")[0].substr(src.lastIndexOf(".")); // return url.split(/[#?]/)[0].split('.').pop().trim();
}

function getPageLinks(baseDomain, LinksArry, src) {
  var thePage, ext, upExt, linkDomain, document, x, myArray, i, cleanLink;
  return regeneratorRuntime.async(function getPageLinks$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          ext = get_url_extension(src);
          upExt = ext.toUpperCase();
          linkDomain = extractDomain(src); // console.log('////////////////////////////////////');
          // console.log('src:',src ,'array: ', LinksArry ,'is acsist: ', ( (LinksArry.includes(src))))
          // console.log('////////////////////////////////////');

          if (!(NotFilesFormat(upExt) && src != undefined && baseDomain === linkDomain //   && !(LinksArry.includes(src))
          )) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(axios.get(src).then(function (res) {
            return thePage = res.data;
          })["catch"](function (err) {
            return;
          }));

        case 7:
          document = new JSDOM(thePage).window.document;
          x = document.querySelectorAll("a"); //  console.log(x)

          myArray = [];

          for (i = 0; i < x.length; i++) {
            cleanLink = x[i].href;
            myArray.push(cleanLink);
          } //   }


        case 11:
          return _context3.abrupt("return", deleteArrDuplicates(myArray));

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function NotFilesFormat(upExt) {
  return upExt != "PDF" || upExt != "JPG" || upExt != "GIF" || upExt != "WAV" || upExt != "MP3" || upExt != "JPEG" || upExt != "PNG" || upExt != "TIFF" || upExt != "BMP";
}

exports.getPageLinks = getPageLinks;
exports.getLinksSecondTime = getLinksSecondTime;