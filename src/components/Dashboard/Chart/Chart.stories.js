import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import Chart from './Chart';

storiesOf('Chart', module)
    .add('default Chart', () => (
        <Chart />
    ));