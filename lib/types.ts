export type InventoryCategory =
  | "Produce"
  | "Protein"
  | "Dairy"
  | "Pantry"
  | "Frozen"
  | "Snacks"
  | "Beverages";

export type InventorySource = "manual" | "scan" | "voice";
export type InventoryStatus = "fresh" | "expiring" | "expired";
export type InventoryFilter = "all" | "expiring" | "expired" | "low-stock";

export type InventoryItem = {
  id: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  unit: string;
  expirationDate: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  lowStockThreshold: number;
  source: InventorySource;
};

export type RecipeTag =
  | "high-protein"
  | "low-calorie"
  | "vegetarian"
  | "quick"
  | "family";

export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  tags: RecipeTag[];
  cookingTime: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  matchedInventoryItems: string[];
  difficulty: "Easy" | "Medium" | "Advanced";
};

export type GroceryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  priority: "normal" | "high";
  source: "manual" | "auto";
};

export type NotificationItem = {
  id: string;
  type: "expiring" | "expired" | "low-stock" | "reminder";
  title: string;
  description: string;
  itemId?: string;
};

export type UserPreferences = {
  dietPreference: "balanced" | "high protein" | "vegetarian" | "low carb";
  fitnessGoal: "lose weight" | "maintain" | "build muscle";
  householdType: "single" | "couple" | "family" | "student";
  notifications: {
    push: boolean;
    email: boolean;
    groceryReminders: boolean;
    expiryAlerts: boolean;
  };
};

export type HealthSnapshot = {
  caloriesConsumed: number;
  calorieGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fats: number;
  fatsGoal: number;
  watchSyncStatus: string;
};
