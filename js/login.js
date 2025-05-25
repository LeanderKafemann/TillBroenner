function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function showMessage(message, type = "info") {
    let msgDiv = document.getElementById('login-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'login-message';
        msgDiv.style.marginBottom = "1rem";
        msgDiv.style.padding = "0.75rem 1rem";
        msgDiv.style.borderRadius = "6px";
        msgDiv.style.fontSize = "1rem";
        msgDiv.style.textAlign = "center";
        msgDiv.style.maxWidth = "350px";
        msgDiv.style.marginLeft = "auto";
        msgDiv.style.marginRight = "auto";
        document.body.insertBefore(msgDiv, document.body.firstChild);
    }
    msgDiv.textContent = message;
    if (type === "error") {
        msgDiv.style.background = "#ffeaea";
        msgDiv.style.color = "#b71c1c";
        msgDiv.style.border = "1px solid #f44336";
    } else {
        msgDiv.style.background = "#e3f2fd";
        msgDiv.style.color = "#1565c0";
        msgDiv.style.border = "1px solid #90caf9";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Cookie login-value prüfen
    const loginValue = getCookie('login-value');
    if (loginValue === "failed") {
        showMessage("Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.", "error");
    } else if (loginValue === "none") {
        showMessage("Es wurde noch kein Verifizierungscode gespeichert.", "info");
    }

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
