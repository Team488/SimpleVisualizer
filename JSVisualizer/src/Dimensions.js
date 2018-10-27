import {Position} from './RobotData';

const fieldXInches = 320;
const fieldYInches = 650;

const pixelsPerInche = fieldYInches / 800; // defines screen size of field

const screenXPixels = fieldYInches / pixelsPerInche;
const screenYPixels = fieldXInches / pixelsPerInche;


function normalizeFieldPosition(position) {
	return new Position(
		position.x / fieldXInches,
		position.y / fieldYInches,
		position.heading
	)
}

function normalizedToScreenPosition(position) {
	return new Position(
		position.x * screenYPixels,
		position.y * screenXPixels,
		position.heading
	)
}

export {fieldXInches, fieldYInches, screenXPixels, screenYPixels, pixelsPerInche, normalizeFieldPosition, normalizedToScreenPosition};