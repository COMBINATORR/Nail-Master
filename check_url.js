const https = require('https');

const url = "https://svtl.vercel.app/";

https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    console.log("Fetched successfully. Length:", html.length);
    
    // Check if "logo-container" is in HTML
    const hasLogoContainer = html.includes("logo-container");
    console.log("Has 'logo-container':", hasLogoContainer);
    
    const hasSvg = html.includes("<svg") && html.includes("M22 9C22 7");
    console.log("Has new SVG path:", hasSvg);
    
    // Extract logo section
    const idx = html.indexOf("logo-container");
    if (idx !== -1) {
      console.log("\nLogo container slice:");
      console.log(html.substring(idx - 20, idx + 400));
    } else {
      console.log("\nLogo container not found. Printing some body snippet:");
      console.log(html.substring(0, 1000));
    }
  });
}).on('error', (e) => {
  console.error("Error:", e);
});
