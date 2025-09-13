# veloze-benchmarks

Kudos to https://github.com/fastify/benchmarks for providing the foundation for these benchmarks

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
|           25 | polka              |
|           29 | 0http              |
|           29 | restana            |
|           31 | take-five          |
|           32 | bare               |
|           34 | connect-router     |
|           35 | yeps-router        |
|           37 | h3-router          |
|           37 | uws-connect        |
|           38 | hono               |
|           46 | server-base-router |
|           59 | express            |
|           63 | **veloze**-router  |
|           64 | express-router     |
|           67 | hapi               |
|           67 | **veloze**         |
|           70 | fastify            |
|           80 | foxify             |

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

- **Machine:** darwin arm64 | 8 vCPUs | 16.0GB Mem
- **Node:** `v24.7.0`
- **Method:** `autocannon -c 100 -d 10 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|                              | Version | Router | Requests/s | Latency (ms) | Throughput/Mb |
| :--------------------------- | ------: | :----: | ---------: | -----------: | ------------: |
| uws-connect                  |   1.4.0 |   ✓    |   243302.4 |         3.66 |         32.48 |
| 0http                        |   4.3.0 |   ✓    |   167449.6 |         5.46 |         29.86 |
| bare                         |  24.7.0 |   ✗    |   165145.6 |         5.65 |         29.45 |
| foxify                       | 0.10.20 |   ✓    |   162521.6 |         5.70 |         26.66 |
| server-base-router           |  7.1.32 |   ✓    |   159598.5 |         5.78 |         28.47 |
| restana                      |  v5.1.0 |   ✓    |   158348.8 |         5.86 |         28.24 |
| fastify                      |   5.6.0 |   ✓    |   157811.2 |         5.82 |         28.29 |
| **veloze**-router            |   1.3.0 |   ✓    |   157376.0 |         5.83 |         28.06 |
| polka                        |   0.5.2 |   ✓    |   157120.0 |         5.85 |         28.02 |
| **veloze**                   |   1.3.0 |   ✓    |   156049.5 |         5.92 |         27.83 |
| express-router               |   5.1.0 |   ✓    |   149533.1 |         6.13 |         26.67 |
| connect-router               |   2.2.0 |   ✓    |   144157.1 |         6.31 |         25.71 |
| h3-router                    |  1.15.4 |   ✓    |   142481.5 |         6.49 |         23.37 |
| hono                         |   4.9.7 |   ✓    |   126368.0 |         7.39 |         20.73 |
| take-five                    |   2.0.0 |   ✓    |   124704.0 |         7.51 |         44.84 |
| hapi                         |  21.4.3 |   ✓    |   104736.0 |         9.04 |         23.38 |
| express                      |   5.1.0 |   ✓    |    94342.4 |        10.18 |         16.82 |
| yeps-router                  |   1.2.0 |   ✓    |    49682.9 |        19.60 |          8.86 |
|                              |         |        |            |              |               |
| uws-connect-with-middlewares |   1.4.0 |   ✓    |   185625.6 |         4.93 |         55.77 |
| polka-with-middlewares       |   0.5.2 |   ✓    |   135372.8 |         6.86 |         46.73 |
| **veloze**-with-middlewares  |   1.3.0 |   ✓    |   130722.9 |         7.22 |         45.12 |
| express-with-middlewares     |   5.1.0 |   ✓    |    80473.6 |        11.95 |         27.78 |
| hono-with-middlewares        |   4.9.7 |   ✓    |    58972.8 |        16.45 |         21.88 |
| fastify-with-middlewares     |   5.6.0 |   ✓    |    54808.7 |        17.71 |         18.97 |
|                              |         |        |            |              |               |
| uws-connect-big-json         |   1.4.0 |   ✓    |    34744.7 |        28.26 |        411.38 |
| express-big-json             |   5.1.0 |   ✓    |    33818.4 |        29.04 |        401.93 |
| polka-big-json               |   0.5.2 |   ✓    |    33147.6 |        29.62 |        394.01 |
| **veloze**-big-json          |   1.3.0 |   ✓    |    32913.5 |        29.82 |        391.19 |
| hono-big-json                |   4.9.7 |   ✓    |    31632.7 |        31.05 |        375.56 |
| fastify-big-json             |   5.6.0 |   ✓    |    24742.5 |        39.84 |        294.17 |
