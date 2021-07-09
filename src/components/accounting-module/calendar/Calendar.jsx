/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import '!style-loader!css-loader!react-big-calendar/lib/addons/dragAndDrop/styles.css';
import events from './events';
import './CalendarStyle.css';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const EventCalendar = () => {
  const [state, setState] = useState({
    events,
    displayDragItemInCell: true,
  });

  const handleDragStart = (event) => {
    setState({ draggedEvent: event });
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

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });

    setState({
      events: nextEvents,
    });

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
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

    setState({ draggedEvent: null });
    moveEvent({ event, start, end });
  };

  const resizeEvent = ({ event, start, end }) => {
    const { events } = state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setState({
      events: nextEvents,
    });

    alert(`${event.title} was resized to ${start}-${end}`);
  };

  const newEvent = (_event) => {
    const idList = state.events.map((a) => a.id);
    const newId = Math.max(...idList) + 1;
    const hour = {
      id: newId,
      title: 'New Event',
      allDay: _event.slots.length === 1,
      start: _event.start,
      end: _event.end,
    };
    setState({
      events: state.events.concat([hour]),
    });
  };

  return (
    <DragAndDropCalendar
      selectable
      localizer={momentLocalizer(moment)}
      events={state.events}
      onEventDrop={moveEvent}
      resizable
      onEventResize={resizeEvent}
      onSelectSlot={newEvent}
      onDragStart={console.log}
      defaultView={Views.MONTH}
      defaultDate={new Date(2015, 3, 12)}
      popup
      dragFromOutsideItem={
        state.displayDragItemInCell ? dragFromOutsideItem : null
      }
      onDropFromOutside={onDropFromOutside}
      handleDragStart={handleDragStart}
    />
  );
};

export default EventCalendar;
