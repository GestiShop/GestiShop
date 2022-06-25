/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SubmitButton } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('SubmitButton', () => {
  it('Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <SubmitButton>Test</SubmitButton>
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
