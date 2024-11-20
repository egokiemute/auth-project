import { useState } from "react";
import dayjs from "dayjs"; // Install with `npm install dayjs`

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const today = dayjs();
  const currentMonth = dayjs();
  const nextMonth = currentMonth.add(1, "month");

  const generateDaysForMonth = (month) => {
    const daysInMonth = month.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handleDateSelection = (day, month) => {
    const selected = dayjs()
      .set("month", month.month())
      .set("year", month.year())
      .set("date", day)
      .format("YYYY-MM-DD");

    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const isPastDate = (day, month) => {
    const date = dayjs()
      .set("month", month.month())
      .set("year", month.year())
      .set("date", day);
    return date.isBefore(today, "day");
  };

  return (
    <div className="relative">
        <labe>Commencement date</labe>
      {/* Input Field */}
      <input
        type="text"
        placeholder="Pick a date"
        value={selectedDate}
        onFocus={() => setShowCalendar(!showCalendar)}
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
      />

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <div className="flex space-x-8 overflow-x-auto scrollable py-2">
            {/* Current Month */}
            <div className="min-w-[50%] flex-shrink-0">
              <h3 className="text-lg font-medium mb-4 text-center">
                {currentMonth.format("MMMM YYYY")}
              </h3>
              <div className="grid grid-cols-7 gap-4">
                {generateDaysForMonth(currentMonth).map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDateSelection(day, currentMonth)}
                    disabled={isPastDate(day, currentMonth)}
                    className={`w-10 h-10 p-2 text-sm rounded-full ${
                      isPastDate(day, currentMonth)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-black hover:text-white text-black"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Month */}
            <div className="min-w-[50%] flex-shrink-0">
              <h3 className="text-lg font-medium mb-4 text-center">
                {nextMonth.format("MMMM YYYY")}
              </h3>
              <div className="grid grid-cols-7 gap-4">
                {generateDaysForMonth(nextMonth).map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDateSelection(day, nextMonth)}
                    disabled={isPastDate(day, nextMonth)}
                    className={`w-10 h-10 p-2 text-sm rounded-full ${
                      isPastDate(day, nextMonth)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-black hover:text-white text-black"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
