import { useAtom } from 'jotai';
import { activeLayersAtom } from '@/store';

interface MagnitudeToggleProps {
  layer: 'daily' | 'weekly';
}

const MagnitudeToggle: React.FC<MagnitudeToggleProps> = ({ layer }) => {
  const [activeLayers, setActiveLayers] = useAtom(activeLayersAtom);

  const toggleMagnitude = (
    layer: 'daily' | 'weekly',
    level: 'low' | 'med' | 'high'
  ) => {
    setActiveLayers({
      ...activeLayers,
      [layer]: {
        ...activeLayers[layer],
        [level]: !activeLayers[layer][level], // toggle the selected magnitude on the given layer
      },
    });
  };

  return (
    <div className="flex gap-2 py-3">
      <fieldset>
        <legend>Mag:</legend>
      </fieldset>

      <div>
        <input
          type="checkbox"
          id={`${layer}-high`}
          name="high"
          value="high"
          checked={activeLayers[layer].high}
          onChange={() => toggleMagnitude(layer, 'high')}
          style={{ marginRight: '4px' }}
        />
        <label htmlFor={`${layer}-high`}>High</label>
      </div>
      <div>
        <input
          type="checkbox"
          id={`${layer}-med`}
          name="med"
          value="med"
          checked={activeLayers[layer].med}
          onChange={() => toggleMagnitude(layer, 'med')}
          style={{ marginRight: '4px' }}
        />
        <label htmlFor={`${layer}-med`}>Medium</label>
      </div>
      <div>
        <input
          type="checkbox"
          id={`${layer}-low`}
          name="low"
          value="low"
          checked={activeLayers[layer].low}
          onChange={() => toggleMagnitude(layer, 'low')}
          style={{ marginRight: '4px' }}
        />
        <label htmlFor={`${layer}-low`}>Low</label>
      </div>
    </div>
  );
};

export default MagnitudeToggle;
