// src/pages/Tables.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Tables.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  // Add more columns as needed
];

const rows = [
  { id: 1, name: 'John Doe' },
  // Add more rows as needed
];

export default function Tables() {
  return (
    <div className="data-grid-container">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

