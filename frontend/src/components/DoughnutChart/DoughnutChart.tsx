import React, { useEffect } from "react";
import { create } from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { PieChart, PieSeries, Legend } from "@amcharts/amcharts4/charts";

interface PortfolioChartProps {
	data: any; // Replace with actual data structure
	// options: any; // Replace with actual options structure
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
	useEffect(() => {
		// Chart data and options can be customized based on your requirements
		const chart = create("chartdivPort", PieChart);
		chart.data = data;

		const series = chart.series.push(new PieSeries());
		series.dataFields.value = "price";
		series.dataFields.category = "asset";

		// Enable legend for the PieSeries
		series.legendSettings.valueText = "{category}: {value}";

		// Configure label settings
		const labelTemplate = series.labels.template;
		labelTemplate.fontSize = 12; // Font size
		labelTemplate.wrap = true; // Enable text wrapping
		labelTemplate.width = 100; // Set the desired label width
		labelTemplate.height = 50; // Set the desired label height

		// Configure legend settings
		const legend = new Legend();
		legend.useDefaultMarker = true; // Use default marker for legend items
		legend.position = "bottom"; // Change the legend position (e.g., "bottom", "top", "right", "left")
		legend.align = "center"; // Align the legend
		legend.valueLabels.template.fontSize = 12; // Font size for legend value labels
		legend.valueLabels.template.width = 100; // Set the desired width for legend value labels
		legend.valueLabels.template.height = 50; // Set the desired height for legend value labels

		chart.legend = legend; // Assign the legend to the chart

		// Apply amCharts theme
		chart.colors.step = 2;
		chart.fontSize = 12;

		// Apply animated theme
		am4themes_animated(chart);

		return () => {
			chart.dispose();
		};
	}, [data]);

	return (
		<div>
			<h2 className="title-blocks">Portfolio Balance</h2>
			<div
				id="chartdivPort"
				className="chartsstyle"
				style={{ width: "100%", height: "450px" }}
			></div>
		</div>
	);
};

export default PortfolioChart;
