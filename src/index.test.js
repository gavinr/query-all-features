import { queryAllFeatures } from "./index";

test("basic query", async () => {
  const results = await queryAllFeatures(
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
  );
  // console.log('results', results.features.length);
  expect(results.features.length).toEqual(3557);
});

test("fail on bad url", async () => {
  try {
    await queryAllFeatures("https://sampleserver6.arcgisonline.com/asdf");
  } catch (e) {
    console.log("CATCH", e);
    expect(e.code).toEqual("HTTP 404");
  }
});
