export interface Section {
  id: string;
  code: string;
  room: string;
  credits: number;
  capacity: { filled: number; total: number };
  type: string;
  professor: { name: string; avatar?: string };
  schedule: Array<{ days: string; hours: string }>;
  status: 'selected' | 'available' | 'full' | 'conflict';
}

export interface Subject {
  code: string;
  name: string;
  credits: number;
  sections: Section[];
}

export interface ScheduleItem {
  code: string;
  name: string;
  days: {
    Lun?: string;
    Mar?: string;
    Mier?: string;
    Jue?: string;
    Vie?: string;
    Sab?: string;
  };
  room: string;
  prof: string;
}
