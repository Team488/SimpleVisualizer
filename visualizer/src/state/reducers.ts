import { State, Action } from "./StateContext";

export const sessionReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'session-select':
            return { ...state, currentSession: action.payload };
        case 'sessions-loaded':
            return { ...state, sessions: action.payload };    
        default:
            return state;
    }
};