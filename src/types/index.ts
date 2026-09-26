export interface FotoDokumentasi {
  id: string;
  url: string;
  keterangan: string;
  namaFile?: string;
  waktuUpload?: string;
}

export interface LaporanTrantibum {
  id: string;
  noUrut: number;
  // Bagian 1 - Identitas Petugas
  namaPetugas: string;
  nipNik: string;
  jabatan: 'Anggota Satpol PP' | 'Komandan Regu' | 'Staf' | 'Penyidik/Penyelidik' | 'Lainnya';
  jabatanLainnya?: string;
  regu: 'Regu 1' | 'Regu 2' | 'Regu 3' | 'Regu 4' | 'Lainnya';
  reguLainnya?: string;

  // Bagian 2 - Informasi Kegiatan
  tanggal: string; // YYYY-MM-DD
  waktu: string; // HH:mm
  lokasi: string; // contoh: Desa Lerek, Kecamatan Atadei, Kabupaten Lembata
  jenisKegiatan: string[]; // multi-checkbox
  jenisKegiatanLainnya?: string;

  // Bagian 3 - Uraian Kegiatan
  uraianKegiatan: string;
  hasilKegiatan: string;
  kendala: string;
  tindakLanjut: string;

  // Bagian 4 - Dokumentasi
  fotos: FotoDokumentasi[];
  keteranganFoto: string;

  // Bagian 5 - Pernyataan
  pernyataan: boolean;

  // Metadata
  dibuatPada: string; // ISO string
  statusVerifikasi?: 'Terverifikasi' | 'Menunggu' | 'Revisi';
}

export type MenuType = 
  | 'beranda'
  | 'profil'
  | 'pelaporan'
  | 'dokumentasi'
  | 'rekapitulasi'
  | 'petunjuk';

export interface AppConfig {
  googleFormUrl: string;
  googleSheetsUrl: string;
  instansi: string;
  kabupaten: string;
  kontakDarurat: string;
}
