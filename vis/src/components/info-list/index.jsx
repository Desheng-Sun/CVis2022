import { Tag, Table } from "antd";

import "antd/dist/antd.css";

export default function InfoList() {
  // 需要请求的数据示例
  const infoListData = [
    // {
    //   numnode: 382,
    //   numlink: 678,
    //   groupscope: "中",
    //   industrytype: ["A", "A,B", "A,C"],
    //   grouptype: "复合型",
    // },
    {
      numnode: 1729,
      numlink: 4050,
      groupscope: "大",
      industrytype: [
        "B",
        "G, B",
        "C, G, B",
        "G, A",
        "I, B",
        "A",
        "A, B",
        "I, A, B",
        "C, B",
        "C",
        "C, A, B",
        "G, C",
      ],
      grouptype: "复合型",
    },
  ];

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
              {tag.split(",")}
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
    <div id="infolist" style={{ width: "100%", height: "100%" }}>
      <Table
        dataSource={infoListData}
        columns={columns}
        rowKey="numnode"
        size="small"
        pagination={false}
      ></Table>
    </div>
  );
}
