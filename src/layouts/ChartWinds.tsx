import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';

export const ChartWinds = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);
    Chart.register(...registerables)
    let data = [
        { time: '1h', windSpeed: 10 },
        { time: '2h', windSpeed: 3 },
        { time: '3h', windSpeed: 8 },
        { time: '4h', windSpeed: 6 },
        { time: '5h', windSpeed: 5 },
    ];
    const createChart = (ctx: CanvasRenderingContext2D) => {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((tittle) => { return tittle.time }),
                datasets: [
                    {
                        label: 'm/s',
                        data: data.map((winds) => { return winds.windSpeed }),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 2000,
                    loop:true,
                    easing:'linear',
                },
            }
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const myChart = createChart(ctx);
                setChartInstance(myChart);
            }
        }

        return () => {
            chartInstance?.destroy();
        };
    }, []);
    return <canvas ref={canvasRef} />;
};

