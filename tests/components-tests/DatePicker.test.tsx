/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DatePicker } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('DatePicker', () => {
  it('Should render', () => {
    expect(
      render(
        <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
          <Form>
            <DatePicker name="test" required={false} />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
