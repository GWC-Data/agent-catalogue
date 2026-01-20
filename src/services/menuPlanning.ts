export const fetchDishesAPI = async () => {
    const res = await fetch(
      "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/input/dishes"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch Dishes")
    }
    return res.json()
  }
  
  export const fetchInventoryAPI = async () => {
    const res = await fetch(
      "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/input/inventory"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch inventory")
    }
    return res.json()
  }

  export const fetchVendorsAPI = async () => {
    const res = await fetch(
      "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/input/vendors"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch vendors")
    }
    return res.json()
  }
  
  export const fetchRecipesAPI = async () => {
    const res = await fetch(
      "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/input/recipes"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch recipes")
    }
    return res.json()
  }

  export const fetchSalesAPI = async () => {
      const res = await fetch(
        "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/input/sales"
      )
      if (!res.ok) {
        throw new Error("Failed to sales")
      }
      return res.json()
    }
    
    export const menuPlanningWorkflowAgentAPI = async (threadId: string) => {
        const res = await fetch(
          "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/workflows/execute",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              forecast_days: 7,
              minimum_score_threshold: 80,
              thread_id: threadId
            }),
          }
        )
      
        if (!res.ok) throw new Error("Failed to approve agent")
        return res.json()
      }

      export const ApproveAgentAPI = async (
        threadId: string,
        message: string
      ) => {
        const res = await fetch(
          "https://smart-menu-planning-inventory-optimization-462434048008.asia-south2.run.app/workflows/approve",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              thread_id: threadId,
              approved: true,
              message,
            }),
          }
        )
      
        if (!res.ok) throw new Error("Failed to approve agent")
        return res.json()
      }