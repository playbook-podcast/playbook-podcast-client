import { css, IconButton as IconButtonMUI, styled } from '@mui/material';

export const IconButton = styled(IconButtonMUI)(
  () => css`
    width: 32px;
    height: 32px;

    svg {
      width: 32px;
      height: 32px;
    }
  `,
);
