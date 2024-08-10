'use client';
import { Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import formatPriceAsTurkishLira from "./helper/formatPriceAsTurkishLira";

export default function ApexBarChart({ categories,links, data, label, onCategoryClick }) {
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
                return formatPriceAsTurkishLira(val.toFixed(2))
            },
            offsetX: 0,
        },
        chart: {
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
                    return value;
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

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Typography variant="h5" textAlign="center">{label}</Typography>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                    />
                </div>
            </div>
        </div>
    )
}