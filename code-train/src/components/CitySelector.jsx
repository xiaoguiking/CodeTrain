/**
 * 城市选择浮层 
 * 1搜索框
 * 2.回退功能
 * 3.fetchCityData异步数据
 */
import React, { useState, useMemo, useEffect } from 'react';
import './CitySelector.css';
import classnames from 'classnames';

export default function CitySelector(props) {
    const { show, isLoading, cityData, onBack, fetchCityData} = props;
    // console.log('CitySelector', props);
    // console.log('onback', onBack);
    // 动态处理css类名

    // 保存搜索的内容
    const [searchKey, setSearchKey] = useState('');
    const key = useMemo(() => searchKey.trim(), [searchKey]);

    // 处理异步请求
    useEffect(() => {
        // false, 有数据，加载
        if(!show || cityData || isLoading){
            return;
        }
        fetchCityData();
    }, [show, cityData, isLoading])
    
    return (
        <div className={classnames('city-selector', { hidden: !show})}>
            <div className="city-search">
                 <div className="search-back" onClick={() => onBack()}>
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
                className={classnames("search-clean", {hidden: key.length === 0}) }
                onClick={() => setSearchKey('')}
            >
                &#xf063;
            </i>
            </div>
        </div>
    )
}