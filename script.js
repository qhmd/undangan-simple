AOS.init();
const openBtn = document.getElementById("openBtn");
const btnMusic = document.getElementById("btnMusic");
const sections = document.querySelectorAll("section:not(#cover)");

openBtn.addEventListener("click", () => {
    sections.forEach(sec => {
        sec.classList.remove("hidden")
        void sec.offsetWidth
    });
    btnMusic.classList.remove("hidden");
    openBtn.classList.add("hidden");
    bgMusic.play().catch(err => console.warn('Autoplay blocked?', err));
    AOS.refresh();
    setTimeout(() => {
        document.getElementById("sec_doa").scrollIntoView({ behavior: "smooth" });
    }, 200);
});


window.addEventListener("load", () => {
    // kasih delay biar animasi lebih enak
    setTimeout(() => {
        document.getElementById("flowerTop").classList.remove("opacity-0", "-translate-y-20");
        document.getElementById("flowerLeft").classList.remove("opacity-0", "-translate-x-20");
        document.getElementById("flowerRight").classList.remove("opacity-0", "translate-x-20");
    }, 300); // delay 0.3s
});

const wrapper = document.getElementById("wrapper");

// 1. Target date: 22 Oktober 2025, pukul 11:00 WITA (UTC+8)
const targetDate = new Date('2025-10-22T03:00:00Z');
// Catatan: 11:00 WITA = 03:00 UTC

// 2. Update setiap detik
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now; // selisih dalam milidetik

    if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        clearInterval(interval);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

updateCountdown(); // jalankan langsung
const interval = setInterval(updateCountdown, 1000);



// Form Untuk Mengirim

const form = document.getElementById("ucapanForm");
const modal = document.getElementById("confirmModal");
const closeBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const overlay = document.getElementById("closeOverlay");
const confirmBtn = document.getElementById("confirmBtn");

const modalContent = document.getElementById("modalContent");
const loadingContent = document.getElementById("loadingContent");
const successContent = document.getElementById("successContent");
const errorContent = document.getElementById("errorContent");

// Saat submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    modalContent.classList.remove("hidden");
    loadingContent.classList.add("hidden");
    successContent.classList.add("hidden");
    errorContent.classList.add("hidden");
});

// Tutup modal
[closeBtn, cancelBtn, overlay].forEach(btn => {
    btn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});

// Tombol konfirmasi kirim
confirmBtn.addEventListener("click", async () => {
    modalContent.classList.add("hidden");
    loadingContent.classList.remove("hidden");

    try {

        // ambil data form
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // ubah jadi object
        console.log(data)
        const res = await fetch("https://undangan-simple-five.vercel.app/api/proxy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // kirim object, bukan element form
        });

        if (!res.ok) throw new Error("Respon server tidak OK");

        const result = await res.text();
        console.log("Berhasil kirim:", result);

        // tampilkan sukses
        loadingContent.classList.add("hidden");
        successContent.classList.remove("hidden");
    } catch (error) {
        console.error("Gagal mengirim:", error);

        // tampilkan error
        loadingContent.classList.add("hidden");
        errorContent.classList.remove("hidden");
    }
});

const music = document.getElementById("bgMusic");
const btn = document.getElementById("btnMusic");
const soundIcon = btn.querySelector(".icon-sound");
const mutedIcon = btn.querySelector(".icon-muted");


function toggleMute() {
    music.muted = !music.muted;
    if (music.muted) {
        soundIcon.classList.add("hidden");
        mutedIcon.classList.remove("hidden");
    } else {
        soundIcon.classList.remove("hidden");
        mutedIcon.classList.add("hidden");
    }
}

const params = new URLSearchParams(window.location.search);
const nama = params.get('nama');

// Ganti teks berdasarkan parameter
if (nama) {
    document.querySelector('.nama-tamu').textContent = nama;
}