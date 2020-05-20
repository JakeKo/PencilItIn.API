import * as React from 'react';
import { Redirect } from 'react-router-dom';
import '../style/CreateOfficeHoursComponent.css';
import { CreateOfficeHoursComponentProps } from '../types';

class CreateOfficeHoursComponent extends React.PureComponent<CreateOfficeHoursComponentProps> {
    readonly state: { officeHoursCreated: boolean; officeHoursId: string | undefined } = {
        officeHoursCreated: false,
        officeHoursId: undefined
    };

    private createOfficeHoursHandler: React.FormEventHandler = async event => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const [title, hostName, location, startDate, endDate, startTime, endTime] = form.elements as unknown as HTMLInputElement[];

        const officeHoursId: string = await this.props.client.createOfficeHours({
            title: title.value,
            hostName: hostName.value,
            location: location.value,
            startTime: new Date(`${startDate.value}T${startTime.value}`),
            endTime: new Date(`${endDate.value}T${endTime.value}`)
        });

        this.setState({
            officeHoursCreated: true,
            officeHoursId
        });
    };

    public render: () => JSX.Element = () => {
        // If office hours were just created, redirect to the create office hours
        if (this.state.officeHoursCreated) {
            return (<Redirect to={`/office-hours/${this.state.officeHoursId}`} />);
        }

        return (
            <form className='form' onSubmit={this.createOfficeHoursHandler}>
                <div className='field-wrapper'>
                    <label htmlFor='title' className='field-label'>Title</label>
                    <input name='title' type='text' placeholder='Office Hours' className='field'></input>
                </div>

                <div className='divided-fields'>
                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='hostName' className='field-label'>Host Name</label>
                        <input name='hostName' type='text' placeholder='Jill Smith' className='field'></input>
                    </div>

                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='location' className='field-label'>Location</label>
                        <input name='location' type='text' placeholder='Building 12, Room 264' className='field'></input>
                    </div>
                </div>

                <div className='divided-fields'>
                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='startDate' className='field-label'>START DATE</label>
                        <input name='startDate' type='date' className='field'></input>
                    </div>

                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='endDate' className='field-label'>END DATE</label>
                        <input name='endDate' type='date' className='field'></input>
                    </div>
                </div>

                <div className='divided-fields'>
                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='startTime' className='field-label'>START TIME</label>
                        <input name='startTime' type='time' className='field'></input>
                    </div>

                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='endTime' className='field-label'>END TIME</label>
                        <input name='endTime' type='time' className='field'></input>
                    </div>
                </div>

                <button type='submit' className='form-button'>SCHEDULE</button>
            </form>
        );
    }
}

export default CreateOfficeHoursComponent;