const fieldXInches = 320;
const fieldYInches = 650;

const pixelsPerInche = fieldYInches / 800; // defines screen size of field

const screenXPixels = fieldYInches / pixelsPerInche;
const screenYPixels = fieldXInches / pixelsPerInche;

function Position(x, y, heading) {
	this.x = x;
	this.y = y;
	this.heading = heading;
}


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

export {Position, fieldXInches, fieldYInches, screenXPixels, screenYPixels, pixelsPerInche, normalizeFieldPosition, normalizedToScreenPosition};