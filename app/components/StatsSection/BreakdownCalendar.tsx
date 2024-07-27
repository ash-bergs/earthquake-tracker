type BreakdownCalendarProps = {
  calendarText: any;
  calendarDate: any;
};
const BreakdownCalendar = ({
  calendarText,
  calendarDate,
}: BreakdownCalendarProps) => {
  return (
    <div>
      {/** Calendar Component */}
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
        <p className="text-sm font-medium text-gray-500">{calendarText}</p>
        <p className="text-xl font-bold text-purple-heart-900">
          {calendarDate}
        </p>
      </div>
    </div>
  );
};

export default BreakdownCalendar;
