import { LaporanTrantibum } from '../types';

export const INITIAL_LAPORAN: LaporanTrantibum[] = [
  {
    id: 'lap-001',
    noUrut: 1,
    namaPetugas: 'Pankrasius Laba Lajar',
    nipNik: '19880415 201201 1 004',
    jabatan: 'Anggota Satpol PP',
    regu: 'Regu 1',
    tanggal: '2026-09-25',
    waktu: '09:30',
    lokasi: 'Desa Lerek, Kecamatan Atadei, Kabupaten Lembata',
    jenisKegiatan: ['Patroli Trantibum'],
    uraianKegiatan: 'Melaksanakan kegiatan patroli rutin ketenteraman dan ketertiban umum di pemukiman warga dan jalur poros Desa Lerek guna memastikan situasi kamtibmas kondusif.',
    hasilKegiatan: 'Situasi lingkungan aman, tertib, dan kondusif. Warga beraktivitas normal tanpa adanya potensi gangguan ketertiban umum.',
    kendala: 'Tidak ada kendala berarti selama pelaksanaan giat patroli.',
    tindakLanjut: 'Melanjutkan pemantauan berkala dan koordinasi dengan perangkat Desa Lerek.',
    fotos: [
      {
        id: 'f-1',
        url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        keterangan: 'Petugas Regu 1 melakukan dialog interaktif dan pemantauan situasi di Desa Lerek, Atadei',
        namaFile: 'patroli_desa_lerek_01.jpg',
        waktuUpload: '2026-09-25 10:15'
      }
    ],
    keteranganFoto: 'Dokumentasi pelaksanaan patroli Trantibum dan tatap muka bersama warga Desa Lerek.',
    pernyataan: true,
    dibuatPada: '2026-09-25T10:15:00.000Z',
    statusVerifikasi: 'Terverifikasi'
  },
  {
    id: 'lap-002',
    noUrut: 2,
    namaPetugas: 'Yohanes Bala Koten',
    nipNik: '19840210 200902 1 002',
    jabatan: 'Komandan Regu',
    regu: 'Regu 2',
    tanggal: '2026-09-24',
    waktu: '08:00',
    lokasi: 'Pasar TPI Lewoleba, Kelurahan Lewoleba, Kecamatan Nubatukan, Kabupaten Lembata',
    jenisKegiatan: ['Penertiban', 'Pengawasan Ketenteraman dan Ketertiban Umum'],
    uraianKegiatan: 'Melakukan penertiban dan penataan pedagang kaki lima (PKL) yang berjualan melebihi batas trotoar dan memarkir gerobak di bahu jalan raya Pasar TPI.',
    hasilKegiatan: 'Sebanyak 12 pedagang berhasil diarahkan kembali ke dalam area los pasar. Arus lalu lintas di depan pintu masuk pasar kembali lancar dan tertib.',
    kendala: 'Sebagian pedagang sempat enggan berpindah karena alasan pelanggan lebih mudah singgah di pinggir jalan.',
    tindakLanjut: 'Memberikan teguran lisan pertama secara persuasif dan menjadwalkan piket pengawasan berkala setiap pagi di jam sibuk.',
    fotos: [
      {
        id: 'f-2',
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
        keterangan: 'Penataan area trotoar dan himbauan humanis kepada para pedagang di Pasar TPI Lewoleba',
        namaFile: 'penertiban_pasar_lewoleba.jpg',
        waktuUpload: '2026-09-24 09:45'
      },
      {
        id: 'f-3',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        keterangan: 'Arus jalan dan trotoar terpantau bersih serta rapi setelah penataan',
        namaFile: 'hasil_penataan_trotoar.jpg',
        waktuUpload: '2026-09-24 10:00'
      }
    ],
    keteranganFoto: 'Petugas Regu 2 Satpol PP berdialog secara humanis menata batas lapak dagangan pasar.',
    pernyataan: true,
    dibuatPada: '2026-09-24T10:15:00.000Z',
    statusVerifikasi: 'Terverifikasi'
  },
  {
    id: 'lap-003',
    noUrut: 3,
    namaPetugas: 'Maria Goreti Barek',
    nipNik: '19920818 201704 2 003',
    jabatan: 'Anggota Satpol PP',
    regu: 'Regu 3',
    tanggal: '2026-09-23',
    waktu: '07:30',
    lokasi: 'Halaman Kantor Bupati Lembata, Kota Lewoleba, Kabupaten Lembata',
    jenisKegiatan: ['Pengamanan'],
    uraianKegiatan: 'Melaksanakan apel gabungan dan pengamanan seremonial peringatan hari kerja daerah di lingkungan Pemerintah Kabupaten Lembata.',
    hasilKegiatan: 'Seluruh rangkaian kegiatan berjalan khidmat, tertib, dan aman. Protokol lalu lintas masuk dan keluar kendaraan dinas terpantau rapi.',
    kendala: 'Tidak ditemukan kendala maupun gangguan ketenteraman.',
    tindakLanjut: 'Piket pengamanan pos penjagaan Kantor Bupati dilanjutkan oleh personel shift siang.',
    fotos: [
      {
        id: 'f-4',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        keterangan: 'Apel kesiapsiagaan personel Satpol PP di pelataran Kantor Bupati Lembata',
        namaFile: 'pengamanan_kantor_bupati.jpg',
        waktuUpload: '2026-09-23 08:30'
      }
    ],
    keteranganFoto: 'Kesiapsiagaan barisan personel Satpol PP Kabupaten Lembata dalam pengamanan VIP.',
    pernyataan: true,
    dibuatPada: '2026-09-23T08:35:00.000Z',
    statusVerifikasi: 'Terverifikasi'
  },
  {
    id: 'lap-004',
    noUrut: 4,
    namaPetugas: 'Petrus Kanisius Purek',
    nipNik: '19901103 201503 1 002',
    jabatan: 'Penyidik/Penyelidik',
    regu: 'Regu 4',
    tanggal: '2026-09-22',
    waktu: '19:45',
    lokasi: 'Kawasan Wisata Pantai Watuwawer, Kecamatan Atadei, Kabupaten Lembata',
    jenisKegiatan: ['Patroli Trantibum', 'Sosialisasi/Himbauan'],
    uraianKegiatan: 'Patroli malam antisipasi kerumunan anak muda serta sosialisasi pencegahan konsumsi minuman keras lokal di area publik terbuka.',
    hasilKegiatan: 'Memberikan himbauan edukatif kepada 4 kelompok remaja yang berkumpul hingga larut malam dan mengarahkan mereka untuk kembali ke rumah.',
    kendala: 'Penerangan jalan di beberapa titik lokasi pesisir pantai masih minim.',
    tindakLanjut: 'Koordinasi dengan Dinas Perhubungan terkait usulan lampu PJU dan meningkatkan patroli malam akhir pekan.',
    fotos: [
      {
        id: 'f-5',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        keterangan: 'Pemberian arahan humanis kepada warga sekitar pesisir pantai',
        namaFile: 'patroli_malam_watuwawer.jpg',
        waktuUpload: '2026-09-22 21:00'
      }
    ],
    keteranganFoto: 'Patroli malam Satpol PP Lembata dalam menjaga rasa aman masyarakat.',
    pernyataan: true,
    dibuatPada: '2026-09-22T21:10:00.000Z',
    statusVerifikasi: 'Terverifikasi'
  },
  {
    id: 'lap-005',
    noUrut: 5,
    namaPetugas: 'Antonius Bapa Lamak',
    nipNik: '19870612 201101 1 005',
    jabatan: 'Anggota Satpol PP',
    regu: 'Regu 1',
    tanggal: '2026-09-21',
    waktu: '10:00',
    lokasi: 'Kawasan Simpang Lima Wangatoa, Kelurahan Selandoro, Kecamatan Nubatukan',
    jenisKegiatan: ['Pemantauan Wilayah', 'Sosialisasi/Himbauan'],
    uraianKegiatan: 'Melakukan pemantauan ketertiban pemasangan spanduk, baliho, dan banner reklame liar yang tidak berizin serta membahayakan jarak pandang pengendara.',
    hasilKegiatan: 'Terdata 5 spanduk tanpa stempel izin dan telah diturunkan secara tertib bersama pemilik atau pihak pemasang.',
    kendala: 'Sebagian pemasang memasang banner pada tiang listrik umum tanpa konfirmasi.',
    tindakLanjut: 'Menyerahkan berita acara penertiban reklame kepada seksi penegakan Perda untuk tindak lanjut administrasi.',
    fotos: [
      {
        id: 'f-6',
        url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
        keterangan: 'Penertiban media sosialisasi liar di jalur utama Wangatoa',
        namaFile: 'penertiban_reklame_wangatoa.jpg',
        waktuUpload: '2026-09-21 11:30'
      }
    ],
    keteranganFoto: 'Dokumentasi penertiban reklame non-prosedural di Simpang Lima Wangatoa.',
    pernyataan: true,
    dibuatPada: '2026-09-21T11:45:00.000Z',
    statusVerifikasi: 'Terverifikasi'
  }
];

export const JENIS_KEGIATAN_OPTIONS = [
  'Patroli Trantibum',
  'Pengawasan Ketenteraman dan Ketertiban Umum',
  'Penertiban',
  'Pengamanan',
  'Pemantauan Wilayah',
  'Penanganan Gangguan Trantibum',
  'Sosialisasi/Himbauan',
  'Lainnya'
];

export const JABATAN_OPTIONS = [
  'Anggota Satpol PP',
  'Komandan Regu',
  'Staf',
  'Penyidik/Penyelidik',
  'Lainnya'
];

export const REGU_OPTIONS = [
  'Regu 1',
  'Regu 2',
  'Regu 3',
  'Regu 4',
  'Lainnya'
];

export const KECAMATAN_LEMBATA = [
  'Nubatukan (Lewoleba)',
  'Ile Ape',
  'Ile Ape Timur',
  'Lebatukan',
  'Atadei',
  'Nagawutung',
  'Wulandoni',
  'Omesuri',
  'Buyasuri'
];
