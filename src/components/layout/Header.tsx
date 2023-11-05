import { Box, BoxProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import iconAvatar from '../../assets/icons/ic-avatar.png';
import iconLogoFull from '../../assets/icons/ic-logo-full.png';
import { ERouting } from '../../constants';
import { EColorName } from '../../constants/palette';

const IconContainer = ({
  src,
  alt,
  ...restProps
}: BoxProps & { src: string; alt: string }) => (
  <Box display="flex" alignItems={'center'} {...restProps}>
    <img src={src} alt={alt} style={{ objectFit: 'contain', maxWidth: '100%' }} />
  </Box>
);

export const Header = () => {
  return (
    <Box
      bgcolor={EColorName.WHITE}
      component={'header'}
      width={'100%'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderBottom={`1px solid ${grey['300']}`}
      p={'16px 24px'}
    >
      <Link to={ERouting.HOME}>
        <IconContainer width={'102px'} src={iconLogoFull} alt={'PlayBook Podcast logo'} />
      </Link>
      <Box>
        <Box display="flex" alignItems={'center'}>
          <IconContainer width={'24px'} src={iconAvatar} alt={'Avatar icon'} />
        </Box>
      </Box>
    </Box>
  );
};
