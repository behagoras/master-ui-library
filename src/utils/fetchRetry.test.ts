import fetchRetry from './fetchRetry';

const mockedFetch = jest.fn();

const failedFetch = () =>
	Promise.resolve({
		// testName can be used for debugging the counts of calls
		json: () => {
			return Promise.resolve({
				status: 500,
				data: { success: false, message: 'Error' },
			});
		},
	});

const successFetch = () =>
	Promise.resolve({
		// testName can be used for debugging the counts of calls
		json: () => {
			return Promise.resolve({
				status: 200,
				data: { success: true, message: 'Success' },
			});
		},
	});

window.fetch = mockedFetch;
describe('Service: Forge. API calls', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		console.countReset('success');
		console.countReset('failed');
	});

	it('should return a valid response', async () => {
		mockedFetch.mockReturnValueOnce(successFetch());
		const response = (await fetchRetry(
			'/test',
			3,
			100,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		)) as any;

		expect(response.status).toBe(200);
		expect(response.data.success).toBe(true);
		expect(response.data.message).toBe('Success');
		expect(mockedFetch).toHaveBeenCalledTimes(1);
	});
	it('should return a valid response with a retry', async () => {
		mockedFetch
			.mockReturnValueOnce(failedFetch())
			.mockReturnValueOnce(failedFetch())
			.mockReturnValueOnce(successFetch());

		const response = (await fetchRetry(
			'/test',
			3,
			100,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		)) as any;

		expect(response.status).toBe(200);
		expect(response.data.success).toBe(true);
		expect(response.data.message).toBe('Success');
		expect(mockedFetch).toHaveBeenCalledTimes(3);
	});
	it('should fail after 3 retries', async () => {
		mockedFetch
			.mockReturnValueOnce(failedFetch())
			.mockReturnValueOnce(failedFetch())
			.mockReturnValueOnce(failedFetch())
			// the fourth call won't be made
			.mockReturnValueOnce(successFetch());
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const response = (await fetchRetry('/test', 3, 100)) as any;
		expect(response.status).toBe(500);
		expect(response.data.success).toBe(false);
		expect(response.data.message).toBe('Error');
		expect(mockedFetch).toHaveBeenCalledTimes(3);
	});
});
