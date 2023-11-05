import { Box, CircularProgress } from '@mui/material';

export const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
    <CircularProgress />
  </Box>
);
