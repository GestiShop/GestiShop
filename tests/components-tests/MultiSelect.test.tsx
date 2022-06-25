/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MultiSelect } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('MultiSelect', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(<MultiSelect name="" label="" options={[]} initialValue={[]} />)
    ).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    expect(
      render(
        <MultiSelect
          name=""
          label=""
          options={[
            { displayText: 'test0', value: 0 },
            { displayText: 'test1', value: 1 },
          ]}
          initialValue={[]}
        />
      )
    ).toBeTruthy();
  });

  it('[WITH DATA AND INITIAL VALUE] Should render', () => {
    expect(
      render(
        <MultiSelect
          name=""
          label=""
          options={[
            { displayText: 'test0', value: 0 },
            { displayText: 'test1', value: 1 },
          ]}
          initialValue={[0]}
        />
      )
    ).toBeTruthy();
  });
});
