// =======================
// API RESPONSE TYPES
// =======================

type CampaignReportInfluencerScore = {
    influencer_id: string
    name: string
    category: string
    followers: number
    engagement_rate: number
    ToneMatchScore: number
    ValueResonanceScore: number
    AudienceMatchScore: number
    RiskScore: number
    OverallScore: number
    FitStatus: string
  }
  
  type CampaignReportResponse = {
    campaign_id: string
    campaign_name: string
    scores: CampaignReportInfluencerScore[]
  }
  
  // =======================
  // TABLE ROW TYPE
  // =======================
  
  export type CampaignReportRow = {
    campaign_id: string
    campaign_name: string
    influencer_id: string
    name: string
    category: string
    followers: number
    engagement_rate: number
    ToneMatchScore: number
    ValueResonanceScore: number
    AudienceMatchScore: number
    RiskScore: number
    OverallScore: number
    FitStatus: string 
  }
  
  // =======================
  // FORMATTER FUNCTION
  // =======================
  
  export function formatCampaignReport(
    data: CampaignReportResponse[]
  ): CampaignReportRow[] {
    const result: CampaignReportRow[] = []
  
    data.forEach((campaign) => {
      campaign.scores.forEach((score) => {
        result.push({
          campaign_id: campaign.campaign_id,
          campaign_name: campaign.campaign_name,
          influencer_id: score.influencer_id,
          name: score.name,
          category: score.category,
          followers: score.followers,
          engagement_rate: score.engagement_rate,
          ToneMatchScore: score.ToneMatchScore,
          ValueResonanceScore: score.ValueResonanceScore,
          AudienceMatchScore: score.AudienceMatchScore,
          RiskScore: score.RiskScore,
          OverallScore: score.OverallScore,
          FitStatus: score.FitStatus,
        })
      })
    })
  
    return result
  }
  