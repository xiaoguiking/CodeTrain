
/**
 * 城市选择浮层 
 * 1搜索框
 * 2.回退功能
 * 3.fetchCityData异步数据
 * 4.CityList/CityItem/CitySection 组件
 * 5.字母快速定位
 * 6.搜索建议功能
 */

import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
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

    return (
        <li className="city-li" onClick={() => onSelect(name)}>
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
            <li className="city-li" key="title" data-cate={title}>
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
 * 1.右侧字母列表显示
 * 2.点击响应 
 */
const AlphaIndex = memo(function AlphaIndex(props) {
    const {
        alpha, //指定字母的字符串表示
        onClick, // 回调点击事件
    } = props;
    return (
        <div className="city-index-item" onClick={() => onClick(alpha)}>
            {alpha}
        </div>
    )
})

AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

// 获取26个字母的数组， ele遍历的数组成员 index需要的序号
const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
});


/**
 * 整个列表CityList
 */
const CityList = memo(function CityList(props) {
    const {
        sections, // 集合
        onSelect,
        toAlpha,
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
            <div className="city-index">
                {
                    alphabet.map(alpha => {
                        return (
                            <AlphaIndex
                                key={alpha}
                                alpha={alpha}
                                onClick={toAlpha}
                            />)
                    })
                }
            </div>
        </div>
    )
});

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired
}

/**
 * 1.搜索建议组件单个条目SuggestItem
 */
const SuggestItem = memo(function SuggestItem(props) {
    const {
        name, // 城市名字
        onClick
    } = props;

    return (
        <div className="city-suggest-li" onClick={() => onClick(name)}>
            {name}
        </div>
    )
})

SuggestItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

/**
 * 2.Suggest父级组件
 */
const Suggest = memo(function Suggest(props) {
    const {
        searchKey, // 搜索内容 发送请求
        onSelect
    } = props;
  
    // 存储搜索结果
    const [result, setResult] = useState([]);

    // searchKey请求
    useEffect(() => {
        fetch('/rest/search?key=' + encodeURIComponent(searchKey))  
        .then(res => res.json())
        .then(data => {
            const {result, searchKey: sKey} = data;
            
            if(sKey === searchKey) {
                setResult(result)
            }
        }) 
    }, [searchKey]);

    // 优化没有结果的搜索
    const fallBackResult = useMemo(() => {
        if (!result.length) {
            return [
                {
                    display: searchKey,
                },
            ];
        }

        return result;
    }, [result, searchKey]);


    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {fallBackResult.map(item => {
                    return (
                        <SuggestItem
                            key={item.display}
                            name={item.display}
                            onClick={onSelect}
                        />
                    );
                })}
            </ul>
        </div>
    );
})

Suggest.propTypes = {
    searchKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default function CitySelector(props) {
    const { show, isLoading, cityData, onBack, fetchCityData, onSelect } = props;
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
        if (isLoading) {
            return (<div>loading</div>)
        }

        if (cityData) {
            
            return (
                <CityList
                    sections={cityData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
            )
        }

        return (<div>error</div>)
    }

    // toAlpha
    const toAlpha = useCallback((alpha) => {
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
    },[]);

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
            {
                Boolean(key) && (
                    <Suggest 
                        searchKey={key}
                        onSelect={key => onSelect(key)}
                    />
                )
            }
            {outputCitySections()}
        </div>
    )
}