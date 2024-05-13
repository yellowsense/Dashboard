import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useContext, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import Layout from 'scenes/layout';
import Dashboard from 'scenes/dashboard';
import Provider from 'scenes/providers';
import Bookings from 'scenes/bookings';
import AddServiceprovider from 'scenes/add serviceprovider';
import Feedback from 'scenes/feedback';
import Superfone from 'scenes/superfone';
import Login from 'scenes/login/Login';
import { ProviderContext } from 'context/StoreContext';
import PrivateRoute from 'scenes/Private/PrivateRoute';

function App() {
  const [mode, setMode] = useState('dark');
  const {isAuth} = useContext(ProviderContext)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
         <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Navigate to="dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/providers" element={<Provider />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route
                path="/addserviceprovider"
                element={<AddServiceprovider />}
              />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/superfone" element={<Superfone />} />
            </Route>
              <Route path="/login" element={<Login/>} />
              </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
