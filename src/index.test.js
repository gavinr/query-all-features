import { jest } from "@jest/globals";
import { queryAllFeatures } from "./index";
jest.setTimeout(10000);

test("basic query", async () => {
  const results = await queryAllFeatures({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
  });
  // console.log('results', results.features.length);
  expect(results.features.length).toEqual(3557);
});

test("basic query with empty additional options", async () => {
  const results = await queryAllFeatures(
    {
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
    },
    {}
  );
  expect(results.features.length).toEqual(3557);
});

test("basic query with pageBy", async () => {
  const results = await queryAllFeatures(
    {
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
    },
    {
      pageBy: 500,
    }
  );
  expect(results.features.length).toEqual(3557);
});

test("fail on bad url", async () => {
  try {
    await queryAllFeatures({
      url: "https://sampleserver6.arcgisonline.com/asdf",
    });
  } catch (e) {
    expect(e.code).toEqual("HTTP 404");
  }
});
