import * as React from 'react';
import '../style/CreateBookingComponent.css';
import { CreateBookingComponentProps } from '../types';

class CreateBookingComponent extends React.PureComponent<CreateBookingComponentProps> {
    private createBookingHandler: React.FormEventHandler = event => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const [name, startDate, endDate, startTime, endTime] = form.elements as unknown as HTMLInputElement[];

        this.props.client.createBooking(this.props.officeHours.id, {
            name: name.value,
            startTime: new Date(`${startDate.value}T${startTime.value}`),
            endTime: new Date(`${endDate.value}T${endTime.value}`)
        });
    };

    public render: () => JSX.Element = () => {
        const startDate = this.props.officeHours.startTime.toISOString().split('T')[0];
        const endDate = this.props.officeHours.endTime.toISOString().split('T')[0];

        return (
            <form onSubmit={this.createBookingHandler} className='form'>
                <div className='field-wrapper'>
                    <label htmlFor='name' className='field-label'>NAME</label>
                    <input name='name' type='text' placeholder='Name' className='field'></input>
                </div>

                <div className='divided-fields'>
                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='startDate' className='field-label'>START DATE</label>
                        <input name='startDate' type='date' className='field' defaultValue={startDate}></input>
                    </div>

                    <div className='field-wrapper divided-field-wrapper'>
                        <label htmlFor='endDate' className='field-label'>END DATE</label>
                        <input name='endDate' type='date' className='field' defaultValue={endDate}></input>
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

                <button type='submit' className='form-button'>SUBMIT</button>
            </form>
        );
    }
};

export default CreateBookingComponent;
