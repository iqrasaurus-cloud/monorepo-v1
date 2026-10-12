/**
 * apps/quraninvestigators/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Keep it in step when the English changes. Programme names stay as they are.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {
  hero: {
    line: 'Buku aktiviti yang membantu kanak-kanak meneroka satu surah pada satu masa.',
  },
  whatItIs: {
    body: [
      'Setiap buku merangkumi satu surah dalam kira-kira 40 halaman. Kanak-kanak mencari surah itu dalam mushaf, memadankan setiap ayat dengan maknanya, kemudian mewarna, mengira, menyelesaikan teka-teki dan melukis. Setiap halaman ada dua tahap, jadi kanak-kanak berumur 5 tahun dan 10 tahun boleh belajar di meja yang sama.',
      'Kami telah menggunakan buku-buku ini dalam kelas kami sendiri, di rumah, dan untuk menyediakan kanak-kanak bagi ujian kemasukan madrasah.',
      'Quran Investigators bermula daripada halaqah keluarga kami. Semasa anak-anak kami masih kecil, mereka melukis renungan mereka tentang sesuatu surah. Apabila mereka semakin besar, kami beralih kepada jurnal renungan dan bertanya bagaimana mereka boleh mengamalkan setiap surah dalam kehidupan mereka. Dari situlah lahirnya buku-buku ini.',
    ],
    sources:
      'Siri ini berdasarkan Tafsir Ibn Kathir dan terjemahan Al-Quran Sahih International. Hadis yang dipetik dalam siri ini diambil daripada koleksi Sahih Al-Bukhari dan Muslim.',
  },
  session: {
    duration: 'Kira-kira 40 minit',
    steps: {
      inspire:
        'Bacakan adab menuntut ilmu bersama-sama. Ceritakan kisah di sebalik surah itu sementara kanak-kanak mewarna halaman gambar.',
      investigate:
        'Kanak-kanak mencari surah itu dalam mushaf sebenar dan mencatat nombor serta halamannya. Kemudian pilih 3–4 aktiviti, seperti satu aktiviti menyurih, satu teka-teki dan satu halaman sains.',
      integrate:
        'Pada halaman jurnal, setiap kanak-kanak menulis atau melukis satu perkara yang akan dilakukannya minggu ini kerana surah itu.',
      impart: 'Setiap kanak-kanak menerangkan lukisannya kepada seseorang di rumah.',
    },
    tips: {
      younger: 'Buat lebih sedikit halaman dan bacakan semuanya dengan kuat.',
      older: 'Berikan mereka mushaf dan terjemahannya, dan biarkan mereka memimpin.',
    },
  },
  seen: {
    lessons: [
      'Melukis sesuai untuk anak-anak kami semasa mereka masih terlalu kecil untuk banyak menulis. Jurnal, dan kemudian buku-buku ini, datang apabila mereka semakin besar.',
    ],
  },
  bringIt: {
    body: 'Ingin menggunakan Quran Investigators di madrasah, pusat atau kumpulan rumah anda, atau membantu menguji buku baharu?',
    donateLine: 'Derma membiayai semakan dan cetakan surah seterusnya.',
  },
  seo: {
    description:
      'Buku aktiviti IqraSaurus yang membantu kanak-kanak meneroka satu surah pada satu masa: cari surah dalam mushaf, padankan setiap ayat dengan maknanya, kemudian mewarna, mengira dan melukis.',
  },
}
