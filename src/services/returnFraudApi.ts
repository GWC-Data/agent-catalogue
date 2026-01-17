export const fetchCustomerDataAPI = async () => {
    const res = await fetch(
      "https://abuse-return-detection-agent-462434048008.asia-south1.run.app/input/customer_data"
    )
    if (!res.ok) throw new Error("Failed to fetch customer data")
    return res.json()
  }
  
  export const fetchProductDataAPI = async () => {
    const res = await fetch(
      "https://abuse-return-detection-agent-462434048008.asia-south1.run.app/input/product_data"
    )
    if (!res.ok) throw new Error("Failed to fetch product data")
    return res.json()
  }
  
  export const fetchPoliciesAPI = async () => {
    const res = await fetch(
      "https://abuse-return-detection-agent-462434048008.asia-south1.run.app/policies"
    )
    if (!res.ok) throw new Error("Failed to fetch policies")
    return res.json()
  }
  
  export const runReturnFraudAgentAPI = async () => {
    const res = await fetch(
      "https://abuse-return-detection-agent-462434048008.asia-south1.run.app/run",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
  
    if (!res.ok) throw new Error("Failed to run return fraud agent")
    return res.json()
  }
  