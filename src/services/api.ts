
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


export const fetchAgentOutputAPI = async () => {
    const res = await fetch("https://manufacturingagent-462434048008.asia-south1.run.app/v1/agent/run")
    if(!res.ok) throw new Error("Failed to fetch Vendor Master")
        return res.json()
}

export const fetchAgentApprovOutputAPI = async () => {
    const res = await fetch("https://manufacturingagent-462434048008.asia-south1.run.app/v1/agent/resume")
    if(!res.ok) throw new Error("Failed to fetch Vendor Master")
        return res.json()
}