/**
 * @jest-environment jsdom
 */
import $ from '../jquery';

describe('Event Handling', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('on() method registers click events', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		expect(result).toBeTruthy();

		const clickTracker = { count: 0 };
		result.on('click', function() {
			clickTracker.count += 1;
		});

		const button = document.querySelector('button.continue') as HTMLButtonElement;
		expect(clickTracker.count).toBe(0);
		button.click();
		expect(clickTracker.count).toBe(1);

		document.body.removeChild(element);
	});

	test('on() method receives proper event object', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		const eventTracker = { receivedEvent: null as Event | null };

		result.on('click', function(evt) {
			eventTracker.receivedEvent = evt;
		});

		const button = document.querySelector('button.continue') as HTMLButtonElement;
		button.click();

		expect(eventTracker.receivedEvent).toBeTruthy();
		expect(eventTracker.receivedEvent?.type).toBe('click');

		document.body.removeChild(element);
	});

	test('on() method works with multiple elements', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `
      <button class='multi-btn'>Button 1</button>
      <button class='multi-btn'>Button 2</button>
    `;
		document.body.appendChild(element);

		const clickTracker = { totalClicks: 0 };
		$('.multi-btn').on('click', function() {
			clickTracker.totalClicks += 1;
		});

		const buttons = document.querySelectorAll('.multi-btn') as NodeListOf<HTMLButtonElement>;
		buttons[0].click();
		buttons[1].click();

		expect(clickTracker.totalClicks).toBe(2);

		document.body.removeChild(element);
	});

	test('on() method supports different event types', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='continue'>Continue</button>`;
		document.body.appendChild(element);

		const result = $('button.continue');
		const eventTracker = { mouseenterCount: 0 };

		result.on('mouseenter', function() {
			eventTracker.mouseenterCount += 1;
		});

		const button = document.querySelector('button.continue') as HTMLButtonElement;
		const mouseenterEvent = new MouseEvent('mouseenter');
		button.dispatchEvent(mouseenterEvent);

		expect(eventTracker.mouseenterCount).toBe(1);

		document.body.removeChild(element);
	});

	test('on() method supports keyboard events', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<input class='text-input' type='text'>`;
		document.body.appendChild(element);

		const keyTracker = {
			keydownCount: 0,
			lastKey: '' as string,
		};

		$('.text-input').on('keydown', function(evt) {
			keyTracker.keydownCount += 1;
			keyTracker.lastKey = evt.key;
		});

		const input = document.querySelector('.text-input') as HTMLInputElement;
		const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
		input.dispatchEvent(keyEvent);

		expect(keyTracker.keydownCount).toBe(1);
		expect(keyTracker.lastKey).toBe('Enter');

		document.body.removeChild(element);
	});

	test('on() method handles multiple event types on same element', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='multi-event'>Multi Event Button</button>`;
		document.body.appendChild(element);

		const eventTracker = {
			clickCount: 0,
			mouseenterCount: 0,
			focusCount: 0,
		};

		const result = $('.multi-event');
		result.on('click', () => {
			eventTracker.clickCount += 1;
		});
		result.on('mouseenter', () => {
			eventTracker.mouseenterCount += 1;
		});
		result.on('focus', () => {
			eventTracker.focusCount += 1;
		});

		const button = document.querySelector('.multi-event') as HTMLButtonElement;

		button.click();
		expect(eventTracker.clickCount).toBe(1);

		button.dispatchEvent(new MouseEvent('mouseenter'));
		expect(eventTracker.mouseenterCount).toBe(1);

		button.dispatchEvent(new FocusEvent('focus'));
		expect(eventTracker.focusCount).toBe(1);

		expect(eventTracker.clickCount).toBe(1);
		expect(eventTracker.mouseenterCount).toBe(1);

		document.body.removeChild(element);
	});

	test('on() method preserves event context', () => {
		const element = document.createElement('div');
		element.id = 'test-element';
		element.innerHTML = `<button class='context-test' data-value='test-data'>Context Test</button>`;
		document.body.appendChild(element);

		const contextTracker = {
			targetElement: null as HTMLElement | null,
			dataValue: '' as string,
		};

		$('.context-test').on('click', function(evt) {
			contextTracker.targetElement = evt.target as HTMLElement;
			contextTracker.dataValue = (evt.target as HTMLElement).getAttribute('data-value') || '';
		});

		const button = document.querySelector('.context-test') as HTMLButtonElement;
		button.click();

		expect(contextTracker.targetElement).toBe(button);
		expect(contextTracker.dataValue).toBe('test-data');

		document.body.removeChild(element);
	});
});
