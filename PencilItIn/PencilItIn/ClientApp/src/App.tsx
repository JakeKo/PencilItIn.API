import * as React from 'react';
import { Route } from 'react-router';
import OfficeHoursComponent from './components/OfficeHoursComponent';

export default () => (
    <Route exact path='/' component={OfficeHoursComponent} />
);
