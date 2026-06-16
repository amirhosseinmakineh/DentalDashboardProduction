import { ScoreReason } from "../../enums/ScoreReason";
import { ScoreSource } from "../../enums/ScoreSource";

export interface AddScoreLogCommand
{
  consultantProfileId: number;
  source: ScoreSource;
  reason: ScoreReason;
  scoreValue: number;
  description?: string;
  leadAssignmentId?: number | null;
  createdByUserId?: string | null;
}
