/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ColoredSelect } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('AutocompleteSelect', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <ColoredSelect name="" options={[]} />
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
            <ColoredSelect name="" options={['test0', 'test1']} />
          </Form>
        </Formik>
      )
    ).toBeTruthy();
  });
});
