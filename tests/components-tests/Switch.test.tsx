/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Switch } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('Switch', () => {
  it('Should render', () => {
    expect(
      render(
        <Switch name="" label="" initialState={false} setValue={() => {}} />
      )
    ).toBeTruthy();
  });
});
