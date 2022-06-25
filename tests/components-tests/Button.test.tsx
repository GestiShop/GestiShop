/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('Button', () => {
  it('[ONLY REQUIRED FIELDS] Should render', () => {
    expect(
      render(
        <Button id="" onClick={() => {}}>
          Test
        </Button>
      )
    ).toBeTruthy();
  });

  it('[ALL FIELDS] Should render', () => {
    expect(
      render(
        <Button id="" onClick={() => {}} className="" color="primary">
          Test
        </Button>
      )
    ).toBeTruthy();
  });
});
