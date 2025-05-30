function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getVerifyCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
}

document.addEventListener("DOMContentLoaded", function() {
    const code = getVerifyCodeFromUrl();
    const messageDiv = document.getElementById('status-message');
    if (code) {
        setCookie('verify-code', code, 31);
        messageDiv.textContent = "Verifizierungscode gespeichert. Weiterleitung...";
        setTimeout(() => {
            window.location.href = "../";
        }, 1200);
    } else {
        messageDiv.textContent = "Kein Verifizierungscode in der URL gefunden.";
    }
});
