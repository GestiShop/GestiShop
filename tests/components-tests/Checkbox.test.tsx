/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Checkbox } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('Checkbox', () => {
  it('Should render', () => {
    expect(
      render(<Checkbox id="" name="" label="" legend="" onInput={() => {}} />)
    ).toBeTruthy();
  });
});
