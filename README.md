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
* __Node:__ `v18.16.0`
* __Method:__ `autocannon -c 100 -d 10 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|                              | Version | Router | Requests/s | Latency (ms) | Throughput/Mb |
| :--------------------------- | ------: | :----: | ---------: | -----------: | ------------: |
| uws-connect                  |   1.1.4 |   ✓    |   193646.5 |         4.67 |         25.85 |
| uws-connect-with-middlewares |   1.1.4 |   ✓    |   140236.8 |         6.63 |         42.13 |
| fastify                      |  4.15.0 |   ✓    |   123456.0 |         7.59 |         22.13 |
| 0http                        |  v3.5.1 |   ✓    |   119084.8 |         7.89 |         21.24 |
| veloze-router                |   0.4.0 |   ✓    |   118496.0 |         7.93 |         21.13 |
| bare                         | 18.16.0 |   ✗    |   117669.8 |         8.00 |         20.98 |
| server-base-router           |  7.1.32 |   ✓    |   113742.6 |         8.30 |         20.28 |
| veloze                       |   0.4.0 |   ✓    |   112427.6 |         8.40 |         20.05 |
| polka                        |   0.5.2 |   ✓    |   107424.0 |         8.82 |         19.16 |
| connect-router               |   1.3.8 |   ✓    |   103037.1 |         9.21 |         18.37 |
| veloze-with-middlewares      |   0.4.0 |   ✓    |    99200.0 |         9.59 |         34.24 |
| foxify                       | 0.10.20 |   ✓    |    98132.4 |         9.70 |         16.10 |
| polka-with-middlewares       |   0.5.2 |   ✓    |    97713.5 |         9.74 |         33.73 |
| restana                      |   4.9.7 |   ✓    |    89940.4 |        10.61 |         16.04 |
| h3-router                    |   1.6.4 |   ✓    |    89452.8 |        10.66 |         14.67 |
| restify                      |  11.1.0 |   ✓    |    88160.0 |        10.85 |         15.89 |
| take-five                    |   2.0.0 |   ✓    |    86508.8 |        11.07 |         31.11 |
| total                        |  3.4.13 |   ✓    |    84296.7 |        11.36 |         25.81 |
| express-router               |  4.18.2 |   ✓    |    81073.5 |        11.83 |         14.46 |
| hapi                         |  21.3.1 |   ✓    |    72148.8 |        13.35 |         16.10 |
| yeps-router                  |   1.2.0 |   ✓    |    69745.5 |        13.84 |         12.44 |
| express                      |  4.18.2 |   ✓    |    26301.8 |        37.45 |          4.69 |
| express-with-middlewares     |  4.18.2 |   ✓    |    24560.7 |        40.13 |          8.48 |
| veloze-big-json              |   0.4.0 |   ✓    |    23141.1 |        42.64 |        275.03 |
| polka-big-json               |   0.5.2 |   ✓    |    22274.2 |        44.31 |        264.74 |
| fastify-big-json             |  4.15.0 |   ✓    |    17810.2 |        55.52 |        211.68 |
| uws-connect-big-json         |   1.1.4 |   ✓    |    16069.5 |        61.57 |        190.27 |
| express-big-json             |  4.18.2 |   ✓    |    12468.7 |        79.39 |        148.19 |

