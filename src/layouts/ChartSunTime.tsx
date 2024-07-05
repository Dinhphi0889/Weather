import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,

    ChartOptions,
    Plugin,
    ChartData,

} from 'chart.js';
import { useEffect } from 'react'
import 'chartjs-plugin-annotation'

const customDoughnutPlugin: Plugin = {
    id: 'customDoughnutPlugin',
    afterDraw: (chart) => {
        const { ctx, chartArea: { top, left, width, height } } = chart;
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        chart.data.datasets.forEach((dataset, i) => {

            const meta = chart.getDatasetMeta(i);
            // const elementCount = meta.data.length;
            // const midPointIndex = Math.floor(elementCount / 2);

            if (meta.data.length > 1) {
                const firstPoint = meta.data[0];
                const secondPoint = meta.data[1];

                // Tính toán vị trí giữa của hai điểm
                const midX = (firstPoint.x + secondPoint.x) / 1.4;
                const midY = (firstPoint.y + secondPoint.y) / 4.6;

                ctx.save();
                const img = new Image();
                img.src = `https://cdn-icons-png.freepik.com/512/1400/1400310.png`;
                img.onload = () => {
                    const imgSize = 18;
                    ctx.drawImage(img, midX - imgSize / 2, midY - imgSize / 2, imgSize, imgSize);
                };
                ctx.restore();
            }

        });
    },
};
export default function ChartSunTime() {
    const data: ChartData<'doughnut'> = {
        datasets: [
            {
                label: 'Time',
                data: [15, 9],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgb(241, 177, 15)', 'rgb(255, 255, 255)'],
                borderWidth: 1,
                weight: 0,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        rotation: -90,
        circumference: 180,
        responsive: true,
        borderColor: 'red',
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    useEffect(() => {
        ChartJS.register(customDoughnutPlugin);
        return () => {
            ChartJS.unregister(customDoughnutPlugin);
        };
    }, []);

    return <Doughnut style={{objectFit:'cover'}} data={data} options={options} />;
};
