import { InventoryRow } from "@/pages/agents/menu_planning_agent/components/InventoryTable";

export function formatInventoryData(
    inventory: Record<string, number>
  ): InventoryRow[] {
    return Object.entries(inventory).map(([ingredient, quantity]) => ({
      ingredient,
      quantity,
    }))
  }