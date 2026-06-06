const https = require('https');

const url = "https://svtl.vercel.app/";

https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    // Find CSS link
    const match = html.match(/href="([^"]*\.css)"/);
    if (!match) {
      console.log("No CSS link found in HTML.");
      return;
    }
    const cssPath = match[1];
    const cssUrl = url.rstrip ? url.rstrip('/') + '/' + cssPath.lstrip('/') : "https://svtl.vercel.app" + cssPath;
    console.log("Fetching CSS from:", cssUrl);
    
    https.get(cssUrl, (resCss) => {
      let css = '';
      resCss.on('data', (chunk) => { css += chunk; });
      resCss.on('end', () => {
        console.log("CSS length:", css.length);
        console.log("Has scale(1.08):", css.includes("scale(1.08)"));
        console.log("Has filter:blur or blur(6px):", css.includes("blur(6px)"));
        console.log("Has logo-container:", css.includes("logo-container"));
      });
    }).on('error', (e) => {
      console.error("Error fetching CSS:", e);
    });
  });
}).on('error', (e) => {
  console.error("Error:", e);
});
