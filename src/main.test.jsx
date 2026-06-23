import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App.jsx';

// Mock react-dom/client to observe createRoot and render calls
vi.mock('react-dom/client', () => {
  const render = vi.fn();
  return {
    createRoot: vi.fn(() => ({ render })),
  };
});

// Mock App to avoid testing the entire component tree here
vi.mock('./App.jsx', () => {
  return {
    default: () => <div data-testid="app-mock">App Mock</div>,
  };
});

describe('main.jsx', () => {
  it('renders the App wrapped in StrictMode to the root element', async () => {
    // 1. Setup the DOM
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // 2. Import main.jsx so it executes
    // Need to use dynamic import because main.jsx executes immediately on import
    await import('./main.jsx');

    // 3. Verify createRoot was called with our root element
    expect(ReactDOMClient.createRoot).toHaveBeenCalledWith(rootElement);

    // 4. Verify render was called on the created root
    // createRoot returns an object with a render method.
    // Since we mocked it to return an object with a mocked render, let's get that.
    const renderMock = ReactDOMClient.createRoot.mock.results[0].value.render;

    expect(renderMock).toHaveBeenCalledTimes(1);

    // Check what it was called with. It should be React.StrictMode containing App.
    const renderArg = renderMock.mock.calls[0][0];

    // We expect the argument to be a React element of type StrictMode
    expect(renderArg.type).toBe(React.StrictMode);

    // Check its children
    const child = renderArg.props.children;
    expect(child.type).toBe(App);

    // Cleanup
    document.body.removeChild(rootElement);
  });
});
