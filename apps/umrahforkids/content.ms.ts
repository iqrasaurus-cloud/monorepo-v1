/**
 * apps/umrahforkids/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Keep it in step when the English changes. Programme names stay as they are.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {
  hero: {
    line: 'Kisah, drama dan rima yang menyediakan kanak-kanak untuk umrah, sebelum, semasa dan selepas perjalanan.',
  },
  whatItIs: {
    body: [
      'Umrah for Kids membantu kanak-kanak memahami apa yang akan mereka lihat dan lakukan semasa umrah. Kami menjalin sirah ke dalam drama dan mencipta rima supaya kanak-kanak mengingati langkah-langkahnya dan kisah di sebaliknya. Setiap kanak-kanak menerima lembaran kerja dan sebuah buku yang kami sediakan untuk perjalanan itu.',
      'Di rumah, keluarga boleh bersedia dengan Umrah for Kids, alat percuma kami: satu langkah pendek sehari selama 29 hari, daripada berniat dan mengemas beg hinggalah tawaf, saie dan pulang ke rumah. Halaman senarai barang daripada pek kertasnya boleh dicetak secara percuma dari tab Print dalam alat itu.',
      'Sebelum perjalanan, kami menjalankan bengkel untuk kanak-kanak berhampiran Arab Street, dan satu lagi selepas keluarga-keluarga pulang.',
      'Semasa umrah itu sendiri, kami mengadakan sesi bercerita. Di Madinah, kanak-kanak melakonkan sebuah drama di atas bukit yang menghadap Gunung Uhud dan mendengar sebuah kisah di kaki gunung itu.',
    ],
    photos: [
      { src: '/photos/ufk-model-tawaf.webp', alt: 'Dino IqraSaurus berjalan mengelilingi model Kaabah di atas tikar di rumah', width: 1600, height: 1600 },
      { src: '/photos/ufk-sample-packing.webp', alt: 'Halaman hitam putih untuk diwarnakan: dino mengemas beg, dengan senarai barang untuk ditanda dan ruang untuk melukis', width: 1600, height: 2264 },
      { src: '/photos/ufk-passport.webp', alt: 'Pasport Umrah Saya: 29 bulatan untuk melukis setem, satu bagi setiap langkah perjalanan', width: 1600, height: 2264 },
    ],
  },
  session: {
    steps: {
      inspire:
        'Dalam bengkel sebelum perjalanan, kanak-kanak mendengar kisah tempat-tempat yang bakal mereka lawati.',
      investigate:
        'Melalui drama, rima dan lembaran kerja, mereka memahami apa yang berlaku pada setiap langkah umrah dan mengapa.',
      integrate:
        'Semasa perjalanan, sesi bercerita di tempat-tempat itu sendiri menghubungkan apa yang mereka pelajari dengan apa yang mereka lihat.',
      impart:
        'Dalam bengkel selepas perjalanan, kanak-kanak berkongsi apa yang mereka lihat dan apa yang paling diingati.',
    },
    tips: {
      younger: 'Gunakan rima dan lakonan. Ia lebih mudah diingati daripada penerangan.',
      older: 'Berikan mereka lembaran kerja dan buku untuk diisi semasa perjalanan.',
    },
  },
  seen: {
    lessons: ['Kanak-kanak sangat seronok dengan drama di atas bukit yang menghadap Gunung Uhud.'],
    photos: [
      { src: '/photos/seen-ufk-pop-up-kabah.webp', alt: 'Kaabah timbul pada papan cerita kad hitam dengan langit kertas koyak', caption: 'Papan cerita Haji timbul buatan seorang kanak-kanak', width: 1600, height: 1441 },
      { src: '/photos/seen-ufk-hajj-route.webp', alt: 'Papan cerita yang menunjukkan laluan Haji dari miqat ke Muzdalifah dalam tujuh langkah', caption: 'Memetakan perjalanan, langkah demi langkah', width: 1600, height: 1130 },
    ],
  },
  bringIt: {
    body: 'Membawa kanak-kanak menunaikan umrah, atau menganjurkan perjalanan umrah keluarga? Hubungi kami tentang bengkel dan sesi bercerita untuk kanak-kanak.',
  },
  seo: {
    description:
      'IqraSaurus menyediakan kanak-kanak untuk umrah dengan drama sirah, rima dan lembaran kerja, sesi bercerita semasa perjalanan, serta bengkel sebelum dan selepasnya.',
  },
}
