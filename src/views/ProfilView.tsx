import React from 'react';
import { SatpolPPLembataLogo, PolPPCilikIcon, SATPOL_HD_SHIELD_IMG } from '../components/SatpolPPLogo';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Target, 
  CheckCircle2, 
  Award,
  Users,
  Sparkles
} from 'lucide-react';
import { KECAMATAN_LEMBATA } from '../data/mockData';

export const ProfilView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* Profil Header Card */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Logo HD Showcase - NO BACKGROUND (TRANSPARENT) & BIGGER */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="transition-transform hover:scale-105 filter drop-shadow-md">
              <SatpolPPLembataLogo size={108} />
            </div>
            <PolPPCilikIcon size={108} gender="putra" />
          </div>

          <div className="text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                DOKUBAKU LEMBATA
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                Profil Perangkat Daerah
              </span>
            </div>
            
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              SATUAN POLISI PAMONG PRAJA KABUPATEN LEMBATA
            </h2>
            <p className="text-xs sm:text-sm font-bold text-emerald-800 uppercase tracking-wide">
              Bidang Ketenteraman, Ketertiban Umum, dan Penegakan Peraturan Daerah
            </p>
            <p className="pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              Satuan Polisi Pamong Praja Kabupaten Lembata merupakan perangkat daerah yang mempunyai 
              tugas dalam penyelenggaraan ketenteraman dan ketertiban umum serta penegakan Peraturan 
              Daerah dan Peraturan Kepala Daerah sesuai dengan ketentuan peraturan perundang-undangan.
            </p>
          </div>
        </div>
      </section>

      {/* Latar Belakang & Tujuan Pengembangan Sistem Digital */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Latar Belakang & Tujuan Pengembangan Sistem
          </h3>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <p>
            Dalam pelaksanaan tugas di lapangan, kegiatan Trantibum memerlukan dokumentasi dan 
            pelaporan yang tertib sebagai bentuk pertanggungjawaban pelaksanaan tugas. Selama ini, 
            pencatatan manual dan penyebaran dokumentasi melalui berbagai kanal percakapan berpotensi 
            menimbulkan tumpukan arsip yang sulit dicari kembali ketika dibutuhkan untuk evaluasi atau pelaporan berkala pimpinan.
          </p>
          
          <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-xl">
            <p className="font-semibold text-emerald-950 italic text-xs sm:text-sm">
              “Sistem digital ini dirancang sebagai salah satu upaya untuk mendukung proses dokumentasi dan 
              pelaporan kegiatan agar data kegiatan dapat tersimpan secara lebih terstruktur dan mudah ditelusuri.”
            </p>
          </div>

          <p>
            Dengan tersedianya formulir pelaporan digital yang terintegrasi langsung dengan database 
            spreadsheet rekapitulasi, setiap regu patroli dan personel lapangan dapat segera menginput 
            laporan begitu giat selesai dilaksanakan, disertai bukti foto geolokasi dan kondisi riil di lapangan.
          </p>
        </div>
      </section>

      {/* Tugas Pokok, Fungsi, & Prinsip Satpol PP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tugas Pokok & Fungsi */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Tugas Pokok & Fungsi Trantibum
            </h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="text-amber-500 font-bold">1.</span>
              <span>
                <strong>Penegakan Perda & Perkada:</strong> Menyelenggarakan tindakan pengawasan dan penindakan non-yustisial serta yustisial terhadap pelanggaran peraturan daerah di Kabupaten Lembata.
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="text-amber-500 font-bold">2.</span>
              <span>
                <strong>Penyelenggaraan Trantibum:</strong> Menjaga ketenteraman dan ketertiban masyarakat di pusat keramaian, pasar, pesisir pantai, dan fasilitas publik.
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="text-amber-500 font-bold">3.</span>
              <span>
                <strong>Pengamanan Aset & Protokoler:</strong> Melaksanakan pengamanan kantor pemerintahan, pejabat negara/daerah, dan acara resmi Pemerintah Daerah.
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="text-amber-500 font-bold">4.</span>
              <span>
                <strong>Pembinaan & Sosialisasi:</strong> Memberikan edukasi humanis kepada masyarakat dan pelaku usaha mengenai ketaatan aturan ketertiban umum.
              </span>
            </li>
          </ul>
        </section>

        {/* Nilai Budaya Kerja */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Nilai Budaya Kerja: Praja Wibawa
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900">1. Disiplin & Tanggap</h4>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Kesiapsiagaan penuh dalam merespons potensi gangguan ketertiban umum di seluruh penjuru Lembata.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900">2. Humanis & Berkeadilan</h4>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Mengedepankan pendekatan persuasif, edukatif, dan ramah namun tetap tegas dalam menegakkan aturan.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
              <h4 className="font-bold text-slate-900">3. Tertib Administrasi & Transparan</h4>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Setiap tindakan di lapangan wajib didokumentasikan dan dilaporkan secara akuntabel dalam sistem digital.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Wilayah Penugasan Kabupaten Lembata */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Wilayah Kerja 9 Kecamatan Kabupaten Lembata
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Provinsi NTT</span>
        </div>

        <p className="text-xs text-slate-600">
          Satuan Polisi Pamong Praja Kabupaten Lembata mengemban amanah penyelenggaraan Trantibum di 9 kecamatan pulau Lomblen (Lembata):
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          {KECAMATAN_LEMBATA.map((kec, idx) => (
            <div 
              key={idx}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></div>
              <span className="font-medium text-slate-800">{kec}</span>
            </div>
          ))}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></div>
            <span className="font-bold text-amber-900">Pos Induk: Lewoleba</span>
          </div>
        </div>
      </section>
    </div>
  );
};
