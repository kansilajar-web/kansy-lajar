import React, { useState } from 'react';
import { MenuType } from '../types';
import { PolPPCilikIcon } from '../components/SatpolPPLogo';
import { 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  GraduationCap, 
  FileCheck, 
  Smartphone, 
  Camera, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Share2,
  FolderOpen,
  Sparkles
} from 'lucide-react';

interface PetunjukViewProps {
  onNavigate: (menu: MenuType) => void;
}

export const PetunjukView: React.FC<PetunjukViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const langkahList = [
    {
      no: 1,
      title: 'Buka Portal Sistem Trantibum',
      desc: 'Buka alamat website sistem digital dokumentasi dan pelaporan Satpol PP Kabupaten Lembata melalui peramban HP atau komputer Anda.'
    },
    {
      no: 2,
      title: 'Pilih Menu Pelaporan Kegiatan',
      desc: 'Pada navigasi utama atau beranda, klik menu Pelaporan Kegiatan.'
    },
    {
      no: 3,
      title: 'Klik Isi Laporan Kegiatan',
      desc: 'Tekan tombol "📝 ISI LAPORAN KEGIATAN" untuk membuka formulir digital resmi.'
    },
    {
      no: 4,
      title: 'Isi Identitas Petugas & Informasi Kegiatan',
      desc: 'Lengkapi Nama Lengkap, NIP/NIK, Jabatan, Regu, Tanggal Giat, Waktu Pelaksanaan, Lokasi di Lembata, serta centang jenis kegiatan Trantibum yang dilaksanakan.'
    },
    {
      no: 5,
      title: 'Tuliskan Uraian & Hasil Kegiatan',
      desc: 'Jelaskan kronologis pelaksanaan kegiatan, kondisi ketertiban umum di lapangan, tindakan petugas, hasil yang dicapai, kendala jika ada, dan rencana tindak lanjut.'
    },
    {
      no: 6,
      title: 'Upload Foto Dokumentasi Kegiatan',
      desc: 'Lampirkan bukti foto lapangan (maksimal 5 foto berformat JPG/JPEG/PNG) dan tuliskan deskripsi singkat aktivitas foto.'
    },
    {
      no: 7,
      title: 'Periksa Kembali Seluruh Data',
      desc: 'Baca ulang seluruh isian formulir dan pastikan tidak ada data penting yang terlewat.'
    },
    {
      no: 8,
      title: 'Klik Kirim / Submit',
      desc: 'Centang kotak pernyataan kebenaran data pada Bagian 5, kemudian tekan tombol "KIRIM LAPORAN KEGIATAN".'
    },
    {
      no: 9,
      title: 'Data Tersimpan Secara Otomatis',
      desc: 'Data laporan secara instan tersimpan ke dalam database dan langsung dapat ditinjau pada menu Rekapitulasi Laporan & Galeri Dokumentasi.'
    }
  ];

  const tahapanAktualisasi = [
    {
      no: 1,
      tahap: 'Membuat Media Digital Google Sites / Web Portal',
      keterangan: 'Membangun arsitektur media digital berbasis web yang responsif, terintegrasi, dan mudah diakses dari perangkat mobile personel di lapangan.'
    },
    {
      no: 2,
      tahap: 'Membuat Google Form Pelaporan',
      keterangan: 'Menyusun instrumen formulir pelaporan 5 bagian yang memuat identitas petugas, informasi kegiatan, uraian lapangan, upload dokumentasi foto, dan klausul pernyataan.'
    },
    {
      no: 3,
      tahap: 'Melakukan Uji Coba Pengisian',
      keterangan: 'Melakukan simulasi dan pengujian penginputan laporan bersama Komandan Regu 1, 2, 3, dan 4 untuk memastikan kelancaran alur dan validitas input.'
    },
    {
      no: 4,
      tahap: 'Menginput dan Mengumpulkan Laporan',
      keterangan: 'Menerapkan pengisian laporan rutin setelah setiap penugasan patroli Trantibum, penertiban, pengamanan, dan sosialisasi di wilayah Lembata.'
    },
    {
      no: 5,
      tahap: 'Melakukan Rekapitulasi Data',
      keterangan: 'Mengintegrasikan data hasil laporan ke dalam spreadsheet rekapitulasi terstruktur yang siap disaring, dianalisis, dan diekspor.'
    },
    {
      no: 6,
      tahap: 'Monitoring dan Evaluasi',
      keterangan: 'Melakukan peninjauan berkala terhadap keaktifan pengisian, kendala jaringan di kecamatan pelosok, serta menyusun laporan pertanggungjawaban pimpinan.'
    }
  ];

  const faqs = [
    {
      q: 'Bagaimana jika saat patroli di wilayah pelosok Lembata sinyal internet tidak stabil?',
      a: 'Petugas tetap dapat mengambil foto dokumentasi dan mencatat poin-poin kegiatan di ponsel. Begitu mendapatkan konektivitas internet atau kembali ke posko induk Lewoleba, petugas dapat segera membuka sistem dan mengirimkan laporan.'
    },
    {
      q: 'Berapa jumlah maksimal foto yang dapat diunggah dalam satu laporan kegiatan?',
      a: 'Setiap laporan dapat melampirkan hingga 5 foto dokumentasi berformat JPG, JPEG, atau PNG dengan kompresi otomatis agar hemat kuota internet.'
    },
    {
      q: 'Apakah pimpinan dapat langsung mencetak lembar berita acara laporan per kegiatan?',
      a: 'Ya, pada menu Rekapitulasi atau Beranda, cukup klik tombol "Detail" pada baris laporan, lalu tekan tombol "Cetak Laporan". Sistem telah dilengkapi format resmi kop surat Satpol PP Kabupaten Lembata lengkap dengan kolom tanda tangan pengesahan.'
    },
    {
      q: 'Apakah sistem ini terhubung dengan Google Sheets?',
      a: 'Benar. Format tabel rekapitulasi diselaraskan 100% dengan struktur Google Sheets tanggapan form, serta dapat diekspor menjadi file CSV/Excel atau dihubungkan langsung ke tautan spreadsheet resmi.'
    }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* Header section with Pol PP Cilik */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-[10px] font-black uppercase">
                <Sparkles className="w-3 h-3 text-amber-600" />
                DOKUBAKU SOP
              </span>
              <span className="text-xs text-slate-500 font-medium">Satpol PP Kabupaten Lembata</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-wide">
                PETUNJUK PENGGUNAAN SISTEM DOKUBAKU
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Panduan operasional bagi personel Satuan Polisi Pamong Praja Kabupaten Lembata dalam 
              memanfaatkan sistem digital dokumentasi dan pelaporan kegiatan Trantibum dari awal penugasan 
              hingga rekapitulasi data.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate('pelaporan')}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span>Mulai Isi Laporan Kegiatan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('rekapitulasi')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                <span>Tinjau Rekapitulasi</span>
              </button>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center p-2.5 bg-gradient-to-b from-amber-50 to-orange-50/60 rounded-3xl border-2 border-amber-200/80 shadow-xs">
            <PolPPCilikIcon size={80} gender="putra" badge={false} />
          </div>
        </div>
      </section>

      {/* 9 Langkah Penggunaan Sistem */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Langkah Penggunaan Sistem Bagi Petugas
            </h3>
            <p className="text-xs text-slate-500">
              Ikuti 9 tahapan berikut secara berurutan untuk setiap pelaksanaan kegiatan di lapangan:
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            SOP 9 Langkah
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {langkahList.map((item) => (
            <div
              key={item.no}
              className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl hover:border-amber-400 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-amber-400 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                    {item.no}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center text-[10px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                <span>Tahap Standar</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bagian H – Struktur Sistem (Diagram Alir) */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Bagian H: Struktur Sistem Terpadu
            </h3>
            <p className="text-xs text-slate-500">
              Alur integrasi dari portal digital hingga pelaporan pimpinan
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600">
          Arsitektur terintegrasi yang menghubungkan portal informasi, formulir input data lapangan, basis data spreadsheet, hingga monitoring dan pelaporan berkala:
        </p>

        {/* Visual Architecture Flow */}
        <div className="p-6 bg-slate-950 text-white rounded-2xl overflow-x-auto shadow-sm border border-slate-800">
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {[
              { label: 'GOOGLE SITES', desc: 'Portal Utama' },
              { label: 'BERANDA', desc: 'Informasi & Alur' },
              { label: 'PELAPORAN', desc: 'Akses Form' },
              { label: 'GOOGLE FORM', desc: 'Input 5 Bagian' },
              { label: 'GOOGLE SHEETS', desc: 'Database Respon' },
              { label: 'REKAPITULASI DATA', desc: 'Tabel & Filter' },
              { label: 'MONITORING & PELAPORAN', desc: 'Evaluasi Pimpinan' }
            ].map((node, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center p-3.5 bg-slate-900 border border-slate-800 rounded-xl shrink-0 w-28 hover:border-amber-400 transition-colors">
                  <span className="text-[11px] font-bold text-amber-400 font-mono leading-tight">
                    {node.label}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-1">
                    {node.desc}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian I – Keterkaitan dengan Rancangan Aktualisasi */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Bagian I: Keterkaitan dengan Rancangan Aktualisasi
            </h3>
            <p className="text-xs text-slate-500">
              Penerapan Nilai-Nilai Dasar ASN BerAKHLAK
            </p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-xl text-xs text-amber-950 space-y-1">
          <p className="font-bold">
            Output Kegiatan Aktualisasi Satpol PP Kabupaten Lembata:
          </p>
          <p className="leading-relaxed">
            Sistem ini merupakan output nyata dari gagasan pemecahan isu optimalisasi dokumentasi 
            dan pelaporan kegiatan Trantibum pada Satuan Polisi Pamong Praja Kabupaten Lembata. 
            Mendukung akuntabilitas kinerja, adaptasi teknologi informasi, dan pelayanan prima kepada masyarakat.
          </p>
        </div>

        <div className="space-y-3 text-xs pt-1">
          {tahapanAktualisasi.map((item) => (
            <div
              key={item.no}
              className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-start gap-3 hover:bg-slate-50 transition-colors"
            >
              <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {item.no}
              </span>
              <div>
                <h4 className="font-bold text-slate-900">
                  Tahapan {item.no}: {item.tahap}
                </h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {item.keterangan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
          Tanya Jawab Seputar Penggunaan (FAQ)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
