/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Checkbox } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('Checkbox', () => {
  it('Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <Checkbox id="" name="" label="" legend="" onInput={() => {}} />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
