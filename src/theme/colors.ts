export const colors = {
  primary: '#2E7D32',
  primaryDark: '#1B5E20',
  primaryLight: '#66BB6A',
  accent: '#A5D6A7',
  leaf: '#81C784',
  background: '#F1F8F4',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#DDECE0',
  textPrimary: '#1B2B1E',
  textSecondary: '#5A6B5E',
  textMuted: '#8A9A8E',
  success: '#43A047',
  warning: '#F9A825',
  danger: '#E53935',
  white: '#FFFFFF',
  shadow: 'rgba(27, 94, 32, 0.08)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  title: { fontSize: 26, fontWeight: '700' as const, color: colors.textPrimary },
  subtitle: { fontSize: 18, fontWeight: '600' as const, color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.textPrimary },
  caption: { fontSize: 13, fontWeight: '400' as const, color: colors.textSecondary },
  label: { fontSize: 12, fontWeight: '600' as const, color: colors.textSecondary },
};

