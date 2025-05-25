document.addEventListener("DOMContentLoaded", function() {
    // Buttons als Navigation
    document.querySelectorAll('.circle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const link = btn.getAttribute('data-link');
            if (link) window.location.href = link;
        });
    });
});
