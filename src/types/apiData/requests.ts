export type requests = {
  id: number;
  user_id: number;
  shortlet_id: number;
  request_id: string;
  status: string;
  subject: string;
  description: string;
  is_escalated: number;
  escalation_reason: string;
  created_at: string;
  updated_at: string;
  shortlet: {
    id: number;
    name: string;
  };
};
export type requestLists = {
  id: string;
  customerName: string;
  apartnmentName: string;
  date: string;
  type: string;
  description: string;
  isEscalated: string;
  status: string;
}[];

export type requestById = {
  id: string;
  customerName: string;
  apartnmentName: string;
  date: string;
  type: string;
  description: string;
  isEscalated: string;
  status: string;
};
