export enum EAudioStatus {
  PENDING = 'pending',
  DONE = 'done',
}

export interface ISubjectListItem {
  id: number;
  title: string;
  audioStatus: AudioStatus;
}

export interface ISubject extends ISubjectListItem {
  body: string;
  summary: string;
}
