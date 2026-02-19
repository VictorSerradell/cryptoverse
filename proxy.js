const http = require("http");
const https = require("https");

const PORT = process.env.PORT || 3001;

http
  .createServer((req, res) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    // Solo permitir rutas de CoinGecko y alternative.me
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const target = url.searchParams.get("url");

    if (
      !target ||
      (!target.includes("coingecko.com") && !target.includes("alternative.me"))
    ) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    https
      .get(
        target,
        {
          headers: {
            "User-Agent": "CryptoVerse/1.0",
            Accept: "application/json",
          },
        },
        (apiRes) => {
          res.writeHead(apiRes.statusCode, {
            "Content-Type": "application/json",
          });
          apiRes.pipe(res);
        },
      )
      .on("error", (e) => {
        res.writeHead(500);
        res.end(JSON.stringify({ error: e.message }));
      });
  })
  .listen(PORT, () => {
    console.log(`✅ Proxy corriendo en http://localhost:${PORT}`);
    console.log(`   Abre cryptoverse.html con Live Server`);
  });
