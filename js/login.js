document.addEventListener("DOMContentLoaded", function() {
    // Kreis-Positionierung der Buttons
    const buttons = document.querySelectorAll('.circle-btn');
    const circle = document.querySelector('.circle-buttons');
    const radius = 180; // Abstand vom Mittelpunkt

    buttons.forEach((btn, i) => {
        const angle = (i / buttons.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius + 210 - 45; // 210 = Hälfte von .circle-buttons, 45 = Hälfte von Button
        const y = Math.sin(angle) * radius + 210 - 45;
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    });

    // Gegenrotation, damit die Schrift nicht rotiert
    circle.addEventListener('animationiteration', () => {}); // Für eventuelle spätere Erweiterungen

    // Schrift bleibt lesbar: per AnimationFrame die Gegenrotation setzen
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

    // Navigation
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const link = btn.getAttribute('data-link');
            if (link) window.location.href = link;
        });
    });
});
