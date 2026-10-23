/**
 * apps/storybuzz/content.ms.ts — the Malay (BM) version of content.ts.
 *
 * DRAFT translated from the English on 2026-10-12, to be checked by the owner and asatizah.
 * Only what is here is shown in Malay; anything missing falls back to the English in
 * content.ts. Keep it in step when the English changes. Programme names stay as they are.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {
  hero: {
    line: 'Kisah benar para nabi, diceritakan dengan suara dan dilakonkan oleh kanak-kanak.',
  },
  whatItIs: {
    body: [
      'StoryBuzz menggabungkan sesi bercerita kami (StoryBus) dan sesi drama kami (EduDrama). Kisah-kisahnya ialah kisah benar daripada Al-Quran: para nabi, kesusahan yang mereka hadapi dan bagaimana mereka kembali kepada Allah.',
      'Kami bermula dengan anak-anak kami sendiri. Mereka membesar dengan kisah para nabi sebagai ganti cerita dongeng, kerana kami mahu mereka bersedia menghadapi hari-hari yang sukar dan berakar dalam iman. Apabila ibu bapa lain bertanya bagaimana kami bercerita di rumah, kami membuka sesi itu kepada anak-anak mereka, dan kemudian kepada orang ramai.',
      'Drama lahir daripada renungan tentang ibadah haji Nabi Ibrahim a.s. Bersama anak-anak kami yang bersekolah di rumah, kami melalui latihan haji mini, langkah demi langkah. Kami telah menjalankan sesi StoryBuzz di pusat satelit kami di Bukit Batok dan Tampines, dan di sekolah serta tadika yang menjemput kami.',
    ],
  },
  session: {
    steps: {
      inspire:
        'Kanak-kanak mendengar kisah seorang nabi, diceritakan dengan suara berserta alat bantu dan soalan sepanjang cerita.',
      investigate:
        'Kami berhenti pada saat paling sukar dalam kisah itu dan bertanya apa yang kanak-kanak perhatikan dan apa yang akan mereka lakukan.',
      integrate:
        'Kanak-kanak bercerita tentang saat sukar dalam hidup mereka sendiri dan bagaimana mereka boleh kembali kepada Allah ketika itu.',
      impart:
        'Mereka melakonkan kisah itu dalam drama pendek, kemudian menceritakannya semula kepada keluarga di rumah.',
    },
    tips: {
      younger:
        'Pendekkan cerita dan berikan setiap kanak-kanak satu watak atau alat bantu yang mudah.',
      older: 'Biarkan mereka menulis atau mengarah sebahagian daripada drama itu sendiri.',
    },
  },
  seen: {
    lessons: [
      'Anak-anak kami suka berkongsi kisah-kisah itu dengan kawan-kawan mereka. Begitulah bermulanya sesi pertama untuk keluarga lain.',
      'Latihan haji mini, melakonkan ibadah Nabi Ibrahim a.s., sangat menyeronokkan bagi anak-anak kami.',
    ],
  },
  bringIt: {
    body: 'Ingin sesi bercerita atau drama StoryBuzz di tadika, madrasah, pusat atau kumpulan rumah anda?',
  },
  seo: {
    description:
      'Sesi bercerita dan drama IqraSaurus: kisah benar para nabi daripada Al-Quran, diceritakan dengan suara dan dilakonkan oleh kanak-kanak.',
  },
}
