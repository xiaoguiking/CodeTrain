/**
 * 城市选择浮层 
 * 1搜索框
 * 2.回退功能
 * 3.fetchCityData异步数据
 * 4.
 */
import React, { useState, useMemo, useEffect, memo } from 'react';
import './CitySelector.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';


/**
 * 最小力度城市CityItem
 */
const CityItem = memo(function CityItem(props) {
    const {
        name, // 城市名字
        onSelect
    } = props;
    console.log(name, 'name');
    return (
        <li className="city-li" onClick={() => onSelect(name) }>
            {name}
        </li>
    )
});

CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

/**
 * 中型首字母相同城市组件集合
 */
const CitySection = memo(function CitySection(props) {
    const {
        cities = [],
        title,   //A,B
        onSelect
    } = props;
    
    return (
        <ul className="city-ul">
            <li className="city-li" key="title">
                {title}
            </li>
            {
                cities.map(city => { 
                    return (
                        <CityItem
                            key={city.name}
                            name={city.name}
                            onSelect={onSelect}
                        />
                    )
                })
            }
        </ul>
    )
});

CitySection.propTypes = {
    cities: PropTypes.array,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}
/**
 * 整个列表CityList
 */
const CityList = memo(function CityList(props) {
    const {
        sections, // 集合
        onSelect
    } = props;

    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    sections.map(section => {
                        return (
                            <CitySection 
                                title={section.title}
                                key={section.title}
                                cities={section.citys}
                                onSelect={onSelect}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
});

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default function CitySelector(props) {
    const { show, isLoading, cityData, onBack, fetchCityData, onSelect } = props;
    // console.log('CitySelector', props);
    // console.log('onback', onBack);
    // 动态处理css类名

    // 保存搜索的内容
    const [searchKey, setSearchKey] = useState('');
    const key = useMemo(() => searchKey.trim(), [searchKey]);

    // 处理异步请求
    useEffect(() => {
        // false, 有数据，加载
        if (!show || cityData || isLoading) {
            return;
        }
        fetchCityData();
    }, [show, cityData, isLoading, fetchCityData])

    // 关于加载数据cityData是否存在情况
    const outputCitySections = () => {
         if(isLoading){
            return (<div>loading</div>)
         }

         if(cityData) {
             console.log('cityData',cityData.cityList);
             return (
                 <CityList 
                    sections={cityData.cityList}
                    onSelect={onSelect} 
                />
             )
        }

        return (<div>error</div>)
    }

    return (
        <div className={classnames('city-selector', { hidden: !show })}>
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
                    className={classnames("search-clean", { hidden: key.length === 0 })}
                    onClick={() => setSearchKey('')}
                >
                    &#xf063;
            </i>
            </div>
                {outputCitySections()}
        </div>
    )
}