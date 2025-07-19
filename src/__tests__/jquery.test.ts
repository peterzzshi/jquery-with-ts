/**
 * @jest-environment jsdom
 */
import $, { SelectorResult } from '../jquery';

describe('jQuery-like Library Core', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('module default export is a value', () => {
		expect($).toBeTruthy();
	});

	test('module default export is a one-arg function', () => {
		expect(typeof $).toBe('function');
		expect($.length).toBe(1);
	});

	test('module default export has an .ajax property that is a function', () => {
		expect(typeof $.ajax).toBe('function');
	});

	test('$ function returns SelectorResult instance', () => {
		document.body.innerHTML = `<div class='test'>Test</div>`;
		const result = $('.test');

		expect(result).toBeTruthy();
		expect(result).toBeInstanceOf(SelectorResult);
		expect(typeof result.html).toBe('function');
		expect(typeof result.on).toBe('function');
		expect(typeof result.show).toBe('function');
		expect(typeof result.hide).toBe('function');
		expect(typeof result.addClass).toBe('function');
		expect(typeof result.removeClass).toBe('function');
		expect(typeof result.length).toBe('number');
	});

	test('$ function works with non-existent selectors', () => {
		const result = $('.nonexistent-class');
		expect(result).toBeTruthy();
		expect(result).toBeInstanceOf(SelectorResult);
		expect(result.length).toBe(0);
	});

	test('$ function returns same type for different selectors', () => {
		document.body.innerHTML = `
      <div id="single">Single</div>
      <span class="multiple">Multi 1</span>
      <span class="multiple">Multi 2</span>
    `;

		const singleResult = $('#single');
		const multipleResult = $('.multiple');
		const emptyResult = $('.nothing');

		expect(singleResult).toBeInstanceOf(SelectorResult);
		expect(multipleResult).toBeInstanceOf(SelectorResult);
		expect(emptyResult).toBeInstanceOf(SelectorResult);

		expect(singleResult.length).toBe(1);
		expect(multipleResult.length).toBe(2);
		expect(emptyResult.length).toBe(0);
	});

	test('method chaining works correctly', () => {
		document.body.innerHTML = `<div class='chainable'>Test</div>`;

		const result = $('.chainable')
			.html('Chained Content')
			.addClass('chained')
			.show()
			.hide();

		expect(result).toBeInstanceOf(SelectorResult);
		expect(result.length).toBe(1);

		const element = document.querySelector('.chainable') as HTMLElement;
		expect(element.innerHTML).toBe('Chained Content');
		expect(element.classList.contains('chained')).toBe(true);
		expect(element.style.visibility).toBe('hidden');
	});

	test('$ function handles complex selectors', () => {
		document.body.innerHTML = `
      <div class="container">
        <button class="btn primary">Button 1</button>
        <button class="btn secondary">Button 2</button>
        <span class="text">Text</span>
      </div>
    `;

		const buttons = $('.container .btn');
		const primaryBtn = $('.btn.primary');
		const allElements = $('.container *');

		expect(buttons.length).toBe(2);
		expect(primaryBtn.length).toBe(1);
		expect(allElements.length).toBe(3);
	});
});
