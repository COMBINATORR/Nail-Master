const https = require('https');

const url = "https://svtl.vercel.app/";

https.get(url, (res) => {
  console.log("Status Code:", res.statusCode);
  console.log("\n--- Headers ---");
  for (const [key, value] of Object.entries(res.headers)) {
    console.log(`${key}: ${value}`);
  }
}).on('error', (e) => {
  console.error("Error:", e);
});
