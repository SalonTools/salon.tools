import { useCallback, useState } from 'react';

export function useBoolean(initial = false): [boolean, (next?: boolean | unknown) => void, () => void, () => void] {
   const [state, setState] = useState(initial);
   const toggle = useCallback((next?: boolean) =>
      setState(current => typeof next === 'boolean' ? next : !current), [setState]);

   const toggleOn = useCallback(() => setState(true), [setState]);
   const toggleOff = useCallback(() => setState(false), [setState]);

   return [
      state,
      toggle,
      toggleOn,
      toggleOff,
   ];
}
