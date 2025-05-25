async function checkVerificationCode() {
    // Hilfsfunktion, um den Wert eines Cookies zu bekommen
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Hilfsfunktion, um ein Cookie zu setzen
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    // Hilfsfunktion, um ein Cookie zu löschen
    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const loginUrl = 'https://leanderkafemann.github.io/TillBroenner/login/';

    const code = getCookie('verify-code');
    if (!code) {
        setCookie('login-value', 'none', 7);
        window.location.href = loginUrl;
        return;
    }

    try {
        const response = await fetch(`https://lkunited.pythonanywhere.com/broenner/checkCode?code=${encodeURIComponent(code)}`);
        const text = await response.text();
        if (text.trim() === "verified") {
            console.log("Verifizierung erfolgreich.");
            document.body.style.display = 'flex';
        } else {
            deleteCookie('verify-code');
            setCookie('login-value', 'failed', 7);
            window.location.href = loginUrl;
        }
    } catch (error) {
        deleteCookie('verify-code');
        setCookie('login-value', 'failed', 7);
        window.location.href = loginUrl;
    }
}

checkVerificationCode();
