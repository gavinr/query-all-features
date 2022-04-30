import { queryFeatures } from "@esri/arcgis-rest-feature-service";

export const queryAllFeatures = (url) => {
  // first query the capabilities to get the maxRecordCount
  return _recurse(url, []);
};

// Recursive function - Handles calling the service multiple times if necessary.
const _recurse = (url, featuresSoFar) => {
  return queryFeatures({
    url: url,
    resultOffset: featuresSoFar.length,
    resultRecordCount: 1000, /// layer.capabilities.query.maxRecordCount,
    // where: "st = 'CA'",
    outFields: ["*"],
  }).then(
    (results) => {
      // If "exceededTransferLimit" is true, then make another request (call
      //  this same function) with a new "start" position. If not, we're at the end
      // and we should just concatenate the results and return what we have.
      if (
        "exceededTransferLimit" in results &&
        results.exceededTransferLimit === true
      ) {
        return _recurse(url, [...featuresSoFar, ...results.features]);
      } else if ("features" in results) {
        const featureSetClone = JSON.parse(JSON.stringify(results));
        featureSetClone.features = [...featuresSoFar, ...results.features];
        return Promise.resolve(featureSetClone);
      } else {
        return Promise.reject(err);
      }
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};
