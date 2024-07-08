import { PrimitiveAtom, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';

const useSyncAtom = <T>(atom: PrimitiveAtom<T>, value: T) => {
  useHydrateAtoms([[atom, value]]);
  const updateAtom = useSetAtom(atom);
  useEffect(() => {
    updateAtom(value);
  }, [value, updateAtom]);
};
export default useSyncAtom;
