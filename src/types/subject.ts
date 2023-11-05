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
  // TODO: unify bodyParsed key with backend
  audioLink?: string;
  bodyParsed: SubjectBodyItemProps[];
  summary: string;
}
