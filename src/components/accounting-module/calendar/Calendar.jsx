/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import LocalConfiguration from '../../../utils/local-configuration';
import { FullScreenDialog } from '../../ui/FullscreenDialog';
import { upsertEvent, fetchEvents } from '../../../db';
import useIsMounted from '../../../utils/use-is-mounted';
import CreateCalendarEvent from '../create/CreateCalendarEvent';
import { DEFAULT_EVENT_COLOR_CODE } from '../../../model';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import '!style-loader!css-loader!react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localLang = LocalConfiguration.getLocalLanguageInfo();
if (localLang != null) {
  const langPath = `${localLang.languageCode}${
    localLang.languageCode === 'en' ? '-gb' : ''
  }`;
  import(`moment/locale/${langPath}`);
}

const DragAndDropCalendar = withDragAndDrop(Calendar);

const EventCalendar = () => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    events: [],
    displayDragItemInCell: true,
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const isMounted = useIsMounted();

  const fetchData = async () => {
    const response = await fetchEvents();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      setState({
        ...state,
        events: response.result,
      });
    }
  };

  const updateData = async (updatedEvent) => {
    await upsertEvent(updatedEvent);
    await fetchData();
  };

  const addData = async (newEvent) => {
    await upsertEvent(newEvent);
    await fetchData();
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const handleDragStart = (event) => {
    setState({
      ...state,
      draggedEvent: event,
    });
  };

  const handleOnSelectEvent = (event) => {
    setState({
      ...state,
      selectedEvent: event,
    });
    setOpenEditDialog(true);
  };

  const dragFromOutsideItem = () => {
    return state.draggedEvent;
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = state;

    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    updateData({
      id: event.id,
      start,
      end,
      allDay,
    });
  };

  const onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = state;

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay,
    };

    setState({ ...state, draggedEvent: null });
    moveEvent({ event, start, end });
  };

  const resizeEvent = ({ event, start, end }) => {
    updateData({ ...event._doc, start, end });
  };

  const newEvent = (_event) => {
    const newEvent = {
      title: t('accounting_module.event.new'),
      allDay: _event.slots.length === 1,
      start: _event.start,
      end: _event.end,
    };

    addData(newEvent);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    fetchData();
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor:
        event.colorCode.background ?? DEFAULT_EVENT_COLOR_CODE.background,
      color: event.colorCode.text ?? DEFAULT_EVENT_COLOR_CODE.text,
    };
    return {
      style,
    };
  };

  return (
    <Box id="calendar--container" sx={{ height: '100%' }}>
      <DragAndDropCalendar
        selectable
        popup
        toolbar
        resizable
        localizer={momentLocalizer(moment)}
        events={state.events}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onSelectEvent={handleOnSelectEvent}
        defaultView={Views.MONTH}
        dragFromOutsideItem={
          state.displayDragItemInCell ? dragFromOutsideItem : null
        }
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
        eventPropGetter={eventStyleGetter}
      />
      <FullScreenDialog
        open={openEditDialog}
        closeCallback={handleCloseEditDialog}
        title={t('accounting_module.event.edit')}
        childComponent={<CreateCalendarEvent />}
        initialState={state.selectedEvent}
      />
    </Box>
  );
};

export default EventCalendar;
