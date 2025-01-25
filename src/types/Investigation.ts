export interface Investigation {
  id: string;
  title: string;
  source: string;
  alertFiredTimestamp: string;
  lastUpdatedTimestamp: string;
  severity: string;
  analystAssigned: string;
  determination: string;
  readyForReview: string;
}
