import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FridgeScreen } from '../screens/FridgeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OffersScreen } from '../screens/OffersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RecipesScreen } from '../screens/RecipesScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const iconFor = (route: string, focused: boolean): keyof typeof Ionicons.glyphMap => {
  switch (route) {
    case 'Home': return focused ? 'home' : 'home-outline';
    case 'Fridge': return focused ? 'snow' : 'snow-outline';
    case 'Recipes': return focused ? 'restaurant' : 'restaurant-outline';
    case 'Offers': return focused ? 'pricetag' : 'pricetag-outline';
    case 'Profile': return focused ? 'person-circle' : 'person-circle-outline';
    default: return 'ellipse';
  }
};

export const RootTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primaryDark,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: styles.label,
      tabBarStyle: styles.bar,
      tabBarIcon: ({ focused, color, size }) => (
        <Ionicons name={iconFor(route.name, focused)} size={size} color={color} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="Fridge" component={FridgeScreen} options={{ title: 'Frigo' }} />
    <Tab.Screen name="Recipes" component={RecipesScreen} options={{ title: 'Ricette' }} />
    <Tab.Screen name="Offers" component={OffersScreen} options={{ title: 'Offerte' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profilo' }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 64, paddingBottom: 8, paddingTop: 6 },
  label: { fontSize: 11, fontWeight: '600' },
});
