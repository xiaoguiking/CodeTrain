import React from 'react';
import Header from '../components/Header';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './DateSelector.css';

export default function DateSelector(props) {
    const {
        show,
        // onSelect,
        onBack,
    } = props;

    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <Header title="日期选择" onBack={onBack}/>
        </div>
    )
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
}