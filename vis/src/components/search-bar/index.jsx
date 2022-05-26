import React, {useEffect, useState } from 'react';
import { Select, Button, Form } from 'antd';
import {getInitialSds} from "../../apis/api.js";
const { Option } = Select;


export default function SearchBar() {
    const [setIdValue, setSelectId] = useState(undefined);
    const [setNameValue, setSelectName] = useState(undefined);
    const [setTypeValue, setSelectType] = useState(undefined);
    const [setIndustryValue, setSelectIndustry] = useState(undefined);
    const [setContent, setselectContent] = useState([]);

    useEffect(() => {
        getInitialSds().then((res) => {
            setselectContent(res)
        });
      }, [])

    function getArrT(value) {
        let arrT = {};
        Object.keys(setContent[0]).forEach(k => {
            arrT[k] = setContent.map(o => o[k]);
        });
        let arrTT = [arrT.id,arrT.name,arrT.type,arrT.industry]
        return Array.from(new Set(arrTT[value]))
    }
    const changeId = (value) => {
        setSelectId(value);
        if (value !== undefined) {
            let selectedidarr = setContent.filter(item => item.id === value)
            setselectContent(selectedidarr)
        }
    };
    const searchId = (value) => {
        if (value) {
            setSelectId(value);
        }
    };
    const changeName = (value) => {
        setSelectName(value);
        if (value !== undefined) {
            let selectednamearr = setContent.filter(item => item.name === value)
            setselectContent(selectednamearr)
        }
    };
    const searchName = (value) => {
        if (value) {
            setSelectName(value);
        }
    };
    const changeType = (value) => {
        setSelectType(value);
        if (value !== undefined) {
            let selectedtypearr = setContent.filter(item => item.type === value)
            setselectContent(selectedtypearr)
        }
    };
    const searchType = (value) => {
        if (value) {
            setSelectType(value);
        }
    };
    const changeIndustry = (value) => {
        setSelectIndustry(value);
        if (value !== undefined) {
            let selectedindustryarr = setContent.filter(item => item.industry === value)
            setselectContent(selectedindustryarr)
        }
    };
    const searchIndustry = (value) => {
        if (value) {
            setSelectIndustry(value);
        }
    };
    // const blurTitle = () => {
    //     changeName(setNameValue);
    // };
    const searchData = () => {
        console.log(setIdValue, setNameValue,setTypeValue,setIndustryValue)
    }
    const cleanData = () => {
        setSelectId(undefined)
        setSelectName(undefined)
        setSelectType(undefined)
        setSelectIndustry(undefined)
        // setselectContent([])
    }
    return (
        <div style={{ paddingTop: '15px' }}>
            <Form.Item>
                <Select
                    showArrow
                    placeholder="id"
                    onChange={changeId}
                    onSearch={searchId}
                    showSearch
                    style={{ width: 100 }}
                    value={setIdValue}
                >
                    {getArrT(0).map((item, index) => (
                        <Option key={index} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    allowClear
                    showArrow
                    placeholder="name"
                    onChange={changeName}
                    onSearch={searchName}
                    showSearch
                    // onBlur={blurTitle}
                    style={{ width: 100 }}
                    value={setNameValue}
                >
                    {getArrT(1).map((item, index) => (
                        <Option key={index} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    allowClear
                    showArrow
                    placeholder="type"
                    onChange={changeType}
                    onSearch={searchType}
                    showSearch
                    // onBlur={blurTitle}
                    style={{ width: 100 }}
                    value={setTypeValue}
                >
                    {getArrT(2).map((item, index) => (
                        <Option key={index} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    allowClear
                    showArrow
                    placeholder="industry"
                    onChange={changeIndustry}
                    onSearch={searchIndustry}
                    showSearch
                    // onBlur={blurTitle}
                    style={{ width: 100 }}
                    value={setIndustryValue}
                >
                    {getArrT(3).map((item, index) => (
                        <Option key={index} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Button type='primary' onClick={searchData}>检索</Button>
                <Button type='primary' onClick={cleanData}>清除</Button>
            </Form.Item>
        </div>
    );
}
