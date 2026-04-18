import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { recipes } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/colors';

export const RecipesScreen: React.FC = () => (
  <SafeAreaView style={styles.safe} edges={['top']}>
    <ScreenHeader title="Ricette per te" subtitle="Suggerite in base agli ingredienti del tuo frigorifero" />
    <ScrollView contentContainerStyle={styles.list}>
      {recipes.map((r) => (
        <Card key={r.id} style={styles.card}>
          <View style={styles.header}>
            <View style={styles.emojiWrap}><Text style={{ fontSize: 32 }}>{r.imageEmoji}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{r.title}</Text>
              <Text style={styles.desc}>{r.description}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.meta}><Ionicons name="time-outline" size={14} color={colors.textSecondary} /><Text style={styles.metaText}>{r.minutes} min</Text></View>
            <View style={styles.meta}><Ionicons name="flame-outline" size={14} color={colors.textSecondary} /><Text style={styles.metaText}>{r.difficulty === 'easy' ? 'Facile' : r.difficulty === 'medium' ? 'Medio' : 'Difficile'}</Text></View>
            <View style={styles.meta}><Ionicons name="checkmark-circle" size={14} color={colors.success} /><Text style={styles.metaText}>{r.matchedIngredients.length}/{r.ingredients.length} ingredienti</Text></View>
          </View>

          <View style={styles.ingredients}>
            {r.ingredients.map((ing) => {
              const matched = r.matchedIngredients.includes(ing);
              return (
                <Badge key={ing} label={ing} color={matched ? colors.primaryDark : colors.textSecondary} background={matched ? colors.accent : colors.background} />
              );
            })}
          </View>
        </Card>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
  card: { gap: spacing.md },
  header: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  emojiWrap: { width: 56, height: 56, borderRadius: radius.lg, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.subtitle },
  desc: { ...typography.caption, marginTop: 2 },
  metaRow: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: colors.textSecondary },
  ingredients: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
