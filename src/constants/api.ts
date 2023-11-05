export class Api {
  public static readonly SUBJECTS = '/subjects';
  public static readonly SUBJECT_BY_ID = '/subject/:id';
}

export const API_URL = import.meta.env.VITE_API_URL;
