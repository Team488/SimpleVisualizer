import React from 'react';
import { useStateValue } from '../state/StateContext';
import DurationMarker from './DurationMarker';

const TimelineSlider: React.FC = () => {
    const [ { posePoints, playbackIndex }, dispatch ] = useStateValue();

    if (!posePoints) {
        return null;
    }

    function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
        dispatch({ type: 'playback-set', payload: parseInt(event.currentTarget.value) });
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <input 
                    style={{
                        flexGrow: 1
                    }}
                    type="range" 
                    min={0} 
                    max={posePoints.length - 1} 
                    value={playbackIndex}
                    onChange={handleOnChange} />
            <div style={{
                flexBasis: '70px'
            }} >
                <DurationMarker />
            </div>
        </div>
    );
}

export default TimelineSlider;