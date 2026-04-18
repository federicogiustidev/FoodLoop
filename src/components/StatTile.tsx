import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  tint?: string;
}

export const StatTile: React.FC<Props> = ({ icon, label, value, tint = colors.primary }) => (
  <View style={styles.tile}>
    <View style={[styles.iconWrap, { backgroundColor: `${tint}22` }]}>
      <Ionicons name={icon} size={18} color={tint} />
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  tile: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, alignItems: 'flex-start', borderWidth: 1, borderColor: colors.border, gap: 6 },
  iconWrap: { width: 32, height: 32, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  label: { fontSize: 11, color: colors.textSecondary, fontWeight: '500' },
});
