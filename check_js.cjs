const https = require('https');

const jsUrl = "https://svtl.vercel.app/assets/index-DOWoMTvN.js";

https.get(jsUrl, (res) => {
  let js = '';
  res.on('data', (chunk) => { js += chunk; });
  res.on('end', () => {
    console.log("Fetched JS successfully. Length:", js.length);
    
    // Check for new path
    const hasNewPath = js.includes("M22 9C22 7");
    console.log("Has new S-path (M22 9C22 7):", hasNewPath);
    
    // Check for old path
    const hasOldPath = js.includes("M22 9C22 9");
    console.log("Has old S-path (M22 9C22 9):", hasOldPath);
    
    // Check for logo-container
    const hasLogoContainer = js.includes("logo-container");
    console.log("Has 'logo-container':", hasLogoContainer);
    
    // Check for logoPulseRun
    const hasLogoPulseRun = js.includes("logoPulseRun");
    console.log("Has 'logoPulseRun':", hasLogoPulseRun);
  });
}).on('error', (e) => {
  console.error("Error:", e);
});
