const stories = [

    {
        title: "Kucing Sang Guru",
        image: "img/gambar1.jpg",
        text: "Dulu di hutan Lampung, hewan-hewan bisa bicara seperti manusia. Yang paling dihormati adalah Kucing. Bukan karena paling kuat, tapi karena paling cerdik dan adil. Muridnya ada tiga: Harimau, Singa, dan Anjing. Setiap hari mereka belajar di bawah pohon"
    },

    {
        title: "Murid yang Paling Ingin Tahu",
        image: "img/gambar2.jpg",
        text: "Dari ketiganya, Harimau yang paling pintar. Ia juga yang paling banyak bertanya. Hari itu ia tidak bisa diam, ada satu hal yang terus ia pikirkan."
    },

    {
        title: "Satu Ilmu yang Belum Diajarkan",
        image: "img/gambar3.jpg",
        text: "Harimau menunjuk ke pohon tinggi. 'Guru, ajari aku memanjat seperti itu.' Ia sudah bisa lari dan berburu, tapi belum bisa memanjat. Itu yang membuatnya penasaran."

    },

    {
        title: "Pertanyaan Balik dari Kucing",
        image: "img/gambar4.jpg",
        text: "Kucing tidak langsung menjawab. Ia balik bertanya, 'Ilmu itu mau kamu pakai untuk apa?' Harimau menjawab cepat, 'Untuk apa saja.' Jawaban itu membuat Kucing ragu. Baginya, ilmu harus dipakai untuk hal yang baik."
    },

    {
        title: "Penolakan Sang Guru",
        image: "img/gambar5.jpg",
        text: "Kucing memutuskan untuk tidak mengajarkannya. Harimau merasa diremehkan. Ia marah. Suasana belajar yang tenang berubah tidak enak"
    },

    {
        title: "Dikejar",
        image: "img/gambar6.jpg",
        text: "Harimau mengejar Kucing. Kucing yang lebih kecil tidak melawan, ia memilih lari. Ia tahu ia tidak akan menang kalau beradu tenaga."
    },

    {
        title: "Selisih SAtu Keahlian",
        image: "img/gambar7.jpg",
        text: "Sampai di pohon besar, Kucing melompat dan naik dengan mudah. Lincah sekali. Harimau berhenti di bawah. Ia hanya bisa melihat dari bawah. Di situlah ia sadar, inilah alasan Kucing tidak mengajarkannya agar tetap punya cara untuk menyelamatkan diri."
    },

    {
        title: "Sumpah Harimau",
        image: "img/gambar8.jpg",
        text: "Harimau duduk sendirian. Malu dan kesal, ia lalu bersumpah, “Kalau begitu, kotoranmu pun akan kumakan."
    },

    {
        title: "Kebiasaan Sampai Sekarang",
        image: "img/gambar9.jpg",
        text: "Kucing mendengar sumpah itu. Sejak hari itu ia jadi lebih hati-hati. Setiap selesai buang kotoran, ia selalu menutupnya kembali dengan tanah sampai rapat. Kebiasaan itu terbawa sampai sekarang, itulah kenapa kucing selalu menimbun pupnya."
    },

    {
        title: "Pesan Moral",
        image: "img/gambar10.jpg",
        text: "Sore itu Kucing duduk di dahan, melihat hutan dari atas. Harimau, Singa, dan Anjing ada di bawah. Tidak ada yang menang atau kalah. Kucing hanya mengajarkan satu hal: jadi pintar saja tidak cukup, harus tahu kapan ilmu itu dipakai dan kapan harus disimpan."
    }

];

let currentStory = 0;

const storyTitle = document.getElementById("storyTitle");
const storyImage = document.getElementById("storyImage");
const storyText = document.getElementById("storyText");
const chapterNumber = document.getElementById("chapterNumber");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const voiceButton = document.getElementById("voiceButton");
const voiceIcon = document.getElementById("voiceIcon");

const backgroundMusic = document.getElementById("backgroundMusic");

function showStory(index) {

    const story = stories[index];

    storyTitle.textContent = story.title;

    storyImage.src = story.image;

    storyText.textContent = story.text;

    chapterNumber.textContent =
        `Chapter ${index + 1}`;

    prevButton.disabled =
        index === 0;

    nextButton.disabled =
        index === stories.length - 1;
}
nextButton.addEventListener("click", () => {

    if (currentStory < stories.length - 1) {

        stopNarrator();

        currentStory++;

        showStory(currentStory);
    }

});

prevButton.addEventListener("click", () => {

    if (currentStory > 0) {

        stopNarrator();

        currentStory--;

        showStory(currentStory);
    }

});

let isSpeaking = false;

function speakStory() {

    speechSynthesis.cancel();

    const story = stories[currentStory];

    const utterance =
        new SpeechSynthesisUtterance(story.text);

    utterance.lang = "id-ID";

    utterance.rate = 0.9;

    utterance.pitch = 1.05;

    utterance.volume = 1;

    utterance.onstart = () => {

        isSpeaking = true;

        voiceIcon.textContent = "⏸️";
    };

    utterance.onend = () => {

        isSpeaking = false;

        voiceIcon.textContent = "🔊";
    };

    speechSynthesis.speak(utterance);
}

voiceButton.addEventListener("click", () => {

    if (isSpeaking) {

        stopNarrator();

    } else {

        speakStory();

        startMusic();
    }

});

function stopNarrator() {

    speechSynthesis.cancel();

    isSpeaking = false;

    voiceIcon.textContent = "🔊";
}

function startMusic() {

    backgroundMusic.volume = 0.90;

    backgroundMusic.play().catch(() => {

        console.log(
            "Musik menunggu interaksi pengguna."
        );

    });

}

showStory(currentStory);