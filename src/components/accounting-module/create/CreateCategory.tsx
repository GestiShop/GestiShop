import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { upsertCategory, fetchCategories } from '../../../db';
import useIsMounted from '../../../utils/useIsMounted';
import Select from '../../ui/forms/Select';
import { Category } from '../../../model/types';
import { EMPTY_CATEGORY } from '../../../model/samples';

type Props = {
  closeCallback?: any;
  initialState?: Category;
};

const CreateCategory = ({ closeCallback, initialState }: Props) => {
  const { t } = useTranslation();
  const [categoriesOptions, setCategoriesOptions] = useState<Array<Category>>(
    []
  );
  const isMounted = useIsMounted();

  const INITIAL_STATE: Category = initialState ?? EMPTY_CATEGORY;

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    name: Yup.string().required(t('form.errors.required')),
    parent: Yup.string(),
  });

  const handleSubmit = async (data: Category): Promise<void> => {
    await upsertCategory({
      ...data,
      id: initialState?.id,
    });
    closeCallback();
  };

  const fetchData = async (): Promise<void> => {
    const response = await fetchCategories();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        let categoriesToDisplay = response.result;

        if (initialState) {
          categoriesToDisplay = categoriesToDisplay.filter(
            (category: Category) =>
              JSON.stringify(category.id) !== JSON.stringify(initialState.id)
          );
        }

        setCategoriesOptions(categoriesToDisplay);
      }
    }
  };

  useEffect((): void => {
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

CreateCategory.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateCategory;