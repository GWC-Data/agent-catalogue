export const fetchHistoricalPromotionsAPI = async () => {
    const res = await fetch("https://retail-promotion-effectiveness-462434048008.asia-south1.run.app/api/v1/input/historical_promotions")
    if(!res.ok) throw new Error("Failed to fetch Historical Promotions")
        return res.json()
}
export const fetchLivePromotionsAPI = async () => {
    const res = await fetch("https://retail-promotion-effectiveness-462434048008.asia-south1.run.app/api/v1/input/live_promotions")
    if(!res.ok) throw new Error("Failed to fetch Live Promotions")
        return res.json()
}

export const fetchAgentOutputAPI = async () => {
    const res = await fetch("https://retail-promotion-effectiveness-462434048008.asia-south1.run.app/agent")
    if(!res.ok) throw new Error("Failed to fetch Live Promotions")
        return res.json()
}
