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
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border-[0.75px] border-gray-100">
        <p className="text-sm font-medium text-blue-800">{calendarText}</p>
        <p className="text-xl font-bold text-blue-800">{calendarDate}</p>
      </div>
    </div>
  );
};

export default BreakdownCalendar;
