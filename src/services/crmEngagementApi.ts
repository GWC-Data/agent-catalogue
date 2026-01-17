export const fetchCrmCampaignsAPI = async () => {
  const res = await fetch(
    "https://email-crm-engagement-optimization-agent-462434048008.asia-south1.run.app/data/campaign"
  )

  if (!res.ok) {
    throw new Error("Failed to fetch CRM campaigns")
  }

  return res.json()
}

export const runCrmEngagementAgentAPI = async () => {
  const res = await fetch(
    "https://email-crm-engagement-optimization-agent-462434048008.asia-south1.run.app/agent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to run CRM engagement agent")
  }

  return res.json()
}
