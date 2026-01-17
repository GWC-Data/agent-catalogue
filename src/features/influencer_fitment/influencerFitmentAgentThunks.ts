import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  executeWorkflowAPI,
  fetchAiScoringAPI,
  fetchFitmentScoresAPI,
  fetchCampaignReportAPI,
} from "@/services/influencerFitmentApi"
import { generateThreadId } from "@/utils/generateThreadId"
import { formatAiScoring } from "./utils/formatAiScoring"
import { formatFitmentScores } from "./utils/formatFitmentScores"
import { formatCampaignReport } from "./utils/formateCampaignReport"

export const runInfluencerFitmentWorkflow = createAsyncThunk(
  "influencerFitment/runWorkflow",
  async (_, thunkAPI) => {
    try {
      const threadId = generateThreadId()

      const workflowRes = await executeWorkflowAPI(threadId)

      const [aiRes, fitmentRes, campaignRes] = await Promise.all([
        fetchAiScoringAPI(),
        fetchFitmentScoresAPI(),
        fetchCampaignReportAPI(),
      ])
      return {
        message: workflowRes?.message,
        aiScoring: formatAiScoring(aiRes?.data),
        fitmentScores: formatFitmentScores(fitmentRes?.data),
        campaignReport: formatCampaignReport(campaignRes?.data),
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
