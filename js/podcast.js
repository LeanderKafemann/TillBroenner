document.addEventListener("DOMContentLoaded", function () {
    // Liste der Musiktitel-Dateien (Name und Pfad)
    const musiktitel = [
        { name: "Allgemeine Infos", file: "../music/podcast1.mp3" },
        { name: "Stilistische Analyse", file: "../music/podcast2.mp3" },
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
