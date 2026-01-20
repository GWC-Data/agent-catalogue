export const fetchResolversAPI = async () => {
    const res = await fetch(
      "https://smartresolver-ai-powered-it-incident-assistant-462434048008.asia-south1.run.app/input/resolvers"
    )
    if (!res.ok) throw new Error("Failed to fetch resolvers")
    return res.json()
  }
  
  export const fetchTicketsAPI = async () => {
    const res = await fetch(
      "https://smartresolver-ai-powered-it-incident-assistant-462434048008.asia-south1.run.app/input/tickets"
    )
    if (!res.ok) throw new Error("Failed to fetch tickets")
    return res.json()
  }
  
  export const fetchAgentAPI = async () => {
    const res = await fetch(
      "https://smartresolver-ai-powered-it-incident-assistant-462434048008.asia-south1.run.app/agent"
    )
    if (!res.ok) throw new Error("Failed to fetch agent")
    return res.json()
  }
  
