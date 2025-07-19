import fetch from 'node-fetch';

import $ from '../jquery';

jest.mock('node-fetch', () => jest.fn());
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('AJAX Functionality', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('ajax method exists and is a function', () => {
		expect(typeof $.ajax).toBe('function');
	});

	test('ajax test with mocked response', async () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<div id='post-info'></div>`;
		document.body.appendChild(element);

		const mockResponse = {
			userId: 4,
			id: 33,
			title: 'qui explicabo molestiae dolorem',
			body: 'rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod',
		};

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockResponse,
		} as any);

		const result = await $.ajax({
			url: 'https://jsonplaceholder.typicode.com/posts/33',
			success: (result) => {
				if (result && typeof result === 'object' && !Array.isArray(result)) {
					$('#post-info').html(
						'<strong>' + result.title + '</strong>' + result.body,
					);
				}
			},
		});

		expect(result).toBeTruthy();
		expect(result).toEqual(mockResponse);

		document.body.removeChild(element);
	});

	test('ajax handles different HTTP methods', async () => {
		const mockResponse = { success: true };

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockResponse,
		} as any);

		await $.ajax({
			url: '/api/test',
			method: 'POST',
			data: { test: 'data' },
			success: (result) => {
				expect(result.success).toBe(true);
			},
		});

		expect(mockFetch).toHaveBeenCalledWith('/api/test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ test: 'data' }),
		});
	});

	test('ajax handles errors with error callback', async () => {
		const mockError = new Error('Network error');
		mockFetch.mockRejectedValueOnce(mockError);

		let errorCaught = false;
		await $.ajax({
			url: '/api/error',
			success: () => {
			},
			error: (err) => {
				errorCaught = true;
				expect(err).toBe(mockError);
			},
		});

		expect(errorCaught).toBe(true);
	});

	test('ajax logs error to console when no error callback is provided', async () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
		const mockError = new Error('Network error without callback');
		mockFetch.mockRejectedValueOnce(mockError);

		await $.ajax({
			url: '/api/error-no-callback',
			success: () => {
			},
		});

		expect(consoleSpy).toHaveBeenCalledWith('AJAX request failed:', mockError);

		consoleSpy.mockRestore();
	});
});
