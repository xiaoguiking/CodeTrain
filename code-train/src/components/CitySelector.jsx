/**
 * 城市选择浮层 
 * 1搜索框
 */
import React, { useState } from 'react';
import './CitySelector.css';
import classnames from 'classnames';

export default function CitySelector(props) {
    const { show, isLoading, cityData, onBack1,} = props;
    // console.log('CitySelector', props);
    // console.log('onback', onBack);
    // 动态处理css类名

    // 保存搜索的内容
    const [searchKey, setSearchKey] = useState('');

    return (
        <div className={classnames('city-selector', { hidden: !show})}>
            <div className="city-search">
                 <div className="search-back" onClick={() => onBack1()}>
                        <svg width="42" height="42">
                            <polyline
                                points="25, 13, 16, 21, 25, 29"
                                stroke="#fff"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                 </div>
            <div className="search-input-wrapper">
                <input 
                    type="text"
                    value={searchKey}
                    className="search-input"
                    placeholder="城市、车站的中文或拼音"
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>
            <i 
                className={classnames("search-clean", {hidden: searchKey.length === 0}) }
                onClick={() => setSearchKey('')}
            >
                &#xf063;
            </i>
            </div>
        </div>
    )
}