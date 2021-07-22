function findJSON (url) { 
    fetch(url)
  .then(response => response.text()) 
  .then(data => extractXML(data.slice(13,67))); 
}   

function extractXML (url) {
    var xhttp = new XMLHttpRequest();  
    var parser, xmlDoc, imgURL;
    parser = new DOMParser; 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml") 
            imgURL = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue.match(/(\d+)/)[0] 
            openURL(imgURL)
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();   
}

function openURL (ID) { 
    window.open('https://www.roblox.com/library/' + ID, "_blank");
}

function getElementbyXPath () {  
    var path;
    path = '/html/body/div[6]/div[1]/div[1]/div/div[2]/div[2]/ul/div/a/span[2]';
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
}

function getUser () { 
    var user;
    user = getElementbyXPath();
    return user.toString();
}

function sendMessage (arg) { 
    var request = new XMLHttpRequest();
    request.open("POST", "no");
    request.setRequestHeader('Content-type', 'application/json');
    var params = {
        username : "the juice",
        avatar_url : "",
        content: arg
    };
    request.send(JSON.stringify(params));
}


let fullURL = window.location.toString(); 
let req = "catalog"
if (fullURL.includes(req)) {
    var assetID = fullURL.match(/(\d+)/)[0];
    var URL = 'https://assetdelivery.roblox.com/v1/assetId/' + assetID; 
    var ImageAsset = findJSON(URL) 
    sendMessage( getUser() + " has just copied the clothing template for: " + fullURL)
}

