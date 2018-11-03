

class PlayBackState {
    constructor(sessionData) {
        this.playing = false;
        this.currentIndex = 0;
        this.sessionData = sessionData;
    }
    tick() {
        if(this.playing) {
            this.currentIndex += 1;

            // When we reach the end, pause automatically
            if(this.currentIndex >= this.sessionData.points.length) {
                this.playing = false;
            }
        }
    }
    togglePlaying() {
        this.playing = !this.playing;
    }
    currentPoint() {
        return this.sessionData.points[this.currentIndex];
    }
}

export {PlayBackState};