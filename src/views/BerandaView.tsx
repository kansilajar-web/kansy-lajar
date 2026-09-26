import React, { useState } from 'react';
import { LaporanTrantibum, MenuType } from '../types';
import { formatDateIndo } from '../utils/storage';
import { PolPPCilikIcon } from '../components/SatpolPPLogo';
import { 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Camera, 
  Users, 
  ShieldCheck, 
  FolderSync, 
  Award,
  ChevronRight,
  Database,
  Search,
  Sparkles,
  BookOpen,
  Send,
  CheckCircle2
} from 'lucide-react';

interface BerandaViewProps {
  onNavigate: (menu: MenuType) => void;
  reports: LaporanTrantibum[];
  onOpenReportDetail: (report: LaporanTrantibum) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onNavigate,
  reports,
  onOpenReportDetail,
}) => {
  const [mascotGender, setMascotGender] = useState<'putra' | 'putri'>('putra');
  const totalLaporan = reports.length;
  const totalFoto = reports.reduce((acc, r) => acc + (r.fotos ? r.fotos.length : 0), 0);
  const uniqueRegu = new Set(reports.map(r => r.regu)).size;
  const recentReports = reports.slice(0, 3);

  const tujuanList = [
    'Meningkatkan keteraturan dokumentasi kegiatan Trantibum.',
    'Mempermudah petugas dalam menyampaikan laporan kegiatan.',
    'Memusatkan data dan dokumentasi kegiatan dalam satu sistem.',
    'Memudahkan pencarian dan rekapitulasi laporan.',
    'Mendukung tersedianya data kegiatan yang lebih tertib dan terdokumentasi.'
  ];

  const alurPelaporan = [
    { step: 1, title: 'Petugas Melaksanakan Kegiatan', desc: 'Melaksanakan giat patroli, penertiban, pengamanan, atau pengawasan Trantibum di Lembata.' },
    { step: 2, title: 'Dokumentasi Kegiatan', desc: 'Mengambil dokumentasi foto kondisi lapangan, tindakan personel, dan hasil giat.' },
    { step: 3, title: 'Mengisi Google Form', desc: 'Menginput identitas petugas, waktu, lokasi, uraian hasil, dan melampirkan foto.' },
    { step: 4, title: 'Data Tersimpan', desc: 'Data laporan secara otomatis terintegrasi dan tersimpan aman dalam database spreadsheet.' },
    { step: 5, title: 'Verifikasi / Rekapitulasi', desc: 'Pimpinan & staf mereview, memverifikasi keteraturan laporan, dan merekapitulasi.' },
    { step: 6, title: 'Laporan Kegiatan', desc: 'Tersaji laporan resmi yang siap dicetak, dievaluasi, dan dipertanggungjawabkan.' }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Modern Minimalist Hero Card */}
      <section className="relative rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/40 via-emerald-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="p-6 sm:p-10 lg:p-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (Text & Main Action) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Satpol PP Kabupaten Lembata</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-extrabold text-amber-600 uppercase tracking-widest mb-1">
                  SELAMAT DATANG DI
                </p>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
                    DOKUBAKU
                  </span>
                </h2>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 mt-1 leading-snug">
                  Dokumentasi dan Pelaporan Baku Jaga Trantibum Satuan Polisi Pamong Praja Kabupaten Lembata
                </h3>
              </div>
              
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-1">
                <p className="font-semibold text-amber-950">
                  Subjudul: “Mewujudkan Dokumentasi dan Pelaporan Kegiatan Trantibum yang Cepat, Teratur, Akurat, dan Mudah Diakses.”
                </p>
                <p className="text-slate-600 text-xs">
                  Website ini merupakan media digital resmi yang digunakan untuk mendukung proses dokumentasi dan 
                  pelaporan kegiatan ketenteraman dan ketertiban umum (Trantibum) secara lebih terstruktur, 
                  mudah, cepat, dan terdokumentasi.
                </p>
              </div>

              {/* Main CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('pelaporan')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <span className="text-base">📝</span>
                  <span>ISI LAPORAN KEGIATAN</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  onClick={() => onNavigate('rekapitulasi')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <span>Lihat Rekapitulasi Data</span>
                </button>

                <button
                  onClick={() => onNavigate('petunjuk')}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold hover:underline cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Petunjuk Petugas</span>
                </button>
              </div>
            </div>

            {/* Right Mascot Showcase (Pol PP Cilik - Tanpa Keterangan) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-6 rounded-3xl bg-gradient-to-b from-amber-50/80 via-white to-orange-50/40 border-2 border-amber-200/80 shadow-md max-w-sm w-full text-center flex flex-col items-center">
                
                {/* Toggle Mascot Gender */}
                <div className="flex items-center justify-end w-full mb-3">
                  <div className="flex items-center p-0.5 bg-white rounded-lg border border-amber-200 text-[10px]">
                    <button
                      onClick={() => setMascotGender('putra')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                        mascotGender === 'putra' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Putra
                    </button>
                    <button
                      onClick={() => setMascotGender('putri')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                        mascotGender === 'putri' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Putri
                    </button>
                  </div>
                </div>

                {/* Clean Mascot Visual - No text descriptions */}
                <div className="py-2 transition-transform hover:scale-105 duration-300">
                  <PolPPCilikIcon size={160} gender={mascotGender} badge={false} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Minimalist Stats Strip */}
        <div className="bg-slate-50/80 border-t border-slate-200/80 px-6 sm:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
              {totalLaporan}
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Laporan Masuk</span>
              <span className="font-bold text-slate-900 text-xs">Terdokumentasi</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
              {totalFoto}
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Foto Lapangan</span>
              <span className="font-bold text-emerald-800 text-xs">Bukti Terarsip</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm shrink-0">
              {uniqueRegu}
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Regu Bertugas</span>
              <span className="font-bold text-amber-900 text-xs">Personel Aktif</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm shrink-0">
              9
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Cakupan Wilayah</span>
              <span className="font-bold text-blue-900 text-xs">Kecamatan Lembata</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Tujuan & Alur Pelaporan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tujuan Sistem (Left Column) */}
        <section className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                Tujuan Sistem
              </h3>
              <p className="text-xs text-slate-500">
                Transformasi tertib administrasi Trantibum
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {tujuanList.map((tujuan, idx) => (
              <li key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="leading-snug">{tujuan}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              Slogan Kinerja Trantibum
            </h4>
            <p className="text-xs text-amber-800 italic font-semibold">
              “Tertib Administrasi, Terarah Pelaporan, Lengkap Dokumentasi.”
            </p>
          </div>
        </section>

        {/* Alur Pelaporan (Right Column) */}
        <section className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <FolderSync className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                  Alur Pelaporan Kegiatan
                </h3>
                <p className="text-xs text-slate-500">
                  Tahapan operasional pelaporan lapangan
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline font-mono">
              6 Langkah Teratur
            </span>
          </div>

          {/* Step Timeline */}
          <div className="space-y-2.5 pt-2">
            {alurPelaporan.map((item, idx) => (
              <div 
                key={item.step}
                className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/60 transition-all"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                    {item.step}
                  </div>
                  {idx < alurPelaporan.length - 1 && (
                    <div className="w-0.5 h-3 bg-slate-200 mt-1"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Lihat panduan rincinya di menu Petunjuk Penggunaan.
            </span>
            <button
              onClick={() => onNavigate('petunjuk')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Petunjuk Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* Laporan Terbaru Section */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Laporan Kegiatan Trantibum Terkini
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kegiatan patroli, pengawasan, penertiban, dan pengamanan personel Satpol PP di Kabupaten Lembata.
            </p>
          </div>
          <button
            onClick={() => onNavigate('rekapitulasi')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Semua Laporan di Rekapitulasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentReports.map((report) => (
            <div
              key={report.id}
              onClick={() => onOpenReportDetail(report)}
              className="border border-slate-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between bg-white group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-700 font-mono">
                    {report.regu}
                  </span>
                  <span>{formatDateIndo(report.tanggal)}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1 group-hover:text-amber-700 transition-colors">
                  {report.jenisKegiatan.join(', ')}
                </h4>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{report.lokasi}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {report.uraianKegiatan}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-slate-700 truncate max-w-[150px]">
                  {report.namaPetugas}
                </span>
                <span className="text-amber-600 font-semibold group-hover:translate-x-0.5 transform inline-block transition-transform">
                  Detail →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
