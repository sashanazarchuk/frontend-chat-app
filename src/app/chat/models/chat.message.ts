export interface IChatMessage {
    id?: number;
    userName: string;
    message: string;
    time: string;
    sentiment?: {
      label: string;
      emoji: string;
    };
  }