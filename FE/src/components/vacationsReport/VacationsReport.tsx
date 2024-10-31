import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { getVacationReportData } from '../../client/vacationsApi';
import { getToken } from '../../client/authApi';
import './VacationsReport.css';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

Chart.register(...registerables);

type Props = {}

const VacationsReport = (props: Props) => {
    const navigate = useNavigate();
    const [vacationsData, setVacationsData] = useState<{ destination: string; followersCount: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken() || '';
            const data = await getVacationReportData(token);
            setVacationsData(data);
        };
        fetchData();
    }, []);

    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [
            {
                label: 'Number of Followers',
                data: [] as number[],
                backgroundColor: '#abe2ff',
            },
        ],
    });

    useEffect(() => {
        const labels = vacationsData.map(v => v.destination);
        const data = vacationsData.map(v => v.followersCount);
        setChartData({
            labels,
            datasets: [{ ...chartData.datasets[0], data }],
        });
    }, [vacationsData]);

    const downloadCSV = () => {
        const csvContent = 'Destination,Followers\n' +
            vacationsData.map(v => `${v.destination}, ${v.followersCount}`).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'vacation_followers.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <h2 className='vacations-report-title'>Vacations Report</h2>
            <div className="report-container">
                <Bar className='vacations-report-chart' data={chartData} options={{ responsive: true }} />
                <div className="button-container">
                    <button type="button" className="btn btn-link return-link" onClick={() => navigate('/')}>Return to the vacations page <FaArrowRight /></button>
                    <button type="button" className="btn btn-primary download-btn" onClick={downloadCSV}>Download as CSV file <FaDownload /></button>
                </div>
            </div>
        </div>
    );
}

export default VacationsReport;