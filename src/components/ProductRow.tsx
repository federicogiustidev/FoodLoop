import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types';
import { colors, radius, spacing } from '../theme/colors';
import { expiryColor, expiryLabel } from '../utils/expiry';

interface Props {
  product: Product;
  onPress?: () => void;
}

export const ProductRow: React.FC<Props> = ({ product, onPress }) => {
  const color = expiryColor(product.expiresAt);
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.emojiWrap}>
        <Text style={styles.emoji}>{product.imageEmoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.meta}>
          {product.quantity} {product.unit} • {product.supermarket}
        </Text>
      </View>
      <View style={[styles.expiryTag, { backgroundColor: `${color}1A`, borderColor: color }]}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.expiryText, { color }]}>{expiryLabel(product.expiresAt)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.md, gap: spacing.md, borderRadius: radius.md },
  pressed: { backgroundColor: colors.background },
  emojiWrap: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 26 },
  name: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  meta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  expiryTag: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill, borderWidth: 1 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  expiryText: { fontSize: 11, fontWeight: '700' },
});
