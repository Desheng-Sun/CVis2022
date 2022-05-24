import React, { useState } from 'react';
import * as d3 from "d3";
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
        if (value != undefined) {
            let selectedidarr = setContent.filter(item => item.id == value)
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
        if (value != undefined) {
            let selectednamearr = setContent.filter(item => item.name == value)
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
        if (value != undefined) {
            let selectedtypearr = setContent.filter(item => item.type == value)
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
        if (value != undefined) {
            let selectedindustryarr = setContent.filter(item => item.industry == value)
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

// export default function SearchBar() {
//     let s_1 = 0.00000001
//     let s_2 = 0.0002
//     var jsnx = require('jsnetworkx')
//     var G = new jsnx.Graph()
//     G.addEdgesFrom([[1, 2], [2, 3], [3, 4], [1, 3], [5, 6], [4, 8], [5, 7]], { weight: 3 });
//     console.log(G.getEdgeData(1, 4))
//     let bc = jsnx.betweennessCentrality(G)._numberValues
//     let bcarr = []
//     for (let i = 0; i < Object.keys(bc).length; i++) {
//         bcarr.push({ name: Object.keys(bc)[i], value: Object.values(bc)[i] })
//     }
//     var compare = function (obj1, obj2) {
//         var val1 = obj1.value
//         var val2 = obj2.value
//         if (val1 < val2) return 1
//         else if (val1 > val2) return -1
//         else return 0
//     }
//     bcarr = bcarr.sort(compare)
//     let selectbcarr = []
//     for (let i = 0; i < bcarr.length; i++) {
//         if ((i + 1) * s_1 > bcarr[i].value) break
//         selectbcarr.push(bcarr[i])
//     }
//     let dc = jsnx.degree(G)._numberValues
//     let dcarr = []
//     for (let i = 0; i < Object.keys(dc).length; i++) {
//         dcarr.push({ name: Object.keys(dc)[i], value: Object.values(dc)[i] })
//     }
//     dcarr = dcarr.sort(compare)
//     let selectdcarr = []
//     for (let i = 0; i < dcarr.length; i++) {
//         if ((i + 1) * s_2 > dcarr[i].value) break
//         selectdcarr.push(dcarr[i])
//     }
//     function getIntersectionData(dataA, dataB) {
//         outLoop: for (let i = dataA.length - 1; i >= 0; i--) {
//             for (let j = 0; j < dataB.length; j++) {
//                 if (dataA[i].id === dataB[j].id) {
//                     continue outLoop;
//                 }
//             }
//             dataA.splice(i, 1);
//         }
//         return dataA;
//     }
//     var result = getIntersectionData(selectbcarr, selectdcarr)
//     let selectnodes = []
//     for (let i = 0; i < result.length; i++) {
//         selectnodes.push(Number(result[i].name))
//     }
//     let selectedges = jsnx.edges(G, selectnodes)
//     var g = new jsnx.Graph()
//     g.addEdgesFrom(selectedges)
//     let dropnodes = []
//     for (let i = 0; i < selectnodes.length; i++) {
//         let path = []
//         for (let j = i + 1; j < selectnodes.length; j++) {
//             if (!jsnx.hasPath(g, { source: selectnodes[i], target: selectnodes[j] }))
//                 path.push(true)
//         }
//         if (path.length == selectnodes.length - i) dropnodes.push(i)
//     }
//     g.removeNodesFrom(dropnodes);
//     console.log(g)
// }

