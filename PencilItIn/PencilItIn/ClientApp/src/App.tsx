import * as React from 'react';
import { Route } from 'react-router';
import OfficeHours from './components/OfficeHours';

export default () => (
    <Route exact path='/' component={OfficeHours} />
);
