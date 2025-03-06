// 📂 shared-theme/ColorModeSelect.js
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ColorModeSelect() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.style.backgroundColor = darkMode ? '#fff' : '#121212';
  };

  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
