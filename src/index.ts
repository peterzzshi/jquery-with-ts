class SelectorResult {
    #elements;

    constructor(private elements: NodeListOf<Element>) {
        this.#elements = elements;
    }

    html(content: string): SelectorResult {
        this.#elements.forEach((element) => {
            element.innerHTML = content;
        });
        return this;
    }

    on<K extends keyof ElementEventMap>(eventType: K, callback: (event: ElementEventMap[K]) => void): SelectorResult {
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


}

function $(selector: string): any {
    return new SelectorResult(document.querySelectorAll(selector));
}

export default $;
