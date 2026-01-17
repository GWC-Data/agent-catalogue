export const fetchLeadsAPI = async () => {
    const res = await fetch(
      "https://lead-distribution-agent-462434048008.asia-south2.run.app/leads"
    )
    if (!res.ok) throw new Error("Failed to fetch leads")
    return res.json()
  }
  
  export const fetchRepsAPI = async () => {
    const res = await fetch(
      "https://lead-distribution-agent-462434048008.asia-south2.run.app/reps"
    )
    if (!res.ok) throw new Error("Failed to fetch reps")
    return res.json()
  }
  
  export const runLeadDistributionAgentAPI = async () => {
    const res = await fetch(
      "https://lead-distribution-agent-462434048008.asia-south2.run.app/trigger",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
    if (!res.ok) throw new Error("Failed to run lead distribution agent")
    return res.json()
  }
  
  export const resetLeadDistributionAPI = async () => {
    const res = await fetch(
      "https://lead-distribution-agent-462434048008.asia-south2.run.app/reset",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
    if (!res.ok) throw new Error("Failed to reset agent")
    return res.json()
  }
  