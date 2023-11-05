export enum EAudioStatus {
  PENDING = 'pending',
  DONE = 'done',
}

export interface ISubjectListItem {
  id: number;
  title: string;
  audioStatus: EAudioStatus;
  // TODO: unify bodyParsed key with backend
  timeToRead: number;
  timeToListen: number;
}

export type TranscriptionItemProps = {
  id: number;
  text: string;
  start: number;
  end: number;
};

export type SubjectSectionItem = {
  text: string;
  transcription: TranscriptionItemProps[];
  audioUrl?: string;
};

export enum ESubjectSections {
  INTRODUCTION = 'introduction',
  BODY = 'body',
  SUMMARY = 'summary',
}

export interface ISubject extends ISubjectListItem {
  [ESubjectSections.INTRODUCTION]: SubjectSectionItem;
  [ESubjectSections.BODY]: SubjectSectionItem;
  [ESubjectSections.SUMMARY]: SubjectSectionItem;
}
