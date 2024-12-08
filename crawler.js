/* 1. There may be different url pointing to the same page 
    we need to normalize those 
    2. Strip the trailing slash*/


function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1)==='/')
        return hostPath.slice(0,hostPath.length-1)
    return hostPath;
}

module.exports = {
    normalizeURL
}