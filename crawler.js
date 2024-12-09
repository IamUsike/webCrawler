const jsdom = require("jsdom");
const { JSDOM } = jsdom; //allows node to access dom apis

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative URL
      try{
      const urlObj = new URL(`${baseURL}${linkElement.href}`);
      urls.push(`${baseURL}${linkElement.href}`);
      }catch(err){
        console.log(`Error with relative URLs: ${err.message}`)
      }
      
    } else {
      //absolute URLs 
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(linkElement.href)
      } catch (error) {
        console.log(`Fucked up absolute URL: ${error.message}`)
      }
    }
  }
  return urls;
}

/* 1. There may be different url pointing to the same page 
    we need to normalize those 
    2. Strip the trailing slash*/

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, hostPath.length - 1);
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
