import { Sales } from "@/pages/agents/menu_planning_agent/components/SalesTable";

export function formatDailySales(data: any[]): Sales[] {
    return data.map(item => ({
      date: item.date,
      PaneerTikka: item["Paneer Tikka"],
      VegBiryani: item["Veg Biryani"],
      MasalaDosa: item["Masala Dosa"],
      ChickenCurry: item["Chicken Curry"],
      GobiManchurian: item["Gobi Manchurian"],
    }))
  }
  