export const fetchInfluencersAPI = async () => {
    const res = await fetch(
      "https://influencerfitmentagent-462434048008.asia-south1.run.app/input/influencers"
    )
    if (!res.ok) throw new Error("Failed to fetch influencers")
    return res.json()
  }
  
  export const fetchCampaignsAPI = async () => {
    const res = await fetch(
      "https://influencerfitmentagent-462434048008.asia-south1.run.app/input/campaigns"
    )
    if (!res.ok) throw new Error("Failed to fetch campaigns")
    return res.json()
  }
  
  export const executeWorkflowAPI = async (threadId: string) => {
    const res = await fetch(
      "https://influencerfitmentagent-462434048008.asia-south1.run.app/execute-workflow",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: threadId }),
      }
    )
  
    if (!res.ok) throw new Error("Failed to execute workflow")
    return res.json()
  }
  
  export const fetchAiScoringAPI = async () => {
    const res = await fetch(
      "https://influencerfitmentagent-462434048008.asia-south1.run.app/output/ai_scoring"
    )
    if (!res.ok) throw new Error("Failed to fetch AI scoring")
    return res.json()
  }
  
  export const fetchFitmentScoresAPI = async () => {
    const res = await fetch(
      "https://influencerfitmentagent-462434048008.asia-south1.run.app/output/fitment_scores"
    )
    if (!res.ok) throw new Error("Failed to fetch fitment scores")
    return res.json()
  }
  
  export const fetchCampaignReportAPI = async () => {
    const res = await fetch(
      "https://influencerfitmentagent-462434048008.asia-south1.run.app/output/campaign_report"
    )
    if (!res.ok) throw new Error("Failed to fetch campaign report")
    return res.json()
  }
  