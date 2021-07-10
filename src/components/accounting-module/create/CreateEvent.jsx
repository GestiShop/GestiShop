/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { deleteEvent, updateEvent } from '../../../db/EventHelper';
import DateTimePicker from '../../ui/forms/DateTimePicker';
import Switch from '../../ui/forms/Switch';
import Button from '../../ui/forms/Button';

const CreateEvent = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();

  const INITIAL_STATE = {
    title: initialState.title,
    start: moment(initialState.start).format('YYYY-MM-DDTHH:MM:SS'),
    end: moment(initialState.end).format('YYYY-MM-DDTHH:MM:SS'),
    description: initialState.description || '',
    allDay: initialState.allDay || false,
  };

  const handleSubmit = (data) => {
    updateEvent(
      { ...data, _id: initialState._id },
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      () => {
        console.log('NO ERROR');
        closeCallback();
      }
    );
  };

  const deleteData = () => {
    deleteEvent(
      initialState._id,
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      () => {
        console.log('NO ERROR');
        closeCallback();
      }
    );
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required(t('form.errors.required')),
    start: Yup.date().required(t('form.errors.required')),
    end: Yup.date()
      .required(t('form.errors.required'))
      .min(Yup.ref('start'), t('form.errors.end-date-before-start-date')),
    description: Yup.string(),
    allDay: Yup.bool(),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{
              ...INITIAL_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    label={t('accounting_module.event.title')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DateTimePicker
                    name="start"
                    label={t('accounting_module.event.start')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DateTimePicker
                    name="end"
                    label={t('accounting_module.event.end')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('accounting_module.event.description')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Switch
                    name="allDay"
                    label={t('accounting_module.event.title')}
                    initialState={INITIAL_STATE.allDay}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button color="secondary" onClick={deleteData}>
                    {t('buttons.delete')}
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <SubmitButton>{t('buttons.save')}</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateEvent;
