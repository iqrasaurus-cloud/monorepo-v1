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
  bringIt: {
    body: 'Sedang menyediakan anak anda untuk Ujian Kemasukan Madrasah, atau ingin menjalankan program ini di pusat anda? Hubungi kami.',
  },
  seo: {
    description:
      'Persediaan Ujian Kemasukan Madrasah oleh IqraSaurus di Singapura, dengan satu nilai Islam yang boleh diamalkan oleh kanak-kanak dalam setiap pelajaran.',
  },
}
