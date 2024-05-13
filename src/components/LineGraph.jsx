import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const LineGraph = () => {
  return (
    <div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        series={[
          {
            data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
            showMark: ({ index }) => index % 2 === 0,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default LineGraph;
