import { useEffect } from 'react';
import { NextPage } from 'next';
import { Chart } from 'chart.js';
import styled from 'styled-components';

type ChartProps = {
  id: string;
  type: string;
  title: string;
  labels: string[];
  data: number[];
  query: string;
};

const StatChart: NextPage<ChartProps> = ({ 
  id, 
  type, 
  title, 
  labels, 
  data, 
  query 
}) => {
  useEffect(() => {
    const doc: any = document.getElementById(`chart-${id}`);
    const ctx = doc.getContext('2d');
    const chart = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
    });

    return () => {
      chart.destroy();
    };
  }, [query]);
  
  return (
    <Container>
      <StatTitle>{title}</StatTitle>
      <canvas id={`chart-${id}`}></canvas>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin: auto;
  position: relative;
  height: 40vh;
  width: 80vw;
`;

const StatTitle = styled.p`
  font-size: 2rem;
`;

export default StatChart;

