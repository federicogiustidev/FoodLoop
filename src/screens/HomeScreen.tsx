import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { ProductRow } from '../components/ProductRow';
import { ScreenHeader } from '../components/ScreenHeader';
import { StatTile } from '../components/StatTile';
import { offers, products, recipes, sustainabilityStats } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/colors';
import { daysUntil } from '../utils/expiry';

export const HomeScreen: React.FC = () => {
  const expiringSoon = useMemo(
    () =>
      [...products]
        .filter((p) => daysUntil(p.expiresAt) <= 3)
        .sort((a, b) => daysUntil(a.expiresAt) - daysUntil(b.expiresAt))
        .slice(0, 3),
    [],
  );
  const topRecipe = recipes[0];
  const topOffer = offers[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <ScreenHeader
          title="Ciao, Giulia 🌱"
          subtitle="Oggi puoi salvare 3 prodotti dal tuo frigorifero"
          right={
            <View style={styles.bell}>
              <Ionicons name="notifications-outline" size={20} color={colors.primaryDark} />
              <View style={styles.bellDot} />
            </View>
          }
        />

        <View style={styles.statsRow}>
          <StatTile icon="leaf" label="kg salvati" value={`${sustainabilityStats.savedKg}`} />
          <StatTile icon="wallet-outline" label="€ risparmiati" value={`${sustainabilityStats.savedEuro}`} tint={colors.primaryDark} />
          <StatTile icon="cloud-outline" label="kg CO₂" value={`${sustainabilityStats.co2SavedKg}`} tint={colors.leaf} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>In scadenza</Text>
            <Text style={styles.link}>Vedi tutto</Text>
          </View>
          <Card style={{ padding: spacing.sm }}>
            {expiringSoon.map((p) => (<ProductRow key={p.id} product={p} />))}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ricetta suggerita</Text>
          <Card style={styles.recipeCard}>
            <View style={styles.recipeEmoji}><Text style={{ fontSize: 36 }}>{topRecipe.imageEmoji}</Text></View>
            <View style={{ flex: 1 }}>
              <Badge label={`${topRecipe.matchedIngredients.length} ingredienti disponibili`} />
              <Text style={styles.recipeTitle}>{topRecipe.title}</Text>
              <Text style={styles.recipeDesc}>{topRecipe.description}</Text>
              <View style={styles.recipeMeta}>
                <View style={styles.metaRow}><Ionicons name="time-outline" size={14} color={colors.textSecondary} /><Text style={styles.metaText}>{topRecipe.minutes} min</Text></View>
                <View style={styles.metaRow}><Ionicons name="flame-outline" size={14} color={colors.textSecondary} /><Text style={styles.metaText}>Facile</Text></View>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offerta vicina</Text>
          <Card style={styles.offerCard}>
            <View style={styles.offerEmoji}><Text style={{ fontSize: 32 }}>{topOffer.imageEmoji}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerName}>{topOffer.productName}</Text>
              <Text style={styles.offerMeta}>{topOffer.supermarket} • {topOffer.distanceKm} km</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceNew}>€{topOffer.discountedPrice.toFixed(2)}</Text>
                <Text style={styles.priceOld}>€{topOffer.originalPrice.toFixed(2)}</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  bell: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  bellDot: { position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.warning, borderWidth: 2, borderColor: colors.surface },
  statsRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.xl, marginTop: spacing.sm },
  section: { paddingHorizontal: spacing.xl, marginTop: spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.md },
  sectionTitle: { ...typography.subtitle, marginBottom: spacing.md },
  link: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  recipeCard: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  recipeEmoji: { width: 68, height: 68, borderRadius: radius.lg, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  recipeTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginTop: 6 },
  recipeDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  recipeMeta: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: colors.textSecondary },
  offerCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  offerEmoji: { width: 60, height: 60, borderRadius: radius.lg, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  offerName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  offerMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginTop: 6 },
  priceNew: { fontSize: 18, fontWeight: '800', color: colors.primaryDark },
  priceOld: { fontSize: 13, color: colors.textMuted, textDecorationLine: 'line-through' },
});
