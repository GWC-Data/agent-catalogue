export const fetchInventoryDataAPI = async () => {
    const res = await fetch(
      "https://inventorydisposal-462434048008.asia-south1.run.app/input/inventory_data"
    )
  
    if (!res.ok) {
      throw new Error("Failed to fetch inventory data")
    }
  
    return res.json()
  }
  
  export const runInventoryDisposalAPI = async (threadId: string) => {
    const res = await fetch(
      `https://inventorydisposal-462434048008.asia-south1.run.app/disposal/run?thread_id=${threadId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  
    if (!res.ok) {
      throw new Error("Failed to run inventory disposal agent")
    }
  
    return res.json()
  }
  