import { InfluxDB } from 'influx';
import Session from '../model/Session';

const dbName = 'RobotPose';

interface RawPosePoint {
    X: number,
    Y: number,
    Heading: number
}

export default class Api {
    influx: InfluxDB;

    constructor(influx?: InfluxDB) {
        this.influx = influx ||  new InfluxDB({
            database: dbName
        });;
    }

    // For live tailing the robot
    async fetchLatestPosition() {
        return this.influx.query(`
            select X, Y, Heading from Pose
            ORDER BY DESC
            limit 1
        `).then( (results) => {
            var latest = results[0] as RawPosePoint;
            var pos = [latest.X, latest.Y, latest.Heading];
            return pos;
        });
    }

    async listSessions(): Promise<Session[]> {
        const commonMeasurement = 'X'; // needs to be on every event we care about
        const startResults = await this.influx.query(`
            SELECT first(${commonMeasurement}), time 
            FROM "Pose" 
            GROUP BY "Session"
        `);
        const starts = new Map(startResults.map((result: any) => {
            return [result.Session as string, result.time as Date];
        }));

        const endResults = await this.influx.query(`
            SELECT last(${commonMeasurement}), time 
            FROM "Pose" 
            GROUP BY "Session"
        `);
        const ends = new Map(endResults.map((result: any) => {
            return [result.Session as string, result.time as Date];
        }));

        // join results together to create final list of Sessions
        return Array.from(starts).map(([session, start]) => {
            return {
                name: session,
                startDateTime: start,
                endDateTime: ends.get(session) as Date
            };
        }).sort((sessionA, sessionB) => {
            // sort descending
            return sessionB.startDateTime.getTime() - sessionA.startDateTime.getTime();
        });

    }

}