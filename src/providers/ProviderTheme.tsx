import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

import { theme } from '../theme';

export const ProviderTheme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
