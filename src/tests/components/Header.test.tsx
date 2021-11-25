import { render, screen } from '@testing-library/react';
import {Header} from '../../components/Header';

it('logo is render', () => {
  render(<Header />);
  const linkElement = screen.getByText('S-Shop');
  expect(linkElement).toBeInTheDocument();
});
