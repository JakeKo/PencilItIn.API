import * as React from 'react';
import { CreateOfficeHoursFormComponentProps, CreateOfficeHoursFormComponentStyle } from '../types';

const styles: () => CreateOfficeHoursFormComponentStyle = () => ({
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
});

class CreateOfficeHoursFormComponent extends React.Component<CreateOfficeHoursFormComponentProps> {
    render: () => JSX.Element = () => {
        const style = styles();

        return (
            <form style={style.form()}>
                <div style={style.fieldWrapper()}>
                    <label htmlFor='title' style={style.fieldLabel()}>Title</label>
                    <input name='title' type='text' placeholder='Office Hours' style={style.field()}></input>
                </div>

                <div style={style.dividedFields()}>
                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='hostName' style={style.fieldLabel()}>Host Name</label>
                        <input name='hostName' type='text' placeholder='Jill Smith' style={style.field()}></input>
                    </div>

                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='location' style={style.fieldLabel()}>Location</label>
                        <input name='location' type='text' placeholder='Building 12, Room 264' style={style.field()}></input>
                    </div>
                </div>

                <div style={style.dividedFields()}>
                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='startDate' style={style.fieldLabel()}>START DATE</label>
                        <input name='startDate' type='date' style={style.field()}></input>
                    </div>

                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='endDate' style={style.fieldLabel()}>END DATE</label>
                        <input name='endDate' type='date' style={style.field()}></input>
                    </div>
                </div>

                <div style={style.dividedFields()}>
                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='startTime' style={style.fieldLabel()}>START TIME</label>
                        <input name='startTime' type='time' style={style.field()}></input>
                    </div>

                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='endTime' style={style.fieldLabel()}>END TIME</label>
                        <input name='endTime' type='time' style={style.field()}></input>
                    </div>
                </div>

                <button type='submit' style={style.formButton()}>SCHEDULE</button>
            </form>
        );
    }
}

export default CreateOfficeHoursFormComponent;