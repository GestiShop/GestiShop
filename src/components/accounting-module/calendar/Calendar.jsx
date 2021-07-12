/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import '!style-loader!css-loader!react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useTranslation } from 'react-i18next';
import FullScreenDialog from '../../ui/FullscreenDialog';
import { addEvent, fetchEvents, updateEvent } from '../../../db/EventHelper';
import useIsMounted from '../../../utils/useIsMounted';
import CreateEvent from '../create/CreateEvent';
import EVENT_COLOR_LIST from '../../../../assets/event_colors';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const EventCalendar = () => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    events: [],
    displayDragItemInCell: true,
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const isMounted = useIsMounted();

  const fetchData = () => {
    fetchEvents(
      (error) => {
        console.log('error', error);
      },
      (events) => {
        if (isMounted.current) setState({ ...state, events });
      }
    );
  };

  const updateData = (updatedEvent) => {
    updateEvent(
      updatedEvent,
      (error) => {
        console.log('error', error);
      },
      () => {
        if (isMounted.current) {
          fetchData();
        }
      }
    );
  };

  const addData = (newEvent) => {
    addEvent(
      newEvent,
      (error) => {
        console.log('error', error);
      },
      () => {
        if (isMounted.current) {
          fetchData();
        }
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDragStart = (event) => {
    setState({ ...state, draggedEvent: event });
  };

  const handleOnSelectEvent = (event) => {
    setState({ ...state, selectedEvent: event });
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

    updateData({ ...event._doc, start, end, allDay });
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
      backgroundColor: event.colorCode ? event.colorCode : EVENT_COLOR_LIST[0],
      color:
        !event.colorCode || event.colorCode == 'lightseagreen'
          ? 'white'
          : 'darkslategray',
    };
    return {
      style,
    };
  };

  return (
    <>
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
        childComponent={<CreateEvent />}
        initialState={state.selectedEvent}
      />
    </>
  );
};

export default EventCalendar;
