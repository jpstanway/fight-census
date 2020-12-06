import { useEffect } from 'react';
import { NextPage } from 'next';
import { Chart } from 'chart.js';
import styled from 'styled-components';

type ChartProps = {
  label: string;
  data: number[];
};

const Donut: NextPage<ChartProps> = ({ label, data }) => {
  useEffect(() => {
    const ctx = document.getElementById('donutChart').getContext('2d');
    const donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bigger', 'Smaller', 'Equal'],
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
      <p>{label}</p>
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

export default Donut;