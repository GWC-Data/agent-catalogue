export const fetchCampaignsAPI = async () => {
    const res = await fetch(
      "https://campaign-performance-agent-462434048008.asia-south2.run.app/input/campaigns"
    )
  
    if (!res.ok) throw new Error("Failed to fetch campaigns")
  
    return res.json()
  }
  
  export const fetchCampaignPerformanceAPI = async () => {
    const res = await fetch(
      "https://campaign-performance-agent-462434048008.asia-south2.run.app/analyze-roas"
    )
  
    if (!res.ok) throw new Error("Failed to analyze campaign performance")
  
    return res.json()
  }
  