// routes.test.js

const request = require("supertest");
const app = require("../app"); // Adjust the path to your Express app file

describe("GET /api", () => {
	test('responds with "respond with a resource"', async () => {
		const response = await request(app).get("/api");
		expect(response.status).toBe(200);
		expect(response.text).toBe("respond with a resource");
	});
});

describe("GET /api/assets", () => {
	it("responds with all assets when no assetClass is specified", async () => {
		const response = await request(app).get("/api/assets");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected asset data
	});

	it("responds with assets filtered by the specified assetClass", async () => {
		const response = await request(app).get(
			"/api/assets?assetClass=Equity"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected asset data with the specified assetClass
	});

	it("responds with assets filtered by multiple assetClasses", async () => {
		const response = await request(app).get(
			"/api/assets?assetClass=Equity,Digital Currency"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected asset data with the specified assetClasses
	});

	it("responds with an empty array when assetClass does not match any assets", async () => {
		const response = await request(app).get(
			"/api/assets?assetClass=NonExistentClass"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});
});

describe("GET /api/price", () => {
	it("responds with prices for the specified assets", async () => {
		const response = await request(app).get("/api/price?assets=BTC,ETH");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected price data
	});

	it("responds with prices within the specified date range", async () => {
		const response = await request(app).get(
			"/api/price?assets=BTC&from=2024-01-01&to=2024-01-03"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected price data within the date range
	});

	it("responds with prices for the latest date for each asset", async () => {
		const response = await request(app).get("/api/price?assets=BTC,ETH");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected price data for the latest date
	});

	it("responds with an error when assets parameter is missing", async () => {
		const response = await request(app).get("/api/price");
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty(
			"error",
			"Missing required parameter: assets"
		);
	});
});

describe("GET /api/userPosition", () => {
	it("responds with user position data for the specified assets", async () => {
		const response = await request(app).get(
			"/api/userPosition?assets=AAPL,GOOGL"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected user position data
	});

	it("responds with user position data within the specified date range", async () => {
		const response = await request(app).get(
			"/api/userPosition?assets=AAPL&startDate=2024-01-01&endDate=2024-01-02"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected user position data within the date range
	});

	it("responds with user position data for the latest date for each asset", async () => {
		const response = await request(app).get(
			"/api/userPosition?assets=AAPL,GOOGL"
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.arrayContaining([])); // Add your expected user position data for the latest date
	});

	it("responds with an error when assets parameter is missing", async () => {
		const response = await request(app).get("/api/userPosition");
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty(
			"error",
			"Missing required parameter: assets"
		);
	});
});
