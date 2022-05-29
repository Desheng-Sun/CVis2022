import React, { useEffect, useState } from "react";
import { Select, Button, Form } from "antd";
import { getInitialSds } from "../../apis/api";
import PubSub from "pubsub-js";

const { Option } = Select;

export default function SearchBar() {
  const [selectId, setSelectId] = useState(undefined);
  const [selectNumId, setSelectNumId] = useState(undefined);
  const [selectType, setSelectType] = useState(undefined);
  const [selectIndustry, setSelectIndustry] = useState(undefined);
  const [selectContent, setSelectContent] = useState([[], [], [], []]);

  useEffect(() => {
    if (selectId != undefined) {
      getInitialSds(selectType, selectIndustry, selectId).then((res) => {
        setSelectContent(res);
      });
    } else if (selectType == undefined || selectIndustry == undefined) {
      getInitialSds("", "", selectId).then((res) => {
        // console.log(res)
        setSelectContent(res);
      });
    } else {
      getInitialSds(selectType, selectIndustry, selectId).then((res) => {
        setSelectContent(res);
      });
    }
  }, [selectType, selectIndustry, selectId]);

  useEffect(() => {}, [selectContent]);

  let type = [
    "Domain",
    "IP",
    "Cert",
    "Whois_Name",
    "Whois_Phone",
    "Whois_Email",
    "IP_C",
    "ASN",
  ];
  let industry = [
    "  ",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "AB",
    "AC",
    "AD",
    "AE",
    "AG",
    "AH",
    "AI",
    "BC",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "CE",
    "CG",
    "CH",
    "CI",
    "FG",
    "FI",
    "GH",
    "GI",
    "HI",
    "ABC",
    "ABE",
    "ABG",
    "ABI",
    "ACG",
    "ACI",
    "AGI",
    "BCE",
    "BCG",
    "BCH",
    "BCI",
    "BFI",
    "BGH",
    "BGI",
    "CGH",
    "CGI",
    "FGH",
    "GHI",
    "ABCD",
    "ABCE",
    "ABCG",
    "ABCH",
    "ABCI",
    "ABGI",
    "ACGI",
    "BCGI",
    "ABCDE",
    "ABCEG",
    "ABCFG",
    "ABCGI",
    "ABCGHI",
  ];

  const changeType = (value) => {
    setSelectType(value);
  };

  const searchType = (value) => {
    if (value) {
      setSelectType(value);
    }
  };

  const changeIndustry = (value) => {
    setSelectIndustry(value);
  };

  const searchIndustry = (value) => {
    if (value) {
      setSelectIndustry(value);
    }
  };

  const changeId = (value, index) => {
    setSelectNumId(selectContent[0][index.key]);
    if (value) {
      setSelectId(value);
      setSelectType(selectContent[2][index.key]);
      setSelectIndustry(selectContent[3][index.key]);
    }
  };
  const searchId = (value, index) => {
    if (value) {
      setSelectId(value);
      setSelectType(selectContent[2][index.key]);
      setSelectIndustry(selectContent[3][index.key]);
    }
  };

  const onSearchData = () => {
    console.log(selectNumId, selectType);
    PubSub.publish("getClueFromDense", {
      numId: selectNumId,
      Id: selectType,
    });
  };
  const onCleanData = () => {
    setSelectId(undefined);
    setSelectNumId(undefined);
    setSelectType(undefined);
    setSelectIndustry(undefined);
  };
  return (
    <div style={{ paddingTop: "15px" }}>
      <Form.Item>
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
          {type.map((item, index) => (
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
          {industry.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        <Select
          showArrow
          placeholder="id"
          onChange={changeId}
          onSearch={searchId}
          showSearch
          style={{ width: 200 }}
          value={selectId}
        >
          {selectContent[1].map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
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
