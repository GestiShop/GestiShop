/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DateTimePicker } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('DateTimePicker', () => {
  it('Should render', () => {
    expect(render(<DateTimePicker name="" required={false} />)).toBeTruthy();
  });
});
