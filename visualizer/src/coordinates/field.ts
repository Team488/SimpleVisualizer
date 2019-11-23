import Pose, { RealPose, ScreenPose } from "./Pose";

// the robot considers Y the long side of the field

const fieldRealXInches = 320;
const fieldRealYInches = 650;
const fieldRealXYAspectRatio = fieldRealXInches / fieldRealYInches;

export const fieldScreenXPixels = 800; // eventually should be configurable
export const fieldScreenYPixels = fieldScreenXPixels * fieldRealXYAspectRatio;

// this defines the XY scale between real and screen
export const pixelsPerRealInch = fieldScreenXPixels / fieldRealYInches;

export function realToScreenPose(pose: RealPose): ScreenPose {
    return new ScreenPose(
        (pose.y) * pixelsPerRealInch,
        (pose.x) * pixelsPerRealInch,
        -1 * (pose.heading - 90)
    );
}

export function screenToRealPose(pose: ScreenPose) {
    return new ScreenPose(
        (pose.y) / pixelsPerRealInch,
        (pose.x) / pixelsPerRealInch,
        -1 * (pose.heading + 90)
    );
}