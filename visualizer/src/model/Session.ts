export default interface Session {
    name: string,
    startDateTime: Date,
    endDateTime: Date
}

/**
 * Returns duration of session in seconds.
 * @param session 
 */
export function getDuration(session: Session) {
    return Math.ceil((session.endDateTime.getTime() - session.startDateTime.getTime()) / 1000.0);
}