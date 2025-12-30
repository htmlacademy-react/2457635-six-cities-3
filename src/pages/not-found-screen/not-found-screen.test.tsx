import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../mock-component';

describe('Pages: NotFoundScreen', () => {
  it('should return correct', () => {
    const notFoundScreenContainerTestId = 'not-found-container';
    const expectedErrorText = '404 Error';
    const expectedBackToMainText = 'Вернуться на главную';
    const preparedComponent = withHistory(<NotFoundScreen />);

    render(preparedComponent);
    const errorText = screen.getByText(expectedErrorText);
    const backToMainText = screen.getByText(expectedBackToMainText);
    const notFoundScreenContainer = screen.getByTestId(notFoundScreenContainerTestId);

    expect(errorText).toBeInTheDocument();
    expect(backToMainText).toBeInTheDocument();
    expect(notFoundScreenContainer).toBeInTheDocument();
  });
});
