import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import api from '../../services/api';
import Loading from '../components/Loading';

function UsersTypesChart() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('stats/dashboard').then(async (res) => {
      var dataRes = await res.data;
      setData([dataRes.data.administradoresCount, dataRes.data.professoresCount, dataRes.data.alunosCount]);
      setIsLoading(false);
    })
  }, [data]);

  const chartData = {
    labels: ['Administrador', 'Professor', 'Aluno'],
    datasets: [
      {
        label: 'Count',
        data,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{data.administradoresCount}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {isLoading ? <Loading /> : <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default UsersTypesChart;
