document.addEventListener('DOMContentLoaded', () => {
    // 1. تفعيل أيقونات Lucide
    lucide.createIcons();

    // 2. إعداد ورسم الرسم البياني باستخدام Chart.js
    const ctx = document.getElementById('telemetryChart').getContext('2d');

    // إعداد التدرج المائي للحرارة (Temp Gradient)
    const tempGradient = ctx.createLinearGradient(0, 0, 0, 200);
    tempGradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
    tempGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

    // إعداد التدرج المائي للرطوبة (Humidity Gradient)
    const humidityGradient = ctx.createLinearGradient(0, 0, 0, 200);
    humidityGradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
    humidityGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'Temp (°C)',
                    data: [23.1, 23.5, 24.8, 25.2, 24.6, 24.1],
                    borderColor: '#38bdf8',
                    borderWidth: 2,
                    backgroundColor: tempGradient,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Humidity (% RH)',
                    data: [45, 46, 50, 49, 48.2, 47],
                    borderColor: '#a855f7',
                    borderWidth: 2,
                    backgroundColor: humidityGradient,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // تم إعداد المفتاح يدويًا في الـ HTML
            },
            scales: {
                x: {
                    grid: { color: '#21262d' },
                    ticks: { color: '#8b949e', font: { size: 10 } }
                },
                y: {
                    grid: { color: '#21262d' },
                    ticks: { color: '#8b949e', font: { size: 10 } }
                }
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. تفعيل أيقونات Lucide العامة
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. التحكم في الوضع الليلي والنهاري (Dark/Light Mode) وحفظه في المتصفح
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // 3. القائمة الجانبية للشاشات الصغيرة (Mobile Sidebar Drawer)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    if (mobileBtn && sidebar) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // ==================== تفاعلات صفحة Control Panel ====================
    const tempRange = document.getElementById('tempRange');
    if (tempRange) {
        tempRange.addEventListener('input', (e) => {
            const val = e.target.value;
            // يمكنك تحديث أي عنصر تعرض فيه القيمة الحية لشريط الحرارة هنا
            console.log("Current Temperature Setpoint:", val);
        });
    }

    // ==================== تفاعلات صفحة Alerts & Notifications ====================
    // زر تحديث أو إعادة تحميل البيانات (Refresh)
    const refreshBtns = document.querySelectorAll('.btn-refresh');
    refreshBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.opacity = '0.6';
            setTimeout(() => {
                btn.style.opacity = '1';
                alert('تم تحديث البيانات وقراءات النظام بنجاح!');
            }, 500);
        });
    });

    // أزرار التعامل مع التنبيهات (Acknowledge / Resolve)
    const acknowledgeButtons = document.querySelectorAll('.btn-table-primary, .btn-table-secondary, .btn-table-blue');
    acknowledgeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (row) {
                row.style.transition = 'opacity 0.3s';
                row.style.opacity = '0.4';
                setTimeout(() => {
                    row.remove();
                    alert('تم تنفيذ الإجراء وتحديث حالة التنبيه بنجاح.');
                }, 300);
            }
        });
    });
});
