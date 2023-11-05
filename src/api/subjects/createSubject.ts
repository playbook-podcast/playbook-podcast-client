import { EAudioStatus, ISubject } from '../../types';

type CreateSubject = {
  title: string;
  body: string;
};

export const createSubject = ({ title, body }: CreateSubject): ISubject => {
  return {
    id: 1,
    title: 'The Future of Renewable Energy',
    body: 'As the world increasingly seeks sustainable sources of energy, the future of renewable energy looks bright. With advances in solar technology, wind energy efficiencies, and the untapped potential of tidal and geothermal power, the landscape of energy production is rapidly changing. This article explores the innovations driving this transformation and what we might expect in the coming decades.',
    bodyParsed: [],
    summary:
      'Exploration of the advances and future potential of renewable energy sources such as solar, wind, tidal, and geothermal power.',
    audioStatus: EAudioStatus.DONE,
  };
};
