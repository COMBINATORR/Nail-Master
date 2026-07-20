import { Children } from 'react';
import './StickyStack.css';

/**
 * Mobile sticky card stack.
 * Replaces ScrollStack (WebGL/JS pin transforms) with CSS sticky runways:
 * you scroll one card into place at a time; the next covers the previous.
 */
export function StickyStackItem({ children }) {
  return children;
}

export default function StickyStack({ children, className = '' }) {
  const items = Children.toArray(children);

  return (
    <div className={`sticky-stack ${className}`.trim()}>
      {items.map((child, i) => (
        <div
          key={child.key ?? i}
          className="sticky-stack__slot"
          style={{ '--stack-i': i }}
        >
          <div className="sticky-stack__card">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
