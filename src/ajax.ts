import fetch from 'node-fetch';

import { AjaxOptions } from './types';

export async function ajax(options: AjaxOptions): Promise<any> {
	const { url, method = 'GET', data, success, error } = options;

	try {
		const fetchOptions: any = {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
			fetchOptions.body = JSON.stringify(data);
		}

		const response = await fetch(url, fetchOptions);
		const result = await response.json();
		success(result);

		return result;
	} catch (err) {
		if (error) {
			error(err);
		} else {
			console.error('AJAX request failed:', err);
		}
	}
}
