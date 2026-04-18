import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { StatTile } from '../components/StatTile';
import { loyaltyCards, sustainabilityStats } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const [expiryNotif, setExpiryNotif] = React.useState(true);
  const [offerNotif, setOfferNotif] = React.useState(true);
  const [recipeNotif, setRecipeNotif] = React.useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Profilo" subtitle="Il tuo impatto sostenibile" />
      <ScrollView contentContainerStyle={styles.list}>
        <Card style={styles.heroCard}>
          <View style={styles.avatar}><Text style={styles.avatarInitials}>GM</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Giulia Marini</Text>
            <Text style={styles.email}>giulia.marini@foodloop.it</Text>
            <View style={styles.streak}>
              <Ionicons name="flame" size={14} color={colors.warning} />
              <Text style={styles.streakText}>{sustainabilityStats.streakDays} giorni senza sprechi</Text>
            </View>
          </View>
        </Card>

        <View style={styles.statsRow}>
          <StatTile icon="leaf-outline" label="kg salvati" value={`${sustainabilityStats.savedKg}`} />
          <StatTile icon="wallet-outline" label="€ risparmiati" value={`${sustainabilityStats.savedEuro}`} tint={colors.primaryDark} />
          <StatTile icon="cloud-outline" label="kg CO₂" value={`${sustainabilityStats.co2SavedKg}`} tint={colors.leaf} />
        </View>

        <Text style={styles.sectionTitle}>Carte fedeltà collegate</Text>
        <Card style={{ gap: spacing.md }}>
          {loyaltyCards.map((c) => (
            <View key={c.id} style={styles.cardRow}>
              <View style={[styles.cardBadge, { backgroundColor: c.color }]}><Ionicons name="card" size={18} color={colors.white} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{c.supermarket}</Text>
                <Text style={styles.cardNumber}>{c.cardNumber}</Text>
              </View>
              <View style={[styles.pill, { backgroundColor: c.connected ? colors.accent : colors.background }]}>
                <Text style={[styles.pillText, { color: c.connected ? colors.primaryDark : colors.textMuted }]}>{c.connected ? 'Attiva' : 'Collega'}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Text style={styles.sectionTitle}>Notifiche</Text>
        <Card style={{ gap: spacing.md }}>
          <SettingRow icon="alarm-outline" title="Prodotti in scadenza" subtitle="Avvisi 2 giorni prima della scadenza" value={expiryNotif} onChange={setExpiryNotif} />
          <SettingRow icon="pricetag-outline" title="Offerte anti-spreco" subtitle="Sconti sui prodotti simili nei supermercati" value={offerNotif} onChange={setOfferNotif} />
          <SettingRow icon="restaurant-outline" title="Suggerimenti ricette" subtitle="Idee per usare gli ingredienti del frigo" value={recipeNotif} onChange={setRecipeNotif} />
        </Card>

        <Card style={styles.infoCard}>
          <Ionicons name="sparkles-outline" size={22} color={colors.primaryDark} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Stai facendo la differenza</Text>
            <Text style={styles.infoText}>Con il tuo impegno hai evitato l'equivalente di {sustainabilityStats.co2SavedKg} kg di CO₂ in un mese. Continua così!</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, title, subtitle, value, onChange }) => (
  <View style={styles.settingRow}>
    <View style={styles.settingIcon}><Ionicons name={icon} size={18} color={colors.primaryDark} /></View>
    <View style={{ flex: 1 }}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingSub}>{subtitle}</Text>
    </View>
    <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.primary, false: colors.border }} thumbColor={colors.white} />
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
  heroCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { color: colors.white, fontWeight: '800', fontSize: 18 },
  name: { ...typography.subtitle },
  email: { ...typography.caption, marginTop: 2 },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  streakText: { fontSize: 12, fontWeight: '600', color: colors.warning },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  sectionTitle: { ...typography.subtitle, fontSize: 15, marginTop: spacing.md },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  cardBadge: { width: 40, height: 40, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  cardName: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  cardNumber: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  pill: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill },
  pillText: { fontSize: 11, fontWeight: '700' },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  settingIcon: { width: 36, height: 36, borderRadius: radius.md, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  settingTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  settingSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  infoCard: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.accent, borderColor: colors.primaryLight },
  infoTitle: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  infoText: { fontSize: 12, color: colors.primaryDark, marginTop: 2, lineHeight: 18 },
});
