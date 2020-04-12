/**
 * 头部公共组件Header
 */
import React from 'react'
import PropTypes from 'prop-types';
import './Header.css';

export default function Header(props) {
    const { onBack, title } = props;
    console.log(onBack, 'on');
    return (
        <div className="header">
            <div className="header-back" onClick={onBack}>
                 <svg width="42" height="42">
                    <polyline 
                        points="25, 13, 16, 21, 25, 29"
                        stroke="#fff"
                        strokeWidth="2"
                        fill="none"
                    />
                 </svg>
            </div>
            <h1 className="header-title">
                {title}
            </h1>
        </div>
    )
}
// 静态类型检查
Header.protoTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}