import React, { useState } from 'react';
import { LaporanTrantibum, AppConfig } from '../types';
import { formatDateIndo, exportToCSV } from '../utils/storage';
import { PrintHeader } from '../components/PrintHeader';
import { PolPPCilikIcon } from '../components/SatpolPPLogo';
import { 
  Table2, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  ExternalLink, 
  Eye, 
  CheckCircle, 
  FileSpreadsheet, 
  Calendar,
  Layers,
  ArrowUpDown,
  RefreshCw,
  Camera
} from 'lucide-react';
import { REGU_OPTIONS, JENIS_KEGIATAN_OPTIONS } from '../data/mockData';

interface RekapitulasiViewProps {
  reports: LaporanTrantibum[];
  config: AppConfig;
  onOpenReportDetail: (report: LaporanTrantibum) => void;
  onSelectPhoto: (photoUrl: string) => void;
}

export const RekapitulasiView: React.FC<RekapitulasiViewProps> = ({
  reports,
  config,
  onOpenReportDetail,
  onSelectPhoto,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegu, setFilterRegu] = useState<string>('Semua');
  const [filterJenis, setFilterJenis] = useState<string>('Semua');
  const [viewTab, setViewTab] = useState<'tabel' | 'sheets_embed'>('tabel');

  // Filter reports
  const filteredReports = reports.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.namaPetugas.toLowerCase().includes(q) ||
      r.lokasi.toLowerCase().includes(q) ||
      r.uraianKegiatan.toLowerCase().includes(q) ||
      r.hasilKegiatan.toLowerCase().includes(q) ||
      (r.nipNik && r.nipNik.toLowerCase().includes(q));

    const matchesRegu = filterRegu === 'Semua' || r.regu === filterRegu;
    const matchesJenis =
      filterJenis === 'Semua' || r.jenisKegiatan.includes(filterJenis);

    return matchesSearch && matchesRegu && matchesJenis;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportToCSV(filteredReports);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Print Kop Surat */}
      <PrintHeader />

      {/* Header section matching Section F */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <Table2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-[10px] font-black uppercase">
                  DOKUBAKU REKAP
                </span>
                <span className="text-xs text-slate-500 font-medium">Satpol PP Kabupaten Lembata</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-wide">
                REKAPITULASI LAPORAN KEGIATAN
              </h2>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <PolPPCilikIcon size={68} gender="putri" />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          Halaman ini digunakan untuk menampilkan rekapitulasi data laporan kegiatan Trantibum yang 
          telah disampaikan oleh petugas melalui formulir digital. Data digunakan untuk membantu proses 
          monitoring, evaluasi, dokumentasi, dan penyusunan laporan kegiatan.
        </p>

        {/* View mode toggle & Action bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewTab('tabel')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                viewTab === 'tabel'
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tabel Spreadsheet Digital ({reports.length} Data)
            </button>

            <button
              onClick={() => setViewTab('sheets_embed')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                viewTab === 'sheets_embed'
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Mode Google Sheets Eksternal
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Ekspor data ke file CSV yang dapat dibuka di Google Sheets / Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV / Sheets</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Cetak Rekap PDF</span>
            </button>

            <a
              href={config.googleSheetsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Buka Spreadsheet di Google Sheets"
            >
              <span>Buka Google Sheets</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* External Sheets Embed View */}
      {viewTab === 'sheets_embed' && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs no-print">
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950">
            <div className="flex items-center gap-2 font-bold mb-1">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Database Google Sheets Satpol PP Kabupaten Lembata</span>
            </div>
            <p>
              Tautan Spreadsheet Google Sheets resmi: <code className="bg-emerald-100 px-1 py-0.5 rounded text-[11px] font-mono break-all">{config.googleSheetsUrl}</code>
            </p>
          </div>

          <div className="aspect-[16/9] w-full border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <FileSpreadsheet className="w-12 h-12 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-800 text-base">
              Spreadsheet Rekapitulasi Laporan Trantibum
            </h3>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-4">
              Database tanggapan terpusat Satpol PP Kabupaten Lembata menyimpan seluruh riwayat kegiatan, tanggal, waktu, petugas pelapor, dan dokumentasi foto.
            </p>
            <div className="flex gap-3">
              <a
                href={config.googleSheetsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span>Buka Google Sheets Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setViewTab('tabel')}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Kembali ke Tabel Interaktif
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Table View */}
      {viewTab === 'tabel' && (
        <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          
          {/* Filter Bar (No print) */}
          <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200/80 no-print flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari petugas, lokasi, uraian..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Regu Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Regu:</span>
                <select
                  value={filterRegu}
                  onChange={(e) => setFilterRegu(e.target.value)}
                  className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-800 cursor-pointer"
                >
                  <option value="Semua">Semua Regu</option>
                  {REGU_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Jenis Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Kegiatan:</span>
                <select
                  value={filterJenis}
                  onChange={(e) => setFilterJenis(e.target.value)}
                  className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-800 max-w-[180px] truncate cursor-pointer"
                >
                  <option value="Semua">Semua Jenis Kegiatan</option>
                  {JENIS_KEGIATAN_OPTIONS.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              {(searchQuery || filterRegu !== 'Semua' || filterJenis !== 'Semua') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterRegu('Semua');
                    setFilterJenis('Semua');
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>

            <div className="text-slate-500 text-xs">
              Menampilkan <strong className="text-slate-800">{filteredReports.length}</strong> dari {reports.length} laporan
            </div>
          </div>

          {/* Table matching Section D Google Sheets columns */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800 uppercase text-[11px] tracking-wider font-semibold">
                  <th className="py-3 px-3 w-12 text-center">No</th>
                  <th className="py-3 px-3 w-24">Tanggal</th>
                  <th className="py-3 px-4 min-w-[160px]">Nama Petugas</th>
                  <th className="py-3 px-3 w-20">Regu</th>
                  <th className="py-3 px-4 min-w-[160px]">Lokasi</th>
                  <th className="py-3 px-3 min-w-[140px]">Jenis Kegiatan</th>
                  <th className="py-3 px-4 min-w-[220px]">Uraian Kegiatan</th>
                  <th className="py-3 px-3 min-w-[120px]">Hasil</th>
                  <th className="py-3 px-3 min-w-[110px]">Kendala</th>
                  <th className="py-3 px-3 min-w-[110px]">Tindak Lanjut</th>
                  <th className="py-3 px-3 min-w-[100px] text-center">Dokumentasi</th>
                  <th className="py-3 px-3 w-16 text-center no-print">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="py-12 text-center text-slate-500">
                      Tidak ada laporan yang sesuai dengan kriteria filter.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="hover:bg-amber-50/30 transition-colors group text-slate-800"
                    >
                      <td className="py-3 px-3 text-center font-mono font-medium text-slate-600">
                        {idx + 1}
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-700">
                        {formatDateIndo(item.tanggal)}
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <div>{item.namaPetugas}</div>
                        <div className="text-[10px] text-slate-400 font-mono font-normal">
                          {item.nipNik || item.jabatan}
                        </div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-emerald-800 whitespace-nowrap">
                        {item.regu}
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        <div className="line-clamp-2" title={item.lokasi}>
                          {item.lokasi}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-800 font-medium">
                        <div className="line-clamp-2">
                          {item.jenisKegiatan.join(', ')}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-600 leading-relaxed">
                        <div className="line-clamp-2" title={item.uraianKegiatan}>
                          {item.uraianKegiatan}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-emerald-900 font-medium">
                        <div className="line-clamp-2" title={item.hasilKegiatan}>
                          {item.hasilKegiatan || '-'}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-600">
                        <div className="line-clamp-2" title={item.kendala}>
                          {item.kendala || 'Tidak ada'}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-blue-900">
                        <div className="line-clamp-2" title={item.tindakLanjut}>
                          {item.tindakLanjut || '-'}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        {item.fotos && item.fotos.length > 0 ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => onSelectPhoto(item.fotos[0].url)}
                              className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-200/80 cursor-pointer shadow-2xs"
                              title="Klik untuk melihat foto"
                            >
                              <Camera className="w-3.5 h-3.5 text-amber-600" />
                              <span>{item.fotos.length} Foto</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">-</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center whitespace-nowrap no-print">
                        <button
                          onClick={() => onOpenReportDetail(item)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Format kolom disesuaikan dengan Google Sheets tanggapan Form Pelaporan Trantibum Satpol PP Lembata.
            </div>
            <div className="font-mono text-slate-700">
              Total Baris: {filteredReports.length} data
            </div>
          </div>
        </section>
      )}

      {/* Signature block when printed */}
      <div className="print-only pt-8 text-xs text-slate-800">
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <p>Mengetahui,</p>
            <p className="font-bold mt-1">Kepala Satuan Polisi Pamong Praja</p>
            <p className="font-bold">Kabupaten Lembata</p>
            <div className="h-16"></div>
            <p className="font-bold underline">( ..................................................... )</p>
            <p className="text-[10px]">Pembina Utama Muda / IV c</p>
            <p className="text-[10px]">NIP. .................................................</p>
          </div>

          <div>
            <p>Lewoleba, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold mt-1">Kepala Seksi Operasional & Ketertiban Umum</p>
            <p className="font-bold">Satpol PP Kabupaten Lembata</p>
            <div className="h-16"></div>
            <p className="font-bold underline">( ..................................................... )</p>
            <p className="text-[10px]">Penata Tingkat I / III d</p>
            <p className="text-[10px]">NIP. .................................................</p>
          </div>
        </div>
      </div>
    </div>
  );
};
