export default async function fetchRetry2(
	input: RequestInfo,
	retryCount: number,
	timeout: number,
	init?: RequestInit | undefined,
): Promise<Response> {
	try {
		const res = await fetch(input, init);
		const data = await res.json();
		if (retryCount > 1 && data.status > 300) {
			await new Promise(resolve => setTimeout(resolve, timeout));
			return fetchRetry2(input, retryCount - 1, timeout, init);
		}
		return data;
	} catch (error) {
		if (retryCount > 1) {
			await new Promise(resolve => setTimeout(resolve, timeout));
			return fetchRetry2(input, retryCount - 1, timeout, init);
		}
		throw error;
	}
}
