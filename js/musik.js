document.addEventListener("DOMContentLoaded", function () {
    // Liste der Musiktitel-Dateien (Name und Pfad)
    const musiktitel = [
        { name: "High Night", file: "../music/high night.m4a" },
        { name: "Rising Star", file: "../music/rising star.m4a" },
        { name: "When You Wish Upon A Star", file: "../music/when you wish upon a star.m4a" },
        { name: "Your Way To Say Goodbye", file: "../music/your way to say goodbye.m4a" },
    ];

    const listDiv = document.getElementById('musik-titel-list');
    musiktitel.forEach(titel => {
        const btn = document.createElement('button');
        btn.className = 'musik-btn';
        btn.textContent = titel.name;
        btn.onclick = () => window.open(titel.file, '_blank');
        listDiv.appendChild(btn);
    });
});
