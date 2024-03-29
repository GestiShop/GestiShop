import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Alert, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { TextField, SubmitButton, Select } from '../../ui/forms';
import {
  upsertCategory,
  fetchCategories,
  fetchCategoryById,
} from '../../../db';
import { Category, EMPTY_CATEGORY } from '../../../model';

type Props = {
  closeCallback?: any;
  initialState?: Types.ObjectId;
};

const CreateCategory = ({ closeCallback, initialState }: Props) => {
  const { t } = useTranslation();
  const [categoriesOptions, setCategoriesOptions] = useState<Array<Category>>(
    []
  );
  const [existingCategory, setExistingCategory] =
    useState<Category>(EMPTY_CATEGORY);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    name: Yup.string().required(t('form.errors.required')),
    parent: Yup.string(),
  });

  const handleSubmit = async (data: Category): Promise<void> => {
    const response = await upsertCategory({
      ...data,
      id: initialState,
    });

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      closeCallback();
    }
  };

  const fetchAllCategories = async (): Promise<void> => {
    const response = await fetchCategories();
    if (response.error !== null) {
      console.error(response.error);
    } else {
      if (response.result !== null) {
        let categoriesToDisplay = response.result;

        if (initialState) {
          categoriesToDisplay = categoriesToDisplay.filter(
            (category: Category) =>
              JSON.stringify(category.id) !== JSON.stringify(initialState)
          );
        }

        setCategoriesOptions(categoriesToDisplay);
      }
    }
  };

  const fetchData = async (id: Types.ObjectId): Promise<void> => {
    const response = await fetchCategoryById(id);
    if (response.error !== null) {
      console.error(response.error);
    } else {
      if (response.result !== null) {
        setExistingCategory(response.result);
      }
    }
  };

  useEffect((): void => {
    fetchAllCategories();
    if (initialState) {
      fetchData(initialState);
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={existingCategory}
            enableReinitialize
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

      {errorMessage !== undefined && (
        <Grid item xs={12}>
          <Alert severity="error" id="error-message--alert">
            {errorMessage}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

CreateCategory.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateCategory;
