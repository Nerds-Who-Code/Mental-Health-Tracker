import React from 'react';
import {Link} from "react-router-dom";
import Chart from "chart.js/auto";
import {Line, Bar, Pie} from "react-chartjs-2";
import ErrorBoundary from './ErrorBoundary';

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {    
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

export default function EntryOverviewPage() {

    return (
        <div>
            <div className='flex flex-col items-center justify-center   '>
                <h1
                  className='m-2'>
                  Your Mental Health Overview</h1>
                <Link to="/dashboard">
                  <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mx-2'>
                    Go back to dashboard
                  </button>
                </Link>
            </div>
            <div>
            <ErrorBoundary>
                <Bar data={data} />
              </ErrorBoundary>
              <ErrorBoundary>
                <Pie data={data} />
              </ErrorBoundary>
              <ErrorBoundary>
                <Line data={data} />
              </ErrorBoundary>
            </div>
        </div>
    );
}
//<Line data={data} />

{/* <ErrorBoundary>
  <LineChart />
</ErrorBoundary> */}
