/**
 * 出发日期
 * 1.引入只返回天的工具函数
 * 2.引入第三方转换日期dayjs
 */
import React, { useMemo } from 'react';
import {h0} from '../../common/fp';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './DepartDate.css';

export default function DepartDate(props) {
    const {
        time, // 显示时间
        onClick, //响应时间
    } = props;

    const h0ofDepart = h0(time);
    // time有各种变化，但是代表是同一天需要使用h0优化
    const departDateString = useMemo(() => {
        return dayjs(time).format('YYYY-MM-DD');
    },[time]);

    const departDate = new Date(h0ofDepart);

    // 表明今天标注 h0代表当前时刻
    const isToday = h0ofDepart === h0();
    // 星期显示
    const weekString = '周' 
    + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]
    + (isToday ? '(今天)': '');

    return (
    <div className="depart-date" onClick={onClick}
    >
        <input 
            type="hidden"
            name="date"
            value={departDateString}
        />
        {departDateString} 
        <span className="depart-week">
            {weekString}
        </span>
    </div>
    )
}

DepartDate.propTypes = {
 time: PropTypes.number.isRequired,
 onClick: PropTypes.func.isRequired
}