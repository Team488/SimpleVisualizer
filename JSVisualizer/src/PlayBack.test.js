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

    describe("When not playing", () => {
        const points = [
            new Position(0,0,0),
            new Position(1, 1, 1)
        ];
        const sessionData = new SessionData(points);

        const pbs = new PlayBackState(sessionData);

        it("Doesnt change index on tick()", () => {
            pbs.tick();
            expect(pbs.currentIndex).toEqual(0);
        })
    });

    describe("When playing", () => {
        const points = [
            new Position(0,0,0),
            new Position(1, 1, 1)
        ];
        const sessionData = new SessionData(points);

        const pbs = new PlayBackState(sessionData);
        pbs.playing = true;
        it("Increments index on tick()", () => {
            pbs.tick();
            expect(pbs.currentIndex).toEqual(1);
        });
    });
    
});