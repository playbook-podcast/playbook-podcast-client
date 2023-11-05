import { Button as ButtonMUI, css, styled } from '@mui/material';

export const Button = styled(ButtonMUI)(
  () => css`
    font-weight: 500;
    text-transform: none;
    transition: all 0.3s ease-in-out;
  `,
);
