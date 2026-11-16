// AnaPharm design system: calm clinical surfaces with a confident medical blue.
export const FONTS = {
  light: 'HindSiliguri-Light',
  regular: 'HindSiliguri-Regular',
  medium: 'HindSiliguri-Medium',
  semiBold: 'HindSiliguri-SemiBold',
  bold: 'HindSiliguri-Bold',
};

export const SELECTED_COLOR = '#E1EEFF';
export const SELECTED_TEXT = '#155A9A';

export const THEMES = {
  dark: {
    id: 'dark', label: 'Dark Mode', icon: '🌙', isDark: true,
    bg: '#0D1725', headerBg: '#111F31', surface: '#111F31', surfaceSecondary: '#1A2B40',
    card: '#14243A', cardBorder: '#283B54', border: '#283B54',
    text: '#F2F7FD', textSecondary: '#D5E1EF', textMuted: '#A8B8CC', textDim: '#8295AE',
    accent: '#55A9FF', accentLight: '#83C1FF', accentGlow: '#55A9FF', accentBg: 'rgba(85, 169, 255, 0.16)',
    selected: SELECTED_COLOR, selectedBg: 'rgba(85, 169, 255, 0.20)', selectedBorder: '#55A9FF', selectedText: '#9BCBFF',
    tabBarBg: '#111F31', tabBarBorder: '#283B54', inputBg: '#1A2B40', chipBg: '#1A2B40', chipBorder: '#344A67',
    glassBg: 'rgba(17, 31, 49, 0.95)', glassBorder: 'rgba(168, 184, 204, 0.22)', glassHeader: 'rgba(17, 31, 49, 0.97)',
    shadowColor: '#000000', statusBarStyle: 'light-content', modelBgHex: '0x0D1725', modelBgCss: '#0D1725',
    modelAmbIntensity: 0.95, modelToneExposure: 1.15, modelRimColor: '0x55A9FF', modelGridColor: '0x283B54',
  },
  light: {
    id: 'light', label: 'Light Mode', icon: '☀️', isDark: false,
    bg: '#F2F7FC', headerBg: '#F8FBFF', surface: '#FFFFFF', surfaceSecondary: '#EAF2FB',
    card: '#FFFFFF', cardBorder: '#DFE8F2', border: '#DFE8F2',
    text: '#172E49', textSecondary: '#38536F', textMuted: '#627A94', textDim: '#7F93AA',
    accent: '#2477D4', accentLight: '#3C96F3', accentGlow: '#2477D4', accentBg: 'rgba(36, 119, 212, 0.10)',
    selected: SELECTED_COLOR, selectedBg: SELECTED_COLOR, selectedBorder: '#A8C9F2', selectedText: '#155A9A',
    tabBarBg: '#FFFFFF', tabBarBorder: '#DFE8F2', inputBg: '#EDF4FC', chipBg: '#EDF4FC', chipBorder: '#D8E5F4',
    glassBg: 'rgba(255, 255, 255, 0.97)', glassBorder: 'rgba(23, 46, 73, 0.12)', glassHeader: 'rgba(248, 251, 255, 0.98)',
    shadowColor: '#9EB2CA', statusBarStyle: 'dark-content', modelBgHex: '0xeaf2fb', modelBgCss: '#EAF2FB',
    modelAmbIntensity: 0.85, modelToneExposure: 1.05, modelRimColor: '0x2477D4', modelGridColor: '0xcbd9e9',
  },
};

export const FONT_SIZES = {
  xsmall: { id: 'xsmall', label: 'Smaller', labelBn: 'আরও ছোট', scale: 0.86, delta: -3, icon: 'A⁻⁻' },
  small: { id: 'small', label: 'Small', labelBn: 'ছোট', scale: 0.94, delta: -1, icon: 'A⁻' },
  medium: { id: 'medium', label: 'Medium', labelBn: 'মাঝারি', scale: 1.0, delta: 0, icon: 'A' },
  large: { id: 'large', label: 'Large', labelBn: 'বড়', scale: 1.15, delta: 2, icon: 'A⁺' },
  xlarge: { id: 'xlarge', label: 'X-Large', labelBn: 'অতিরিক্ত বড়', scale: 1.3, delta: 4, icon: 'A⁺⁺' },
};

export const getTheme = (themeId, fontSizeId = 'medium') => {
  const base = THEMES[themeId] || THEMES.light;
  const fontConf = FONT_SIZES[fontSizeId] || FONT_SIZES.medium;
  return {
    ...base, fonts: FONTS, fontFamily: FONTS.regular, fontRegular: FONTS.regular,
    fontMedium: FONTS.medium, fontSemiBold: FONTS.semiBold, fontBold: FONTS.bold,
    fontSizeId: fontConf.id, fontScale: fontConf.scale, fontDelta: fontConf.delta,
    fs: (baseSize) => Math.round(baseSize * fontConf.scale),
  };
};
