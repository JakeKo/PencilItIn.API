import * as React from 'react';
import { DividerComponentProps, DividerComponentStyles } from "../types";
import { minutesElapsed } from '../utilities';

class DividerComponent extends React.PureComponent<DividerComponentProps> {
    private style: DividerComponentStyles = {
        line: (officeHoursStartTime, time) => ({
            borderTop: '1px dashed grey',
            width: '100%',
            position: 'absolute',
            top: `${2 * minutesElapsed(officeHoursStartTime, time)}px`
        }),
        tag: (officeHoursStartTime, time) => ({
            position: 'absolute',
            top: `${2 * minutesElapsed(officeHoursStartTime, time) - 8}px`,
            left: '-44px',
            height: '16px',
            fontFamily: 'monospace'
        })
    };

    public render: () => JSX.Element = () => {
        const { line, tag } = this.style;
        const { officeHoursStartTime, time } = this.props;
        const tagLabel = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padEnd(2, '0');

        return (
            <React.Fragment>
                <div style={tag(officeHoursStartTime, time)}>{tagLabel}</div>
                <div style={line(officeHoursStartTime, time)}></div>
            </React.Fragment>
        );
    }
}

export default DividerComponent;