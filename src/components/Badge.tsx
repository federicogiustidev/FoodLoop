import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

interface Props {
  label: string;
  color?: string;
  background?: string;
}

export const Badge: React.FC<Props> = ({ label, color = colors.primaryDark, background = colors.accent }) => (
  <View style={[styles.wrap, { backgroundColor: background }]}>
    <Text style={[styles.text, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 12, fontWeight: '700' },
});
