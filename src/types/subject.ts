export enum EAudioStatus {
  PENDING = 'pending',
  DONE = 'done',
}

export interface ISubjectListItem {
  id: number;
  title: string;
  audioStatus: EAudioStatus;
}

export interface ISubject extends ISubjectListItem {
  body: string;
  summary: string;
}
