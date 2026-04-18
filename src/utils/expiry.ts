import { colors } from '../theme/colors';

export const daysUntil = (iso: string): number => {
  const target = new Date(iso);
  const now = new Date();
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = target.getTime() - now.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
};

export const expiryLabel = (iso: string): string => {
  const d = daysUntil(iso);
  if (d < 0) return `Scaduto ${-d}g fa`;
  if (d === 0) return 'Scade oggi';
  if (d === 1) return 'Scade domani';
  if (d <= 7) return `Scade tra ${d} giorni`;
  return `Scade il ${new Date(iso).toLocaleDateString('it-IT')}`;
};

export const expiryColor = (iso: string): string => {
  const d = daysUntil(iso);
  if (d <= 0) return colors.danger;
  if (d <= 2) return colors.warning;
  return colors.success;
};
