import { Descriptions, Table } from "antd";

export default function InfoList() {
  const columns = [
    {
      title: "#",
      dataIndex: "sindex",
      key: "sindex",
      sorter: (a, b) => a.sindex - b.sindex,
    },
    {
      title: "True Label",
      dataIndex: "truelabel",
      key: "truelabel",
      sorter: (a, b) => a.truelabel - b.truelabel,
    },
    {
      title: "PAA Label",
      dataIndex: "paalabel",
      key: "paalabel",
      sorter: (a, b) => a.paalabel - b.paalabel,
    },
    {
      title: "SEAnet Label",
      key: "sealabel",
      dataIndex: "sealabel",
      sorter: (a, b) => a.sealabel - b.sealabel,
    },
    {
      title: "TSNet Label",
      dataIndex: "tsealabel",
      key: "tsealabel",
      sorter: (a, b) => a.tsealabel - b.tsealabel,
    },
    {
      title: "Hit Rate",
      dataIndex: "hitrate",
      key: "hitrate",
      sorter: (a, b) => a.hitrate.slice(0, 1) - b.hitrate.slice(0, 1),
    },
  ];

  return <div id="infolist" style={{ width: "100%", height: "92%" }}></div>;
}
