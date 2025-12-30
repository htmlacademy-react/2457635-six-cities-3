import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../test/mock-component';
import { TestIdMarkups, altNotFoundScreenText, notFoundScreenText } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Pages: NotFoundScreen', () => {
  it('should return NotFoundScreen', () => {
    const preparedComponent = withHistory(<NotFoundScreen />);

    render(preparedComponent);
    const errorText = screen.getByText(altNotFoundScreenText);
    const backToMainText = screen.getByText(notFoundScreenText);
    const notFoundScreenContainer = screen.getByTestId(TestIdMarkups.NotFoundTestId);

    expect(errorText).toBeInTheDocument();
    expect(backToMainText).toBeInTheDocument();
    expect(notFoundScreenContainer).toBeInTheDocument();
  });
});
