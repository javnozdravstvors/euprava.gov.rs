const cookieName = 'ga_consent_cookie';
window.addEventListener('load', function () {
    const cookieValue = getCookie(cookieName);

    if (cookieValue === undefined) {
        document.getElementById("bottom-popup").setAttribute("style", "display: block;");
        document.getElementById("accept").addEventListener("click", function () {
            const confirmation = document.getElementById("analytic-cookies-checkbox").checked;

            setCookie('ga_consent_cookie', confirmation, 30);
            window.location.reload(true);

        });
    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var i, x, y, cookies = document.cookie.split(";");
    for (i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cname) {
            return unescape(y);
        }
    }
}