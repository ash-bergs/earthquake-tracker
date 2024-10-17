import { Layer } from '@/types';
import { useAtom } from 'jotai';
import { activeLayersAtom } from '@/store';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

interface LayerToggleProps {
  layer: Layer;
  isActive: boolean;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ layer, isActive }) => {
  const [activeLayers, setActiveLayer] = useAtom(activeLayersAtom);
  const buttonText = layer.charAt(0).toUpperCase() + layer.slice(1);

  const toggleLayer = (layer: 'daily' | 'weekly') => {
    if (
      activeLayers[layer].high ||
      activeLayers[layer].med ||
      activeLayers[layer].low
    ) {
      setActiveLayer({
        ...activeLayers,
        [layer]: { high: false, med: false, low: false },
      });
    } else {
      setActiveLayer({
        ...activeLayers,
        [layer]: { high: true, med: true, low: false },
      });
    }
  };

  return (
    <button
      onClick={() => toggleLayer(layer)}
      className={`flex items-center gap-2 p-2 ${
        isActive ? 'bg-white' : 'bg-gray-200'
      } rounded-md`}
      aria-label={`${isActive ? 'Hide' : 'Show'} ${layer} layer`}
    >
      {buttonText} {isActive ? <FaEye /> : <FaEyeSlash />}
    </button>
  );
};

export default LayerToggle;
