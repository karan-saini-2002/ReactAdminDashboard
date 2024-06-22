import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ThemeToggle({ toggleTheme }) {
  const theme = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}

ThemeToggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};
