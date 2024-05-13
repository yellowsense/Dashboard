import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const Feedback = () => {
  const theme = useTheme();
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'serviceprovider_name',
      headerName: 'Service Provider Name',
      width: 200,
    },

    {
      field: 'serviceprovider_number',
      headerName: 'Service Provider Number',
      width: 200,
    },
    { field: 'customer_number', headerName: 'Customer Number', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 120 },
    { field: 'feedback', headerName: 'Feedback', flex: 1 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://backendapiyellowsense.azurewebsites.net/get_feedback_details'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setFeedbackData(result.feedback_details);
        console.log(result.feedback_details);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Feedback Of Customer" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          rows={feedbackData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 30]}
          pagination
        />
      </Box>
    </Box>
  );
};

export default Feedback;
