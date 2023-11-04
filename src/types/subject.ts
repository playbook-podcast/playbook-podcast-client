export enum AudioStatus {
  pending = 'pending',
  done = 'done',
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
