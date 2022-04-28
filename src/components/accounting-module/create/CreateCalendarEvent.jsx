/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Container } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  SubmitButton,
  DateTimePicker,
  Switch,
  Button,
  ColoredSelect,
} from '../../ui/forms';
import { deleteEvent, upsertEvent } from '../../../db';
import { EVENT_COLOR_LIST, DEFAULT_EVENT_COLOR_CODE } from '../../../model';

const CreateCalendarEvent = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();

  const INITIAL_STATE = {
    title: initialState?.title ?? '',
    start: moment(initialState.start).format('YYYY-MM-DDTHH:mm'),
    end: moment(initialState.end).format('YYYY-MM-DDTHH:mm'),
    description: initialState?.description ?? '',
    colorCode:
      initialState?.colorCode?.background ??
      DEFAULT_EVENT_COLOR_CODE.background,
    allDay: initialState?.allDay ?? false,
  };

  const handleSubmit = async (data) => {
    await upsertEvent({
      ...data,
      id: initialState.id,
      colorCode:
        EVENT_COLOR_LIST.find((color) => color.background === data.colorCode) ??
        undefined,
    });

    closeCallback();
  };

  const deleteData = async () => {
    await deleteEvent(initialState.id);
    closeCallback();
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required(t('form.errors.required')),
    start: Yup.date().required(t('form.errors.required')),
    end: Yup.date()
      .required(t('form.errors.required'))
      .min(Yup.ref('start'), t('form.errors.end_date_before_start_date')),
    description: Yup.string(),
    colorCode: Yup.string(),
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
                    required
                    name="title"
                    label={t('accounting_module.event.structure.title')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DateTimePicker
                    required
                    name="start"
                    label={t('accounting_module.event.structure.start')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DateTimePicker
                    required
                    name="end"
                    label={t('accounting_module.event.structure.end')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={10}
                    name="description"
                    label={t('accounting_module.event.structure.description')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ColoredSelect
                    name="colorCode"
                    label={t('accounting_module.event.structure.color')}
                    options={EVENT_COLOR_LIST.map((x) => x.background)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Switch
                    name="allDay"
                    label={t('accounting_module.event.structure.all_day')}
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

export default CreateCalendarEvent;
