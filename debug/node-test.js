import { queryAllFeatures } from "../dist/index.cjs";

queryAllFeatures({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
}).then(
  (results) => {
    console.log("results", results);
  },
  (err) => {
    console.log("err", err);
  }
);
