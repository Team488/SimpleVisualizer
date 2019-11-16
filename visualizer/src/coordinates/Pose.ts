export default class Pose {
    x: number;
    y: number;
    heading: number;

    constructor(
        x: number, 
        y: number, 
        heading: number) {
        this.x = x;
        this.y = y;
        this.heading = heading;
    }   
}

export class RealPose extends Pose {}
export class ScreenPose extends Pose {}