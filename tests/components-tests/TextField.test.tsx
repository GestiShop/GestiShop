/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TextField } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('TextField', () => {
  it('[ONLY REQUIRED FIELDS] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <TextField id="" name="" label="" onInput={() => {}} />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });

  it('[ALL FIELDS] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
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
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
