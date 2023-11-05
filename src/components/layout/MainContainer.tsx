import { Box, Container } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const MainContainer = () => (
  <Box
    sx={{ backgroundColor: grey['100'] }}
    display="flex"
    flexDirection="column"
    minHeight={'100vh'}
  >
    <Header />
    <Container
      sx={{ mt: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}
      maxWidth={'md'}
    >
      <Outlet />
    </Container>
  </Box>
);
