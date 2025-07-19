export class SelectorResult {
	#elements: NodeListOf<Element>;

	constructor(elements: NodeListOf<Element>) {
		this.#elements = elements;
	}

	get length(): number {
		return this.#elements.length;
	}

	html(): string;

	html(content: string): SelectorResult;

	html(content?: string): string | SelectorResult {
		if (content === undefined) {
			return this.#elements.length > 0 ? this.#elements[0].innerHTML : '';
		}

		this.#elements.forEach((element) => {
			element.innerHTML = content;
		});
		return this;
	}

	on<K extends keyof HTMLElementEventMap>(
		eventType: K,
		callback: (event: HTMLElementEventMap[K]) => void,
	): SelectorResult {
		this.#elements.forEach((element) => {
			(element as HTMLElement).addEventListener(eventType, callback);
		});
		return this;
	}

	show(): SelectorResult {
		this.#elements.forEach((element) => {
			(element as HTMLElement).style.visibility = 'visible';
		});
		return this;
	}

	hide(): SelectorResult {
		this.#elements.forEach((element) => {
			(element as HTMLElement).style.visibility = 'hidden';
		});
		return this;
	}

	addClass(className: string): SelectorResult {
		this.#elements.forEach((element) => {
			element.classList.add(className);
		});
		return this;
	}

	removeClass(className: string): SelectorResult {
		this.#elements.forEach((element) => {
			element.classList.remove(className);
		});
		return this;
	}
}

export function $(selector: string): SelectorResult {
	return new SelectorResult(document.querySelectorAll(selector));
}