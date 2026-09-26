import React, { useState } from 'react';
import { MenuType } from '../types';
import { PolPPCilikIcon } from './SatpolPPLogo';
import { 
  Home, 
  Building2, 
  FileText, 
  Image as ImageIcon, 
  Table2, 
  HelpCircle, 
  Menu as MenuIcon, 
  X, 
  Plus,
  Settings,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentMenu: MenuType;
  onSelectMenu: (menu: MenuType) => void;
  reportCount: number;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMenu,
  onSelectMenu,
  reportCount,
  onOpenSettings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { id: MenuType; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'profil', label: 'Profil', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'pelaporan', label: 'Pelaporan Kegiatan', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'dokumentasi', label: 'Dokumentasi Kegiatan', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'rekapitulasi', label: 'Rekapitulasi Laporan', icon: <Table2 className="w-3.5 h-3.5" /> },
    { id: 'petunjuk', label: 'Petunjuk Penggunaan', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  const handleSelect = (id: MenuType) => {
    onSelectMenu(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md text-white border-b border-slate-800/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Desktop Navigation Items with DOKUBAKU Brand Badge */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => handleSelect('beranda')}
              className="flex items-center gap-2.5 pr-4 mr-1 border-r border-slate-800 hover:opacity-90 transition-opacity cursor-pointer"
              title="Beranda DOKUBAKU"
            >
              <PolPPCilikIcon size={36} badge={false} />
              <div className="text-left leading-none">
                <span className="text-sm font-black tracking-wider bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
                  DOKUBAKU
                </span>
                <span className="block text-[9px] font-semibold text-slate-400 uppercase tracking-tight">
                  Satpol PP Lembata
                </span>
              </div>
            </button>

            {menuItems.map((item) => {
              const isActive = currentMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-white bg-slate-800/90 font-semibold shadow-xs ring-1 ring-slate-700/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                  )}
                  {item.id === 'rekapitulasi' && reportCount > 0 && (
                    <span className="text-[10px] text-amber-400/90 font-mono font-normal bg-amber-500/10 px-1.5 py-0.2 rounded-full border border-amber-500/20">
                      {reportCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Action Button & Maskot Widget (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleSelect('pelaporan')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Isi Laporan Kegiatan</span>
            </button>

            <button
              onClick={onOpenSettings}
              title="Pengaturan Tautan Google Form & Sheets"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Current Menu Pill with DOKUBAKU */}
          <div className="lg:hidden flex items-center gap-2">
            <PolPPCilikIcon size={34} badge={false} />
            <div className="text-left leading-tight">
              <span className="text-xs font-black tracking-wider text-amber-300">
                DOKUBAKU
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">
                {menuItems.find(m => m.id === currentMenu)?.label || 'Menu'}
              </span>
            </div>
          </div>

          {/* Mobile Action Controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={() => handleSelect('pelaporan')}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-md shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Lapor</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="p-1.5 text-slate-400 hover:text-white"
              title="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-bold ring-1 ring-slate-700'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.id === 'rekapitulasi' && reportCount > 0 && (
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-mono">
                    {reportCount} data
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
