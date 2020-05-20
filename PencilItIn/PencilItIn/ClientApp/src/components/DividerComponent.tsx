import * as React from 'react';
import { DividerComponentProps } from "../types";
import { minutesElapsed } from '../utilities';
import '../style/DividerComponent.css'

class DividerComponent extends React.PureComponent<DividerComponentProps> {
    public render: () => JSX.Element = () => {
        const { officeHoursStartTime, time } = this.props;
        const tagLabel = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padEnd(2, '0');

        return (
            <React.Fragment>
                <div className='tag' style={{ top: `${2 * minutesElapsed(officeHoursStartTime, time) - 8}px` }}>{tagLabel}</div>
                <div className='line' style={{ top: `${2 * minutesElapsed(officeHoursStartTime, time)}px` }}></div>
            </React.Fragment>
        );
    }
}

export default DividerComponent;