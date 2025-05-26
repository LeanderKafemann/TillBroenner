// Animation für Seitenübergang nach Klick auf einen Link in der Box
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.centered-box a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Nur bei internen Links Animation abspielen
            if (link.target !== "_blank" && link.href && !link.href.startsWith("mailto:")) {
                e.preventDefault();
                const box = link.closest('.centered-box');
                box.style.animation = "box-out 0.5s cubic-bezier(.4,2,.6,1)";
                box.addEventListener('animationend', () => {
                    window.location.href = link.href;
                }, { once: true });
            }
        });
    });
});

// Keyframes für das Ausblenden
const style = document.createElement('style');
style.innerHTML = `
@keyframes box-out {
    0% { opacity: 1; transform: scale(1);}
    100% { opacity: 0; transform: scale(0.8);}
}`;
document.head.appendChild(style);
