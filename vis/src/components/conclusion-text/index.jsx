import "./index.css";

export default function ConclusionText() {
  let colorListNode = [
    "#2978b4",
    "#33a02c",
    "#ff756a",
    "#f67f02",
    "#f67f02",
    "#f67f02",
    "#7fc97f",
    "#f9bf6f",
  ];

  let colorListLink = [
    "#1e38a1",
    "#2978b4",
    "#a6cee3",
    "#33a02c",
    "#7fc97f",
    "#ff756a",
    "#f9b4ae",
    "#f67f02",
    "#f67f02",
    "#f67f02",
    "#f9bf6f",
  ];
  let conclusionData = {
    groupscope: "小",
    clue: "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
    num_all_node: 111,
    node_type: [
      "Domain",
      "IP",
      "Cert",
      "Whois_Name",
      "Whois_Phone",
      "Whois_Email",
      "IP_C",
      "ASN",
    ],
    node_num: [104, 4, 2, 0, 0, 0, 0, 1],
    num_all_link: 181,
    link_type: [
      "r_request_jump",
      "r_subdomain",
      "r_cname",
      "r_dns_a",
      "r_cidr",
      "r_cert",
      "r_cert_chain",
      "r_whois_name",
      "r_whois_phone",
      "r_whois_email",
      "r_asn",
    ],
    link_num: [0, 103, 0, 0, 0, 0, 0, 50, 27, 0, 1],
    industry_type: ["涉赌", "涉黄", "涉枪", "非法交易平台"],
    num_industry: 4,
    group_type: "复合型",
  };
  return (
    <div id="conclusion-text">
      以<b>{conclusionData.clue}</b>为线索, 挖掘黑灰产团伙网络资产图。 <br />
      此为一个<b>{conclusionData.groupscope}型</b>黑灰产团伙。
      <br />
      <ul key="conclusion">
        <li key="conclusion-node">
          包含
          <b>
            {conclusionData.num_all_node}
            个节点
          </b>
          ，其中
          {conclusionData.node_num.map((item, index) => {
            if (item !== 0) {
              return (
                <span style={{ color: colorListNode[index] }}>
                  <b>
                    {conclusionData.node_type[index]}类节点{item}个，
                  </b>
                </span>
              );
            }
          })}
        </li>
        <li key="conclusion-link">
          包含
          <b>
            {conclusionData.num_all_link}
            条边
          </b>
          ，其中
          {conclusionData.link_num.map((item, index) => {
            if (item !== 0) {
              return (
                <span style={{ color: colorListLink[index] }}>
                  <b>
                    {conclusionData.link_type[index]}类边{item}条，
                  </b>
                </span>
              );
            }
          })}
        </li>
      </ul>
      该团伙中域名对应的网站包含
      <b>
        {conclusionData.industry_type.map((item, index) => {
          if (index !== conclusionData.num_industry - 1) {
            return <span>{item}、</span>;
          } else return <span>{item}</span>;
        })}
      </b>
      等黑灰产业务，是一个运作<b>{conclusionData.num_industry}种</b>非法业务的
      <b>{conclusionData.group_type}</b>团伙。
      <br />
    </div>
  );
}
