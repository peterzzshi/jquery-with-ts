# jQuery with TypeScript

A modern, lightweight jQuery-like library built entirely with TypeScript, providing familiar DOM manipulation and AJAX
functionality with full type safety.

## Features

- 🎯 **Familiar jQuery-like API** - Use the same `$()` selector syntax you know and love
- 🔒 **Full Type Safety** - Written in TypeScript with comprehensive type definitions
- 🎨 **DOM Manipulation** - Element selection, content modification, and class management
- 🌐 **AJAX Support** - Promise-based HTTP requests with async/await
- ⚡ **Lightweight** - Modern ES2022 target with minimal dependencies
- 🧪 **Well Tested** - Comprehensive test suite with Jest and TSD for type testing
- 🔧 **Method Chaining** - Fluent API design for readable, chainable operations

## Installation

```bash
npm install
```

## Quick Start

```typescript
import $ from 'jquery-with-ts';

// Select elements and manipulate them
$('#my-element')
	.html('Hello, World!')
	.addClass('highlight')
	.show();

// Event handling
$('.button').on('click', (event) => {
	console.log('Button clicked!');
});

// AJAX requests
$.ajax({
	url: 'https://api.example.com/data',
	method: 'GET',
	success: (data) => {
		console.log('Data received:', data);
	},
	error: (err) => {
		console.error('Request failed:', err);
	}
});
```

## API Reference

### Element Selection

```typescript
const elements = $(selector
:
string
):
SelectorResult
```

Select DOM elements using CSS selectors, just like jQuery.

### DOM Manipulation

#### Content Management

```typescript
// Get HTML content
const content = $('#element').html();

// Set HTML content
$('#element').html('<p>New content</p>');
```

#### CSS Class Management

```typescript
// Add CSS class
$('.items').addClass('active');

// Remove CSS class
$('.items').removeClass('inactive');
```

#### Visibility Control

```typescript
// Show elements
$('#modal').show();

// Hide elements
$('#modal').hide();
```

### Event Handling

```typescript
// Add event listeners
$('.button').on('click', (event) => {
	// Handle click event
});

$('input').on('change', (event) => {
	// Handle input change
});
```

### AJAX Requests

```typescript
// GET request
$.ajax({
	url: '/api/users',
	method: 'GET',
	success: (data) => {
		console.log('Users:', data);
	}
});

// POST request with data
$.ajax({
	url: '/api/users',
	method: 'POST',
	data: { name: 'John', email: 'john@example.com' },
	success: (response) => {
		console.log('User created:', response);
	},
	error: (err) => {
		console.error('Failed to create user:', err);
	}
});
```

## Method Chaining

All DOM manipulation methods return the `SelectorResult` instance, enabling fluent method chaining:

```typescript
$('#notification')
	.html('Operation completed successfully!')
	.addClass('success')
	.show()
	.on('click', () => {
		$('#notification').hide().removeClass('success');
	});
```

## TypeScript Support

This library is built with TypeScript and provides full type safety:

```typescript
import $, { SelectorResult } from 'jquery-with-ts';

// Type-safe element selection
const element: SelectorResult = $('#my-element');

// Type-safe event handling
$('button').on('click', (event: MouseEvent) => {
	// event is properly typed as MouseEvent
});
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/peterzzshi/jquery-with-ts.git
cd jquery-with-ts

# Install dependencies
npm install

# Build the project
npm run build
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run Jest unit tests
- `npm run test:types` - Run TypeScript definition tests
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Testing

The project includes comprehensive testing:

- **Unit Tests**: Jest-based tests for functionality
- **Type Tests**: TSD-based tests for TypeScript definitions
- **Coverage**: Full test coverage reporting

```bash
# Run all tests
npm test

# Run type definition tests
npm run test:types

# Generate coverage report
npm run test:coverage
```

## Browser Compatibility

- Modern browsers supporting ES2022
- TypeScript 5.8+
- DOM API support required

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Run the test suite (`npm run check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT © Peter Shi

## Why jQuery with TypeScript?

While modern frameworks like React and Vue are excellent for building applications, sometimes you need simple DOM
manipulation with the familiarity of jQuery but with the safety and developer experience of TypeScript. This library
provides:

- **Migration Path**: Easy transition from jQuery to modern TypeScript
- **Type Safety**: Catch errors at compile time, not runtime
- **Modern JavaScript**: Built with ES2022 features and modern best practices
- **Lightweight**: No unnecessary bloat, just the features you need
- **Familiar API**: If you know jQuery, you already know this library

Perfect for projects that need simple DOM manipulation, progressive enhancement, or when working with legacy codebases
that want to modernize gradually.
