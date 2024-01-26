var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

// Sample data
const assets = [
	{
		id: "1",
		name: "Bitcoin",
		type: "cryptocurrency",
		assetClass: "Digital Currency",
		symbol: "BTC",
	},
	{
		id: "2",
		name: "Apple Inc.",
		type: "stock",
		assetClass: "Equity",
		symbol: "AAPL",
	},
	{
		id: "3",
		name: "USD",
		type: "cash",
		assetClass: "Currency",
		symbol: "USD",
	},
	{
		id: "4",
		name: "Ethereum",
		type: "cryptocurrency",
		assetClass: "Digital Currency",
		symbol: "ETH",
	},
	{
		id: "5",
		name: "Amazon",
		type: "stock",
		assetClass: "Equity",
		symbol: "AMZN",
	},
	{
		id: "6",
		name: "Euro",
		type: "cash",
		assetClass: "Currency",
		symbol: "EUR",
	},
	{
		id: "7",
		name: "Litecoin",
		type: "cryptocurrency",
		assetClass: "Digital Currency",
		symbol: "LTC",
	},
	{
		id: "8",
		name: "Microsoft",
		type: "stock",
		assetClass: "Equity",
		symbol: "MSFT",
	},
	{
		id: "9",
		name: "British Pound",
		type: "cash",
		assetClass: "Currency",
		symbol: "GBP",
	},
	{
		id: "10",
		name: "Ripple",
		type: "cryptocurrency",
		assetClass: "Digital Currency",
		symbol: "XRP",
	},
	// Add more assets as needed
];

const prices = [
	// BTC prices
	{ asset: "BTC", date: "2024-01-01", price: 50000 },
	{ asset: "BTC", date: "2024-01-02", price: 52000 },
	{ asset: "BTC", date: "2024-01-03", price: 48000 },
	{ asset: "BTC", date: "2024-01-04", price: 49000 },
	{ asset: "BTC", date: "2024-01-05", price: 50500 },
	// Add more BTC prices as needed

	// AAPL prices
	{ asset: "AAPL", date: "2024-01-01", price: 150 },
	{ asset: "AAPL", date: "2024-01-02", price: 155 },
	{ asset: "AAPL", date: "2024-01-03", price: 145 },
	{ asset: "AAPL", date: "2024-01-04", price: 160 },
	{ asset: "AAPL", date: "2024-01-05", price: 158 },
	// Add more AAPL prices as needed

	// USD prices
	{ asset: "USD", date: "2024-01-01", price: 1 },
	{ asset: "USD", date: "2024-01-02", price: 1.02 },
	{ asset: "USD", date: "2024-01-03", price: 0.98 },
	{ asset: "USD", date: "2024-01-04", price: 1.01 },
	{ asset: "USD", date: "2024-01-05", price: 1.03 },
	// Add more USD prices as needed

	// ETH prices
	{ asset: "ETH", date: "2024-01-01", price: 2000 },
	{ asset: "ETH", date: "2024-01-02", price: 2100 },
	{ asset: "ETH", date: "2024-01-03", price: 1900 },
	{ asset: "ETH", date: "2024-01-04", price: 2050 },
	{ asset: "ETH", date: "2024-01-05", price: 1980 },
	// Add more ETH prices as needed

	// AMZN prices
	{ asset: "AMZN", date: "2024-01-01", price: 3500 },
	{ asset: "AMZN", date: "2024-01-02", price: 3600 },
	{ asset: "AMZN", date: "2024-01-03", price: 3400 },
	{ asset: "AMZN", date: "2024-01-04", price: 3550 },
	{ asset: "AMZN", date: "2024-01-05", price: 3450 },
	// Add more AMZN prices as needed

	// EUR prices
	{ asset: "EUR", date: "2024-01-01", price: 1.1 },
	{ asset: "EUR", date: "2024-01-02", price: 1.08 },
	{ asset: "EUR", date: "2024-01-03", price: 1.12 },
	{ asset: "EUR", date: "2024-01-04", price: 1.09 },
	{ asset: "EUR", date: "2024-01-05", price: 1.11 },
	// Add more EUR prices as needed

	// LTC prices
	{ asset: "LTC", date: "2024-01-01", price: 150 },
	{ asset: "LTC", date: "2024-01-02", price: 160 },
	{ asset: "LTC", date: "2024-01-03", price: 140 },
	{ asset: "LTC", date: "2024-01-04", price: 155 },
	{ asset: "LTC", date: "2024-01-05", price: 145 },
	// Add more LTC prices as needed

	// MSFT prices
	{ asset: "MSFT", date: "2024-01-01", price: 200 },
	{ asset: "MSFT", date: "2024-01-02", price: 210 },
	{ asset: "MSFT", date: "2024-01-03", price: 190 },
	{ asset: "MSFT", date: "2024-01-04", price: 205 },
	{ asset: "MSFT", date: "2024-01-05", price: 198 },

	{ asset: "GBP", date: "2024-01-01", price: 1.35 },
	{ asset: "GBP", date: "2024-01-02", price: 1.34 },
];

