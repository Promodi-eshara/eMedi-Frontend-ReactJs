import React from 'react';

function DateSelector({ selectedDate, handleDateSelection, dates }) {
    return (
        <div className="schedule">
            {dates.map(date => (
                <button
                    key={date}
                    className={selectedDate === date ? 'btn_primary' : 'btn_secondary'}
                    onClick={() => handleDateSelection(date)}
                >
                    {date}
                </button>
            ))}
        </div>
    );
}

export default DateSelector;
