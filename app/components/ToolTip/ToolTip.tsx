import { FaQuestionCircle } from 'react-icons/fa';

type ToolTipProps = {
  content: React.ReactNode;
};

//TODO: fixme: the hover seems to bubble up, and triggers when it shouldn't
const ToolTip = ({ content }: ToolTipProps) => {
  return (
    <div className="group relative w-max self-end pr-2">
      <FaQuestionCircle size="18px" />
      <span
        className="flex flex-col gap-2 point-events-none absolute bg-gray-50 shadow-inner top-7 right-0 w-[300px] p-4 opacity-0 transition-opacity group-hover:opacity-100 rounded-lg "
        style={{ zIndex: '100' }}
      >
        {content}
      </span>
    </div>
  );
};

export default ToolTip;
