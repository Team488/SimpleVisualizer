

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
    get percent() {
        return this.currentIndex / (this.sessionData.points.length - 1);
    }
    togglePlaying() {
        this.playing = !this.playing;
    }
    currentPoint() {
        return this.sessionData.points[this.currentIndex];
    }
    seek(percent) {
        this.currentIndex = Math.round((this.sessionData.points.length - 1) * percent);
    }
}

export {PlayBackState};