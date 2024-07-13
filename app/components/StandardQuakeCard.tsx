'use client';
import Link from 'next/link';
import classNames from 'classnames';

type QuakeCardProps = {
  place: string;
  mag: string;
  time: string;
  url: string;
};

// have a need for a non-interactive "quake card" - but I don't feel like adding a bunch of conditionals to the QuakeCard
const StandardQuakeCard = ({ place, mag, time, url }: QuakeCardProps) => {
  const name = place;
  const magnitude = Number(parseFloat(mag).toFixed(1));

  /** color the magnitude section of the card based on event severity */
  const magClass = classNames({
    'bg-green-500': magnitude < 2,
    'bg-yellow-500': magnitude >= 2 && magnitude < 4,
    'bg-orange-400': magnitude >= 4 && magnitude < 6,
    'bg-red-400': magnitude >= 6,
  });

  return (
    <div className="relative bg-black-100 rounded-lg shadow-lg p-3 text-color-purple-heart-950 w-[200px] transform transition-transform duration-300 hover:scale-105">
      <div
        className={classNames(
          'flex place-content-center p-[2px] mx-[16px] shadow-sm rounded-lg',
          magClass
        )}
      >
        <p
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {parseFloat(mag).toFixed(1)}
        </p>
      </div>

      {/** divider */}
      <div className="flex flex-col gap-1 pt-2 text-purple-heart-950">
        <p>{name}</p>
        <p>{new Date(time).toLocaleString()}</p>

        <Link className="underline " href={url} target="_blank">
          Details
        </Link>
      </div>
    </div>
  );
};

export default StandardQuakeCard;
