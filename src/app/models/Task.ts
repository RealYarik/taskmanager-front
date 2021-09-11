export interface Task {
  id: number;
  name: string;
  description: string;
  author?: string;
  executor: string;
  isClosed?: boolean;
  solutionNumber?: number;
  createDate: string;
}
