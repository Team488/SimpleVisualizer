import { State, Action } from "./StateContext";

export const sessionReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'session-select':
            return { ...state, currentSession: action.payload };
        case 'sessions-loaded':
            return { 
                ...state, 
                sessions: action.payload,
                currentSession: action.payload[0]
             };
        case 'points-loaded':
            return { ...state, posePoints: action.payload };   
        default:
            return state;
    }
};