import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { CreateOfficeHoursComponentProps, CreateOfficeHoursComponentStyles } from '../types';

class CreateOfficeHoursComponent extends React.PureComponent<CreateOfficeHoursComponentProps> {
    readonly state: { officeHoursCreated: boolean; officeHoursId: string | undefined } = {
        officeHoursCreated: false,
        officeHoursId: undefined
    };

    private style: CreateOfficeHoursComponentStyles = {
        form: () => ({
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            margin: '32px 0'
        }),
        fieldWrapper: () => ({
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'monospace',
            margin: '8px'
        }),
        dividedFields: () => ({
            display: 'flex',
            width: '100%'
        }),
        dividedFieldWrapper: () => ({
            width: '50%'
        }),
        fieldLabel: () => ({
            fontSize: '12px',
            fontWeight: 'bold',
        }),
        field: () => ({
            border: '1px solid black',
            padding: '12px',
            boxSizing: 'border-box',
            fontSize: '16px'
        }),
        formButton: () => ({
            margin: '8px 8px 16px 8px',
            padding: '16px',
            background: 'black',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            cursor: 'pointer'
        })
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

        const { form, fieldWrapper, dividedFields, dividedFieldWrapper, fieldLabel, field, formButton } = this.style;

        return (
            <form style={form()} onSubmit={this.createOfficeHoursHandler}>
                <div style={fieldWrapper()}>
                    <label htmlFor='title' style={fieldLabel()}>Title</label>
                    <input name='title' type='text' placeholder='Office Hours' style={field()}></input>
                </div>

                <div style={dividedFields()}>
                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='hostName' style={fieldLabel()}>Host Name</label>
                        <input name='hostName' type='text' placeholder='Jill Smith' style={field()}></input>
                    </div>

                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='location' style={fieldLabel()}>Location</label>
                        <input name='location' type='text' placeholder='Building 12, Room 264' style={field()}></input>
                    </div>
                </div>

                <div style={dividedFields()}>
                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='startDate' style={fieldLabel()}>START DATE</label>
                        <input name='startDate' type='date' style={field()}></input>
                    </div>

                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='endDate' style={fieldLabel()}>END DATE</label>
                        <input name='endDate' type='date' style={field()}></input>
                    </div>
                </div>

                <div style={dividedFields()}>
                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='startTime' style={fieldLabel()}>START TIME</label>
                        <input name='startTime' type='time' style={field()}></input>
                    </div>

                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='endTime' style={fieldLabel()}>END TIME</label>
                        <input name='endTime' type='time' style={field()}></input>
                    </div>
                </div>

                <button type='submit' style={formButton()}>SCHEDULE</button>
            </form>
        );
    }
}

export default CreateOfficeHoursComponent;