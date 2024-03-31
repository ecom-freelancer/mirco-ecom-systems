import { useContext, useEffect } from 'react';
import { EventContext } from '../context/event-context';

export const useListenEvent = <T>(execFunc: (event: T) => void, event) => {
  const { getValueEvent } = useContext(EventContext);
  const valueEvent = getValueEvent(event);

  useEffect(() => {
    execFunc(valueEvent);
  }, [valueEvent]);
};
