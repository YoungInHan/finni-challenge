import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import * as React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import EditPatient from '../patients/EditPatient';
import NewPatient from '../patients/NewPatient';

interface PatientPageProps {
  edit: boolean;
}

const PatientPage = ({ edit }: PatientPageProps) => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto'
          }}>
          {edit ? <EditPatient /> : <NewPatient />}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default PatientPage;
