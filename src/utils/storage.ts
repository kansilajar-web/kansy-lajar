import { LaporanTrantibum, AppConfig } from '../types';
import { INITIAL_LAPORAN } from '../data/mockData';

const STORAGE_KEY = 'satpol_pp_lembata_laporan_v1';
const CONFIG_KEY = 'satpol_pp_lembata_config_v1';

export const DEFAULT_CONFIG: AppConfig = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScX_sample_trantibum_satpolpp_lembata/viewform',
  googleSheetsUrl: 'https://docs.google.com/spreadsheets/d/1_sample_rekapitulasi_trantibum_lembata/edit',
  instansi: 'Satuan Polisi Pamong Praja Kabupaten Lembata',
  kabupaten: 'Kabupaten Lembata, Provinsi Nusa Tenggara Timur',
  kontakDarurat: '0812-3456-7890 / (0383) 41234'
};

export const getStoredReports = (): LaporanTrantibum[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LAPORAN));
      return INITIAL_LAPORAN;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_LAPORAN;
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return INITIAL_LAPORAN;
  }
};

export const saveReports = (reports: LaporanTrantibum[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addReport = (report: Omit<LaporanTrantibum, 'id' | 'noUrut' | 'dibuatPada'>): LaporanTrantibum => {
  const currentReports = getStoredReports();
  const nextNoUrut = currentReports.length > 0 
    ? Math.max(...currentReports.map(r => r.noUrut || 0)) + 1 
    : 1;

  const newReport: LaporanTrantibum = {
    ...report,
    id: `lap-${Date.now()}`,
    noUrut: nextNoUrut,
    dibuatPada: new Date().toISOString(),
    statusVerifikasi: 'Terverifikasi'
  };

  const updated = [newReport, ...currentReports];
  saveReports(updated);
  return newReport;
};

export const deleteReport = (id: string): LaporanTrantibum[] => {
  const current = getStoredReports();
  const updated = current.filter(item => item.id !== id);
  saveReports(updated);
  return updated;
};

export const resetToInitialReports = (): LaporanTrantibum[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LAPORAN));
  return INITIAL_LAPORAN;
};

export const getAppConfig = (): AppConfig => {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const saveAppConfig = (config: AppConfig): void => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
};

export const formatDateIndo = (dateStr: string): string => {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      // YYYY-MM-DD to DD/MM/YYYY
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
};

export const exportToCSV = (reports: LaporanTrantibum[]): void => {
  // Format Header sesuai Format Rekapitulasi Google Sheets (Bagian D)
  const headers = [
    'No',
    'Tanggal',
    'Nama Petugas',
    'NIP/NIK',
    'Jabatan',
    'Regu',
    'Lokasi',
    'Jenis Kegiatan',
    'Uraian Kegiatan',
    'Hasil',
    'Kendala',
    'Tindak Lanjut',
    'Dokumentasi'
  ];

  const rows = reports.map((r, idx) => [
    idx + 1,
    formatDateIndo(r.tanggal),
    `"${(r.namaPetugas || '').replace(/"/g, '""')}"`,
    `"${(r.nipNik || '').replace(/"/g, '""')}"`,
    `"${(r.jabatan || '').replace(/"/g, '""')}"`,
    `"${(r.regu || '').replace(/"/g, '""')}"`,
    `"${(r.lokasi || '').replace(/"/g, '""')}"`,
    `"${(r.jenisKegiatan.join(', ') || '').replace(/"/g, '""')}"`,
    `"${(r.uraianKegiatan || '').replace(/"/g, '""')}"`,
    `"${(r.hasilKegiatan || '').replace(/"/g, '""')}"`,
    `"${(r.kendala || '').replace(/"/g, '""')}"`,
    `"${(r.tindakLanjut || '').replace(/"/g, '""')}"`,
    `"${r.fotos.length > 0 ? `${r.fotos.length} Foto Terlampir` : 'Tidak ada foto'}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekapitulasi_Trantibum_SatpolPP_Lembata_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
