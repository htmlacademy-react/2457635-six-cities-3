import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';
import { describe, it, expect } from 'vitest';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    const loadingScreenContainerTestId = 'loading-container';

    render(<LoadingScreen />);
    const loadingScreenContainer = screen.getByTestId(loadingScreenContainerTestId);

    expect(loadingScreenContainer).toBeInTheDocument();
  });
});
