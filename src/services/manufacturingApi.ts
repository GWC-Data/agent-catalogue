
export const fetchHistoricalSalesAPI = async () => {
    const res = await fetch("https://manufacturingagent-462434048008.asia-south1.run.app/input/historical_sales")
    if(!res.ok) throw new Error("Failed to fetch Historical Sales")
        return res.json()
}
export const fetchVendorMasterAPI = async () => {
    const res = await fetch("https://manufacturingagent-462434048008.asia-south1.run.app/input/vendor_master")
    if(!res.ok) throw new Error("Failed to fetch Vendor Master")
        return res.json()
}

// ✅ Manufacturing Agent APIs
export const runManufacturingAgentAPI = async (threadId: string) => {
    const res = await fetch(
      "https://manufacturingagent-462434048008.asia-south1.run.app/v1/agent/run",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: threadId }),
      }
    )
  
    if (!res.ok) throw new Error("Failed to run manufacturing agent")
    return res.json()
  }
  
  export const approveManufacturingAgentAPI = async (
    threadId: string,
    comments: string
  ) => {
    const res = await fetch(
      "https://manufacturingagent-462434048008.asia-south1.run.app/v1/agent/resume",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thread_id: threadId,
          approved: true,
          comments,
        }),
      }
    )
  
    if (!res.ok) throw new Error("Failed to approve agent")
    return res.json()
  }