import React, { useState } from 'react';
import './DatePicker.css';

const DatePicker = ({ minDate, maxDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDayClick = (day) => {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), day));
    const formattedDate = newDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    onChange(formattedDate);
    setIsOpen(false);
  };

  const changeMonth = (offset) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + offset, 1));
  };

  const changeYear = (offset) => {
    setDate(new Date(date.getFullYear() + offset, date.getMonth(), 1));
  };

  const renderDays = () => {
    const days = [];
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isDisabled = (minDate && dayDate < new Date(minDate)) || (maxDate && dayDate > new Date(maxDate));
      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDayClick(day)}
          className={`day ${isDisabled ? 'disabled' : ''}`}
        >
          {day}
        </button>
      );
    }

    return <div className="days">{days}</div>;
  };

  return (
    <div className="date-picker">
      <input
        type="text"
        value={selectedDate || ''}
        readOnly
        onClick={toggleCalendar}
        placeholder="Select a date"
      />
      {isOpen && (
        <div className="calendar">
          <div className="month-navigation">
            <button onClick={() => changeYear(-1)}>&lt;&lt;</button>
            <button onClick={() => changeMonth(-1)}>&lt;</button>
            <span>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</span>
            <button onClick={() => changeMonth(1)}>&gt;</button>
            <button onClick={() => changeYear(1)}>&gt;&gt;</button>
          </div>
          {renderDays()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
