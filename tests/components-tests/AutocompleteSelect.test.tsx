/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost"}
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AutocompleteSelect } from '../../src/components/ui/forms';
import { Form, Formik } from 'formik';

jest.useFakeTimers();

describe('AutocompleteSelect', () => {
  it('[EMPTY] Should render', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AutocompleteSelect
              name=""
              label=""
              onInput={() => {}}
              required={true}
              acceptNone={false}
              options={[]}
            />
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
            <AutocompleteSelect
              name=""
              label=""
              onInput={() => {}}
              required={true}
              acceptNone={false}
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
