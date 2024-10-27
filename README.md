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
|           46 | polka              |
|           49 | bare               |
|           50 | restana            |
|           52 | 0http              |
|           55 | take-five          |
|           56 | connect-router     |
|           64 | h3-router          |
|           64 | yeps-router        |
|           70 | uws-connect        |
|           80 | **veloze**-router  |
|           83 | express            |
|           89 | server-base-router |
|           97 | **veloze**         |
|          106 | express-router     |
|          127 | hapi               |
|          152 | foxify             |
|          168 | fastify            |
|          305 | restify            |

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

- **Machine:** darwin arm64 | 8 vCPUs | 8.0GB Mem
- **Node:** `v22.10.0`
- **Method:** `autocannon -c 100 -d 10 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|                              | Version | Router | Requests/s | Latency (ms) | Throughput/Mb |
| :--------------------------- | ------: | :----: | ---------: | -----------: | ------------: |
| uws-connect                  |   1.2.4 |   ✓    |   184663.3 |         4.94 |         24.66 |
| bare                         | 22.10.0 |   ✗    |   140189.1 |         6.64 |         25.00 |
| fastify                      |   5.0.0 |   ✓    |   133366.4 |         7.02 |         23.91 |
| foxify                       | 0.10.20 |   ✓    |   131953.5 |         7.08 |         21.65 |
| polka                        |   0.5.2 |   ✓    |   126728.7 |         7.37 |         22.60 |
| server-base-router           | 14.10.7 |   ✓    |   126278.4 |         7.41 |         22.52 |
| express-router               |   5.0.1 |   ✓    |   121218.9 |         7.74 |         21.62 |
| **veloze**-router            |   1.0.0 |   ✓    |   119654.4 |         7.85 |         21.34 |
| **veloze**                   |   1.0.0 |   ✓    |   115074.9 |         8.21 |         20.52 |
| connect-router               |   2.0.0 |   ✓    |   114720.0 |         8.23 |         20.46 |
| h3-router                    |  1.13.0 |   ✓    |   113478.4 |         8.31 |         18.62 |
| 0http                        |   3.5.3 |   ✓    |   113049.6 |         8.36 |         20.16 |
| restana                      |   4.9.9 |   ✓    |   103219.2 |         9.19 |         18.41 |
| restify                      |  11.1.0 |   ✓    |    94560.0 |        10.09 |         17.04 |
| take-five                    |   2.0.0 |   ✓    |    92256.0 |        10.34 |         33.17 |
| hapi                         | 21.3.12 |   ✓    |    81637.8 |        11.76 |         18.22 |
| yeps-router                  |   1.2.0 |   ✓    |    78338.9 |        12.28 |         13.97 |
| express                      |   5.0.1 |   ✓    |    22371.6 |        44.12 |          3.99 |
|                              |         |        |            |              |               |
| uws-connect-with-middlewares |   1.2.4 |   ✓    |   129849.6 |         7.19 |         39.01 |
| polka-with-middlewares       |   0.5.2 |   ✓    |    96819.2 |         9.83 |         33.42 |
| **veloze**-with-middlewares  |   1.0.0 |   ✓    |    94612.4 |        10.07 |         32.66 |
| fastify-with-middlewares     |   5.0.0 |   ✓    |    23265.6 |        42.41 |          8.05 |
| express-with-middlewares     |   5.0.1 |   ✓    |    20179.6 |        48.95 |          6.97 |
|                              |         |        |            |              |               |
| **veloze**-big-json          |   1.0.0 |   ✓    |    33929.6 |        28.94 |        403.25 |
| polka-big-json               |   0.5.2 |   ✓    |    33869.1 |        28.99 |        402.60 |
| uws-connect-big-json         |   1.2.4 |   ✓    |    29892.8 |        32.90 |        353.98 |
| fastify-big-json             |   5.0.0 |   ✓    |    23997.8 |        41.10 |        285.28 |
| express-big-json             |   5.0.1 |   ✓    |    14818.5 |        66.77 |        176.13 |
