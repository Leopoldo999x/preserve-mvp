import { GroceryItem, HealthSnapshot, InventoryItem, Recipe, UserPreferences } from "@/lib/types";

export const initialInventory: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Yogurt greco",
    category: "Dairy",
    quantity: 2,
    unit: "vasetti",
    expirationDate: "2026-04-21",
    calories: 130,
    protein: 15,
    carbs: 8,
    fats: 4,
    lowStockThreshold: 2,
    source: "scan"
  },
  {
    id: "inv-2",
    name: "Spinacino",
    category: "Produce",
    quantity: 1,
    unit: "busta",
    expirationDate: "2026-04-20",
    calories: 23,
    protein: 3,
    carbs: 4,
    fats: 0,
    lowStockThreshold: 1,
    source: "manual"
  },
  {
    id: "inv-3",
    name: "Petto di pollo",
    category: "Protein",
    quantity: 3,
    unit: "filetti",
    expirationDate: "2026-04-23",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 4,
    lowStockThreshold: 2,
    source: "scan"
  },
  {
    id: "inv-4",
    name: "Avocado",
    category: "Produce",
    quantity: 1,
    unit: "pz",
    expirationDate: "2026-04-19",
    calories: 160,
    protein: 2,
    carbs: 9,
    fats: 15,
    lowStockThreshold: 2,
    source: "voice"
  },
  {
    id: "inv-5",
    name: "Riso integrale",
    category: "Pantry",
    quantity: 1.5,
    unit: "kg",
    expirationDate: "2026-08-02",
    calories: 360,
    protein: 7,
    carbs: 76,
    fats: 3,
    lowStockThreshold: 0.5,
    source: "manual"
  },
  {
    id: "inv-6",
    name: "Mirtilli",
    category: "Produce",
    quantity: 1,
    unit: "confezione",
    expirationDate: "2026-04-22",
    calories: 57,
    protein: 1,
    carbs: 14,
    fats: 0,
    lowStockThreshold: 1,
    source: "scan"
  },
  {
    id: "inv-7",
    name: "Uova",
    category: "Protein",
    quantity: 4,
    unit: "pz",
    expirationDate: "2026-04-27",
    calories: 72,
    protein: 6,
    carbs: 0,
    fats: 5,
    lowStockThreshold: 6,
    source: "manual"
  },
  {
    id: "inv-8",
    name: "Latte di mandorla",
    category: "Beverages",
    quantity: 0.5,
    unit: "L",
    expirationDate: "2026-04-18",
    calories: 39,
    protein: 1,
    carbs: 3,
    fats: 2,
    lowStockThreshold: 1,
    source: "voice"
  }
];

export const recipeCatalog: Recipe[] = [
  {
    id: "rec-1",
    title: "Power bowl proteica",
    ingredients: ["Petto di pollo", "Spinacino", "Riso integrale", "Avocado"],
    tags: ["high-protein", "quick"],
    cookingTime: 22,
    calories: 520,
    protein: 41,
    carbs: 34,
    fats: 18,
    matchedInventoryItems: ["Petto di pollo", "Spinacino", "Riso integrale", "Avocado"],
    difficulty: "Easy"
  },
  {
    id: "rec-2",
    title: "Jar di recupero yogurt e frutti di bosco",
    ingredients: ["Yogurt greco", "Mirtilli", "Latte di mandorla"],
    tags: ["high-protein", "low-calorie", "quick", "vegetarian"],
    cookingTime: 6,
    calories: 240,
    protein: 19,
    carbs: 21,
    fats: 7,
    matchedInventoryItems: ["Yogurt greco", "Mirtilli", "Latte di mandorla"],
    difficulty: "Easy"
  },
  {
    id: "rec-3",
    title: "Padella veloce uova e spinaci",
    ingredients: ["Uova", "Spinacino", "Avocado"],
    tags: ["quick", "vegetarian", "low-calorie"],
    cookingTime: 12,
    calories: 310,
    protein: 20,
    carbs: 10,
    fats: 20,
    matchedInventoryItems: ["Uova", "Spinacino", "Avocado"],
    difficulty: "Easy"
  },
  {
    id: "rec-4",
    title: "Riso saltato al pollo per la famiglia",
    ingredients: ["Petto di pollo", "Riso integrale", "Uova", "Piselli", "Salsa di soia"],
    tags: ["family", "high-protein"],
    cookingTime: 28,
    calories: 610,
    protein: 38,
    carbs: 53,
    fats: 17,
    matchedInventoryItems: ["Petto di pollo", "Riso integrale", "Uova"],
    difficulty: "Medium"
  },
  {
    id: "rec-5",
    title: "Overnight oats da dispensa studente",
    ingredients: ["Yogurt greco", "Latte di mandorla", "Fiocchi d'avena", "Mirtilli"],
    tags: ["quick", "vegetarian"],
    cookingTime: 8,
    calories: 330,
    protein: 18,
    carbs: 42,
    fats: 9,
    matchedInventoryItems: ["Yogurt greco", "Latte di mandorla", "Mirtilli"],
    difficulty: "Easy"
  }
];

export const initialGroceryList: GroceryItem[] = [
  {
    id: "gro-1",
    name: "Fiocchi d'avena",
    category: "Pantry",
    quantity: 1,
    unit: "busta",
    priority: "normal",
    source: "manual"
  },
  {
    id: "gro-2",
    name: "Piselli",
    category: "Frozen",
    quantity: 1,
    unit: "confezione",
    priority: "high",
    source: "auto"
  }
];

export const defaultPreferences: UserPreferences = {
  dietPreference: "high protein",
  fitnessGoal: "build muscle",
  householdType: "couple",
  notifications: {
    push: true,
    email: false,
    groceryReminders: true,
    expiryAlerts: true
  }
};

export const healthSnapshot: HealthSnapshot = {
  caloriesConsumed: 1780,
  calorieGoal: 2200,
  protein: 118,
  proteinGoal: 150,
  carbs: 162,
  carbsGoal: 210,
  fats: 58,
  fatsGoal: 75,
  watchSyncStatus: "Apple Watch sincronizzato 18 minuti fa"
};

export const wasteTrend = [
  { week: "S1", wasteAvoided: 8, mealPrepScore: 66 },
  { week: "S2", wasteAvoided: 10, mealPrepScore: 71 },
  { week: "S3", wasteAvoided: 13, mealPrepScore: 78 },
  { week: "S4", wasteAvoided: 16, mealPrepScore: 84 }
];

export const nutritionTrend = [
  { day: "Lun", protein: 104, calories: 1890 },
  { day: "Mar", protein: 111, calories: 1985 },
  { day: "Mer", protein: 122, calories: 2050 },
  { day: "Gio", protein: 118, calories: 1780 },
  { day: "Ven", protein: 126, calories: 2120 }
];
