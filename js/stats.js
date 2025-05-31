document.addEventListener("DOMContentLoaded", function () {
    const loadingDiv = document.getElementById('stats-loading');
    const errorDiv = document.getElementById('stats-error');
    const ctx = document.getElementById('statsChart').getContext('2d');

    fetch('https://lkunited.pythonanywhere.com/broenner/getStats')
        .then(response => response.text())
        .then(data => {
            // Format: Name#*#Anzahl#**#Name#*#Anzahl...
            const entries = data.split('#**#').filter(Boolean);
            const labels = [];
            const values = [];
            entries.forEach(entry => {
                const [name, count] = entry.split('#*#');
                if (name && count) {
                    labels.push(name);
                    values.push(Number(count));
                }
            });

            if (labels.length === 0) {
                throw new Error("Keine Daten gefunden");
            }

            // Diagramm anzeigen
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Aufrufe',
                        data: values,
                        backgroundColor: 'rgba(25, 118, 210, 0.6)',
                        borderColor: 'rgba(25, 118, 210, 1)',
                        borderWidth: 1,
                        borderRadius: 6,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                        }
                    }
                }
            });

            loadingDiv.style.display = 'none';
        })
        .catch(() => {
            loadingDiv.style.display = 'none';
            errorDiv.style.display = '';
        });
});
