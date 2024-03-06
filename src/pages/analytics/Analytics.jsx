import { useState, useEffect } from 'react'

import { Typography } from '@material-tailwind/react'

import Chart from 'react-apexcharts'

import { useAuthContext } from '../../hooks/useAuthContext'
import Layout from '../../layout/Layout'

export default function Analytics() {
  const {
    user,
    token,
  } = useAuthContext()

  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()

      if (response.ok) {
 
        const categoryAmounts = json.reduce((acc, transaction) => {
          const { category, amount } = transaction
          if (acc[category]) {
            acc[category] += amount
          } else {
            acc[category] = amount
          }
          return acc
        }, {})

        // Formatting data for chart
        const categories = Object.keys(categoryAmounts)
        const data = Object.values(categoryAmounts)

        // Setting up chart configuration
        const chartConfig = {
          type: 'bar',
          height: 400,
          series: [
            {
              name: 'Amount',
              data: data,
            },
          ],
          options: {
            chart: {
              toolbar: {
                show: false,
              },
            },
            title: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            colors: ['#020617'],
            plotOptions: {
              bar: {
                columnWidth: '40%',
                borderRadius: 2,
              },
            },
            xaxis: {
              categories: categories,
              labels: {
                style: {
                  colors: '#616161',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  fontWeight: 400,
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: '#616161',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  fontWeight: 400,
                },
              },
            },
            grid: {
              show: true,
              borderColor: '#dddddd',
              strokeDashArray: 5,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              padding: {
                top: 5,
                right: 20,
              },
            },
            fill: {
              opacity: 0.8,
            },
            tooltip: {
              theme: 'dark',
            },
          },
        }

        setChartData(chartConfig)
      }
    }

    if (user) {
      fetchTransactions()
    }
  }, [user]) // eslint-disable-line

  return (
    <>
      <Layout>
        <div className="flex grow flex-col py-10 px-16 h-screen overflow-y-auto w-full">
          <h2>Analytics &gt; {user.username}</h2>

          <div className="flex flex-col border rounded-md p-6 my-6">
            <Typography variant="h4">Transactions by Category</Typography>
            <div className="h-50">
              {chartData ? (
                <Chart {...chartData} />
              ) : (
                <Typography>Loading...</Typography>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
