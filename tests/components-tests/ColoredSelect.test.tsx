/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ColoredSelect } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('AutocompleteSelect', () => {
  it('[EMPTY] Should render', () => {
    expect(render(<ColoredSelect name="" options={[]} />)).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    expect(
      render(<ColoredSelect name="" options={['test0', 'test1']} />)
    ).toBeTruthy();
  });
});
