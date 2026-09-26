import React, { useState, useRef } from 'react';
import { 
  LaporanTrantibum, 
  FotoDokumentasi, 
  AppConfig, 
  MenuType 
} from '../types';
import { 
  JENIS_KEGIATAN_OPTIONS, 
  JABATAN_OPTIONS, 
  REGU_OPTIONS 
} from '../data/mockData';
import { PolPPCilikIcon } from '../components/SatpolPPLogo';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Camera, 
  Trash2, 
  Printer, 
  Eye, 
  HelpCircle, 
  Sparkles,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

interface PelaporanViewProps {
  config: AppConfig;
  onSubmitReport: (report: Omit<LaporanTrantibum, 'id' | 'noUrut' | 'dibuatPada'>) => LaporanTrantibum;
  onNavigate: (menu: MenuType) => void;
  onOpenReportDetail: (report: LaporanTrantibum) => void;
}

export const PelaporanView: React.FC<PelaporanViewProps> = ({
  config,
  onSubmitReport,
  onNavigate,
  onOpenReportDetail,
}) => {
  // Mode: 'digital' or 'embed'
  const [formMode, setFormMode] = useState<'digital' | 'embed'>('digital');

  // Form states
  const [namaPetugas, setNamaPetugas] = useState('');
  const [nipNik, setNipNik] = useState('');
  const [jabatan, setJabatan] = useState<LaporanTrantibum['jabatan']>('Anggota Satpol PP');
  const [jabatanLainnya, setJabatanLainnya] = useState('');
  const [regu, setRegu] = useState<LaporanTrantibum['regu']>('Regu 1');
  const [reguLainnya, setReguLainnya] = useState('');

  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [waktu, setWaktu] = useState(
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':')
  );
  const [lokasi, setLokasi] = useState('');
  const [selectedJenis, setSelectedJenis] = useState<string[]>(['Patroli Trantibum']);
  const [jenisLainnya, setJenisLainnya] = useState('');

  const [uraianKegiatan, setUraianKegiatan] = useState('');
  const [hasilKegiatan, setHasilKegiatan] = useState('');
  const [kendala, setKendala] = useState('');
  const [tindakLanjut, setTindakLanjut] = useState('');

  const [uploadedFotos, setUploadedFotos] = useState<FotoDokumentasi[]>([]);
  const [keteranganFoto, setKeteranganFoto] = useState('');

  const [pernyataan, setPernyataan] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Success state
  const [submittedReport, setSubmittedReport] = useState<LaporanTrantibum | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle Jenis Kegiatan checkbox
  const handleCheckboxChange = (item: string) => {
    if (selectedJenis.includes(item)) {
      setSelectedJenis(selectedJenis.filter(j => j !== item));
    } else {
      setSelectedJenis([...selectedJenis, item]);
    }
  };

  // Handle image upload from file or phone camera
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    if (uploadedFotos.length + files.length > 5) {
      alert('Maksimal lampiran adalah 5 foto dokumentasi.');
      return;
    }

    files.forEach((file) => {
      if (!file.type.match('image.*')) {
        alert('Format file harus berupa gambar (JPG, JPEG, PNG).');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setUploadedFotos(prev => [
          ...prev,
          {
            id: `foto-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            url: result,
            keterangan: file.name,
            namaFile: file.name,
            waktuUpload: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove photo
  const handleRemoveFoto = (id: string) => {
    setUploadedFotos(prev => prev.filter(f => f.id !== id));
  };

  // Quick fill sample data for testing/demo
  const handleQuickFillSample = () => {
    setNamaPetugas('Pankrasius Laba Lajar');
    setNipNik('19880415 201201 1 004');
    setJabatan('Anggota Satpol PP');
    setRegu('Regu 1');
    setTanggal(new Date().toISOString().slice(0, 10));
    setWaktu('09:30');
    setLokasi('Desa Lerek, Kecamatan Atadei, Kabupaten Lembata');
    setSelectedJenis(['Patroli Trantibum']);
    setUraianKegiatan('Melaksanakan pemantauan ketertiban wilayah pemukiman dan pasar mingguan di Desa Lerek, memastikan jalur lalu lintas warga tidak terhambat serta memeriksa pos ronda.');
    setHasilKegiatan('Situasi aman terkendali, kegiatan masyarakat berlangsung tertib tanpa ada potensi kerawanan.');
    setKendala('Akses jalan penghubung di beberapa titik berbatu.');
    setTindakLanjut('Melakukan pemantauan berkala dan koordinasi dengan kepala desa.');
    setKeteranganFoto('Petugas berdialog dengan warga dan memantau kondisi ketertiban umum Desa Lerek.');
    setPernyataan(true);
    if (uploadedFotos.length === 0) {
      setUploadedFotos([
        {
          id: `sample-${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
          keterangan: 'Petugas Regu 1 berdialog dengan warga Desa Lerek, Atadei',
          namaFile: 'patroli_desa_lerek.jpg',
          waktuUpload: '09:45'
        }
      ]);
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validations matching user requirements
    if (!namaPetugas.trim()) {
      setErrorMsg('Nama Petugas wajib diisi.');
      return;
    }
    if (!nipNik.trim()) {
      setErrorMsg('NIP/NIK Petugas wajib diisi.');
      return;
    }
    if (!tanggal) {
      setErrorMsg('Tanggal kegiatan wajib diisi.');
      return;
    }
    if (!lokasi.trim()) {
      setErrorMsg('Lokasi kegiatan wajib diisi (contoh: Desa Lerek, Kecamatan Atadei).');
      return;
    }
    if (selectedJenis.length === 0) {
      setErrorMsg('Pilih minimal satu jenis kegiatan.');
      return;
    }
    if (!uraianKegiatan.trim()) {
      setErrorMsg('Uraian kegiatan wajib diisi.');
      return;
    }
    if (uploadedFotos.length === 0) {
      setErrorMsg('Upload foto dokumentasi kegiatan wajib diisi (minimal 1 foto, maksimal 5 foto).');
      return;
    }
    if (!pernyataan) {
      setErrorMsg('Anda wajib mencentang pernyataan kebenaran data pada Bagian 5.');
      return;
    }

    const newReport = onSubmitReport({
      namaPetugas: namaPetugas.trim(),
      nipNik: nipNik.trim(),
      jabatan,
      jabatanLainnya: jabatan === 'Lainnya' ? jabatanLainnya : undefined,
      regu,
      reguLainnya: regu === 'Lainnya' ? reguLainnya : undefined,
      tanggal,
      waktu,
      lokasi: lokasi.trim(),
      jenisKegiatan: selectedJenis,
      jenisKegiatanLainnya: selectedJenis.includes('Lainnya') ? jenisLainnya : undefined,
      uraianKegiatan: uraianKegiatan.trim(),
      hasilKegiatan: hasilKegiatan.trim() || 'Kondusif',
      kendala: kendala.trim() || 'Tidak ada',
      tindakLanjut: tindakLanjut.trim() || 'Pemantauan berkala',
      fotos: uploadedFotos,
      keteranganFoto: keteranganFoto.trim(),
      pernyataan: true
    });

    setSubmittedReport(newReport);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setNamaPetugas('');
    setNipNik('');
    setJabatan('Anggota Satpol PP');
    setJabatanLainnya('');
    setRegu('Regu 1');
    setReguLainnya('');
    setTanggal(new Date().toISOString().slice(0, 10));
    setLokasi('');
    setSelectedJenis(['Patroli Trantibum']);
    setJenisLainnya('');
    setUraianKegiatan('');
    setHasilKegiatan('');
    setKendala('');
    setTindakLanjut('');
    setUploadedFotos([]);
    setKeteranganFoto('');
    setPernyataan(false);
    setErrorMsg(null);
    setSubmittedReport(null);
  };

  // If successfully submitted, show the response screen
  if (submittedReport) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6">
          
          {/* Mascot Celebration */}
          <div className="flex items-center justify-center gap-4">
            <PolPPCilikIcon size={96} gender="putra" />
            <PolPPCilikIcon size={96} gender="putri" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>DOKUBAKU · Laporan Terverifikasi Sistem</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">
              LAPORAN BERHASIL DIKIRIM
            </h2>
            
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Terima kasih. Data laporan kegiatan Trantibum telah berhasil dikirim ke sistem <strong>DOKUBAKU</strong> dan akan digunakan untuk 
              dokumentasi serta rekapitulasi kegiatan Satpol PP Kabupaten Lembata.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl">
            <p className="text-xs text-amber-900 font-bold italic">
              “Tertib Administrasi, Terarah Pelaporan, Lengkap Dokumentasi.”
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Nomor Registrasi:</span>
              <span className="font-mono font-bold text-slate-900">#{submittedReport.noUrut}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Nama Petugas:</span>
              <span className="font-semibold text-slate-900">{submittedReport.namaPetugas}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Regu & Lokasi:</span>
              <span className="text-slate-800">{submittedReport.regu} · {submittedReport.lokasi}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Dokumentasi:</span>
              <span className="font-semibold text-emerald-700">
                {submittedReport.fotos.length} Foto Terlampir
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenReportDetail(submittedReport)}
              className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Lihat Detail / Cetak Bukti</span>
            </button>

            <button
              onClick={() => onNavigate('rekapitulasi')}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>Buka Rekapitulasi Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              + Input Laporan Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Teks Halaman Pelaporan Kegiatan */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-[11px] font-black uppercase">
                <Sparkles className="w-3 h-3 text-amber-600" />
                DOKUBAKU
              </span>
              <span className="text-xs font-semibold text-slate-500">Satpol PP Kabupaten Lembata</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-wide">
                FORMULIR PELAPORAN KEGIATAN TRANTIBUM
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Formulir ini digunakan oleh petugas untuk melaporkan kegiatan Trantibum yang telah dilaksanakan. 
              Silakan mengisi seluruh data dengan benar dan melampirkan dokumentasi kegiatan sesuai dengan kondisi di lapangan.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <PolPPCilikIcon size={76} gender="putra" />
          </div>
        </div>

        {/* Action Toggle & Shortcut */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormMode('digital')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all border ${
                formMode === 'digital'
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Form Digital Langsung (Otomatis Masuk Rekap)
            </button>

            <button
              type="button"
              onClick={() => setFormMode('embed')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all border ${
                formMode === 'embed'
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Mode Google Form Eksternal
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickFillSample}
              className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1.5 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/80 cursor-pointer shadow-2xs"
              title="Isi otomatis data contoh Pankrasius Laba Lajar (Regu 1, Desa Lerek)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Contoh Pengisian Cepat</span>
            </button>

            <a
              href={config.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-lg cursor-pointer shadow-xs transition-colors"
            >
              <span>📝 BUKA FORMULIR PELAPORAN</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Embed Mode View */}
      {formMode === 'embed' && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold mb-1">
              <ExternalLink className="w-4 h-4 text-amber-600" />
              <span>Integrasi Google Form Satpol PP Kabupaten Lembata</span>
            </div>
            <p>
              Petugas dapat mengisi form melalui tampilan di bawah ini atau membukanya langsung di peramban baru. 
              URL Google Form: <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px] font-mono break-all">{config.googleFormUrl}</code>
            </p>
          </div>

          <div className="aspect-[4/5] sm:aspect-[16/10] w-full border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <FileText className="w-12 h-12 text-slate-400 mb-3" />
            <h3 className="font-bold text-slate-800 text-base">
              Google Form Pelaporan Trantibum Satpol PP Lembata
            </h3>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-4">
              Silakan klik tombol di bawah untuk membuka form resmi di Google Form, atau gunakan formulir digital website yang otomatis tersinkronisasi.
            </p>
            <div className="flex gap-3">
              <a
                href={config.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <span>Buka di Google Form Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setFormMode('digital')}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Gunakan Form Langsung Website
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Full Digital Interactive Form (5 Bagian Lengkap) */}
      {formMode === 'digital' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Header Card Form */}
          <div className="bg-white border-t-8 border-t-amber-500 border-x border-b border-slate-200/80 p-6 sm:p-8 rounded-b-2xl shadow-xs">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              FORMULIR DIGITAL PELAPORAN KEGIATAN TRANTIBUM SATPOL PP KABUPATEN LEMBATA
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Formulir ini digunakan sebagai media dokumentasi dan pelaporan kegiatan ketenteraman dan ketertiban 
              umum (Trantibum) yang dilaksanakan oleh personel Satpol PP Kabupaten Lembata. Mohon mengisi data 
              sesuai dengan kondisi kegiatan yang sebenarnya dan melampirkan dokumentasi kegiatan sebagai bukti pelaksanaan.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-medium">
              <span>* Menandakan pertanyaan yang wajib diisi</span>
              <span className="text-slate-500">Satpol PP Kab. Lembata · NTT</span>
            </div>
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-xs text-rose-800 font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* BAGIAN 1 – Identitas Petugas */}
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 space-y-5 rounded-2xl shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Bagian 1 dari 5
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Identitas Petugas
              </h4>
              <p className="text-xs text-slate-500">
                Data personel Satpol PP yang bertanggung jawab menyampaikan laporan kegiatan.
              </p>
            </div>

            {/* 1. Nama Petugas */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                1. Nama Petugas <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={namaPetugas}
                onChange={(e) => setNamaPetugas(e.target.value)}
                placeholder="Tuliskan nama lengkap petugas pelapor (contoh: Pankrasius Laba Lajar)"
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>

            {/* 2. NIP / NIK */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                2. NIP / NIK <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={nipNik}
                onChange={(e) => setNipNik(e.target.value)}
                placeholder="Nomor Induk Pegawai (NIP) atau Nomor Induk Kependudukan (NIK)"
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none font-mono text-slate-800 transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>

            {/* 3. Jabatan / Status Petugas */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                3. Jabatan / Status Petugas
              </label>
              <select
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 bg-white cursor-pointer"
              >
                {JABATAN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {jabatan === 'Lainnya' && (
                <input
                  type="text"
                  value={jabatanLainnya}
                  onChange={(e) => setJabatanLainnya(e.target.value)}
                  placeholder="Sebutkan jabatan lainnya..."
                  className="mt-2 w-full text-xs px-3.5 py-2 border border-slate-200 rounded-lg"
                />
              )}
            </div>

            {/* 4. Regu / Tim */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                4. Regu / Tim
              </label>
              <select
                value={regu}
                onChange={(e) => setRegu(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 bg-white font-medium cursor-pointer"
              >
                {REGU_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {regu === 'Lainnya' && (
                <input
                  type="text"
                  value={reguLainnya}
                  onChange={(e) => setReguLainnya(e.target.value)}
                  placeholder="Sebutkan nama regu/tim lainnya..."
                  className="mt-2 w-full text-xs px-3.5 py-2 border border-slate-200 rounded-lg"
                />
              )}
            </div>
          </div>

          {/* BAGIAN 2 – Informasi Kegiatan */}
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 space-y-5 rounded-2xl shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Bagian 2 dari 5
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Informasi Kegiatan
              </h4>
              <p className="text-xs text-slate-500">
                Waktu pelaksanaan, lokasi spesifik di Kabupaten Lembata, dan klasifikasi jenis kegiatan Trantibum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 5. Tanggal Kegiatan */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  5. Tanggal Kegiatan <span className="text-rose-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 bg-white"
                />
              </div>

              {/* 6. Waktu Pelaksanaan */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  6. Waktu Pelaksanaan (WITA)
                </label>
                <input
                  type="time"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 bg-white"
                />
              </div>
            </div>

            {/* 7. Lokasi Kegiatan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                7. Lokasi Kegiatan <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Contoh: Desa Lerek, Kecamatan Atadei, Kabupaten Lembata"
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 transition-all bg-slate-50/40 focus:bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Sebutkan nama desa/kelurahan, kecamatan, dan titik objek kegiatan di wilayah Kabupaten Lembata.
              </p>
            </div>

            {/* 8. Jenis Kegiatan (Kotak centang multi) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                8. Jenis Kegiatan <span className="text-rose-600">*</span> (Dapat memilih lebih dari satu)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {JENIS_KEGIATAN_OPTIONS.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                      selectedJenis.includes(item)
                        ? 'border-amber-500 bg-amber-50/70 font-semibold text-slate-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedJenis.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                      className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              {selectedJenis.includes('Lainnya') && (
                <input
                  type="text"
                  value={jenisLainnya}
                  onChange={(e) => setJenisLainnya(e.target.value)}
                  placeholder="Sebutkan jenis kegiatan lainnya..."
                  className="mt-2 w-full text-xs px-3.5 py-2 border border-slate-200 rounded-lg"
                />
              )}
            </div>
          </div>

          {/* BAGIAN 3 – Uraian Kegiatan */}
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 space-y-5 rounded-2xl shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Bagian 3 dari 5
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Uraian Kegiatan
              </h4>
              <p className="text-xs text-slate-500">
                Penjelasan detail kondisi lapangan, tindakan personel Satpol PP, hasil yang dicapai, kendala, dan tindak lanjut.
              </p>
            </div>

            {/* 9. Uraian Kegiatan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                9. Uraian Kegiatan <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={uraianKegiatan}
                onChange={(e) => setUraianKegiatan(e.target.value)}
                placeholder="Jelaskan kegiatan yang dilakukan, kondisi ketertiban yang ditemukan, tindakan pencegahan/penertiban oleh petugas..."
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 leading-relaxed bg-slate-50/40 focus:bg-white"
              />
            </div>

            {/* 10. Hasil Kegiatan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                10. Hasil Kegiatan
              </label>
              <textarea
                rows={2}
                value={hasilKegiatan}
                onChange={(e) => setHasilKegiatan(e.target.value)}
                placeholder="Kondisi setelah pelaksanaan tugas (contoh: Situasi kondusif, PKL tertib berpindah los, arus lalu lintas lancar)"
                className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 leading-relaxed bg-slate-50/40 focus:bg-white"
              />
            </div>

            {/* 11. Kendala yang Ditemukan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                11. Kendala yang Ditemukan
              </label>
              <textarea
                rows={2}
                value={kendala}
                onChange={(e) => setKendala(e.target.value)}
                placeholder="Tuliskan kendala di lapangan jika ada (contoh: Kurangnya penerangan jalan, resistensi awal pedagang, atau cuaca buruk)"
                className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 leading-relaxed bg-slate-50/40 focus:bg-white"
              />
            </div>

            {/* 12. Tindak Lanjut */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                12. Tindak Lanjut
              </label>
              <textarea
                rows={2}
                value={tindakLanjut}
                onChange={(e) => setTindakLanjut(e.target.value)}
                placeholder="Rencana tindak lanjut atau monitoring berkala (contoh: Patroli rutin di jam padat, koordinasi dengan Kades/Dishub)"
                className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 leading-relaxed bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* BAGIAN 4 – Dokumentasi */}
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 space-y-5 rounded-2xl shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Bagian 4 dari 5
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Dokumentasi Kegiatan
              </h4>
              <p className="text-xs text-slate-500">
                Upload foto bukti fisik pelaksanaan tugas Trantibum di lapangan (maksimal 5 foto, format JPG/JPEG/PNG).
              </p>
            </div>

            {/* 13. Upload Foto Dokumentasi */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                13. Upload Foto Dokumentasi Kegiatan <span className="text-rose-600">*</span>
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="foto-upload-input"
              />

              <div className="mt-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <Camera className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-800">
                  Pilih Foto dari Galeri atau Kamera Ponsel
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Maksimal 5 foto (JPG, JPEG, PNG). Terunggah: {uploadedFotos.length}/5 foto
                </p>
                <label
                  htmlFor="foto-upload-input"
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  Pilih Foto Dokumentasi
                </label>
              </div>

              {/* Photo Previews */}
              {uploadedFotos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {uploadedFotos.map((foto, idx) => (
                    <div 
                      key={foto.id} 
                      className="relative group border border-slate-200 rounded-xl overflow-hidden bg-slate-100 shadow-2xs"
                    >
                      <div className="aspect-square">
                        <img
                          src={foto.url}
                          alt={`Dokumentasi ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFoto(foto.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-md cursor-pointer"
                        title="Hapus foto ini"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-md font-mono">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 14. Keterangan Foto */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                14. Keterangan Foto
              </label>
              <textarea
                rows={2}
                value={keteranganFoto}
                onChange={(e) => setKeteranganFoto(e.target.value)}
                placeholder="Jelaskan lokasi/aktivitas pada foto yang dilampirkan (contoh: Petugas Regu 1 berdialog dengan pedagang di los ikan)"
                className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-slate-800 leading-relaxed bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* BAGIAN 5 – Pernyataan Petugas */}
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 space-y-4 rounded-2xl shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Bagian 5 dari 5
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Pernyataan Petugas
              </h4>
            </div>

            {/* 15. Pernyataan */}
            <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={pernyataan}
                  onChange={(e) => setPernyataan(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5 shrink-0"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  “Saya menyatakan bahwa data dan dokumentasi yang saya sampaikan dalam formulir ini sesuai dengan kegiatan yang telah dilaksanakan.” <span className="text-rose-600">*</span>
                </span>
              </label>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Kosongkan Formulir
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <span>KIRIM LAPORAN KEGIATAN</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
