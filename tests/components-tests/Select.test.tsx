/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Select } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('Select', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(<Select name="" label="" onInput={() => {}} options={[]} />)
    ).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    expect(
      render(
        <Select
          name=""
          label=""
          onInput={() => {}}
          options={[
            { displayText: 'test0', value: 0 },
            { displayText: 'test1', value: 1 },
          ]}
        />
      )
    ).toBeTruthy();
  });
});
