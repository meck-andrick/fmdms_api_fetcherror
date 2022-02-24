var express = require("express");
var cors = require("cors");
const fetch = require("node-fetch");

const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // change to false to allow request to ignore cert stuff, change to true to see error
});

var app = express();

app.use(cors({ exposedHeaders: ["Content-Disposition"] }));

app.get("/", function (req, res) {
  var currentTime = new Date();
  res.send("api is running. <br><br><u>refresh at:</u> <br>" + currentTime);
});

app.get("/test", function (req, res) {
  // swap out these variables in fetch request to change between Meck edms services and generic esri AGOL service (both are not working)
  let file =
    "https://edmsmapserver.mecklenburgcountync.gov/agsadaptor/rest/services/stormwater/FMDMS_test/FeatureServer/1/query?where=1%3D1&returnCountOnly=true&f=json&token=_PTqBxzyUedam1cs1ddLQKZOudfgWLssEd3sdMbcIf-BKhM67uN5Z_PP80q2LEe7";
  let file2 =
    "https://services2.arcgis.com/kCu40SDxsCGcuUWO/ArcGIS/rest/services/NCBP_Feature_Point_View/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
  fetch(file2, {
    agent: httpsAgent,
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

var server = app.listen(5001, function () {
  console.log("Server is running on port: " + "5001");
});

// this is a new line to test
// npm i
// npm run start
// navigate to http://localhost:5001/test to see what console returns
