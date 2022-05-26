import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Select, Button, Form } from "antd";
import { getInitialSds } from "../../apis/api";

const { Option } = Select;
// var arr = [
//   { id: "1", name: "ip1111111", type: "IP", industry: "A" },
//   { id: "2", name: "ip113311", type: "IP", industry: "A" },
//   { id: "3", name: "ip1311", type: "IP", industry: "A" },
//   { id: "4", name: "ip1141", type: "IP", industry: "A,B" },
//   { id: "5", name: "ip1231111", type: "Domain", industry: "A,C" },
//   { id: "6", name: "ip1121111", type: "Domain", industry: "A" },
//   { id: "7", name: "ip1115111", type: "Domain", industry: "A" },
//   { id: "8", name: "ip1121111", type: "IP", industry: "A,C" },
//   { id: "9", name: "ip1151111", type: "IP", industry: "A,D" },
//   { id: "10", name: "ip1131111", type: "IP", industry: "A" },
//   { id: "11", name: "ip51111", type: "IP", industry: "A" },
//   { id: "12", name: "ip113111", type: "IP", industry: "A" },
//   { id: "13", name: "ip1111311", type: "IP", industry: "A" },
// ];
export default function SearchBar() {
  const [selectId, setSelectId] = useState(undefined);
  const [selectName, setSelectName] = useState(undefined);
  const [selectType, setSelectType] = useState(undefined);
  const [selectIndustry, setSelectIndustry] = useState(undefined);
  const [selectContent, setSelectContent] = useState([]);

  useEffect(() => {
    console.log(1111);
    getInitialSds().then((res) => {
      setSelectContent(res);
    });
  }, []);

  useEffect(() => {
    console.log(222);
    console.log(selectContent);
  }, [selectContent]);

  function getArrT(value) {
    let arrT = {};
    if (selectContent.length != 0) {
      Object.keys(selectContent[0]).forEach((k) => {
        arrT[k] = selectContent.map((o) => o[k]);
      });
      let arrTT = [arrT.id, arrT.name, arrT.type, arrT.industry];
      return Array.from(new Set(arrTT[value]));
    } else {
      return [];
    }
  }

  const changeId = (value) => {
    setSelectId(value);
    if (value !== undefined) {
      let selectedidarr = selectContent.filter((item) => item.id === value);
      setSelectContent(selectedidarr);
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
      let selectednamearr = selectContent.filter((item) => item.name === value);
      setSelectContent(selectednamearr);
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
      let selectedtypearr = selectContent.filter((item) => item.type === value);
      setSelectContent(selectedtypearr);
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
      let selectedindustryarr = selectContent.filter(
        (item) => item.industry === value
      );
      setSelectContent(selectedindustryarr);
    }
  };
  const searchIndustry = (value) => {
    if (value) {
      setSelectIndustry(value);
    }
  };

  const onSearchData = () => {
    console.log(selectId, selectName, selectType, selectIndustry);
  };

  const onCleanData = () => {
    setSelectId(undefined);
    setSelectName(undefined);
    setSelectType(undefined);
    setSelectIndustry(undefined);
    // setselectContent(arr)
  };
  return (
    <div style={{ paddingTop: "15px" }}>
      <Form.Item>
        <Select
          showArrow
          placeholder="id"
          onChange={changeId}
          onSearch={searchId}
          showSearch
          style={{ width: 100 }}
          value={selectId}
        >
          {/* {getArrT(0).map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))} */}
        </Select>
        <Select
          allowClear
          showArrow
          placeholder="name"
          onChange={changeName}
          onSearch={searchName}
          showSearch
          style={{ width: 100 }}
          value={selectName}
        >
          {/* {getArrT(1).map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))} */}
        </Select>
        <Select
          allowClear
          showArrow
          placeholder="type"
          onChange={changeType}
          onSearch={searchType}
          showSearch
          style={{ width: 100 }}
          value={selectType}
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
          style={{ width: 100 }}
          value={selectIndustry}
        >
          {/* {getArrT(3).map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))} */}
        </Select>
        <Button type="primary" onClick={onSearchData}>
          检索
        </Button>
        <Button type="primary" onClick={onCleanData}>
          清除
        </Button>
      </Form.Item>
    </div>
  );
}
