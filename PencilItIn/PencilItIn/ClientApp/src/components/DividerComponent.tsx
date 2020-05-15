import * as React from 'react';
import { DividerComponentProps, DividerComponentStyles } from "../types";
import { minutesElapsed } from '../utilities';

const styles: () => DividerComponentStyles = () => ({
    line: timeOffset => ({
        borderTop: '1px dashed grey',
        width: '100%',
        position: 'absolute',
        top: `${2 * timeOffset}px`
    }),
    tag: timeOffset => ({
        position: 'absolute',
        top: `${2 * timeOffset - 8}px`,
        left: '-44px',
        height: '16px',
        fontFamily: 'monospace'
    })
});

class DividerComponent extends React.PureComponent<DividerComponentProps> {
    public render: () => JSX.Element = () => {
        const style = styles();
        const { officeHoursStartTime, time } = this.props;
        const timeOffset = minutesElapsed(officeHoursStartTime, time);
        const tag = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padEnd(2, '0');

        return (
            <React.Fragment>
                <div style={style.tag(timeOffset)}>{tag}</div>
                <div style={style.line(timeOffset)}></div>
            </React.Fragment>
        );
    }
}

export default DividerComponent;