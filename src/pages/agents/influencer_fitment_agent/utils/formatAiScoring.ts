// =======================
// API RESPONSE TYPES
// =======================

type AiInfluencerScore = {
    influencer_id: string
    ToneMatchScore: number
    ValueResonanceScore: number
    AudienceMatchScore: number
    RiskScore: number
  }
  
  type AiCampaignScoreResponse = {
    campaign_id: string
    campaign_name: string
    scores: AiInfluencerScore[]
  }
  
  // =======================
  // TABLE ROW TYPE
  // =======================
  
  export type AiScoringRow = {
    campaign_id: string
    campaign_name: string
    influencer_id: string
    ToneMatchScore: number
    ValueResonanceScore: number
    AudienceMatchScore: number
    RiskScore: number
  }
  
  // =======================
  // FORMATTER FUNCTION
  // =======================
  
  export function formatAiScoring(
    data: AiCampaignScoreResponse[]
  ): AiScoringRow[] {
    const result: AiScoringRow[] = []
  
    data.forEach((campaign) => {
      campaign.scores.forEach((score) => {
        result.push({
          campaign_id: campaign.campaign_id,
          campaign_name: campaign.campaign_name,
          influencer_id: score.influencer_id,
          ToneMatchScore: score.ToneMatchScore,
          ValueResonanceScore: score.ValueResonanceScore,
          AudienceMatchScore: score.AudienceMatchScore,
          RiskScore: score.RiskScore,
        })
      })
    })
  
    return result
  }
  