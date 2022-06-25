/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Select } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('Select', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(
        <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
          <Form>
            <Select name="test" label="" onInput={() => {}} options={[]} />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    expect(
      render(
        <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
          <Form>
            <Select
              name="test"
              label=""
              onInput={() => {}}
              options={[
                { displayText: 'test0', value: 0 },
                { displayText: 'test1', value: 1 },
              ]}
            />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });

  it('[WITH DATA AND INITIAL VALUE] Should render', () => {
    expect(
      render(
        <Formik initialValues={{ test: 0 }} onSubmit={() => {}}>
          <Form>
            <Select
              name="test"
              label=""
              onInput={() => {}}
              options={[
                { displayText: 'test0', value: 0 },
                { displayText: 'test1', value: 1 },
              ]}
            />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
