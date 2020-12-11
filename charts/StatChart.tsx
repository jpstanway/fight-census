import { useEffect } from 'react';
import { NextPage } from 'next';
import { Chart } from 'chart.js';
import styled from 'styled-components';

type ChartProps = {
  type: string;
  title: string;
  labels: string[];
  data: number[];
};

const StatChart: NextPage<ChartProps> = ({ type, title, labels, data }) => {
  useEffect(() => {
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
    });
  }, []);
  
  return (
    <Container>
      <p>{title}</p>
      <Canvas id="donutChart"></Canvas>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Canvas = styled.canvas`
  width: 40rem;
  height: 40rem;
`;

export default StatChart;