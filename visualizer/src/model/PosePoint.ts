import BasePoint from "./BasePoint";

export default interface PosePoint extends BasePoint {
    x: number,
    y: number,
    heading: number,
    time: Date
}