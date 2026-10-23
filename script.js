document.addEventListener('DOMContentLoaded', function() {

    const ctx = document.getElementById('tempChart').getContext('2d');
    
    const tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', 'LIVE'],
            datasets: [{
                label: 'Recorded Temp (°C)',
                data: [21.5, 21.0, 21.8, 22.5, 23.0, 24.2, 25.1, 24.5, 23.8, 22.5, 22.0, 24.0],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: function(context) {
                    return context.dataIndex === context.dataset.data.length - 1 ? 6 : 2;
                },
                pointBackgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 }, color: '#64748b' }
                },
                y: {
                    min: 16,
                    max: 28,
                    ticks: { stepSize: 4, font: { size: 10 }, color: '#64748b' },
                    grid: { color: '#f1f5f9' }
                }
            }
        }
    });

    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    const fanButtons = document.querySelectorAll('.fan-speed-section .btn-option');
    fanButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            fanButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const coolingRange = document.querySelector('.range-slider.blue');
    const coolingValText = document.querySelector('.val-blue');
    if (coolingRange && coolingValText) {
        coolingRange.addEventListener('input', (e) => {
            coolingValText.textContent = parseFloat(e.target.value).toFixed(1) + '°C';
        });
    }

    const heatingRange = document.querySelector('.range-slider.red');
    const heatingValText = document.querySelector('.val-red');
    if (heatingRange && heatingValText) {
        heatingRange.addEventListener('input', (e) => {
            heatingValText.textContent = parseFloat(e.target.value).toFixed(1) + '°C';
        });
    }
    const saveBtn = document.querySelector('.hvac-card .btn-primary');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('تم حفظ وتطبيق حدود درجات الحرارة بنجاح على نظام Lab Room 1! 🚀');
        });
    }
    const resetBtn = document.querySelector('.hvac-card .btn-secondary');
    if (resetBtn && coolingRange && heatingRange) {
        resetBtn.addEventListener('click', () => {
            coolingRange.value = 22;
            heatingRange.value = 25;
            if (coolingValText) coolingValText.textContent = '22.0°C';
            if (heatingValText) heatingValText.textContent = '25.0°C';
            alert('تم استعادة الإعدادات الافتراضية بنجاح.');
        });
    }
});