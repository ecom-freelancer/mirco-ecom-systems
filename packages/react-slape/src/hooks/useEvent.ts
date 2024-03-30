import { useContext, useEffect } from 'react';
import { EventContext } from '../context/event-context';

export const useListenEvent = (execFunc: (event) => void, event) => {
  const { getValueEvent } = useContext(EventContext);
  const valueEvent = getValueEvent(event);

  useEffect(() => {
    execFunc(valueEvent);
  }, [valueEvent]);
};
