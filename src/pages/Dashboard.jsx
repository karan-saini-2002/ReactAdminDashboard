// src/pages/Dashboard.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// Example data for the chart
const chartData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

// Example data for the table
const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">1,200</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Sales</Typography>
            <Typography variant="h4">$34,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Visits</Typography>
            <Typography variant="h4">2,500</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Feedbacks</Typography>
            <Typography variant="h4">250</Typography>
          </Paper>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activity Table */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: 350, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