const sampleUserPositionData = [
	// Asset: AAPL
	{
		Date: "2024-01-01",
		Asset: "AAPL",
		Quantity: 10,
		Price: 150,
		Value: 1500,
	},
	{
		Date: "2024-01-02",
		Asset: "AAPL",
		Quantity: 12,
		Price: 155,
		Value: 1860,
	},
	{
		Date: "2024-01-03",
		Asset: "AAPL",
		Quantity: 15,
		Price: 160,
		Value: 2400,
	},
	// ... (add more entries for other dates)

	// Asset: GOOGL
	{
		Date: "2024-01-01",
		Asset: "GOOGL",
		Quantity: 5,
		Price: 2500,
		Value: 12500,
	},
	{
		Date: "2024-01-02",
		Asset: "GOOGL",
		Quantity: 8,
		Price: 2550,
		Value: 20400,
	},
	{
		Date: "2024-01-03",
		Asset: "GOOGL",
		Quantity: 7,
		Price: 2600,
		Value: 18200,
	},
	// ... (add more entries for other dates)

	// Asset: BTC
	{
		Date: "2024-01-01",
		Asset: "BTC",
		Quantity: 2,
		Price: 40000,
		Value: 80000,
	},
	{
		Date: "2024-01-02",
		Asset: "BTC",
		Quantity: 3,
		Price: 42000,
		Value: 126000,
	},
	{
		Date: "2024-01-03",
		Asset: "BTC",
		Quantity: 4,
		Price: 45000,
		Value: 180000,
	},
	// ... (add more entries for other dates)

	// Asset: USD
	{
		Date: "2024-01-01",
		Asset: "USD",
		Quantity: 10000,
		Price: 1,
		Value: 10000,
	},
	{
		Date: "2024-01-02",
		Asset: "USD",
		Quantity: 12000,
		Price: 1,
		Value: 12000,
	},
	{
		Date: "2024-01-03",
		Asset: "USD",
		Quantity: 15000,
		Price: 1,
		Value: 15000,
	},
	// ... (add more entries for other dates)

	// Asset: ETH
	{ Date: "2024-01-01", Asset: "ETH", Quantity: 3, Price: 2500, Value: 7500 },
	{
		Date: "2024-01-02",
		Asset: "ETH",
		Quantity: 4,
		Price: 2600,
		Value: 10400,
	},
	{
		Date: "2024-01-03",
		Asset: "ETH",
		Quantity: 5,
		Price: 2700,
		Value: 13500,
	},
	// ... (add more entries for other dates)

	// Asset: AMZN
	{
		Date: "2024-01-01",
		Asset: "AMZN",
		Quantity: 1,
		Price: 3500,
		Value: 3500,
	},
	{
		Date: "2024-01-02",
		Asset: "AMZN",
		Quantity: 2,
		Price: 3600,
		Value: 7200,
	},
	{
		Date: "2024-01-03",
		Asset: "AMZN",
		Quantity: 3,
		Price: 3700,
		Value: 11100,
	},
	// ... (add more entries for other dates)

	// Asset: EUR
	{
		Date: "2024-01-01",
		Asset: "EUR",
		Quantity: 12000,
		Price: 1.2,
		Value: 14400,
	},
	{
		Date: "2024-01-02",
		Asset: "EUR",
		Quantity: 15000,
		Price: 1.25,
		Value: 18750,
	},
	{
		Date: "2024-01-03",
		Asset: "EUR",
		Quantity: 18000,
		Price: 1.3,
		Value: 23400,
	},
	// ... (add more entries for other dates)

	// Asset: LTC
	{ Date: "2024-01-01", Asset: "LTC", Quantity: 50, Price: 150, Value: 7500 },
	{ Date: "2024-01-02", Asset: "LTC", Quantity: 60, Price: 155, Value: 9300 },
	{
		Date: "2024-01-03",
		Asset: "LTC",
		Quantity: 70,
		Price: 160,
		Value: 11200,
	},
	// ... (add more entries for other dates)

	// Asset: MSFT
	{ Date: "2024-01-01", Asset: "MSFT", Quantity: 8, Price: 300, Value: 2400 },
	{
		Date: "2024-01-02",
		Asset: "MSFT",
		Quantity: 10,
		Price: 310,
		Value: 3100,
	},
	{
		Date: "2024-01-03",
		Asset: "MSFT",
		Quantity: 12,
		Price: 320,
		Value: 3840,
	},
	// ... (add more entries for other dates)

	// Asset: GBP
	{
		Date: "2024-01-01",
		Asset: "GBP",
		Quantity: 8000,
		Price: 1.4,
		Value: 11200,
	},
	{
		Date: "2024-01-02",
		Asset: "GBP",
		Quantity: 10000,
		Price: 1.45,
		Value: 14500,
	},
	{
		Date: "2024-01-03",
		Asset: "GBP",
		Quantity: 12000,
		Price: 1.5,
		Value: 18000,
	},
	// ... (add more entries for other dates)

	// Asset: XRP
	{ Date: "2024-01-01", Asset: "XRP", Quantity: 500, Price: 2, Value: 1000 },
	{
		Date: "2024-01-02",
		Asset: "XRP",
		Quantity: 600,
		Price: 2.1,
		Value: 1260,
	},
	{
		Date: "2024-01-03",
		Asset: "XRP",
		Quantity: 700,
		Price: 2.2,
		Value: 1540,
	},
	// ... (add more entries for other dates)

	// Add entries for other assets
];

