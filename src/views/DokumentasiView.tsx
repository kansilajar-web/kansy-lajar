import React, { useState } from 'react';
import { LaporanTrantibum, FotoDokumentasi } from '../types';
import { formatDateIndo } from '../utils/storage';
import { PolPPCilikIcon } from '../components/SatpolPPLogo';
import { 
  Camera, 
  Search, 
  MapPin, 
  Calendar, 
  User, 
  Download, 
  ExternalLink, 
  X, 
  Filter,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface DokumentasiViewProps {
  reports: LaporanTrantibum[];
  onOpenReportDetail: (report: LaporanTrantibum) => void;
}

interface FlattenedFoto {
  foto: FotoDokumentasi;
  report: LaporanTrantibum;
}

export const DokumentasiView: React.FC<DokumentasiViewProps> = ({
  reports,
  onOpenReportDetail,
}) => {
  const categories = [
    'Semua',
    'Patroli Trantibum',
    'Pengamanan',
    'Penertiban',
    'Pemantauan Wilayah',
    'Sosialisasi/Himbauan'
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightbox, setActiveLightbox] = useState<FlattenedFoto | null>(null);

  // Flatten all photos with their parent report
  const allFotos: FlattenedFoto[] = reports.flatMap((report) =>
    (report.fotos || []).map((foto) => ({
      foto,
      report
    }))
  );

  // Filter based on category and search query
  const filteredFotos = allFotos.filter(({ foto, report }) => {
    const categoryMatch =
      selectedCategory === 'Semua' ||
      report.jenisKegiatan.includes(selectedCategory);

    const q = searchQuery.toLowerCase();
    const searchMatch =
      !q ||
      report.lokasi.toLowerCase().includes(q) ||
      report.namaPetugas.toLowerCase().includes(q) ||
      (foto.keterangan || '').toLowerCase().includes(q) ||
      (report.keteranganFoto || '').toLowerCase().includes(q) ||
      report.regu.toLowerCase().includes(q);

    return categoryMatch && searchMatch;
  });

  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'dokumentasi_trantibum_satpol_pp_lembata.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-[10px] font-black uppercase">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  DOKUBAKU
                </span>
                <span className="text-xs text-slate-500 font-medium">Satpol PP Kabupaten Lembata</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-wide">
                DOKUMENTASI KEGIATAN TRANTIBUM
              </h2>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <PolPPCilikIcon size={68} gender="putra" />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          Halaman ini memuat dokumentasi kegiatan Trantibum Satpol PP Kabupaten Lembata yang telah 
          dilaksanakan oleh personel di berbagai wilayah penugasan. Dokumentasi digunakan sebagai bagian dari 
          bukti pelaksanaan kegiatan serta mendukung tertib administrasi dan pelaporan kegiatan.
        </p>

        {/* Minimalist Filter Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lokasi, petugas, keterangan..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Menampilkan <strong className="text-slate-800 font-bold">{filteredFotos.length}</strong> foto dokumentasi
          </span>
          {selectedCategory !== 'Semua' && (
            <span>
              Kategori: <strong className="text-emerald-700 font-semibold">{selectedCategory}</strong>
            </span>
          )}
        </div>

        {filteredFotos.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <Camera className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              Belum Ada Foto Dokumentasi Ditemukan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tidak ada dokumentasi foto yang cocok dengan kata kunci pencarian atau kategori yang dipilih.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredFotos.map(({ foto, report }, idx) => (
              <div
                key={foto.id || idx}
                className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div
                    className="aspect-[4/3] bg-slate-900 relative overflow-hidden cursor-pointer"
                    onClick={() => setActiveLightbox({ foto, report })}
                  >
                    <img
                      src={foto.url}
                      alt={foto.keterangan || 'Dokumentasi Trantibum'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2.5 bg-white/95 text-slate-900 rounded-full shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      {formatDateIndo(report.tanggal)}
                    </span>
                  </div>

                  {/* Caption & Location */}
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] text-emerald-700 font-semibold truncate">
                      {report.jenisKegiatan.join(', ')}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {foto.keterangan || report.keteranganFoto || report.uraianKegiatan}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{report.lokasi}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Officer Attribution */}
                <div className="px-4 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 truncate max-w-[140px]">
                    {report.namaPetugas} ({report.regu})
                  </span>

                  <button
                    onClick={() => onOpenReportDetail(report)}
                    className="text-amber-700 hover:text-amber-900 font-bold cursor-pointer"
                  >
                    Laporan #{report.noUrut}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-amber-400">
                  {activeLightbox.report.jenisKegiatan.join(', ')}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {activeLightbox.report.lokasi} · {formatDateIndo(activeLightbox.report.tanggal)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleDownload(
                      activeLightbox.foto.url,
                      activeLightbox.foto.namaFile || 'dokumentasi_lembata.jpg'
                    )
                  }
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Unduh Foto"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo View */}
            <div className="max-h-[65vh] flex items-center justify-center bg-black/70 p-3">
              <img
                src={activeLightbox.foto.url}
                alt="Dokumentasi Trantibum"
                className="max-h-[60vh] max-w-full object-contain mx-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Description & Action Bar */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <p className="font-semibold text-slate-200">
                  {activeLightbox.foto.keterangan || activeLightbox.report.keteranganFoto || 'Dokumentasi giat Trantibum Satpol PP Lembata'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Personel Pelapor: {activeLightbox.report.namaPetugas} · {activeLightbox.report.regu} · NIP/NIK: {activeLightbox.report.nipNik}
                </p>
              </div>

              <button
                onClick={() => {
                  const targetReport = activeLightbox.report;
                  setActiveLightbox(null);
                  onOpenReportDetail(targetReport);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs transition-colors"
              >
                <span>Buka Detail Laporan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
