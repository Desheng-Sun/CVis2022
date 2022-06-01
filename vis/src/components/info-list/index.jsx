import { Tag, Table } from "antd";
// import { getInfoListSds } from "../../apis/api";
import PubSub from "pubsub-js";

import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import './index.css'


export default function InfoList() {
  const [data, setData] = useState([]);
  const [dataParam, setDataParam] = useState(undefined)

  useEffect(() => {
    if(dataParam == undefined) return 
    setData([dataParam]);
  }, [dataParam]);

  PubSub.unsubscribe("fromMainToInfoList")
  PubSub.subscribe("fromMainToInfoList", function(msg, infoDt){
    setDataParam(infoDt)
  })

  const colorList = [
    "#f9b4ae",
    "#b3cde3",
    "#ccebc5",
    "#decbe4",
    "#fbd9a6",
    "#feffcc",
    "#e5d8bd",
    "#fcdaec",
    "#f2f2f2",
  ];

  const columns = [
    {
      title: "节点数量",
      dataIndex: "numnode",
      key: "numnode",
    },
    {
      title: "边数量",
      dataIndex: "numlink",
      key: "numlink",
    },
    {
      title: "团伙规模",
      dataIndex: "groupscope",
      key: "groupscope",
    },
    {
      title: "产业类型",
      dataIndex: "industrytype",
      key: "industrytype",
      render: (tags) => (
        <>
          {tags.map((tag, index) => (
            <Tag color={colorList[index]} key={tag}>
              {/* {tag.split(",")} */}
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "团伙类型",
      dataIndex: "grouptype",
      key: "grouptype",
    },
  ];

  return (
    <div id="infolist" style={{ width: "100%", height: "6.29vh" }}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="numnode"
        size="small"
        pagination={false}
      ></Table>
    </div>
  );
}
