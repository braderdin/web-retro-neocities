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
// --- UTULITI UNTUK MUAT KOMPONEN LUAR (JS FETCH PINTAR) ---
// ========================================================
function muatKomponen(idElement, laluanFail, callback) {
    fetch(laluanFail)
        .then(response => {
            if (!response.ok) throw new Error('Gagal memuatkan komponen: ' + laluanFail);
            return response.text();
        })
        .then(data => {
            const tapak = document.getElementById(idElement);
            if (tapak) {
                tapak.innerHTML = data;
                // Jika ada fungsi tambahan (seperti fungsi warna), jalankan ia sekarang
                if (callback) callback(); 
            }
        })
        .catch(error => console.error(error));
}

// Fungsi Automatik mengesan halaman dan mewarnakan menu jadi Oren Menyala
function autoHighlightMenu() {
    const namaFail = window.location.pathname.split('/').pop() || 'index.html';
    let idButang = 'nav-index';

    if (namaFail.includes('about.html')) idButang = 'nav-about';
    if (namaFail.includes('blog.html')) idButang = 'nav-blog';
    if (namaFail.includes('links.html')) idButang = 'nav-links';
    if (namaFail.includes('bookmarks.html')) idButang = 'nav-bookmarks';
    if (namaFail.includes('experiments.html')) idButang = 'nav-experiments';
    if (namaFail.includes('curios.html')) idButang = 'nav-curios';
    if (namaFail.includes('guestbook.html')) idButang = 'nav-guestbook';

    const butangAktif = document.getElementById(idButang);
    if (butangAktif) {
        butangAktif.style.backgroundColor = '#ff5500';
        butangAktif.style.color = 'black';
    }
}

// Senarai arahan sedut komponen untuk SEMUA halaman (Kekal selamat kerana ada semakan 'if (tapak)')
muatKomponen('comp-header', 'components/header.html');
muatKomponen('comp-profile', 'components/profile.html');
muatKomponen('comp-logbook', 'components/logbook.html');
muatKomponen('comp-garage', 'components/garage.html');
muatKomponen('comp-backstory', 'components/backstory.html');
muatKomponen('comp-vitals', 'components/vitals.html');
muatKomponen('comp-inventory', 'components/inventory.html');

// Khas untuk menu: Selepas selesai sedut, terus jalankan fungsi warna oren
muatKomponen('comp-menu', 'components/menu.html', autoHighlightMenu);

// Menjalankan fungsi suntikan automatik apabila halaman index.html dibuka
muatKomponen('comp-header', 'components/header.html');
muatKomponen('comp-profile', 'components/profile.html');
muatKomponen('comp-menu', 'components/menu.html');
muatKomponen('comp-logbook', 'components/logbook.html');
muatKomponen('comp-garage', 'components/garage.html');
muatKomponen('comp-backstory', 'components/backstory.html');
muatKomponen('comp-vitals', 'components/vitals.html');
muatKomponen('comp-inventory', 'components/inventory.html');

// ========================================================
// --- FUNGSI TUKAR AVATAR MANUAL (IMGUR) ---
// ========================================================
const senaraiAvatar = [
    "https://bit.ly/3QmPmqx", 
    "https://i.imgur.com/GAMBAR_IMGUR_1.jpg", // Sila tukar dengan link Imgur abang
    "https://i.imgur.com/GAMBAR_IMGUR_2.jpg",
    "https://i.imgur.com/GAMBAR_IMGUR_3.jpg"
];

function tukarAvatar(e) {
    e.preventDefault(); // Halang skrin dari melompat ke atas bila ditekan
    const imgElement = document.getElementById('avatar-img');
    
    if (imgElement) {
        // Pilih gambar rawak dari senarai
        let randomImg = senaraiAvatar[Math.floor(Math.random() * senaraiAvatar.length)];
        
        // Pastikan gambar tak ulang gambar yang sama
        while(randomImg === imgElement.src && senaraiAvatar.length > 1) {
            randomImg = senaraiAvatar[Math.floor(Math.random() * senaraiAvatar.length)];
        }
        
        // Efek kelip pudar ala retro
        imgElement.style.opacity = 0;
        setTimeout(() => {
            imgElement.src = randomImg;
            imgElement.style.opacity = 1;
        }, 200);
    }
}