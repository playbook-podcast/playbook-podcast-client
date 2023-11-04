import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { ERouting } from '../../constants';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      component={'header'}
      width={'100%'}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Link to={ERouting.HOME}>Header</Link>

      <Button onClick={() => navigate(ERouting.CREATE_SUBJECT)}>Create subject</Button>
    </Box>
  );
};
