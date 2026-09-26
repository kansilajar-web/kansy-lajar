import React from 'react';
import { LaporanTrantibum } from '../types';
import { formatDateIndo } from '../utils/storage';
import { PrintHeader } from './PrintHeader';
import { PolPPCilikIcon } from './SatpolPPLogo';
import { 
  X, 
  Printer, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Shield, 
  CheckCircle2, 
  FileCheck, 
  Camera, 
  AlertTriangle 
} from 'lucide-react';

interface DetailModalProps {
  report: LaporanTrantibum | null;
  onClose: () => void;
  onSelectPhoto?: (photoUrl: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  report,
  onClose,
  onSelectPhoto,
}) => {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200/80 animate-in fade-in duration-200">
        
        {/* Modal Top Bar (Hidden during print) */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between no-print shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <PolPPCilikIcon size={46} gender="putra" badge={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.2 rounded-full border border-amber-400/40">
                  DOKUBAKU
                </span>
                <h3 className="font-bold text-xs sm:text-sm tracking-wide">
                  Laporan Trantibum #{report.noUrut}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">
                Satpol PP Kabupaten Lembata · Tanggal {formatDateIndo(report.tanggal)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-200 hover:text-white transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Cetak Laporan</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Print Kop Surat (Visible only when printed) */}
          <PrintHeader />

          {/* Report Title / Headline */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-slate-500">
              <span className="font-mono text-slate-500">ID Dokumen: {report.id}</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Status: {report.statusVerifikasi || 'Terverifikasi'}
                </span>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {report.jenisKegiatan.join(' & ')}
            </h2>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDateIndo(report.tanggal)}</span>
              </div>
              {report.waktu && (
                <>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{report.waktu} WITA</span>
                  </div>
                </>
              )}
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-slate-800">{report.lokasi}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Data Petugas */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>Bagian 1: Identitas Personel Petugas</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Nama Petugas:</span>
                <span className="font-bold text-slate-900">{report.namaPetugas}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">NIP / NIK:</span>
                <span className="font-mono text-slate-800">{report.nipNik || '-'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Jabatan / Status:</span>
                <span className="text-slate-800">
                  {report.jabatan === 'Lainnya' ? report.jabatanLainnya || 'Lainnya' : report.jabatan}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Regu / Tim:</span>
                <span className="font-semibold text-emerald-800">
                  {report.regu === 'Lainnya' ? report.reguLainnya || 'Lainnya' : report.regu}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2 & 3: Uraian Kegiatan */}
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1.5">
                Uraian Kegiatan & Kondisi Lapangan
              </h4>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed whitespace-pre-line shadow-2xs">
                {report.uraianKegiatan || '-'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1.5 text-emerald-800">
                  Hasil Kegiatan
                </h4>
                <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-slate-700 leading-relaxed whitespace-pre-line">
                  {report.hasilKegiatan || '-'}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1.5 text-amber-800">
                  Kendala yang Ditemukan
                </h4>
                <div className="p-3.5 bg-amber-50/40 border border-amber-100 rounded-xl text-slate-700 leading-relaxed whitespace-pre-line">
                  {report.kendala || 'Tidak ada kendala'}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1.5 text-blue-900">
                Rencana Tindak Lanjut
              </h4>
              <div className="p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl text-slate-700 leading-relaxed whitespace-pre-line">
                {report.tindakLanjut || '-'}
              </div>
            </div>
          </div>

          {/* Section 4: Foto Dokumentasi */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-slate-600" />
              <span>Dokumentasi Kegiatan ({report.fotos.length} Foto)</span>
            </h4>
            
            {report.fotos.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                Tidak ada lampiran foto untuk laporan ini.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {report.fotos.map((foto, idx) => (
                  <div 
                    key={foto.id || idx} 
                    className="group border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-2xs"
                  >
                    <div 
                      className="aspect-video relative overflow-hidden bg-slate-900 cursor-pointer"
                      onClick={() => onSelectPhoto && onSelectPhoto(foto.url)}
                    >
                      <img 
                        src={foto.url} 
                        alt={foto.keterangan || `Foto dokumentasi ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <span className="no-print absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[10px] rounded-md font-mono">
                        Klik perbesar
                      </span>
                    </div>
                    {foto.keterangan && (
                      <p className="p-2.5 text-[11px] text-slate-600 leading-tight">
                        {foto.keterangan}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {report.keteranganFoto && (
              <p className="mt-2 text-xs text-slate-600 italic">
                <span className="font-semibold text-slate-700 not-italic">Catatan Foto: </span>
                {report.keteranganFoto}
              </p>
            )}
          </div>

          {/* Section 5: Lembar Pengesahan Petugas (Print Friendly) */}
          <div className="pt-6 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pernyataan telah diverifikasi & sesuai dengan kondisi lapangan yang sebenarnya.</span>
            </div>

            <div className="grid grid-cols-2 gap-8 text-center pt-2">
              <div>
                <p className="text-slate-500">Mengetahui,</p>
                <p className="font-bold text-slate-900 mt-1">Komandan Regu / Kasie Trantibum</p>
                <div className="h-16"></div>
                <p className="font-bold text-slate-900 underline">( ............................................ )</p>
                <p className="text-[10px] text-slate-500">NIP. .................................................</p>
              </div>

              <div>
                <p className="text-slate-500">Lewoleba, {formatDateIndo(report.tanggal)}</p>
                <p className="font-bold text-slate-900 mt-1">Petugas Pelapor Lapangan</p>
                <div className="h-16"></div>
                <p className="font-bold text-slate-900 underline">{report.namaPetugas}</p>
                <p className="text-[10px] text-slate-500">NIP/NIK: {report.nipNik || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-3.5 flex items-center justify-between no-print">
          <span className="text-[11px] text-slate-500">
            Sistem Digital Dokumentasi & Pelaporan Trantibum Satpol PP Lembata
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
