import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const MainContainer = () => (
  <Container>
    <Header />
    <Outlet />
  </Container>
);
