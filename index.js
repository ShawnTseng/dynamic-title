var counter = 0;

count();

setInterval(() => {
    count();
}, 1000);

function count() {
    counter += 1;
    document.title = counter;
    // document.querySelector('meta[property="og:title"]').setAttribute("content", time);
    document.querySelector('meta[property="og:title"]').parentElement.removeChild(document.querySelector('meta[property="og:title"]'));
    var meta = document.createElement('meta');
    meta.setAttribute('property', 'og:title');
    meta.content = counter;
    document.getElementsByTagName('head')[0].appendChild(meta);
    window.history.replaceState('', '', updateURLParameter(window.location.href, "counter", counter));
}

/**
 * http://stackoverflow.com/a/10997390/11236
 */
function updateURLParameter(url, param, paramVal) {
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if (TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];

        if (TheParams)
            baseURL = TheParams;
    }

    if (TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}