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
  seo: {
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
