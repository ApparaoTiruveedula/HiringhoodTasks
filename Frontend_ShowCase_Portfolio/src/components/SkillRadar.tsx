import React from 'react';
import { Radar } from 'react-chartjs-2';
import {Chart as ChartJS,RadialLinearScale,PointElement,LineElement,Filler,
Tooltip,Legend,ChartOptions,} from 'chart.js';
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SkillRadarData } from '../types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ChartContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: 300,
  },
}));

interface SkillRadarProps {
  data: SkillRadarData[];
}

const SkillRadarChart: React.FC<SkillRadarProps> = ({ data }) => {
  const theme = useTheme();

  const labels = data.map((item) => item.subject);
  const values = data.map((item) => item.A);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Skills',
        data: values,
        backgroundColor: theme.palette.primary.main + '99', 
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        pointBackgroundColor: theme.palette.primary.dark,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: theme.palette.text.secondary,
          backdropColor: 'transparent',
        },
        pointLabels: {
          color: theme.palette.text.primary,
          font: {
            size: 12,
          },
        },
        grid: {
          color: theme.palette.divider,
        },
        angleLines: {
          color: theme.palette.divider,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.formattedValue}%`;
          },
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        Frontend Skills
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 500, height: '100%' }}>
        <Radar data={chartData} options={options} />
      </Box>
    </ChartContainer>
  );
};

export default SkillRadarChart;
