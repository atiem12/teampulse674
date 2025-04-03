
export interface LikertResponses {
  workload: string;
  support: string;
  communication: string;
  growth: string;
  purpose: string;
}

export interface OpenEndedResponses {
  highlight: string;
  challenge: string;
  improvement: string;
  recognition: string;
  additional: string;
}

export interface Submission {
  id: string;
  date: string;
  submittedAt: string;
  likertResponses: LikertResponses;
  openEndedResponses: OpenEndedResponses;
}
