/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MultiSelect } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('MultiSelect', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <MultiSelect name="" label="" options={[]} initialValue={[]} />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });

  it('[WITH DATA] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <MultiSelect
              name=""
              label=""
              options={[
                { displayText: 'test0', value: 0 },
                { displayText: 'test1', value: 1 },
              ]}
              initialValue={[]}
            />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });

  it('[WITH DATA AND INITIAL VALUE] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <MultiSelect
              name=""
              label=""
              options={[
                { displayText: 'test0', value: 0 },
                { displayText: 'test1', value: 1 },
              ]}
              initialValue={[0]}
            />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
