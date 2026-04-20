"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { defaultPreferences, healthSnapshot, initialGroceryList, initialInventory, recipeCatalog } from "@/lib/mock-data";
import { GroceryItem, HealthSnapshot, InventoryFilter, InventoryItem, InventorySource, Recipe, RecipeTag, UserPreferences } from "@/lib/types";
import { buildNotifications, daysUntil, filterRecipes, getInventoryStatus, isLowStock, sumMacros } from "@/lib/utils";

type NewInventoryItem = {
  name: string;
  category: InventoryItem["category"];
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

type AppStateContextValue = {
  inventory: InventoryItem[];
  groceryList: GroceryItem[];
  recipes: ReturnType<typeof filterRecipes>;
  recipeFilter: RecipeTag | "all";
  inventoryFilter: InventoryFilter;
  notifications: ReturnType<typeof buildNotifications>;
  preferences: UserPreferences;
  health: HealthSnapshot;
  stats: {
    totalItems: number;
    expiringThisWeek: number;
    expiredCount: number;
    lowStockCount: number;
    estimatedWasteAvoided: number;
    macros: ReturnType<typeof sumMacros>;
  };
  setRecipeFilter: (filter: RecipeTag | "all") => void;
  setInventoryFilter: (filter: InventoryFilter) => void;
  addInventoryItem: (payload: NewInventoryItem) => void;
  updateInventoryItem: (id: string, payload: NewInventoryItem) => void;
  consumeInventoryItem: (id: string) => void;
  reduceInventoryItem: (id: string, amount?: number) => void;
  addMissingIngredientsToGrocery: (recipe: Recipe) => void;
  addLowStockItemsToGrocery: () => void;
  addManualGroceryItem: (payload: Omit<GroceryItem, "id" | "source">) => void;
  removeGroceryItem: (id: string) => void;
  updatePreferences: (preferences: UserPreferences) => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

const STORAGE_KEYS = {
  inventory: "preserve.inventory",
  grocery: "preserve.grocery",
  preferences: "preserve.preferences"
};

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(initialGroceryList);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [recipeFilter, setRecipeFilter] = useState<RecipeTag | "all">("all");
  const [inventoryFilter, setInventoryFilter] = useState<InventoryFilter>("all");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setInventory(readStorage(STORAGE_KEYS.inventory, initialInventory));
    setGroceryList(readStorage(STORAGE_KEYS.grocery, initialGroceryList));
    setPreferences(readStorage(STORAGE_KEYS.preferences, defaultPreferences));
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(inventory));
  }, [hasHydrated, inventory]);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(STORAGE_KEYS.grocery, JSON.stringify(groceryList));
  }, [groceryList, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(preferences));
  }, [hasHydrated, preferences]);

  const notifications = useMemo(() => buildNotifications(inventory, groceryList), [inventory, groceryList]);

  const stats = useMemo(() => {
    const expiringThisWeek = inventory.filter((item) => daysUntil(item.expirationDate) <= 7 && getInventoryStatus(item) !== "expired").length;

    const expiredCount = inventory.filter((item) => getInventoryStatus(item) === "expired").length;
    const lowStockCount = inventory.filter(isLowStock).length;

    return {
      totalItems: inventory.length,
      expiringThisWeek,
      expiredCount,
      lowStockCount,
      estimatedWasteAvoided: 37,
      macros: sumMacros(inventory.slice(0, 5))
    };
  }, [inventory]);

  const recipes = useMemo(() => filterRecipes(recipeCatalog, recipeFilter, inventory), [inventory, recipeFilter]);

  const addInventoryItem = (payload: NewInventoryItem) => {
    setInventory((current) => [
      {
        id: `inv-${crypto.randomUUID()}`,
        ...payload
      },
      ...current
    ]);
  };

  const updateInventoryItem = (id: string, payload: NewInventoryItem) => {
    setInventory((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...payload
            }
          : item
      )
    );
  };

  const consumeInventoryItem = (id: string) => {
    setInventory((current) => current.filter((item) => item.id !== id));
  };

  const reduceInventoryItem = (id: string, amount = 1) => {
    setInventory((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        const quantity = Number((item.quantity - amount).toFixed(2));
        return quantity > 0 ? [{ ...item, quantity }] : [];
      })
    );
  };

  const addMissingIngredientsToGrocery = (recipe: Recipe) => {
    const inventoryNames = new Set(inventory.map((item) => item.name.toLowerCase()));
    const missing = recipe.ingredients.filter((ingredient) => !inventoryNames.has(ingredient.toLowerCase()));

    setGroceryList((current) => {
      const existing = new Set(current.map((item) => item.name.toLowerCase()));
      const additions = missing
        .filter((ingredient) => !existing.has(ingredient.toLowerCase()))
        .map((ingredient) => ({
          id: `gro-${crypto.randomUUID()}`,
          name: ingredient,
          category: "Recipe need",
          quantity: 1,
          unit: "pezzo",
          priority: "normal" as const,
          source: "auto" as const
        }));

      return [...current, ...additions];
    });
  };

  const addLowStockItemsToGrocery = () => {
    setGroceryList((current) => {
      const existing = new Set(current.map((item) => item.name.toLowerCase()));
      const additions = inventory
        .filter(isLowStock)
        .filter((item) => !existing.has(item.name.toLowerCase()))
        .map((item) => ({
          id: `gro-${crypto.randomUUID()}`,
          name: item.name,
          category: item.category,
          quantity: 1,
          unit: item.unit,
          priority: "high" as const,
          source: "auto" as const
        }));

      return [...current, ...additions];
    });
  };

  const addManualGroceryItem = (payload: Omit<GroceryItem, "id" | "source">) => {
    setGroceryList((current) => [
      ...current,
      {
        ...payload,
        id: `gro-${crypto.randomUUID()}`,
        source: "manual"
      }
    ]);
  };

  const removeGroceryItem = (id: string) => {
    setGroceryList((current) => current.filter((item) => item.id !== id));
  };

  const updatePreferences = (nextPreferences: UserPreferences) => {
    setPreferences(nextPreferences);
  };

  const value = useMemo<AppStateContextValue>(
    () => ({
      inventory,
      groceryList,
      recipes,
      recipeFilter,
      inventoryFilter,
      notifications,
      preferences,
      health: healthSnapshot,
      stats,
      setRecipeFilter,
      setInventoryFilter,
      addInventoryItem,
      updateInventoryItem,
      consumeInventoryItem,
      reduceInventoryItem,
      addMissingIngredientsToGrocery,
      addLowStockItemsToGrocery,
      addManualGroceryItem,
      removeGroceryItem,
      updatePreferences
    }),
    [groceryList, inventory, inventoryFilter, notifications, preferences, recipeFilter, recipes, stats]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
};
