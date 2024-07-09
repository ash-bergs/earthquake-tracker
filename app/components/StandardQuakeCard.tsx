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
    'bg-orange-500': magnitude >= 4 && magnitude < 6,
    'bg-red-500': magnitude >= 6,
  });

  return (
    <div className="relative bg-purple-heart-100 rounded-lg shadow-lg cursor-pointer p-3 text-color-purple-heart-950">
      <div
        className={classNames('p-[2px] px-[6px] w-min rounded-lg', magClass)}
      >
        <p
          style={{
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {parseFloat(mag).toFixed(1)}
        </p>
      </div>

      {/** divider */}
      <div>
        <p>{name}</p>
        <p>{new Date(time).toLocaleString()}</p>

        <Link href={url} target="_blank">
          Details
        </Link>
      </div>
    </div>
  );
};

export default StandardQuakeCard;
