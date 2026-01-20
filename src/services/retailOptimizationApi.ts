export const fetchProductsAPI = async () => {
    const res = await fetch(
      "https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/input/products"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }
    return res.json()
  }
  
  export const fetchVendorPricesAPI = async () => {
    const res = await fetch(
      "https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/input/vendors-prices"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch vendor prices")
    }
    return res.json()
  }

  // AGENT API's
  export const startWorkflowAPI = async (payload: {
    available_budget: number
    executor: string
    thread_id: string
  }) => {
    const res = await fetch(
      "https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/start",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
  
    if (!res.ok) throw new Error("Failed to start workflow")
    return res.json()
  }
  
  export const fetchWorkflowStateAPI = async (workflowId: number) => {
    const res = await fetch(
      `https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/${workflowId}`
    )
    if (!res.ok) throw new Error("Failed to fetch workflow state")
    return res.json()
  }
  
  export const approveWorkflowAPI = async (
    workflowId: number,
    approver: string,
    comments: string
  ) => {
    const res = await fetch(
      `https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/${workflowId}/approve`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          approver,
          comments,
        }),
      }
    )
  
    if (!res.ok) throw new Error("Failed to approve workflow")
    return res.json()
  }

  export const rejectWorkflowAPI = async (workflowId: number) => {
    const res = await fetch(
      `https://aai-case-study-retail-optimization-462434048008.asia-south2.run.app/api/v1/workflows/${workflowId}`
    )
  
    if (!res.ok) {
      throw new Error("Failed to reject workflow")
    }
  
    return res.json()
  }
  