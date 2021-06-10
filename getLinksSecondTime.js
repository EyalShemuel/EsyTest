const deleteArrDuplicates = require("delete-arr-duplicates");
const extractDomain = require("@tech_userreport.com/extractdomain");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function getLinksSecondTime(baseDomain, LinksArry) {
  try {
    const test = await Promise.all(
      LinksArry.map(async (link) => {
        return await getPageLinks(baseDomain, LinksArry, link);
      })
    );
    const flatArray = [...test].flat();
    const filteredLinkArray = deleteArrDuplicates(flatArray.flat());

    return filteredLinkArray;
  } catch (error) {
    console.log(
      "/////////////////////////////////////////////////////////////////////////////////////////////////////////////"
    );
    console.log(error);
  }
}
function get_url_extension(src) {
  return (src = src.substr(1 + src.lastIndexOf("/")).split("?")[0])
    .split("#")[0]
    .substr(src.lastIndexOf("."));
  // return url.split(/[#?]/)[0].split('.').pop().trim();
}

async function getPageLinks(baseDomain, LinksArry, src) {
  var thePage;

  try {
    const ext = get_url_extension(src);
    const upExt = ext.toUpperCase();
    const linkDomain = extractDomain(src);

    // console.log('////////////////////////////////////');
    // console.log('src:',src ,'array: ', LinksArry ,'is acsist: ', ( (LinksArry.includes(src))))
    // console.log('////////////////////////////////////');

    if (
      NotFilesFormat(upExt) &&
      src != undefined &&
      baseDomain === linkDomain
      //   && !(LinksArry.includes(src))
    ) {
    //   if (!LinksArry.includes(src)) {
        await axios
          .get(src)
          .then((res) => (thePage = res.data))
          .catch((err) => {
            return;
          });
        const { document } = new JSDOM(thePage).window;
        const x = document.querySelectorAll("a");
        //  console.log(x)
        var myArray = [];
        for (var i = 0; i < x.length; i++) {
          var cleanLink = x[i].href;
          myArray.push(cleanLink);
        }
    //   }
    }
    return deleteArrDuplicates(myArray);
  } catch (error) {
    console.log(error);
  }
}

function NotFilesFormat(upExt) {
  return (
    upExt != "PDF" ||
    upExt != "JPG" ||
    upExt != "GIF" ||
    upExt != "WAV" ||
    upExt != "MP3" ||
    upExt != "JPEG" ||
    upExt != "PNG" ||
    upExt != "TIFF" ||
    upExt != "BMP"
  );
}

exports.getPageLinks = getPageLinks;
exports.getLinksSecondTime = getLinksSecondTime;
