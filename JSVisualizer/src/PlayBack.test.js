import {PlayBackState} from './PlayBack'
import { Position } from './Dimensions';
import { SessionData } from './RobotData';

describe("PlayBackState test", () => {
    it("constructs without crashing", () => {
        const pbs = new PlayBackState();
    })

    it("Starts at 0 index", () => {
        const pbs = new PlayBackState();
        expect(pbs.currentIndex).toEqual(0);
    });

    it("Returns current point for current index", () => {
        const points = [
            new Position(0,0,0),
            new Position(1, 1, 1)
        ];
        const sessionData = new SessionData(points);

        const pbs = new PlayBackState(sessionData);
        expect(pbs.currentPoint()).toEqual(points[0]);
    });

    let points, sessionData, pbs;
    beforeEach(() => {
        points = [
            new Position(0,0,0),
            new Position(1, 1, 1)
        ];
        sessionData = new SessionData(points);

        pbs = new PlayBackState(sessionData);
    });
    
    describe("When not playing", () => {
        it("Doesnt change index on tick()", () => {
            pbs.tick();
            expect(pbs.currentIndex).toEqual(0);
        })

        it("Plays when toggled", () => {
            pbs.togglePlaying();
            expect(pbs.playing).toEqual(true);
        });
    });

    describe("When playing", () => {
        beforeEach(() => {
            pbs.playing = true;
        });

        it("Increments index on tick()", () => {
            pbs.tick();
            expect(pbs.currentIndex).toEqual(1);
            expect(pbs.percent).toEqual(1.0);
        });

        it("Pauses when toggled", () => {
            pbs.togglePlaying();
            expect(pbs.playing).toEqual(false);
        });
    });
    
    describe("Seeking", () => {

        beforeEach(() => {
            points = [
                new Position(0,0,0),
                new Position(1, 1, 1),
                new Position(2, 1, 1),
                new Position(3, 1, 1),
                new Position(5, 0, 0)
            ];
            sessionData = new SessionData(points);
    
            pbs = new PlayBackState(sessionData);
        });
        
        it("Seeks to start", () => {
            pbs.seek(0);
            expect(pbs.currentIndex).toEqual(0);
        });

        it("Seeks to middle", () => {
            pbs.seek(0.5);
            expect(pbs.currentIndex).toEqual(2);
        });

        it("Seeks to middle", () => {
            pbs.seek(1.0);
            expect(pbs.currentIndex).toEqual(points.length - 1);
        });
    });

});