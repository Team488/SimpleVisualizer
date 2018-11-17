

class PlayBackState {
    constructor(sessionData) {
        this.playing = false;
        this.currentIndex = 0;
        this.sessionData = sessionData;
    }
    tick() {
        if(this.playing) {
            let newIndex = this.currentIndex + 1;

            // When we reach the end, pause automatically
            if(newIndex >= this.sessionData.points.length) {
                this.playing = false;
            } else {
                this.currentIndex += 1;
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
        let newIndex = Math.round((this.sessionData.points.length - 1) * percent);
        if(newIndex >= this.sessionData.points.length) {
            debugger;
        }
        this.currentIndex = newIndex;
    }
}

export {PlayBackState};