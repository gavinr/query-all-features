# Query All Features

[![npm](https://img.shields.io/npm/v/query-all-features)](https://www.npmjs.com/package/query-all-features)

*Query all features of an ArcGIS Feature Service*

This package calls [queryFeatures](https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/queryFeatures) multiple times until it gets all the features.

- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Usage](#usage)
- [License](#license)

## Quick Start

```bash
npm install query-all-features
```

Then:

```js
import { queryAllFeatures } from "query-all-features";

queryAllFeatures(
    {
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
    }
).then((results) => {
    console.log('results', results);
}, (err) => {
    console.error('err', err);
});
```

## API Reference

### queryAllFeatures

<pre>
queryAllFeatures(<a href="https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/IQueryFeaturesOptions">requestOptions</a>, <a href="#IQueryFeaturesAllAdditionalOptions">additionalOptions</a>): Promise<<a href="https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/IQueryFeaturesResponse">IQueryFeaturesResponse</a>>
</pre>

Query a feature service, repeatedly paging through the results to get all the features.

#### Parameters

| Parameter         | Type                               | Notes                                                                 |
|-------------------|------------------------------------|-----------------------------------------------------------------------|
| requestOptions    | [IQueryFeaturesOptions](https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/IQueryFeaturesOptions) | This is the same input object that you would pass into [ArcGIS REST JS queryFeatures](https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/queryFeatures). |
| additionalOptions | [IQueryFeaturesAllAdditionalOptions](#IQueryFeaturesAllAdditionalOptions) | Additional options specific to this module. See table below. |

##### IQueryFeaturesAllAdditionalOptions

| Parameter         | Type                               | Notes                                                                 |
|-------------------|------------------------------------|-----------------------------------------------------------------------|
| pageBy (optional)    | *number* | How many records to request from the service at a time. By default, the service info will be checked to find the maxRecordCount of the service, and that will be used as the `pageBy` value. If this `pageBy` value is provided, that additional request will not be made. |

```js
import { queryAllFeatures } from "query-all-features";

queryAllFeatures(
    {
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
    }, { 
        pageBy: 100
    }
).then((results) => {
    console.log('results', results);
}, (err) => {
    console.error('err', err);
});
```

#### Returns

<pre>
Promise<<a href="https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/IQueryFeaturesResponse">IQueryFeaturesResponse</a>>
</pre>

A Promise that will resolve with the same query response as [queryFeatures](https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-feature-service/queryFeatures).

## Usage

### Node JS

```bash
npm install query-all-features
```

Then:

```js
const { queryAllFeatures } = require("query-all-features");

queryAllFeatures({url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"}).then((results) => {
    console.log('results', results);
}, (err) => {
    console.error('err', err);
});
```

### Browser - ES Modules

Distributed as an ES module which should work "out-of-the-box" with most popular module bundlers. See "Quick Start" above.

### Browser - ES Modules via CDN

```html
<script type="module">
    import { queryAllFeatures } from "https://cdn.skypack.dev/query-all-features";

    queryAllFeatures({url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"}).then((results) => {
        console.log('results', results);
    }, (err) => {
        console.error('err', err);
    });
</script>
```

[Example in action](https://codepen.io/gavinr/pen/ExQYegd?editors=0010)

### Browser - Script tag via UMD CDN

```html
<!-- arcgis-rest-request and arcgis-rest-feature-service are dependencies: -->
<script src="https://unpkg.com/@esri/arcgis-rest-request@4"></script>
<script src="https://unpkg.com/@esri/arcgis-rest-feature-service@4"></script>
<script src="https://unpkg.com/query-all-features"></script>

<script>
    queryAllFeatures.queryAllFeatures({url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"}).then((results) => {
        console.log('results', results);
    }, (err) => {
        console.log('err', err);
    });
</script>
```

[Example in action](https://jsbin.com/kegayoz/edit?html,output)

## License

   Copyright 2022 Gavin Rehkemper

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
