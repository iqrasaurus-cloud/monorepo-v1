/**
 * apps/madrasahpreparation/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Keep it in step when the English changes. Programme names stay as they are.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {
  hero: {
    line: 'Menyediakan kanak-kanak untuk Ujian Kemasukan Madrasah, dengan nilai Islam dalam setiap pelajaran.',
  },
  whatItIs: {
    body: [
      'Madrasah Preparation, program Persediaan Ujian Kemasukan Madrasah (METP) kami, menyediakan kanak-kanak untuk Ujian Kemasukan Madrasah. Setiap pelajaran juga membawa satu nilai Islam yang boleh diamalkan oleh kanak-kanak.',
      'Kami memulakannya untuk anak-anak kami sendiri. Sukar untuk mencari penyedia di barat Singapura, jadi kami membina program kami sendiri dan kemudian membukanya kepada keluarga lain.',
      'Buku Quran Investigators kami ialah sebahagian daripada persediaan ini.',
    ],
  },
  session: {
    steps: {
      inspire:
        'Setiap pelajaran dimulakan dengan kisah pendek atau soalan yang membawa nilai hari itu.',
      investigate:
        'Kanak-kanak menjawab soalan latihan seperti soalan dalam ujian kemasukan, dan menerangkan bagaimana mereka mendapat setiap jawapan.',
      integrate:
        'Kami mengaitkan nilai itu dengan hari mereka sendiri, seperti bersikap jujur semasa menyemak kerja sendiri.',
      impart:
        'Kanak-kanak membawa pulang satu halaman latihan dan menerangkannya kepada ibu atau bapa.',
    },
    tips: {
      younger:
        'Bagi kanak-kanak yang belum boleh membaca sendiri, bacakan setiap soalan dengan kuat.',
      older:
        'Bagi pembaca yang yakin, tetapkan masa untuk beberapa soalan supaya hari ujian terasa biasa.',
    },
  },
  seen: {
    photos: [
      { src: '/photos/seen-mp-counting-six.webp', alt: 'Seorang kanak-kanak menyusun enam penanda merah di sebelah penyepit nombor', caption: 'Latihan mengira, Jun 2022', width: 1200, height: 1600 },
      { src: '/photos/seen-mp-counting-four.webp', alt: 'Seorang budak lelaki mengira empat penanda di sebelah penyepit nombor', caption: 'Satu penanda untuk setiap nombor', width: 1200, height: 1600 },
      { src: '/photos/seen-mp-counting-table.webp', alt: 'Tiga orang kanak-kanak di sekeliling meja kecil mengira dengan penanda dan penyepit nombor', caption: 'Kumpulan kecil sedang bekerja', width: 1200, height: 1600 },
      { src: '/photos/seen-mp-colour-mixing.webp', alt: 'Seorang kanak-kanak mencampur warna cat pada lembaran kerja', caption: 'Mencampur warna', width: 1200, height: 1600 },
      { src: '/photos/seen-mp-plasticine-green.webp', alt: 'Seorang kanak-kanak membentuk plastisin hijau di atas meja', caption: 'Membentuk dengan plastisin', width: 1200, height: 1600 },
      { src: '/photos/seen-mp-plasticine-orange.webp', alt: 'Seorang budak lelaki menggulung plastisin oren menjadi bentuk', caption: 'Latihan motor halus', width: 1200, height: 1600 },
    ],
  },
  bringIt: {
    body: 'Sedang menyediakan anak anda untuk Ujian Kemasukan Madrasah, atau ingin menjalankan program ini di pusat anda? Hubungi kami.',
  },
  seo: {
    description:
      'Persediaan Ujian Kemasukan Madrasah oleh IqraSaurus di Singapura, dengan satu nilai Islam yang boleh diamalkan oleh kanak-kanak dalam setiap pelajaran.',
  },
}