// Fetch all assets
router.get("/assets", (req, res) => {
	const { assetClass } = req.query;

	if (assetClass) {
		// If assetClass is provided, split the comma-separated values
		const assetClasses = assetClass.split(",");

		// Filter assets by the specified classes
		const filteredAssets = assets.filter((asset) =>
			assetClasses.includes(asset.assetClass)
		);

		res.json(filteredAssets);
	} else {
		// If no assetClass is provided, return all assets
		res.send(assets);
	}
});

router.get("/price", (req, res) => {
	const { assets: requestedAssets, asOf, from, to } = req.query;

	console.log(req.query);

	if (!requestedAssets) {
		return res
			.status(400)
			.json({ error: "Missing required parameter: assets" });
	}

	const asOfDate = asOf ? new Date(asOf) : null;

	let filteredPrices = prices.filter(
		(price) =>
			requestedAssets.includes(price.asset) &&
			(!from || new Date(price.date) >= new Date(from)) &&
			(!to || new Date(price.date) <= new Date(to))
	);

	if (asOfDate || (!from && !to && !asOfDate)) {
		// If asOf date is provided, return only the latest prices up to the asOf date
		filteredPrices = filteredPrices.reduce((latestPrices, price) => {
			if (
				!asOfDate ||
				(asOfDate && new Date(price.date) <= asOfDate) // Only include prices up to the asOf date
			) {
				const existingPrice = latestPrices.find(
					(p) => p.asset === price.asset
				);
				if (
					!existingPrice ||
					new Date(price.date) > new Date(existingPrice.date)
				) {
					return [
						...latestPrices.filter((p) => p.asset !== price.asset),
						price,
					];
				}
			}
			return latestPrices;
		}, []);
	}

	res.json(filteredPrices);
});

router.get("/userPosition", (req, res) => {
	const { assets, startDate, endDate } = req.query;

	if (!assets) {
		return res
			.status(400)
			.json({ error: "Missing required parameter: assets" });
	}

	let filteredData = sampleUserPositionData.filter((item) =>
		assets.includes(item.Asset)
	);

	// If date range provided, filter data based on the range
	if (startDate && endDate) {
		filteredData = filteredData.filter(
			(item) =>
				new Date(item.Date) >= new Date(startDate) &&
				new Date(item.Date) <= new Date(endDate)
		);
	}

	// Always return only the latest data for each asset
	filteredData = filteredData.reduce((latestData, data) => {
		const existingData = latestData.find((d) => d.Asset === data.Asset);
		if (
			!existingData ||
			new Date(data.Date) > new Date(existingData.Date)
		) {
			return [...latestData.filter((d) => d.Asset !== data.Asset), data];
		}
		return latestData;
	}, []);

	res.send(filteredData);
});

module.exports = router;
