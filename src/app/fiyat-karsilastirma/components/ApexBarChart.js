'use client';
import { Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

export default function ApexBarChart({ categories,data, label }) {
  

    const options = {
        yaxis: {
            labels: {
              formatter: function (value) {
                return value;
              }
            },
          },
        dataLabels: {
            enabled: true,
          
            formatter: function(val, opt) {
                return   val.toFixed(2) +' TL'
            },
            offsetX: 0,
          },
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: categories,
            labels: {
                formatter: function (value) {
                  return  value ;
                }
              }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        }
    }

    const series = [
        {
            name: "series-1",
            data
        }

    ]

    return <div className="app">
        <div className="row">
            <div className="mixed-chart">
                <Typography textAlign="center">{label}</Typography>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="100%"
                />
            </div>
        </div>
    </div>
}




