/**
 * @jest-environment jsdom
 */
import $ from '../jquery';

describe('DOM Selection and Manipulation', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('selector returns truthy result', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		expect(result).toBeTruthy();

		document.body.removeChild(element);
	});

	test('html() method sets content', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		expect(result).toBeTruthy();
		result.html('Next Step...');
		expect(document.querySelector('button.continue')!.innerHTML).toBe('Next Step...');

		document.body.removeChild(element);
	});

	test('html() getter returns content', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Original Content</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		expect(result.html()).toBe('Original Content');

		document.body.removeChild(element);
	});

	test('html() getter returns empty string for no elements', () => {
		const result = $('nonexistent-element');
		expect(result.html()).toBe('');
	});

	test('hide() makes button visibility hidden', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		expect(result).toBeTruthy();
		result.hide();
		const button = document.querySelector('button.continue') as HTMLButtonElement;
		expect(button.style.visibility).toBe('hidden');

		document.body.removeChild(element);
	});

	test('show() makes button visibility visible', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		expect(result).toBeTruthy();
		result.hide();
		const button = document.querySelector('button.continue') as HTMLButtonElement;
		expect(button.style.visibility).toBe('hidden');
		result.show();
		expect(button.style.visibility).toBe('visible');

		document.body.removeChild(element);
	});

	test('addClass() adds CSS class', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		result.addClass('new-class');
		const button = document.querySelector('button.continue') as HTMLButtonElement;
		expect(button.classList.contains('new-class')).toBe(true);

		document.body.removeChild(element);
	});

	test('removeClass() removes CSS class', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue existing-class'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		result.removeClass('existing-class');
		const button = document.querySelector('button.continue') as HTMLButtonElement;
		expect(button.classList.contains('existing-class')).toBe(false);

		document.body.removeChild(element);
	});

	test('length property returns number of matched elements', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `
      <button class='test-btn'>Button 1</button>
      <button class='test-btn'>Button 2</button>
    `;
		document.body.appendChild(element);

		const result = $('.test-btn');
		expect(result.length).toBe(2);

		const noResult = $('.nonexistent');
		expect(noResult.length).toBe(0);

		document.body.removeChild(element);
	});

	test('methods work with multiple elements', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `
      <div class='multi-test'>Content 1</div>
      <div class='multi-test'>Content 2</div>
      <div class='multi-test'>Content 3</div>
    `;
		document.body.appendChild(element);

		const result = $('.multi-test');
		result.html('New Content');

		const divs = document.querySelectorAll('.multi-test');
		divs.forEach(div => {
			expect(div.innerHTML).toBe('New Content');
		});

		result.hide();
		divs.forEach(div => {
			expect((div as HTMLElement).style.visibility).toBe('hidden');
		});

		document.body.removeChild(element);
	});
});
