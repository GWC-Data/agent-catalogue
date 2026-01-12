// =======================
// API RESPONSE TYPES
// =======================

type FitmentScores = {
    influencer_id: string
    ToneMatchScore: number
    ValueResonanceScore: number
    AudienceMatchScore: number
    RiskScore: number
    OverallScore: number
    FitStatus: string
  }
  
  type CampaignScoresResponse = {
    campaign_id: string
    campaign_name: string
    scores: FitmentScores[]
  }
  
  // =======================
  // TABLE ROW TYPE
  // =======================
  
  export type FitmentScoresRow = {
    campaign_id: string
    campaign_name: string
    influencer_id: string
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
  
  export function formatFitmentScores(
    data: CampaignScoresResponse[]
  ): FitmentScoresRow[] {
    const result: FitmentScoresRow[] = []
  
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
          OverallScore: score.OverallScore,
          FitStatus: score.FitStatus,
        })
      })
    })
  
    return result
  }
  