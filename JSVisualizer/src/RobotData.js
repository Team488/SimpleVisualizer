import {Position} from './Dimensions';
const Influx = require('influx');

const dbName = 'RobotPose';

class SessionData {
    constructor(points) {
        this.points = points;
    }
}

function fetchLatestPosition() {
    const influx = new Influx.InfluxDB({
        database: dbName
    });

    return influx.query(`
        select * from Pose
        ORDER BY DESC
        limit 1
    `).then( (result) => {
        var latest = result[0];
        var pos = new Position(latest.X, latest.Y, latest.Heading);
        return pos;
    })
    .catch( (error) => {
        console.error("Failed to retrieve data from influx: " + error);
    });
}

function fetchLatestPositions() {
    const influx = new Influx.InfluxDB({
        database: dbName
    });

    const limit = 500;

    return influx.query(`
        select * from Pose
        ORDER BY DESC
        limit ${limit}
    `).then( (result) => {
        let positions = result.map(row => new Position(row.X, row.Y, row.Heading));
        return positions;
    })
    .catch( (error) => {
        console.error("Failed to retrieve data from influx: " + error);
        throw error;
    });
}


export {fetchLatestPosition, fetchLatestPositions, SessionData};