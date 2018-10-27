import {Position} from './Dimensions';


function fetchLatestPosition() {
    return fetch('http://localhost:8086/query?db=RobotPose&q=select X,Y,Heading from Pose ORDER BY DESC LIMIT 1')
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				try {
					let newPosition = new Position(
						data.results[0].series[0].values[0][1],
						data.results[0].series[0].values[0][2],
						data.results[0].series[0].values[0][3],
					);
					return newPosition;
				} catch (exception) {
					console.error("Failed to parse data from influx.")
				}
			});
}


export {fetchLatestPosition};