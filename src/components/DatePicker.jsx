import React, { useState } from 'react';
import './DatePicker.css'; // Ensure this CSS file is updated for new styles

const DatePicker = ({ minDate, maxDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDayClick = (day) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    const formattedDate = newDate.getFullYear() + '-' + 
      String(newDate.getMonth() + 1).padStart(2, '0') + '-' + 
      String(newDate.getDate()).padStart(2, '0');
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

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <button key={day} onClick={() => handleDayClick(day)} className="day">
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
            <button onClick={() => changeYear(-1)}>Prev Year</button>
            <button onClick={() => changeMonth(-1)}>Prev Month</button>
            <span>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</span>
            <button onClick={() => changeMonth(1)}>Next Month</button>
            <button onClick={() => changeYear(1)}>Next Year</button>
          </div>
          {renderDays()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;