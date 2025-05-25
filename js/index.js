document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.circle-btn');
    const circle = document.querySelector('.circle-buttons');
    const mainContent = document.querySelector('.main-content');
    const numButtons = buttons.length;
    const radius = 125; // Abstand vom Mittelpunkt (kleiner als Bildradius)

    // Positioniere Buttons kreisförmig um das Bildzentrum
    buttons.forEach((btn, i) => {
        const angle = (i / numButtons) * 2 * Math.PI - Math.PI / 2; // Start bei oben
        const x = Math.cos(angle) * radius + 170 - 45; // 170 = 340/2, 45 = 90/2
        const y = Math.sin(angle) * radius + 170 - 45;
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    });

    // Gegenrotation, damit Schrift lesbar bleibt
    function updateButtonRotation() {
        const computedStyle = window.getComputedStyle(circle);
        const matrix = computedStyle.transform;
        let angle = 0;
        if (matrix && matrix !== "none") {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            const a = values[0], b = values[1];
            angle = Math.atan2(b, a) * (180/Math.PI);
        }
        buttons.forEach(btn => {
            btn.style.transform = `rotate(${-angle}deg)`;
        });
        requestAnimationFrame(updateButtonRotation);
    }
    updateButtonRotation();

    // Klick-Animation
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Rotation stoppen
            circle.style.animation = "none";
            // Alle Buttons außer den geklickten ausblenden
            buttons.forEach(b => {
                if (b !== btn) b.style.opacity = "0";
            });
            // Button in die Mitte animieren
            btn.classList.add('animate-to-center');
            // Nach Animation weiterleiten
            setTimeout(() => {
                const link = btn.getAttribute('data-link');
                if (link) window.location.href = link;
            }, 650);
        });
    });
});
