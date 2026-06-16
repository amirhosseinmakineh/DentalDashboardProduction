import { ScoreReason } from "../../enums/scoreReason";
import { ScoreSource } from "../../enums/scoreSource";

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
