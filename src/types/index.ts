export type ProductCategory =
  | 'dairy'
  | 'produce'
  | 'bakery'
  | 'meat'
  | 'pantry'
  | 'frozen'
  | 'beverages';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  purchasedAt: string;
  expiresAt: string;
  supermarket: string;
  imageEmoji: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  matchedIngredients: string[];
  imageEmoji: string;
}

export interface Offer {
  id: string;
  productName: string;
  supermarket: string;
  distanceKm: number;
  originalPrice: number;
  discountedPrice: number;
  expiresAt: string;
  imageEmoji: string;
}

export interface LoyaltyCard {
  id: string;
  supermarket: string;
  cardNumber: string;
  connected: boolean;
  color: string;
}
