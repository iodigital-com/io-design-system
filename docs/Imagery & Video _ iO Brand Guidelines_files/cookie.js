function isCookiesAccepted(cookieName) {
    var cookieValue = document.cookie;
    var cookieStart = cookieValue.indexOf(" " + cookieName + '=');

    if (cookieStart === -1) {
        cookieStart = cookieValue.indexOf(cookieName + '=');
    }

    if (cookieStart === -1) {
        cookieValue = null;
    } else {
        cookieStart = cookieValue.indexOf('=', cookieStart) + 1;
        var cookieEnd = cookieValue.indexOf(';', cookieStart);

        if (cookieEnd === -1) {
            cookieEnd = cookieValue.length;
        }

        cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
    }

    return cookieValue;
}

function isFunctionalCookiesAccepted() {
    var cookieValue = isCookiesAccepted('functional_cookies_accepted');

    if (cookieValue) {
        return cookieValue === 'true';
    } else {
        return true;
    }
}

function isTrackingCookiesAccepted() {
    var cookieValue = isCookiesAccepted('tracking_cookies_accepted');

    if (cookieValue) {
        return cookieValue === 'true';
    } else {
        return true;
    }
}