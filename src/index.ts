import fetch from 'node-fetch';

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

namespace $ {
    export function ajax({ url, data, success, method = 'GET' }: {
        url: string,
        data?: any,
        success?: (result: any) => void,
        method?: 'GET' | 'POST'
    }) {
        const options: RequestInit = {
            method: method,
        };

        if (data && method === 'POST') {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(data);
        }

        return fetch(url, options)
          .then(response => response.json())
          .then(result => {
              if (success) {
                  success(result);
              }
          })
          .catch(error => console.error('Error fetching data:', error));
    }
}

export default $;
