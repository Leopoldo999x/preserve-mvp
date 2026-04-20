import { Minus, Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { InventoryItem } from "@/lib/types";
import { categoryLabel, daysUntil, formatShortDate, getInventoryStatus, inventoryStatusLabel, isLowStock, sourceLabel } from "@/lib/utils";

const badges = {
  fresh: "bg-preserve.mint text-preserve.leaf",
  expiring: "bg-[#FFF1DA] text-[#A85F00]",
  expired: "bg-[#FFF0EE] text-[#B24034]"
};

export const InventoryRow = ({
  item,
  onEdit,
  onConsume,
  onReduce,
  onQueue
}: {
  item: InventoryItem;
  onEdit: () => void;
  onConsume: () => void;
  onReduce: () => void;
  onQueue: () => void;
}) => {
  const status = getInventoryStatus(item);
  const remainingDays = daysUntil(item.expirationDate);

  return (
    <div className="grid gap-4 rounded-[24px] border border-[#E8EEE9] bg-white px-4 py-4 lg:grid-cols-[1.7fr_0.9fr_0.9fr_0.8fr_0.9fr_1.25fr] lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-preserve.ink">{item.name}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badges[status]}`}>{inventoryStatusLabel(status)}</span>
          {isLowStock(item) ? <span className="rounded-full bg-[#EDF5FF] px-3 py-1 text-xs font-semibold text-[#255D9D]">Scorte basse</span> : null}
        </div>
        <p className="mt-1 text-sm text-preserve.slate">
          {categoryLabel(item.category)} • Inserito via {sourceLabel(item.source)}
        </p>
      </div>
      <div>
        <p className="text-sm text-preserve.slate">Quantita</p>
        <p className="font-medium text-preserve.ink">
          {item.quantity} {item.unit}
        </p>
      </div>
      <div>
        <p className="text-sm text-preserve.slate">Scadenza</p>
        <p className="font-medium text-preserve.ink">{formatShortDate(item.expirationDate)}</p>
        <p className="text-xs text-preserve.slate">
          {remainingDays < 0 ? `${Math.abs(remainingDays)} giorno/i fa` : `${remainingDays} giorno/i rimanenti`}
        </p>
      </div>
      <div>
        <p className="text-sm text-preserve.slate">Nutrizione</p>
        <p className="font-medium text-preserve.ink">{item.calories} kcal</p>
      </div>
      <div className="text-sm text-preserve.slate">
        <p>P {item.protein}g</p>
        <p>C {item.carbs}g</p>
        <p>F {item.fats}g</p>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-end">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#D8E5DC] px-3 py-2 text-sm font-medium text-preserve.ink transition hover:bg-[#F5FAF6]"
        >
          <Pencil className="h-4 w-4" />
          Modifica
        </button>
        <button
          onClick={onReduce}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#D8E5DC] px-3 py-2 text-sm font-medium text-preserve.ink transition hover:bg-[#F5FAF6]"
        >
          <Minus className="h-4 w-4" />
          Riduci
        </button>
        <button
          onClick={onQueue}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#D8E5DC] px-3 py-2 text-sm font-medium text-preserve.ink transition hover:bg-[#F5FAF6]"
        >
          <ShoppingCart className="h-4 w-4" />
          Riordina
        </button>
        <button
          onClick={onConsume}
          className="inline-flex items-center gap-2 rounded-2xl bg-preserve.ink px-3 py-2 text-sm font-medium text-white transition hover:bg-[#0f271f]"
        >
          <Trash2 className="h-4 w-4" />
          Consumato
        </button>
      </div>
    </div>
  );
};
