// Centralized Theme System for AnaPharm
// STRICT FONT COLOR RULE: Black or White only! No colored fonts.
// Modern Bangla & Latin Typography powered by Hind Siliguri

export const FONTS = {
  light: 'HindSiliguri-Light',
  regular: 'HindSiliguri-Regular',
  medium: 'HindSiliguri-Medium',
  semiBold: 'HindSiliguri-SemiBold',
  bold: 'HindSiliguri-Bold',
};

export const SELECTED_COLOR = '#D8BDF8';
export const SELECTED_TEXT = '#1e1b4b';

export const THEMES = {
  dark: {
    id: 'dark',
    label: 'Dark Mode',
    icon: '🌙',
    isDark: true,
    bg: '#000000',
    headerBg: 'rgba(8, 8, 8, 0.94)',
    surface: '#0d0d0d',
    surfaceSecondary: '#161616',
    card: '#121214',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    border: '#222224',
    text: '#ffffff',
    textSecondary: '#ffffff',
    textMuted: '#e2e8f0',
    textDim: '#cbd5e1',
    accent: '#ffffff',
    accentLight: '#ffffff',
    accentGlow: '#ffffff',
    accentBg: 'rgba(255, 255, 255, 0.12)',
    selected: SELECTED_COLOR,
    selectedBg: SELECTED_COLOR,
    selectedBorder: SELECTED_COLOR,
    selectedText: SELECTED_TEXT,
    tabBarBg: 'rgba(10, 10, 12, 0.96)',
    tabBarBorder: 'rgba(255, 255, 255, 0.10)',
    inputBg: 'rgba(26, 26, 30, 0.85)',
    chipBg: 'rgba(28, 28, 34, 0.85)',
    chipBorder: 'rgba(255, 255, 255, 0.14)',
    glassBg: 'rgba(18, 18, 22, 0.88)',
    glassBorder: 'rgba(255, 255, 255, 0.16)',
    glassHeader: 'rgba(6, 6, 8, 0.94)',
    shadowColor: '#000000',
    statusBarStyle: 'light-content',
    modelBgHex: '0x000000',
    modelBgCss: '#000000',
    modelAmbIntensity: 0.95,
    modelToneExposure: 1.15,
    modelRimColor: '0x38bdf8',
    modelGridColor: '0x1e293b',
  },
  light: {
    id: 'light',
    label: 'Light Mode',
    icon: '☀️',
    isDark: false,
    bg: '#ffffff',
    headerBg: 'rgba(255, 255, 255, 0.96)',
    surface: '#ffffff',
    surfaceSecondary: '#f4f4f5',
    card: '#ffffff',
    cardBorder: '#e4e4e7',
    border: '#e4e4e7',
    text: '#000000',
    textSecondary: '#18181b',
    textMuted: '#27272a',
    textDim: '#52525b',
    accent: '#000000',
    accentLight: '#18181b',
    accentGlow: '#000000',
    accentBg: 'rgba(0, 0, 0, 0.08)',
    selected: SELECTED_COLOR,
    selectedBg: SELECTED_COLOR,
    selectedBorder: SELECTED_COLOR,
    selectedText: SELECTED_TEXT,
    tabBarBg: 'rgba(255, 255, 255, 0.96)',
    tabBarBorder: '#e4e4e7',
    inputBg: '#f4f4f5',
    chipBg: '#f4f4f5',
    chipBorder: '#e4e4e7',
    glassBg: 'rgba(255, 255, 255, 0.92)',
    glassBorder: 'rgba(0, 0, 0, 0.10)',
    glassHeader: 'rgba(255, 255, 255, 0.96)',
    shadowColor: '#a1a1aa',
    statusBarStyle: 'dark-content',
    modelBgHex: '0xe4e4e7',
    modelBgCss: '#e4e4e7',
    modelAmbIntensity: 0.85,
    modelToneExposure: 1.05,
    modelRimColor: '0x0284c7',
    modelGridColor: '0xcfd8dc',
  },
};

export const FONT_SIZES = {
  small: { id: 'small', label: 'Small', labelBn: 'ছোট', scale: 0.88, delta: -2, icon: 'A⁻' },
  medium: { id: 'medium', label: 'Default', labelBn: 'স্বাভাবিক', scale: 1.0, delta: 0, icon: 'A' },
  large: { id: 'large', label: 'Large', labelBn: 'বড়', scale: 1.15, delta: 2, icon: 'A⁺' },
  xlarge: { id: 'xlarge', label: 'X-Large', labelBn: 'অতিরিক্ত বড়', scale: 1.3, delta: 4, icon: 'A⁺⁺' },
};

export const getTheme = (themeId, fontSizeId = 'medium') => {
  const base = THEMES[themeId] || THEMES.light;
  const fontConf = FONT_SIZES[fontSizeId] || FONT_SIZES.medium;
  return {
    ...base,
    fonts: FONTS,
    fontFamily: FONTS.regular,
    fontRegular: FONTS.regular,
    fontMedium: FONTS.medium,
    fontSemiBold: FONTS.semiBold,
    fontBold: FONTS.bold,
    fontSizeId: fontConf.id,
    fontScale: fontConf.scale,
    fontDelta: fontConf.delta,
    fs: (baseSize) => Math.round(baseSize * fontConf.scale),
  };
};
