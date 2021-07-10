/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import '!style-loader!css-loader!react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { addEvent, fetchEvents, updateEvent } from '../../../db/EventHelper';
import useIsMounted from '../../../utils/useIsMounted';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const EventCalendar = () => {
  const [state, setState] = useState({
    events: [],
    displayDragItemInCell: true,
  });
  const isMounted = useIsMounted();

  const fetchData = () => {
    fetchEvents(
      (error) => {
        console.log('error', error);
      },
      (events) => {
        console.log(events);
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
    console.log(event);
    // TODO: OPEN DIALOG TO DISPLAY/CHANGE INFO OF THE EVENT
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
      title: 'New Event',
      allDay: _event.slots.length === 1,
      start: _event.start,
      end: _event.end,
    };

    addData(newEvent);
  };

  return (
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
      defaultDate={new Date()}
      dragFromOutsideItem={
        state.displayDragItemInCell ? dragFromOutsideItem : null
      }
      onDropFromOutside={onDropFromOutside}
      handleDragStart={handleDragStart}
    />
  );
};

export default EventCalendar;
