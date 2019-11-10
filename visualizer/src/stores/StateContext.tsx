import React, { createContext, useContext, useReducer } from 'react';
import Session from '../model/Session';
import { sessionReducer } from './reducers';

// this style of state management was taken from:
// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c

export interface State {
  sessions: Session[]
}

const initialState: State = {
  sessions: []
}

export interface Action {
  type: string,
  payload: any
}

type Dispatch = (action: Action) => void;

type ContextType = [State, Dispatch];

interface Props {
  children: React.ReactNode
}

export const StateContext = createContext<ContextType | null>(null);

export const StateProvider = ({ children }: Props) => (
  <StateContext.Provider value={useReducer(sessionReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = (): ContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("Context must be set by a provider");
  }
  return context;
};