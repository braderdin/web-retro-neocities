// --- EFEK KURSOR RETRO RETRO STAR SPARKLES ---
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨'; // Emoji bintang percikan
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.transform = 'translate(-50%, -50%)';
    sparkle.style.fontSize = Math.random() * (16 - 8) + 8 + 'px'; // Saiz rawak
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    
    // Warna neon rawak (Oren / Pink / Hijau Mint)
    const warna = ['#ff5500', '#ff007f', '#00ffcc'];
    sparkle.style.color = warna[Math.floor(Math.random() * warna.length)];
    
    document.body.appendChild(sparkle);
    
    // Animasi bintang pudar dan jatuh sedikit demi sedikit
    let opacity = 1;
    let topPos = e.clientY;
    const interval = setInterval(() => {
        opacity -= 0.05;
        topPos += 1; // Jatuh ke bawah sikit
        sparkle.style.opacity = opacity;
        sparkle.style.top = topPos + 'px';
        
        if (opacity <= 0) {
            clearInterval(interval);
            sparkle.remove();
        }
    }, 30);
});


// ========================================================
// --- UTULITI UNTUK MUAT KOMPONEN LUAR (JS FETCH) ---
// ========================================================
function muatKomponen(idElement, laluanFail) {
    fetch(laluanFail)
        .then(response => {
            if (!response.ok) throw new Error('Gagal memuatkan komponen: ' + laluanFail);
            return response.text();
        })
        .then(data => {
            const tapak = document.getElementById(idElement);
            if (tapak) {
                tapak.innerHTML = data;
            }
        })
        .catch(error => console.error(error));
}

// Menjalankan fungsi suntikan automatik apabila halaman index.html dibuka
muatKomponen('comp-header', 'components/header.html');
muatKomponen('comp-profile', 'components/profile.html');
muatKomponen('comp-menu', 'components/menu.html');
muatKomponen('comp-logbook', 'components/logbook.html');
muatKomponen('comp-garage', 'components/garage.html');
muatKomponen('comp-backstory', 'components/backstory.html');
muatKomponen('comp-vitals', 'components/vitals.html');
muatKomponen('comp-inventory', 'components/inventory.html');







