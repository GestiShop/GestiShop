/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DatePicker } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('DatePicker', () => {
  it('Should render', () => {
    expect(render(<DatePicker name="" required={false} />)).toBeTruthy();
  });
});
