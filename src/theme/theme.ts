import { createTheme } from '@mui/material';

import { EColorName } from '../constants/palette';

export const theme = createTheme({
  palette: {
    primary: {
      main: EColorName.PURPLE_HEART,
    },
  },
  typography: {
    h1: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '20x',
      lineHeight: '28px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
    },
  },
  components: {},
});
