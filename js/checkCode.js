async function checkVerificationCode() {
    // Hilfsfunktion, um den Wert eines Cookies zu bekommen
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const code = getCookie('verify-code');
    if (!code) {
        // Kein Code vorhanden, weiterleiten zur Login-Seite
        window.location.href = '/login/index.html';
        return;
    }

    try {
        const response = await fetch(`https://lkunited.pythonanywhere.com/broenner/checkCode?code=${encodeURIComponent(code)}`);
        const text = await response.text();
        if (text.trim() === "verified") {
            console.log("Verifizierung erfolgreich.");
           document.body.style.display = '';
        } else {
            // Nicht verifiziert, Weiterleitung zur Login-Seite
            window.location.href = '/login/index.html';
        }
    } catch (error) {
        // Bei Fehler ebenfalls weiterleiten
        window.location.href = '/login/index.html';
    }
}
