import React from 'react';

// Exact Official Image Asset Path
export const SATPOL_OFFICIAL_IMG = '/src/assets/images/satpol_lembata_asli_exact_1790446739508.jpg';
export const SATPOL_HD_SHIELD_IMG = '/src/assets/images/satpol_hd_shield_1790442866134.jpg';
export const POLPP_CILIK_ICON_IMG = '/src/assets/images/polpp_cilik_icon_1790442841291.jpg';
export const POLPP_CILIK_PATROLI_IMG = '/src/assets/images/polpp_cilik_patroli_1790442852922.jpg';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: string;
}

/**
 * Logo Resmi Satuan Polisi Pamong Praja Kabupaten Lembata
 * Menggunakan gambar resmi asli persis sesuai yang dikirimkan pengguna
 * tanpa mengubah apapun pada gambar.
 */
export const SatpolPPLembataLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 88 
}) => {
  return (
    <div 
      style={{ width: size, height: size }} 
      className={`relative inline-flex items-center justify-center shrink-0 bg-transparent overflow-hidden ${className}`}
    >
      <img
        src={SATPOL_OFFICIAL_IMG}
        alt="Logo Resmi Satuan Polisi Pamong Praja Kabupaten Lembata"
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};

// Alias for compatibility
export const SatpolPPLogo = SatpolPPLembataLogo;

/**
 * Modern clean mascot icon of "Pol PP Cilik"
 * Clean avatar without descriptive text
 */
interface PolPPCilikProps {
  className?: string;
  size?: number;
  gender?: 'putra' | 'putri';
  badge?: boolean;
}

export const PolPPCilikIcon: React.FC<PolPPCilikProps> = ({
  className = '',
  size = 64,
  gender = 'putra',
  badge = false
}) => {
  const imgSrc = gender === 'putra' ? POLPP_CILIK_ICON_IMG : POLPP_CILIK_PATROLI_IMG;
  const nameLabel = gender === 'putra' ? 'Pol PP Cilik' : 'Pol PP Cilik Putri';

  return (
    <div 
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50 to-orange-100/80 p-0.5 shadow-md border-2 border-amber-300/90 group-hover:scale-105 group-hover:shadow-lg group-hover:border-amber-400 transition-all duration-300">
        <img
          src={imgSrc}
          alt={`Maskot ${nameLabel}`}
          className="w-full h-full object-cover rounded-[14px]"
          referrerPolicy="no-referrer"
        />
      </div>
      {badge && (
        <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[9px] px-2 py-0.5 rounded-full border-2 border-white shadow-xs tracking-wider uppercase">
          Cilik
        </span>
      )}
    </div>
  );
};
