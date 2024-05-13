import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import Header from 'components/Header';
import dataa from './data'; // Assuming data.js is in the same directory as this file

const Superfone = () => {
  const theme = useTheme();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataa.length > 0) {
      const keys = Object.keys(dataa[0]);
      const defaultColumns = keys.map((key) => ({
        field: key,
        headerName: key,
        width: 200,
      }));
      setColumns(defaultColumns);
      setData(dataa.map((row, index) => ({ id: row['Call ID'], ...row }))); // Ensure each row has a unique id
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
  
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) || [];
  
        if (parsedData.length > 0) {
          const headers = parsedData[0];
  
          const dynamicColumns = headers.map((header, index) => ({
            field: `column_${index}`,
            headerName: header.trim(),
            width: 200,
          }));
  
          const dataRows = parsedData.slice(1).map((row, rowIndex) => {
            const rowData = { id: rowIndex + 1 };
  
            row.forEach((column, index) => {
              rowData[`column_${index}`] = column;
            });
  
            return rowData;
          });
  
          setColumns(dynamicColumns);
          setData(dataRows);
        }
      };
  
      reader.readAsBinaryString(file);
    }
  };
  

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title="Superfone"
          subtitle="List of All Calls"
        />

        <input type='file' onChange={handleFileChange} />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          autoWidth
        />
      </Box>
    </Box>
  );
};

export default Superfone;
