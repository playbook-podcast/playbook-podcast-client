export enum EAudioStatus {
  PENDING = 'pending',
  DONE = 'done',
}

export interface ISubjectListItem {
  id: number;
  title: string;
  audioStatus: EAudioStatus;
}

export type SubjectBodyItemProps = {
  id: number;
  text: string;
  start: number;
  end: number;
};

export interface ISubject extends ISubjectListItem {
  body: string;
  bodyAudioUrl?: string;
  bodyTranscription: SubjectBodyItemProps[];
  summary: string;
}
