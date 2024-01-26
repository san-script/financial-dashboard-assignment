// Import React and necessary modules/components
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import axios from "axios";
import Select from "react-select";

// Import chart components
import DoughnutChart from "./../DoughnutChart/DoughnutChart";
import HistoricalChart from "./../HistoricalChart/HistoricalChart";
import PortfolioChart from "./../PortfolioChart/PortfolioChart";

// Import the DatePicker component and its styles
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the DatePicker

// Import custom styles
import "./Dashboard.css"; // Add this line to import  CSS file

// Import API URLs
import { API_URLS } from "./../../apiConfig";

// Import the loader image
import loaderImage from "../../assets/loader.gif";

// Define the Asset interface
interface Asset {
	id: string;
	name: string;
	type: string;
	assetClass: string;
	symbol: string;
}

// Define the Dashboard functional component
const Dashboard: React.FC = () => {
	// State variables
	const [assets, setAssets] = useState<Asset[]>([]);
	const [assetClasses, setAssetClasses] = useState<string[]>([]);
	const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
	const [selectedAssetClasses, setSelectedAssetClasses] =
		useState<string[]>(assetClasses);
	const [priceData, setPriceData] = useState<any[]>([]); // State to hold price data

	const [historicalData, setHistoricalData] = useState<any[]>([]); // State to hold price data

	const [startDate, setStartDate] = useState<Date | null>(
		new Date("2024-01-01")
	); // State for start date
	const [endDate, setEndDate] = useState<Date | null>(new Date("2024-01-31")); // State for end date

	const [userPositionData, setUserPositionData] = useState<any[]>([]); // New state for user position data

	const [isLoading, setIsLoading] = useState(true);

	const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);

	const [selectedOption, setSelectedOption] = useState<string>("Asset Class");

	// Fetch all assets on component mount
	useEffect(() => {
		const fetchAllAssets = async () => {
			try {
				const response = await axios.get<Asset[]>(API_URLS.assets);
				const data = response.data;

				setAssets(data);

				// Extract unique asset classes
				const uniqueAssetClasses = [
					...new Set<string>(data.map((asset) => asset.assetClass)),
				];
				setAssetClasses(uniqueAssetClasses);
				setSelectedAssetClasses(uniqueAssetClasses); // Set all asset classes as selected by default
			} catch (error) {
				console.error("Error fetching assets:", error);
			}
		};

		fetchAllAssets();
	}, []);

	// Fetch data when assets, date range, or selected option change
	useEffect(() => {
		const fetchData = async () => {
			try {
				let apiUrl =
					selectedAssets.length === 0 ||
					(selectedAssets.length === 1 && selectedAssets[0] === "All")
						? `${API_URLS.price}?assets=${assets
								.map((asset) => asset.symbol)
								.join(",")}`
						: `${API_URLS.price}?assets=${selectedAssets.join(
								","
						  )}`;

				if (startDate && endDate) {
					// If both startDate and endDate are selected with specific assets
					apiUrl = `${apiUrl}&asOf=${endDate.toISOString()}`;
				}

				const response = await axios.get<any>(apiUrl);
				const data = response.data;
				// setPriceData(data);
				if (selectedOption === "Asset Class") {
					// When "Asset Class" is selected, aggregate data by asset class
					const aggregatedData = aggregateDataByAssetClass(data);
					setPriceData(aggregatedData);
				} else {
					setPriceData(data);
				}
				setIsLoading(false);
			} catch (error) {
				console.error(
					"Error fetching prices for selected assets:",
					error
				);
			}
		};

		// Only fetch data if assets are available
		if (assets.length > 0) {
			fetchData();
		}
	}, [assets, selectedAssets, startDate, endDate, selectedOption]);

	// Fetch historical data when assets or date range change
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch historical data based on the default date range
				const apiUrl =
					selectedAssets.length === 0 ||
					(selectedAssets.length === 1 && selectedAssets[0] === "All")
						? `${API_URLS.price}?assets=${assets
								.map((asset) => asset.symbol)
								.join(
									","
								)}&from=${startDate?.toISOString()}&to=${endDate?.toISOString()}`
						: `${API_URLS.price}?assets=${selectedAssets.join(
								","
						  )}&from=${startDate?.toISOString()}&to=${endDate?.toISOString()}`;

				const response = await axios.get<any>(apiUrl);
				const data = response.data;
				setHistoricalData(data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching historical data:", error);
			}
		};

		// Only fetch historical data if assets are available
		if (assets.length > 0) {
			fetchData();
		}
	}, [assets, selectedAssets, startDate, endDate]);

	// Use useEffect to call the userPosition API when assets are selected
	useEffect(() => {
		// Only fetch user position data when assets are selected
		if (selectedAssets.length > 0 || assets.length > 0) {
			const fetchUserPosition = async () => {
				try {
					// Build API URL based on selected assets and date range
					const apiUrl =
						selectedAssets.length === 0 ||
						(selectedAssets.length === 1 &&
							selectedAssets[0] === "All")
							? `${API_URLS.userPosition}?assets=${assets
									.map((asset) => asset.symbol)
									.join(
										","
									)}&startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}`
							: `${
									API_URLS.userPosition
							  }?assets=${selectedAssets.join(
									","
							  )}&startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}`;

					// Fetch user position data from the API
					const response = await axios.get<any>(apiUrl);
					const data = response.data;

					// Store user position data in state
					setUserPositionData(data);
				} catch (error) {
					console.error("Error fetching user position data:", error);
				}
			};

			fetchUserPosition();
		}
	}, [selectedAssets, assets, startDate, endDate]);

	// Adjust handleAssetClassChange to include all selected asset classes
	const handleAssetClassChange = async (selectedOptions: any) => {
		const selectedAssetClassNames = selectedOptions.map(
			(option: any) => option.value
		);
		setSelectedAssetClasses(selectedAssetClassNames);

		// Fetch assets based on all selected asset classes
		try {
			const response = await axios.get<Asset[]>(
				`${API_URLS.assets}?assetClass=${selectedAssetClassNames.join(
					","
				)}`
			);
			const data = response.data;

			setAssets(data);

			// Reset selected asset if it's not part of the filtered assets
			if (!data.find((asset) => asset.symbol === selectedAssets[0])) {
				setSelectedAssets([]);
			}
		} catch (error) {
			console.error("Error fetching assets based on asset class:", error);
		}
	};

	const handleAssetChange = async (selectedOptions: any) => {
		const selectedAssetSymbols: string[] = selectedOptions.map(
			(option: any) => option.value
		);

		// Remove "All" from selected assets
		const updatedSelectedAssets = selectedAssetSymbols.filter(
			(asset: string) => asset !== "All"
		);

		// If individual assets are selected, update the selection
		setSelectedAssets(updatedSelectedAssets);

		let apiUrl = "";
		// debugger
		if (
			selectedAssetSymbols.length == 0 ||
			(selectedAssetSymbols.length == 1 &&
				selectedAssetSymbols[0] == "All")
		) {
			apiUrl = `${API_URLS.price}?assets=${assets
				.map((asset) => asset.symbol)
				.join(",")}`;
		} else {
			apiUrl = `${API_URLS.price}?assets=${selectedAssetSymbols.join(
				","
			)}`;
		}

		if (startDate && endDate) {
			// If both startDate and endDate are selected with specific assets
			apiUrl = `${apiUrl}&asOf=${endDate.toISOString()}`;
		}

		try {
			const response = await axios.get<any>(apiUrl);

			const data = response.data;
			setPriceData(data); // Update the price data state with the fetched data
		} catch (error) {
			console.error("Error fetching prices for selected assets:", error);
		}
	};

	const handleDateRangeChange = (dates: [Date, Date]) => {
		setStartDate(dates[0]);
		setEndDate(dates[1]);

		// Call fetchPriceData with selected assets and date range
		fetchPriceData(selectedAssets, dates[0], dates[1]);
	};

	const fetchPriceData = async (
		selectedAssets: string[],
		fromDate: Date,
		toDate: Date
	) => {
		try {
			// Check if both fromDate and toDate are present
			if (fromDate && toDate) {
				const assetQueryParam =
					selectedAssets.length === 0
						? assets.map((asset) => asset.symbol).join(",")
						: selectedAssets.join(",");

				const apiUrl = `${
					API_URLS.price
				}?assets=${assetQueryParam}&from=${fromDate.toISOString()}&to=${toDate.toISOString()}`;

				const response = await axios.get(apiUrl);
				const data = response.data;
				setHistoricalData(data);
				setIsLoading(false);
			} else {
				console.warn(
					"Both fromDate and toDate are required to make the API request."
				);
			}
		} catch (error) {
			console.error(
				"Error fetching prices for selected assets and date range:",
				error
			);
		}
	};

	// Function to aggregate data by asset class
	const aggregateDataByAssetClass = (data: any[]) => {
		const aggregatedData: any[] = [];

		// Create a map to store aggregated values for each asset class
		const assetClassMap: Map<string, number> = new Map();

		// Iterate through the data and aggregate values by asset class
		data.forEach((item) => {
			const assetClass = assets.find(
				(asset) => asset.symbol === item.asset
			)?.assetClass;

			if (assetClass) {
				const currentValue = assetClassMap.get(assetClass) || 0;
				assetClassMap.set(assetClass, currentValue + item.price);
			}
		});

		// Convert the map back to an array for chart rendering
		assetClassMap.forEach((value, key) => {
			aggregatedData.push({ asset: key, price: value });
		});

		return aggregatedData;
	};

	// Handle change in selected option
	const handleOptionChange = (selectedOption: string) => {
		setSelectedOption(selectedOption);
	};

	// Render the dashboard
	return (
		<div className="full-wrap">
			<div className="container">
				<div className="heading">
					<h1>Financial Portfolio Dashboard</h1>
				</div>

				<div className="dashboard-controls">
					<div className="dashboard-controls-top">
						{/* Asset Class Selector Dropdown */}
						<div className="asset-class-selector as-sector">
							<label htmlFor="assetClassSelector">
								Select Asset Classes:
							</label>
							<Select
								id="assetClassSelector"
								options={assetClasses.map((assetClass) => ({
									value: assetClass,
									label: assetClass,
								}))}
								isMulti
								value={selectedAssetClasses.map(
									(assetClass) => ({
										value: assetClass,
										label: assetClass,
									})
								)}
								onChange={handleAssetClassChange}
							/>
						</div>

						{/* Asset Selector Dropdown */}
						<div className="asset-selector as-sector">
							<label htmlFor="assetSelector">
								Select Assets:
							</label>
							<Select
								id="assetSelector"
								options={[
									{ value: "All", label: "All" },
									...assets.map((asset) => ({
										value: asset.symbol,
										label: asset.name,
									})),
								]}
								isMulti
								value={
									selectedAssets.length > 0
										? selectedAssets.map((assetSymbol) => ({
												value: assetSymbol,
												label: assetSymbol,
										  }))
										: [{ value: "All", label: "All" }]
								}
								onChange={handleAssetChange}
							/>
						</div>
					</div>

					<div className="date-range-selector">
						<div className="date-selector">
							<label htmlFor="dateRangePicker">
								Select Date Range{" "}
							</label>
							<div className="re-date-picker">
								<input
									className="datepicker-input"
									id="dateRangePicker"
									value={`${
										startDate
											? startDate.toLocaleDateString()
											: ""
									} - ${
										endDate
											? endDate.toLocaleDateString()
											: ""
									}`}
									onClick={() =>
										setIsDateRangePickerOpen(
											(prev) => !prev
										)
									}
									readOnly
								/>
								{isDateRangePickerOpen && (
									<DatePicker
										selected={startDate}
										onChange={handleDateRangeChange}
										startDate={startDate}
										endDate={endDate}
										selectsRange
										inline
									/>
								)}
							</div>
						</div>

						<div className="option-selector">
							<label htmlFor="optionSelector">
								Select Option:
							</label>
							<Select
								className="react-select__control"
								id="optionSelector"
								options={[
									{
										value: "Asset Class",
										label: "Asset Class",
									},
									{ value: "Asset", label: "Asset" },
								]}
								value={{
									value: selectedOption!,
									label: selectedOption!,
								}} // Non-null assertion
								onChange={
									(selectedOption) =>
										handleOptionChange(
											selectedOption!.value
										) // Non-null assertion
								}
							/>
						</div>
					</div>
				</div>

				<div className="charts-full-wrap">
					{isLoading ? (
						<img
							src={loaderImage}
							alt="Loading..."
							style={{ height: "50px", width: "50px" }}
						/>
					) : (
						<div className="charts-container">
							<div className="chart">
								<DoughnutChart data={priceData} />
							</div>
							<div className="chart">
								<h2 className="title-blocks">
									Historical Data
								</h2>
								{startDate && endDate ? (
									<HistoricalChart
										priceData={historicalData}
									/>
								) : (
									<div
										style={{
											color: "#FF897E",
											textAlign: "center",
										}}
									>
										Please select both "From" and "To" dates
										to generate the chart.
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{isLoading ? (
					<img
						src={loaderImage}
						alt="Loading..."
						style={{ height: "50px", width: "50px" }}
					/>
				) : (
					<>
						{startDate && endDate ? (
							<PortfolioChart
								userPositionData={userPositionData}
							/>
						) : (
							<div
								style={{
									color: "#FF897E",
									textAlign: "center",
								}}
							>
								Please select both "From" and "To" dates to
								generate the data.
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
