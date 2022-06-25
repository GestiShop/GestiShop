/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AutocompleteSelect } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('AutocompleteSelect', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(
        <AutocompleteSelect
          name=""
          label=""
          onInput={() => {}}
          required={true}
          acceptNone={false}
          options={[]}
        />
      )
    ).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    expect(
      render(
        <AutocompleteSelect
          name=""
          label=""
          onInput={() => {}}
          required={true}
          acceptNone={false}
          options={[
            { displayText: 'test0', value: 0 },
            { displayText: 'test1', value: 1 },
          ]}
        />
      )
    ).toBeTruthy();
  });
});
