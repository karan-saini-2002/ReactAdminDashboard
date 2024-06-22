// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Charts from './pages/Charts';
import CalendarPage from './pages/Calendar';
import Kanban from './pages/Kanban';
import './global.css';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.palette.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <ThemeToggle toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
