/**
 * apps/hub/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Partner and school names stay as they are. The press caption stays in English
 * because it quotes the clipping's own date line.
 */

import type { HubContent, Overlay } from '@iqra/config'

export const contentMs: Overlay<HubContent> = {
  home: {
    headline: 'Sesuatu yang bermakna untuk dilakukan\nbersama anak anda hari ini',
    ayah: { line: 'Satu ayat sehari, dalam aplikasi Tadabbur kami.' },
  },
  about: {
    story: [
      'IqraSaurus bermula dengan anak lelaki kami. Pada usia kira-kira lima tahun, dia tidak suka membaca Iqra, jadi kami menjadikannya satu permainan. Dia sangat suka Thomas the Train, jadi kami mencipta permainan kad berdasarkannya.',
      'Kami membesarkan anak-anak kami dengan kisah benar para nabi dan kesusahan yang mereka lalui, sebagai ganti cerita dongeng. Kami mahu mereka membesar berakar dalam iman, dan kembali kepada Allah ketika hidup terasa sukar, termasuk pada hari kami tiada lagi bersama mereka.',
      'Anak-anak kami suka berkongsi apa yang mereka pelajari dengan kawan-kawan mereka, dan keluarga kawan-kawan mereka meminta untuk turut serta. Dari tahun ke tahun, sesi-sesi ini berkembang daripada beberapa keluarga yang kami kenali kepada program yang terbuka kepada orang ramai: bercerita dan drama, lukisan Al-Quran dan hadis, jurnal renungan dan Quran Investigators, persediaan Ujian Kemasukan Madrasah, dan Umrah for Kids.',
      'Hari ini kami menjalankan program di pusat satelit di Bukit Batok dan Tampines, dan sekolah serta tadika seperti Brainy Bunch menjemput kami untuk menjalankan sesi bersama kanak-kanak mereka. Kami juga melatih guru.',
      'Bersama Little Caliph, kami mengusahakan sebuah buku tafsir untuk kanak-kanak sekolah rendah. Para asatizah menulis tafsirnya, dan kami menulis bahagian tadabburnya, dengan aktiviti yang dibina berdasarkan lapan kecerdasan pelbagai.',
    ],
    foundation: [
      'Kami mahu membesarkan kanak-kanak yang tabah, yang kekal berakar dalam iman dan kembali kepada Allah apabila diuji dengan kesusahan. Sebab itulah kami bermula dengan kisah benar daripada Al-Quran.',
      'Setiap program berakhir dengan kanak-kanak melakukan sesuatu dengan apa yang dipelajarinya dan menyampaikannya kepada orang lain. Kami mahu kanak-kanak melihat diri mereka sebagai agen perubahan, dengan misi di muka bumi ini.',
    ],
  },
  workWithUs: {
    body: 'Ingin menjalankan salah satu program kami di madrasah, pusat atau kumpulan rumah anda, atau membantu kami menguji bahan baharu? Hubungi kami. Nasihat pengasas kami kepada sesiapa yang ingin memulakan sesuatu yang serupa: jadilah kreatif, sentiasa memohon pertolongan Allah, dan solatlah istikharah.',
  },
  // DRAFT 2026-10-19 of the "How we use AI" page, to be checked with the rest of the Malay.
  // The credential sentence stays in English (CLAUDE.md rule 3); it comes from `brand`.
  ai: {
    lede: 'IqraSaurus ialah inisiatif dakwah keluarga dari Singapura. Kami mengajar kanak-kanak secara bersemuka, dan kami membina alat percuma yang digunakan oleh ibu bapa dan guru bersama kanak-kanak di rumah dan di dalam kelas. Alat AI membantu kami membinanya. Halaman ini menerangkan untuk apa kami menggunakan AI, apa yang tidak sekali-kali kami gunakan AI untuknya, dan siapa yang menyemak hasilnya.',
    sections: [
      {
        title: 'Pendirian kami',
        paragraphs: [
          'Kami melihat AI sebagai alat yang boleh digunakan dengan berhati-hati dan dalam batas Islam. Yang penting ialah untuk apa ia digunakan dan siapa yang bertanggungjawab atas hasilnya. Tanggungjawab atas semua yang kami kongsikan tetap pada kami, insan yang berkongsi.',
          'Kami bersetuju dengan apa yang telah dinyatakan oleh MUIS secara terbuka: AI tidak sepatutnya menjadi sumber utama panduan agama sesiapa pun, dan persoalan agama memerlukan asatizah yang diiktiraf. Alat kami menawarkan renungan dan amalan, bukan hukum.',
        ],
      },
      {
        title: 'Kami sedang meneroka, dan bergerak pantas',
        paragraphs: [
          'Kami masih di peringkat awal dan meneroka, dan kami sengaja bergerak pantas. Kami mencuba idea bersama kanak-kanak dan keluarga sebenar, mengekalkan apa yang membantu dan meninggalkan apa yang tidak. Jadi sebahagian daripada apa yang anda lihat ialah versi pertama. Ada perkara yang mungkin sampai kepada anda sebelum setiap butirannya disemak sepenuhnya, dan sebelum kami mendengar maklum balas masyarakat. Apabila sesuatu masih draf, kami labelkannya. Apabila anda memberitahu kami ada yang salah, kami betulkannya.',
        ],
      },
      {
        title: 'Untuk apa kami menggunakan AI',
        items: [
          { lead: 'Membina alat:', text: 'menulis dan menguji kod di sebalik Tadabbur, Mini Hafiz, Numbersaurus, Kalendar dan alat-alat lain.' },
          { lead: 'Draf pertama panduan dan aktiviti:', text: 'panduan 4-I dalam Tadabbur, kad nombor dalam Numbersaurus dan aktiviti keluarga dalam Kalendar. Setiap satunya dibaca oleh seseorang sebelum dikongsi.' },
          { lead: 'Gambar:', text: 'dino kami dan semua ilustrasi kami, berwarna dan juga lukisan garis hitam putih, dihasilkan dengan alat imej ChatGPT melalui pelan berbayar. Kami memilih setiap gambar dan menyemaknya mengikut peraturan kami sebelum digunakan.' },
          { lead: 'Draf terjemahan:', text: 'versi Bahasa Melayu halaman kami didrafkan dengan AI dan ditandakan sebagai draf sehingga disemak oleh seseorang.' },
          { lead: 'Bantuan menulis:', text: 'draf pertama halaman web, pek cetakan dan teks kempen, yang kemudiannya kami sunting.' },
          { lead: 'Sembang pembantu', text: 'di beberapa halaman program yang hanya menjawab berdasarkan bahan yang telah kami sediakan. Ia pembantu, bukan pihak berautoriti dalam agama.' },
        ],
      },
      {
        title: 'Apa yang tidak sekali-kali kami gunakan AI untuknya',
        items: [
          { lead: 'Teks Arab Al-Quran, hadis dan terjemahannya.', text: 'AI tidak sekali-kali menulis, melengkapkan, menterjemah atau membetulkannya. Teks Al-Quran dan terjemahannya dalam alat kami diambil daripada QuranExcel (quranexcel.com), disalin melalui program dan tidak ditaip semula. Rujukan hadis disemak oleh manusia.' },
          { lead: 'Hukum, fatwa atau nasihat agama peribadi.', text: 'Untuk perkara ini, sila rujuk asatizah yang diiktiraf.' },
          { lead: 'Gambar para nabi atau sahabat,', text: 'atau gambar realistik mana-mana orang sebenar.' },
          { lead: 'Testimoni, angka atau petikan rekaan.', text: '' },
          { lead: 'Mengumpul data kanak-kanak.', text: 'Alat kami tidak memerlukan log masuk, dan kemajuan kanak-kanak disimpan pada peranti mereka sendiri.' },
        ],
      },
      {
        title: 'Siapa yang menyemak',
        items: [
          { lead: 'Asatizah kami', text: 'menyemak setiap kad Numbersaurus dan setiap aktiviti Kalendar sebelum diterbitkan. Mereka menyemak dahulu panduan Tadabbur bagi ayat yang memerlukan perhatian lebih. Setiap panduan menunjukkan siapa yang menyemaknya.' },
          { lead: 'Pasukan kami', text: 'membaca semua yang lain sebelum dikongsi.' },
          { lead: 'Jika sesuatu belum disemak oleh asatizah,', text: 'kami nyatakannya. Sebahagian daripada sumbangan penyokong membiayai masa asatizah untuk menyemak setiap panduan.' },
        ],
      },
      {
        title: 'Beritahu kami jika kami tersilap',
        paragraphs: [
          'AI boleh tersilap walaupun kedengaran yakin, termasuk tentang Islam. Jika ada sesuatu dalam alat atau halaman kami yang salah, atau tidak kena di hati anda, sila beritahu kami. Kami akan membetulkannya, dan kami berterima kasih kepada semua yang membantu kami memperbaikinya.',
          'Kami akan mengemas kini halaman ini apabila amalan kami berubah dan apabila panduan para ulama berkembang.',
        ],
        contact: true,
      },
    ],
    updated: 'Kemas kini terakhir: 19 Oktober 2026',
  },
  seo: {
    ai: {
      title: 'Cara kami menggunakan AI | IqraSaurus',
      description: 'Untuk apa IqraSaurus menggunakan AI, apa yang tidak sekali-kali kami gunakan AI untuknya, dan siapa yang menyemak hasilnya.',
    },
    home: {
      title: 'IqraSaurus | Sesuatu yang bermakna untuk dilakukan bersama anak anda hari ini',
      description:
        'Inisiatif dakwah keluarga dari Singapura yang membantu kanak-kanak mengenali, memahami dan menghayati Islam. Alat untuk digunakan di rumah, dan program yang kami jalankan.',
    },
    about: {
      title: 'Tentang kami | IqraSaurus',
      description:
        'Siapa kami, cara kami mengajar dengan kaedah 4-I, dan siapa yang membimbing kami.',
    },
    workWithUs: {
      title: 'Bekerjasama dengan kami | IqraSaurus',
      description:
        'Bawa program IqraSaurus ke madrasah, pusat atau kumpulan rumah anda, atau bantu kami menguji bahan baharu.',
    },
  },
}
