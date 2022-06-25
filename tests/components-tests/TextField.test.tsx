/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TextField } from '../../src/components/ui/forms';

jest.useFakeTimers();

describe('TextField', () => {
  it('[ONLY REQUIRED FIELDS] Should render', () => {
    expect(
      render(<TextField id="" name="" label="" onInput={() => {}} />)
    ).toBeTruthy();
  });

  it('[ALL FIELDS] Should render', () => {
    expect(
      render(
        <TextField
          id=""
          name=""
          label=""
          onInput={() => {}}
          type="text"
          multiline={false}
          required={true}
          disabled={false}
        />
      )
    ).toBeTruthy();
  });
});
