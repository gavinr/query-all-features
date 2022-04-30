import { request } from "@esri/arcgis-rest-request";
import { queryFeatures } from "@esri/arcgis-rest-feature-service";

export const queryAllFeatures = async (requestOptions, additionalOptions) => {
  // first query the capabilities to get the maxRecordCount
  if (additionalOptions && "pageBy" in additionalOptions) {
    return _recurse(requestOptions, additionalOptions.pageBy, []);
  }

  // else if "pageBy" was not provided, try to check the service:
  try {
    const serviceInfo = await request(requestOptions.url);

    if (serviceInfo && serviceInfo.maxRecordCount) {
      return _recurse(requestOptions, serviceInfo.maxRecordCount, []);
    }
  } catch {
    // nothing - fall into the below.
  }

  // if cannot get the info from the service, assume 1000
  return _recurse(requestOptions, 1000, []);
};

// Recursive function - Handles calling the service multiple times if necessary.
const _recurse = (requestOptions, pageBy, featuresSoFar) => {
  // console.log("featuresSoFar.length", featuresSoFar.length);
  const mergedOptions = requestOptions;
  mergedOptions.resultRecordCount = pageBy;
  mergedOptions.resultOffset = featuresSoFar.length;

  return queryFeatures(mergedOptions).then(
    (results) => {
      // If "exceededTransferLimit" is true, then make another request (call
      //  this same function) with a new "start" position. If not, we're at the end
      // and we should just concatenate the results and return what we have.
      if (
        "exceededTransferLimit" in results &&
        results.exceededTransferLimit === true
      ) {
        return _recurse(requestOptions, pageBy, [
          ...featuresSoFar,
          ...results.features,
        ]);
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
