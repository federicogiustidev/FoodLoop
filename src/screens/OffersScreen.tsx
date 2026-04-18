import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { offers } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/colors';
import { expiryLabel } from '../utils/expiry';

export const OffersScreen: React.FC = () => (
  <SafeAreaView style={styles.safe} edges={['top']}>
    <ScreenHeader title="Offerte anti-spreco" subtitle="Prodotti prossimi alla scadenza nei supermercati vicini" />
    <ScrollView contentContainerStyle={styles.list}>
      <View style={styles.mapPreview}>
        <Ionicons name="map-outline" size={24} color={colors.primaryDark} />
        <View style={{ flex: 1 }}>
          <Text style={styles.mapTitle}>3 supermercati nel raggio di 1,5 km</Text>
          <Text style={styles.mapSub}>Tocca per visualizzare la mappa interattiva</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primaryDark} />
      </View>

      {offers.map((o) => {
        const discount = Math.round(100 - (o.discountedPrice / o.originalPrice) * 100);
        return (
          <Card key={o.id} style={styles.card}>
            <View style={styles.emojiWrap}>
              <Text style={{ fontSize: 32 }}>{o.imageEmoji}</Text>
              <View style={styles.discountBadge}><Text style={styles.discountText}>-{discount}%</Text></View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{o.productName}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="storefront-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.metaText}>{o.supermarket}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.metaText}>{o.distanceKm} km</Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="alarm-outline" size={13} color={colors.warning} />
                <Text style={[styles.metaText, { color: colors.warning, fontWeight: '600' }]}>{expiryLabel(o.expiresAt)}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceNew}>€{o.discountedPrice.toFixed(2)}</Text>
                <Text style={styles.priceOld}>€{o.originalPrice.toFixed(2)}</Text>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
  mapPreview: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.accent, padding: spacing.md, borderRadius: radius.lg },
  mapTitle: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  mapSub: { fontSize: 12, color: colors.primaryDark, opacity: 0.8 },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  emojiWrap: { width: 70, height: 70, borderRadius: radius.lg, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  discountBadge: { position: 'absolute', top: -6, right: -6, backgroundColor: colors.danger, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  discountText: { color: colors.white, fontSize: 11, fontWeight: '800' },
  name: { ...typography.subtitle, fontSize: 15 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, flexWrap: 'wrap' },
  metaText: { fontSize: 12, color: colors.textSecondary },
  metaDot: { fontSize: 12, color: colors.textMuted, marginHorizontal: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginTop: 6 },
  priceNew: { fontSize: 18, fontWeight: '800', color: colors.primaryDark },
  priceOld: { fontSize: 13, color: colors.textMuted, textDecorationLine: 'line-through' },
});
