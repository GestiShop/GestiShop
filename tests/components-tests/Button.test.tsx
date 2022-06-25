/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('Button', () => {
  it('[ONLY REQUIRED FIELDS] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <Button id="" onClick={() => {}}>
              Test
            </Button>
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
            <Button id="" onClick={() => {}} className="" color="primary">
              Test
            </Button>
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
