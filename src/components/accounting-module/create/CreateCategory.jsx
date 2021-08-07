/* eslint-disable eqeqeq */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import {
  addCategory,
  updateCategory,
  fetchCategories,
} from '../../../db/CategoryHelper';
import useIsMounted from '../../../utils/useIsMounted';
import Select from '../../ui/forms/Select';

const CreateCategory = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const isMounted = useIsMounted();

  let INITIAL_STATE = {
    reference: '',
    name: '',
    parent: '',
  };

  if (initialState) {
    INITIAL_STATE = {
      reference: initialState.reference,
      name: initialState.name,
      parent:
        initialState.parent && initialState.parent.id
          ? initialState.parent.id
          : '',
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    name: Yup.string().required(t('form.errors.required')),
    parent: Yup.string(),
  });

  const handleSubmit = (data) => {
    const parentCategory = categoriesOptions.find((x) => x._id == data.parent);
    const dataToSubmit = {
      ...data,
      parent: parentCategory ? parentCategory._id : null,
    };

    if (!initialState) {
      addCategory(
        dataToSubmit,
        (error) => {
          console.log('error', error);
          closeCallback();
        },
        () => {
          console.log('NO ERROR');
          closeCallback();
        }
      );
    } else {
      updateCategory(
        { ...dataToSubmit, _id: initialState._id },
        (error) => {
          console.log('error', error);
          closeCallback();
        },
        () => {
          console.log('NO ERROR');
          closeCallback();
        }
      );
    }
  };

  const fetchData = () => {
    fetchCategories(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        let categoriesToDisplay = options;

        if (initialState) {
          categoriesToDisplay = options.filter(
            (option) =>
              JSON.stringify(option._id) !== JSON.stringify(initialState._id)
          );
        }

        if (isMounted.current) setCategoriesOptions(categoriesToDisplay);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="reference"
                    label={t('accounting_module.category.structure.reference')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    name="name"
                    label={t('accounting_module.category.structure.name')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    name="parent"
                    label={t('accounting_module.category.structure.parent')}
                    options={categoriesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.name}`,
                        value: x.id,
                      };
                    })}
                    acceptNone
                  />
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton>
                    {initialState ? t('buttons.save') : t('buttons.create')}
                  </SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateCategory;
