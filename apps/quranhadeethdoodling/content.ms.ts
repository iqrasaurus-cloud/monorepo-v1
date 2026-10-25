/**
 * apps/quranhadeethdoodling/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Keep it in step when the English changes. Programme names stay as they are.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {
  hero: {
    line: 'Kanak-kanak melukis makna sesuatu surah atau hadis bagi mereka, sebelum mereka mampu menulisnya.',
  },
  whatItIs: {
    body: [
      'Kami memulakan lukisan Al-Quran dalam halaqah keluarga mingguan kami. Anak-anak kami masih terlalu kecil untuk banyak menulis tentang sesuatu surah, jadi kami meminta mereka melukis renungan mereka. Tidak lama kemudian kami dapati hadis juga boleh dipelajari dengan cara yang sama, lalu kami tambah lukisan hadis.',
      'Kanak-kanak menggunakan setem dan alat tulis baharu untuk melukis satu idea daripada surah atau hadis itu dan maknanya bagi hari mereka.',
      'Apabila kanak-kanak semakin besar dan lebih banyak menulis, lukisan membawa mereka kepada jurnal renungan dan buku Quran Investigators kami. Kami menjalankan sesi lukisan di pusat satelit kami di Bukit Batok dan Tampines.',
    ],
  },
  session: {
    steps: {
      inspire:
        'Kami membaca sebuah surah pendek atau hadis bersama-sama dan menerangkan maknanya dengan perkataan yang mudah.',
      investigate:
        'Kanak-kanak memilih satu gambar, perkataan atau idea daripadanya dan bertanya soalan mereka tentangnya.',
      integrate:
        'Mereka melukis rupa idea itu dalam hari mereka sendiri, di rumah, di sekolah atau bersama kawan-kawan.',
      impart:
        'Setiap kanak-kanak menunjukkan lukisannya dan menerangkannya kepada kumpulan atau kepada seseorang di rumah.',
    },
    tips: {
      younger:
        'Biarkan mereka mengecap dan mewarna. Beberapa perkataan, atau tiada langsung, sudah memadai.',
      older: 'Minta satu ayat pendek di bawah lukisan, kemudian beralih kepada jurnal renungan.',
    },
  },
  seen: {
    lessons: [
      'Anak-anak kami menanti-nantikan halaqah mingguan kerana sentiasa ada alat tulis dan setem baharu untuk dicuba.',
      'Melukis sesuai semasa anak-anak kami masih terlalu kecil untuk banyak menulis. Apabila mereka semakin besar, kami beralih kepada jurnal renungan, yang kemudian menjadi Quran Investigators.',
    ],
    photos: [
      { src: '/photos/seen-qhd-al-maun-cover.webp', alt: 'Kulit buku kerja Doodle with Surah Al-Maun', caption: 'Buku kerja Doodle with Surah Al-Maun', width: 1165, height: 1600 },
      { src: '/photos/seen-qhd-al-maun-panels.webp', alt: 'Halaman lukisan berpanel komik untuk satu ayat', caption: 'Satu ayat, satu panel komik', width: 1147, height: 1600 },
      { src: '/photos/seen-qhd-ghashiyah-cover.webp', alt: 'Buku kecil kuning lipatan tangan bertajuk Surah Al-Ghashiyah', caption: 'Buku lipat Al-Ghashiyah buatan seorang kanak-kanak', width: 1166, height: 1600 },
      { src: '/photos/seen-qhd-ghashiyah-spread.webp', alt: 'Di dalam buku lipat: lukisan dan renungan ringkas tentang surah itu', caption: 'Lukisan dan renungannya di dalam', width: 1600, height: 1124 },
      { src: '/photos/seen-qhd-fatihah-alamin.webp', alt: 'Kad skrapbuk tentang Tuhan sekalian alam, dengan haiwan laut dan darat daripada span', caption: 'Kad skrapbuk Al-Fatihah', width: 1600, height: 1121 },
      { src: '/photos/seen-qhd-fatihah-path.webp', alt: 'Kad skrapbuk tentang jalan yang lurus, dilukis sebagai pembaris dan jalan bergaris putus', caption: '“Tunjukilah kami jalan yang lurus”, seperti yang dibayangkan seorang kanak-kanak', width: 1600, height: 1144 },
    ],
  },
  bringIt: {
    body: 'Ingin menjalankan Quran & Hadeeth Doodling di kelas, madrasah, pusat atau halaqah rumah anda?',
  },
  seo: {
    description:
      'Sesi lukisan IqraSaurus di mana kanak-kanak melukis makna sesuatu surah atau hadis bagi mereka, sebelum mereka cukup besar untuk menulisnya.',
  },
}
