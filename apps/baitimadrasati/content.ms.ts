/**
 * apps/baitimadrasati/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Keep it in step when the English changes. Programme names stay as they are.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {
  hero: {
    line: 'Cara keluarga kami yang bersekolah di rumah mempelajari Islam, dikongsi supaya keluarga lain boleh mencubanya.',
  },
  whatItIs: {
    body: [
      'Baiti Madrasati bermaksud “rumahku sekolahku”. Kami menyekolahkan anak-anak kami di rumah, dan program ini berkongsi apa yang kami lakukan di rumah supaya keluarga lain boleh mencubanya.',
      'Nadi minggu kami ialah halaqah untuk anak-anak. Kami mengambil sebuah surah, hadis atau kisah seorang nabi, dan anak-anak melukisnya, menulis jurnal tentangnya atau melakonkannya. Pernah sekali kami menjadikan ibadah haji Nabi Ibrahim sebagai latihan haji mini di rumah.',
      'Ibu bapa sering bertanya bagaimana kami bercerita dan mengajar akidah di rumah. Baiti Madrasati ialah tempat kami berkongsi.',
    ],
  },
  session: {
    steps: {
      inspire:
        'Mulakan halaqah dengan kisah, soalan atau sesuatu yang baharu di atas meja, seperti setem atau buku nota baharu.',
      investigate:
        'Bacalah makna surah atau kisah itu bersama-sama dan biarkan anak-anak bertanya soalan mereka dahulu.',
      integrate: 'Sepakati satu perkara yang akan dilakukan oleh keluarga minggu ini kerananya.',
      impart:
        'Anak-anak berkongsi apa yang mereka pelajari dengan datuk atau nenek, sepupu atau kawan.',
    },
    tips: {
      younger: 'Pendekkan dan jadikan ia aktiviti tangan: lukisan, setem dan lakonan.',
      older:
        'Beralih kepada jurnal renungan dan tanyakan apa yang dituntut oleh surah itu daripada mereka minggu ini.',
    },
  },
  seen: {
    lessons: [
      'Latihan haji mini di rumah, melalui ibadah Nabi Ibrahim a.s., sangat menyeronokkan bagi anak-anak kami.',
      'Alat tulis dan setem baharu membuatkan anak-anak kami menanti-nantikan halaqah mingguan.',
    ],
  },
  bringIt: {
    body: 'Menyekolahkan anak di rumah, atau ingin memulakan halaqah mingguan di rumah? Tanyakan kami bagaimana kami menjalankannya.',
  },
  seo: {
    description:
      'Cara sebuah keluarga IqraSaurus yang bersekolah di rumah mempelajari Islam di rumah: halaqah mingguan dengan kisah, lukisan dan jurnal, dikongsi untuk dicuba oleh keluarga lain.',
  },
}
