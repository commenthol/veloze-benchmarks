# veloze-benchmarks

Kodos to https://github.com/fastify/benchmarks for providing the foundation for these benchmarks

# Usage

```sh
# clone...
git clone https://github.com/commenthol/veloze-benchmarks
# as usual
npm i
# start the tests
npm start
# compare with printing a markdown table
npm run table
```

## Arguments

- `-h`: Help on how to use the tool.
- `compare`: Get comparative data for your benchmarks.

> You may also compare all test results, at once, in a single table; `benchmark compare -t`

> You can also extend the comparison table with percentage values based on fastest result; `benchmark compare -p`

# Startup times

Startup times are measured after starting the server process when the first http
response is returned from that server.

| Startup (ms) |                    |
| -----------: | ------------------ |
|           30 | bare               |
|           37 | polka              |
|           39 | h3-router          |
|           40 | 0http              |
|           40 | restana            |
|           42 | uws-connect        |
|           42 | yeps-router        |
|           45 | take-five          |
|           47 | connect-router     |
|           55 | server-base-router |
|           64 | veloze-router      |
|           68 | veloze             |
|           73 | express-router     |
|           73 | express            |
|           80 | total              |
|          103 | hapi               |
|          108 | fastify            |
|          113 | foxify             |
|          140 | restify            |

# Explanations

- **fastify** outperforms on Requests/s due to its schema based JSON.stringify function which
  uses [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify)
  under the hood.
- **uws-connect** uses [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) as http server, in contrast to the "node:http" server.
- **polka** as well as **0http** use
  [trouter](https://www.npmjs.com/package/trouter) a regex based router. This
  router type outperforms as long as the number of routes iterations is low, i.e
  the router has only a small number of routes assigned.
- **veloze** in comparison provides a radix tree router and async middlewares
  and safeguards thrown errors from middlewares (this is why
  "polka-with-middleware" outperforms here). It excels on throughput especially
  with bigger json responses.

Test variation:

- **-with-middlewares** adds tests with additional express/ connect middlewares
- **-big-json** returns an array of 200 data records.

# Benchmarks

* __Machine:__ darwin arm64 | 8 vCPUs | 8.0GB Mem
* __Node:__ `v20.3.0`
* __Method:__ `autocannon -c 100 -d 10 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|                              | Version | Router | Requests/s | Latency (ms) | Throughput/Mb |
| :--------------------------- | ------: | :----: | ---------: | -----------: | ------------: |
| uws-connect                  |   1.1.4 |   ✓    |   190400.0 |         4.79 |         25.42 |
| fastify                      |  4.15.0 |   ✓    |   115400.7 |         8.17 |         20.69 |
| foxify                       | 0.10.20 |   ✓    |   113920.0 |         8.27 |         18.69 |
| veloze-router                |   0.4.0 |   ✓    |   111974.4 |         8.43 |         19.97 |
| bare                         |  20.3.0 |   ✗    |   110507.6 |         8.56 |         19.71 |
| server-base-router           |  7.1.32 |   ✓    |   107993.6 |         8.75 |         19.26 |
| polka                        |   0.5.2 |   ✓    |   107668.4 |         8.79 |         19.20 |
| veloze                       |   0.4.0 |   ✓    |   105670.4 |         8.98 |         18.85 |
| express-router               |  4.18.2 |   ✓    |   104544.0 |         9.09 |         18.65 |
| connect-router               |   1.3.8 |   ✓    |   100723.2 |         9.42 |         17.96 |
| 0http                        |  v3.5.1 |   ✓    |    97056.0 |         9.81 |         17.31 |
| h3-router                    |   1.6.4 |   ✓    |    88910.6 |        10.78 |         14.58 |
| restana                      |   4.9.7 |   ✓    |    88608.0 |        10.79 |         15.80 |
| restify                      |  11.1.0 |   ✓    |    87161.6 |        10.96 |         15.71 |
| take-five                    |   2.0.0 |   ✓    |    85286.4 |        11.23 |         30.66 |
| total                        |  3.4.13 |   ✓    |    81172.4 |        11.82 |         24.85 |
| hapi                         |  21.3.1 |   ✓    |    74342.4 |        12.94 |         16.59 |
| yeps-router                  |   1.2.0 |   ✓    |    69605.8 |        13.86 |         12.41 |
| express                      |  4.18.2 |   ✓    |    23701.1 |        41.62 |          4.23 |
| ---                          |     --- |  ---   |        --- |          --- |           --- |
| uws-connect-with-middlewares |   1.1.4 |   ✓    |   134894.5 |         6.92 |         40.52 |
| veloze-with-middlewares      |   0.4.0 |   ✓    |    95362.9 |         9.99 |         32.92 |
| polka-with-middlewares       |   0.5.2 |   ✓    |    92564.4 |        10.30 |         31.96 |
| express-with-middlewares     |  4.18.2 |   ✓    |    22374.5 |        44.11 |          7.72 |
| ---                          |     --- |  ---   |        --- |          --- |           --- |
| veloze-big-json              |   0.4.0 |   ✓    |    25256.0 |        39.00 |        300.19 |
| polka-big-json               |   0.5.2 |   ✓    |    24345.5 |        40.49 |        289.33 |
| fastify-big-json             |  4.15.0 |   ✓    |    21074.2 |        46.85 |        250.52 |
| uws-connect-big-json         |   1.1.4 |   ✓    |    16269.5 |        60.81 |        192.66 |
| express-big-json             |  4.18.2 |   ✓    |    13431.6 |        73.68 |        159.64 |
