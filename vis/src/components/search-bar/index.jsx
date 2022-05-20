import React, { useState } from 'react';
import { Select, Button ,Form} from 'antd';

const { Option } = Select;
const selectTitle = ['id', 'name', 'type', 'industry'];
const arr = [['IP1', 'IP2', 'IP3', 'IP4', 'IP5', 'IP6'],
['IP123', 'IP223', 'IP323', 'IP423', 'IP523', 'IP623'],
['IP', 'Domain', 'Cert'],
['A', 'B', 'C', 'D', 'E', 'F']]
var selectContent = arr[0]
export default function SearchBar() {
    const [setTitleValue, setSelectTitle] = useState(undefined);
    const [setContentValue, setSelectContent] = useState(undefined);
    const changeTitle = (value) => {
        setSelectTitle(value);
        if (value!=undefined) selectContent = arr[selectTitle.indexOf(value)]
    };
    const searchTitle = (value) => {
        if (value) {
            setSelectTitle(value);
        }
    };
    const changeContent = (value) => {
        console.log(value)
        setSelectContent(value);
    };
    const searchContent = (value) => {
        if (value) {
            setSelectContent(value);
        }
    };
    const blurTitle = () => {
        changeContent(setContentValue);
    };
    const searchData = () => {
        console.log(setTitleValue, setContentValue)
    }
    const cleanData = () => {
        setSelectTitle(undefined)
        setSelectContent(undefined)
    }
    return (
        <div>
            <Form.Item>
            <Select
                showArrow
                placeholder="id"
                onChange={changeTitle}
                onSearch={searchTitle}
                showSearch
                style={{ width: 100 }}
                value={setTitleValue}
            >
                {selectTitle.map((item, index) => (
                    <Option key={index} value={item}>
                        {item}
                    </Option>
                ))}
            </Select>
            <Select
                allowClear
                showArrow
                placeholder="请输入"
                maxTagCount={1} 
                onChange={changeContent}
                onSearch={searchContent}
                showSearch
                onBlur={blurTitle}
                style={{ width: 300 }}
                value={setContentValue}
            >
                {selectContent.map((item, index) => (
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


