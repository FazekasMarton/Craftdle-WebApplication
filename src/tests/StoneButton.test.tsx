import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { StoneButton } from '../components/StoneButton';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('StoneButton component', () => {
  // Test to check if the button renders with children text
  it('renders a button with children text', () => {
    render(<StoneButton>Click me</StoneButton>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  // Test to check if the button applies opacity style when disabled
  it('applies opacity style when disabled', () => {
    render(<StoneButton disabled>Disabled Button</StoneButton>);
    const button = screen.getByText('Disabled Button');
    expect(button).toHaveStyle({ opacity: '0.3' });
  });

  // Test to check if the button renders an anchor tag when href is provided
  it('renders an anchor tag when href is provided', () => {
    render(
      <BrowserRouter>
        <StoneButton href="https://example.com">Link Button</StoneButton>
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveTextContent('Link Button');
  });

  // Test to check if the button renders a div when href is not provided
  it('renders a div when href is not provided', () => {
    render(<StoneButton>Div Button</StoneButton>);
    const div = screen.getByText('Div Button').closest('div');
    expect(div).toBeInTheDocument();
  });

  // Test to check if the button plays sound on click
  it('should play sound on click', () => {
    const audioMock = vi.fn();
    global.HTMLAudioElement.prototype.play = audioMock;
    render(<StoneButton>Sound Test</StoneButton>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(audioMock).toHaveBeenCalled();
  });
});