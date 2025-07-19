import { SelectorResult } from './selector';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface AjaxOptions {
	url: string;
	method?: HttpMethod;
	data?: Record<string, any>;
	success: (result: any) => void;
	error?: (error: unknown) => void;
}

export interface JQueryFunction {
	(selector: string): SelectorResult;

	ajax(options: AjaxOptions): Promise<any>;
}