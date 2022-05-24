import React, { useState } from 'react';
import { Select, Button, Form } from 'antd';
const { Option } = Select;
var arr = [
    { id: '1', name: 'ip1111111', type: 'IP', industry: 'A' },
    { id: '2', name: 'ip113311', type: 'IP', industry: 'A' },
    { id: '3', name: 'ip1311', type: 'IP', industry: 'A' },
    { id: '4', name: 'ip1141', type: 'IP', industry: 'A,B' },
    { id: '5', name: 'ip1231111', type: 'Domain', industry: 'A,C' },
    { id: '6', name: 'ip1121111', type: 'Domain', industry: 'A' },
    { id: '7', name: 'ip1115111', type: 'Domain', industry: 'A' },
    { id: '8', name: 'ip1121111', type: 'IP', industry: 'A,C' },
    { id: '9', name: 'ip1151111', type: 'IP', industry: 'A,D' },
    { id: '10', name: 'ip1131111', type: 'IP', industry: 'A' },
    { id: '11', name: 'ip51111', type: 'IP', industry: 'A' },
    { id: '12', name: 'ip113111', type: 'IP', industry: 'A' },
    { id: '13', name: 'ip1111311', type: 'IP', industry: 'A' }
]
export default function SearchBar() {
    const [setIdValue, setSelectId] = useState(undefined);
    const [setNameValue, setSelectName] = useState(undefined);
    const [setTypeValue, setSelectType] = useState(undefined);
    const [setIndustryValue, setSelectIndustry] = useState(undefined);
    const [setContent, setselectContent] = useState(arr);
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
        setselectContent(arr)
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


