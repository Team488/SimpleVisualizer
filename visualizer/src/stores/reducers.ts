import { State, Action } from "./StateContext";

export const sessionReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'createSession':
            return { ...state, sessions: [action.payload] };
        case 'sessions-loaded':
            return { ...state, sessions: action.payload };    
        default:
            return state;
    }
};