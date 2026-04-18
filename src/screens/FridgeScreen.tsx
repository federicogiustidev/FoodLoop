import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { ProductRow } from '../components/ProductRow';
import { ScreenHeader } from '../components/ScreenHeader';
import { products } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/colors';
import { ProductCategory } from '../types';
import { daysUntil } from '../utils/expiry';

const FILTERS: { key: ProductCategory | 'all'; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'all', label: 'Tutti', icon: 'apps-outline' },
  { key: 'dairy', label: 'Latticini', icon: 'water-outline' },
  { key: 'produce', label: 'Frutta & verdura', icon: 'leaf-outline' },
  { key: 'bakery', label: 'Panetteria', icon: 'pizza-outline' },
  { key: 'meat', label: 'Carne & pesce', icon: 'fish-outline' },
  { key: 'pantry', label: 'Dispensa', icon: 'file-tray-outline' },
];

export const FridgeScreen: React.FC = () => {
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products
      .filter((p) => (filter === 'all' ? true : p.category === filter))
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => daysUntil(a.expiresAt) - daysUntil(b.expiresAt));
  }, [filter, query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Frigorifero digitale" subtitle={`${products.length} prodotti sincronizzati dalle tue carte fedeltà`} />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput value={query} onChangeText={setQuery} placeholder="Cerca un prodotto..." placeholderTextColor={colors.textMuted} style={styles.search} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <Pressable key={f.key} onPress={() => setFilter(f.key)} style={[styles.chip, active && styles.chipActive]}>
              <Ionicons name={f.icon} size={14} color={active ? colors.white : colors.primaryDark} />
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        <Card style={{ padding: spacing.sm }}>
          {filtered.length === 0 ? (
            <Text style={styles.empty}>Nessun prodotto in questa categoria.</Text>
          ) : (
            filtered.map((p) => <ProductRow key={p.id} product={p} />)
          )}
        </Card>

        <View style={styles.autoHint}>
          <Ionicons name="sync-outline" size={16} color={colors.primaryDark} />
          <Text style={styles.autoHintText}>Gli acquisti vengono aggiunti automaticamente tramite le carte fedeltà collegate.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  searchWrap: { marginHorizontal: spacing.xl, backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, height: 44, borderWidth: 1, borderColor: colors.border },
  search: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  chipsRow: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, gap: spacing.sm },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.md, paddingVertical: 8, backgroundColor: colors.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.primaryDark },
  chipTextActive: { color: colors.white },
  list: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  empty: { ...typography.caption, padding: spacing.lg, textAlign: 'center' },
  autoHint: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.accent, padding: spacing.md, borderRadius: radius.md, marginTop: spacing.lg },
  autoHintText: { flex: 1, fontSize: 12, color: colors.primaryDark, fontWeight: '500' },
});
