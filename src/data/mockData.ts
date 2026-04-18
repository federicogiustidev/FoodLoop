import { LoyaltyCard, Offer, Product, Recipe } from '../types';

const daysFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const daysAgo = (days: number) => daysFromNow(-days);

export const products: Product[] = [
  { id: 'p1', name: 'Latte fresco', category: 'dairy', quantity: 1, unit: 'L', purchasedAt: daysAgo(2), expiresAt: daysFromNow(1), supermarket: 'Conad', imageEmoji: '🥛' },
  { id: 'p2', name: 'Yogurt greco', category: 'dairy', quantity: 4, unit: 'vasetti', purchasedAt: daysAgo(1), expiresAt: daysFromNow(3), supermarket: 'Conad', imageEmoji: '🥣' },
  { id: 'p3', name: 'Spinaci freschi', category: 'produce', quantity: 1, unit: 'busta', purchasedAt: daysAgo(1), expiresAt: daysFromNow(2), supermarket: 'Esselunga', imageEmoji: '🥬' },
  { id: 'p4', name: 'Pane integrale', category: 'bakery', quantity: 1, unit: 'pezzo', purchasedAt: daysAgo(0), expiresAt: daysFromNow(4), supermarket: 'Coop', imageEmoji: '🍞' },
  { id: 'p5', name: 'Petto di pollo', category: 'meat', quantity: 500, unit: 'g', purchasedAt: daysAgo(0), expiresAt: daysFromNow(2), supermarket: 'Esselunga', imageEmoji: '🍗' },
  { id: 'p6', name: 'Pomodori ciliegino', category: 'produce', quantity: 500, unit: 'g', purchasedAt: daysAgo(3), expiresAt: daysFromNow(5), supermarket: 'Conad', imageEmoji: '🍅' },
  { id: 'p7', name: 'Pasta penne', category: 'pantry', quantity: 1, unit: 'kg', purchasedAt: daysAgo(10), expiresAt: daysFromNow(180), supermarket: 'Coop', imageEmoji: '🍝' },
  { id: 'p8', name: 'Mozzarella', category: 'dairy', quantity: 2, unit: 'pz', purchasedAt: daysAgo(1), expiresAt: daysFromNow(0), supermarket: 'Conad', imageEmoji: '🧀' },
];

export const recipes: Recipe[] = [
  { id: 'r1', title: 'Pasta pollo e spinaci', description: 'Cremosa e veloce, perfetta per un pranzo sostenibile.', minutes: 25, difficulty: 'easy', ingredients: ['Pasta penne', 'Petto di pollo', 'Spinaci freschi', 'Olio', 'Aglio'], matchedIngredients: ['Pasta penne', 'Petto di pollo', 'Spinaci freschi'], imageEmoji: '🍲' },
  { id: 'r2', title: 'Bruschette pomodoro e mozzarella', description: "Usa il pane integrale prima che si secchi.", minutes: 10, difficulty: 'easy', ingredients: ['Pane integrale', 'Pomodori ciliegino', 'Mozzarella', 'Basilico'], matchedIngredients: ['Pane integrale', 'Pomodori ciliegino', 'Mozzarella'], imageEmoji: '🍅' },
  { id: 'r3', title: 'Yogurt bowl energetica', description: 'Colazione rapida con yogurt greco e frutta.', minutes: 5, difficulty: 'easy', ingredients: ['Yogurt greco', 'Miele', 'Frutta secca'], matchedIngredients: ['Yogurt greco'], imageEmoji: '🥣' },
  { id: 'r4', title: 'Vellutata di spinaci', description: 'Scalda e nutre, ideale per salvare gli spinaci.', minutes: 30, difficulty: 'medium', ingredients: ['Spinaci freschi', 'Patate', 'Cipolla', 'Latte fresco'], matchedIngredients: ['Spinaci freschi', 'Latte fresco'], imageEmoji: '🥣' },
];

export const offers: Offer[] = [
  { id: 'o1', productName: 'Pane a lunga conservazione', supermarket: 'Conad', distanceKm: 0.4, originalPrice: 2.5, discountedPrice: 1.0, expiresAt: daysFromNow(1), imageEmoji: '🥖' },
  { id: 'o2', productName: 'Yogurt alla frutta', supermarket: 'Esselunga', distanceKm: 1.2, originalPrice: 3.2, discountedPrice: 1.5, expiresAt: daysFromNow(2), imageEmoji: '🥛' },
  { id: 'o3', productName: 'Insalata mista', supermarket: 'Coop', distanceKm: 0.8, originalPrice: 2.1, discountedPrice: 0.9, expiresAt: daysFromNow(0), imageEmoji: '🥗' },
  { id: 'o4', productName: 'Filetti di salmone', supermarket: 'Esselunga', distanceKm: 1.2, originalPrice: 9.9, discountedPrice: 5.5, expiresAt: daysFromNow(1), imageEmoji: '🐟' },
];

export const loyaltyCards: LoyaltyCard[] = [
  { id: 'l1', supermarket: 'Conad', cardNumber: '•••• 4521', connected: true, color: '#2E7D32' },
  { id: 'l2', supermarket: 'Esselunga', cardNumber: '•••• 8810', connected: true, color: '#558B2F' },
  { id: 'l3', supermarket: 'Coop', cardNumber: '•••• 0033', connected: false, color: '#9CCC65' },
];

export const sustainabilityStats = {
  savedKg: 12.4,
  savedEuro: 48.2,
  co2SavedKg: 7.1,
  streakDays: 9,
};
