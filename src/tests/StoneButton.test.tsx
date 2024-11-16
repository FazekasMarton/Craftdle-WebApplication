import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StoneButton } from '../components/StoneButton';
import '@testing-library/jest-dom';

describe('StoneButton component', () => {
  it('renders a button with children text', () => {
    render(<StoneButton>Click me</StoneButton>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('applies opacity style when disabled', () => {
    render(<StoneButton disabled>Disabled Button</StoneButton>);
    const button = screen.getByText('Disabled Button');
    expect(button).toHaveStyle({ opacity: '0.3' });
  });

  it('renders an anchor tag when href is provided', () => {
    render(<StoneButton href="https://example.com">Link Button</StoneButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveTextContent('Link Button');
  });

  it('disables pointer events when disabled with href', () => {
    render(
      <StoneButton href="https://example.com" disabled>
        Disabled Link
      </StoneButton>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ pointerEvents: 'none' });
  });

  it('renders a div when href is not provided', () => {
    render(<StoneButton>Div Button</StoneButton>);
    const div = screen.getByText('Div Button').closest('div');
    expect(div).toBeInTheDocument();
  });
});
