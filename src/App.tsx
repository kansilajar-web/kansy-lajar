import React, { useState, useEffect } from 'react';
import { MenuType, LaporanTrantibum, AppConfig } from './types';
import { 
  getStoredReports, 
  addReport, 
  resetToInitialReports, 
  getAppConfig, 
  saveAppConfig 
} from './utils/storage';
import { HeaderBanner } from './components/HeaderBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { SettingsModal } from './components/SettingsModal';
import { PolPPCilikIcon } from './components/SatpolPPLogo';
import { BerandaView } from './views/BerandaView';
import { ProfilView } from './views/ProfilView';
import { PelaporanView } from './views/PelaporanView';
import { DokumentasiView } from './views/DokumentasiView';
import { RekapitulasiView } from './views/RekapitulasiView';
import { PetunjukView } from './views/PetunjukView';
import { X } from 'lucide-react';

export default function App() {
  const [currentMenu, setCurrentMenu] = useState<MenuType>('beranda');
  const [reports, setReports] = useState<LaporanTrantibum[]>([]);
  const [config, setConfig] = useState<AppConfig>(getAppConfig());
  const [selectedReportDetail, setSelectedReportDetail] = useState<LaporanTrantibum | null>(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load stored reports on initial mount
  useEffect(() => {
    const loaded = getStoredReports();
    setReports(loaded);
  }, []);

  const handleAddReport = (reportData: Omit<LaporanTrantibum, 'id' | 'noUrut' | 'dibuatPada'>) => {
    const created = addReport(reportData);
    setReports(prev => [created, ...prev]);
    return created;
  };

  const handleResetData = () => {
    const reset = resetToInitialReports();
    setReports(reset);
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    saveAppConfig(newConfig);
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-amber-500 selection:text-white relative">
      {/* Official Government Header Banner */}
      <HeaderBanner />

      {/* Main Navigation Bar */}
      <Navbar
        currentMenu={currentMenu}
        onSelectMenu={setCurrentMenu}
        reportCount={reports.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentMenu === 'beranda' && (
          <BerandaView
            onNavigate={setCurrentMenu}
            reports={reports}
            onOpenReportDetail={setSelectedReportDetail}
          />
        )}

        {currentMenu === 'profil' && (
          <ProfilView />
        )}

        {currentMenu === 'pelaporan' && (
          <PelaporanView
            config={config}
            onSubmitReport={handleAddReport}
            onNavigate={setCurrentMenu}
            onOpenReportDetail={setSelectedReportDetail}
          />
        )}

        {currentMenu === 'dokumentasi' && (
          <DokumentasiView
            reports={reports}
            onOpenReportDetail={setSelectedReportDetail}
          />
        )}

        {currentMenu === 'rekapitulasi' && (
          <RekapitulasiView
            reports={reports}
            config={config}
            onOpenReportDetail={setSelectedReportDetail}
            onSelectPhoto={setPreviewPhotoUrl}
          />
        )}

        {currentMenu === 'petunjuk' && (
          <PetunjukView
            onNavigate={setCurrentMenu}
          />
        )}
      </main>

      {/* Floating Pol PP Cilik Mascot Shortcut (Clean - Tanpa Keterangan) */}
      <div className="fixed bottom-5 right-5 z-40 no-print flex flex-col items-end">
        <button
          onClick={() => setCurrentMenu('pelaporan')}
          className="p-1.5 bg-white/95 hover:bg-white rounded-full shadow-xl border-2 border-amber-300 hover:border-amber-400 cursor-pointer transition-all hover:scale-110 active:scale-95 group"
          title="Isi Formulir Pelaporan Kegiatan"
        >
          <PolPPCilikIcon size={58} gender="putra" badge={false} />
        </button>
      </div>

      {/* Footer */}
      <Footer onSelectMenu={setCurrentMenu} />

      {/* Modals */}
      <DetailModal
        report={selectedReportDetail}
        onClose={() => setSelectedReportDetail(null)}
        onSelectPhoto={setPreviewPhotoUrl}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetData={handleResetData}
      />

      {/* Standalone Quick Photo Lightbox */}
      {previewPhotoUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewPhotoUrl(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setPreviewPhotoUrl(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewPhotoUrl}
              alt="Preview Dokumentasi"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
