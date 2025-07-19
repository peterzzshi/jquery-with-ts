import { expectAssignable, expectType } from 'tsd';
import $, { SelectorResult } from '../jquery';

const element = $('#test-element');
expectType<SelectorResult>(element);

expectType<string>(element.html());
expectType<SelectorResult>(element.html('content'));

const chainedElement = $('#banner-message');
const chainedResult = chainedElement.show().hide().addClass('test');
expectType<SelectorResult>(chainedResult);

$('#button-container button').on('click', function(event) {
	expectType<MouseEvent>(event);
	expectType<EventTarget | null>(event.target);
	expectType<string>(event.type);
});

$('#input-field').on('keydown', function(event) {
	expectType<KeyboardEvent>(event);
	expectType<string>(event.key);
	expectType<boolean>(event.ctrlKey);
});

$('#form').on('submit', function(event) {
	expectType<SubmitEvent>(event);
});

expectType<SelectorResult>(chainedElement.show());
expectType<SelectorResult>(chainedElement.hide());

const testElement = $('.test');
expectType<SelectorResult>(testElement.addClass('new-class'));
expectType<SelectorResult>(testElement.removeClass('old-class'));

expectType<number>($('.multiple-elements').length);

const ajaxPromise = $.ajax({
	url: '/api/promise',
	success: () => {
	},
});
expectType<Promise<any>>(ajaxPromise);

const complexChain = $('#complex-element')
	.html('New content')
	.addClass('active')
	.show()
	.removeClass('hidden')
	.on('click', (e) => {
		expectType<MouseEvent>(e);
	});
expectType<SelectorResult>(complexChain);

expectAssignable<Parameters<typeof $.ajax>[0]>({
	url: '/api/get',
	method: 'GET',
	success: () => {
	},
});

expectAssignable<Parameters<typeof $.ajax>[0]>({
	url: '/api/post',
	method: 'POST',
	data: { test: 'data' },
	success: () => {
	},
});

expectAssignable<Parameters<typeof $.ajax>[0]>({
	url: '/api/get-no-data',
	method: 'GET',
	success: () => {
	},
	// data is optional
});

const ajaxWithError = $.ajax({
	url: '/api/with-error',
	success: (data) => {
		expectType<any>(data);
	},
	error: (err) => {
		expectType<unknown>(err);
	},
});
expectType<Promise<any>>(ajaxWithError);