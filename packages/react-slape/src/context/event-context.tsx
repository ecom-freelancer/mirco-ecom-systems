import React from 'react';

export interface EventContextModel {
  emitEvent: <T = any, Type extends string = string>(
    event: Type,
    payload: T,
  ) => void;
  getValueEvent: <T = any>(key: string) => T;
}

export interface EventAction {
  type: string;
  payload: any;
}

export interface EventReducer {
  (state: Record<string, any>, action: EventAction): Record<string, any>;
}

export const EventContext = React.createContext<EventContextModel | null>(null);

export const EventProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [event, dispatchEvent] = React.useReducer<EventReducer, EventAction>(
    (state, action) => {
      switch (action.type) {
        case 'INIT':
          return { ...action.payload };
        case 'loading': {
          const { id, value } = action.payload as {
            id: string;
            value: boolean;
          };
          return { ...state, loading: { ...state.loading, [id]: value } };
        }
        default:
          return { ...state, [action.type]: action.payload };
      }
    },
    {
      type: 'INIT',
      payload: null,
    },
    (action) => {
      return { ...action.payload };
    },
  );
  const emit = <T, Type extends string = string>(type: Type, payload: T) => {
    dispatchEvent({
      type,
      payload,
    });
  };

  const getValueEvent = <T,>(key: string) => {
    return event?.[key] as T;
  };

  return (
    <EventContext.Provider
      value={{
        getValueEvent,
        emitEvent: emit,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
