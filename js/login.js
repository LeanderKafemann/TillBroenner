function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.login-container');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const code = document.getElementById('code').value.trim();
        if (code) {
            setCookie('verify-code', code, 7); // Cookie für 7 Tage setzen
            window.location.href = "/index.html";
        }
    });
});
