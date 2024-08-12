'use client';
import { Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import formatPriceAsTurkishLira from "../ortalama/helper/formatPriceAsTurkishLira";

export default function ApexBarChartSecenek({ categories,links, data, label, onCategoryClick }) {
    debugger
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
                return val.toFixed(0)
            },
            offsetX: 0,
        },
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
      
     stackType: '100%',
            id: "basic-bar",
            events: {
                dataPointSelection: function(event, chartContext, config) {
                    const categoryIndex = config.dataPointIndex;
                    const category = categories[categoryIndex];
                    const link =links[categoryIndex]
                    if (onCategoryClick) {
                        onCategoryClick(category, link);
                    }
                }
            }
        },
        xaxis: {
            categories: categories,
            labels: {
                formatter: function (value) {
                    return value 
                }
            }
        },
        plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                total: {
                  enabled: true,
                  offsetX: 0,
                
                }
              }
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
    }



    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Typography variant="h5" textAlign="center">{label}</Typography>
                    <Chart
                        options={options}
                        series={data}
                        type="bar"
                      
                    />
                </div>
            </div>
        </div>
    )
}