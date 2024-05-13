import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Bargraph = () => {
  return (
    <div>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          },
        ]}
        series={[{ data: [4, 8, 4, 6, 10, 6, 8] }]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Bargraph;
