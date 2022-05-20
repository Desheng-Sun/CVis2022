import { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import euler from 'cytoscape-euler'
import { Checkbox, Select } from "antd";

import * as d3 from 'd3';


import './index.css'

// 数据请求接口
import { getMainChartData } from "../..//apis/api.js";


cytoscape.use(euler)

var cy, layoutOption;
export default function SubChartCytoscape() {
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(1200);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [dataParam, setDataParam] = useState("");

  // 请求数据
  useEffect(() => {
    getMainChartData().then((res) => {
      setData(res);
    });
  }, [dataParam]);

  useEffect(() => {
    drawChart();
  });



  function drawChart() {
    if (data.nodes.length === 0 && data.edges.length === 0) return 

    const links = data.edges.map((d) => ({'data': {...d}}));
    const nodes = data.nodes.map((d) => ({'data': {...d}}));
    cy = cytoscape({
      container: document.getElementById('chart'),
      elements: {
        nodes: nodes,
        edges: links
      },
      selectionType:'single',
      style: [ // the stylesheet for the graph
      // {
      //   selector: 'node',
      //   style: {
      //     // label: 'data(name)'
      //     width: 10,
      //     height: 10
      //   }
      // },
      {
        selector: 'node[type=\"new\"]',
        style: {
          "background-color": "red",
          width:200,
          height:200
        }
      },
      {
        selector: 'node[type=\"Domain\"]',
        style: {
          "background-color": "#e58308",
          
        }
      },
      {
        selector: 'node[type=\"IP\"]',
        style: {
          "background-color": "#458994",
        }
      },
      {
        selector: 'node[type=\"Cert\"]',
        style: {
          "background-color": "#823835",
          "shape": 'rectangle',
          "width": 10,
          "height": 10
        }
      },
      {
        selector: 'node[type=\"Whois_Name\"]',
        style: {
          "background-color": "#83af9b",
        }
      },
      {
        selector: 'node[type=\"Whois_Phone\"]',
        style: {
          "background-color": "#f4d000",
        }
      },
      {
        selector: 'node[type=\"Whois_Email\"]',
        style: {
          "background-color": "#8a977b",
        }
      },
      {
        selector: 'node[type=\"IP_C\"]',
        style: {
          "background-color": "#aaa",
        }
      },
      {
        selector: 'node[type=\"ASN\"]',
        style: {
          "background-color": "#aaa",
        }
      },
      {
        selector: "edge[relation=\"r_cert\"]",
        style: {
          "line-color": "#fe4365"
        }
      },
      {
        selector: "edge[relation=\"r_subdomain\"]",
        style: {
          "line-color": "#fc9d9a"
        }
      },
      {
        selector: "edge[relation=\"r_request_jump\"]",
        style: {
          "line-color": "#f9cdad"
        }
      },
      {
        selector: "edge[relation=\"r_dns_a\"]",
        style: {
          "line-color": "#c8c8a9"
        }
      },
      {
        selector: "edge[relation=\"r_whois_name\"]",
        style: {
          "line-color": "#83af9b"
        }
      },
      {
        selector: "edge[relation=\"r_whois_email\"]",
        style: {
          "line-color": "#8a977b"
        }
      },
      {
        selector: "edge[relation=\"r_whois_phone\"]",
        style: {
          "line-color": "#f4d000"
        }
      },
      {
        selector: "edge[relation=\"r_cname\"]",
        style: {
          "line-color": "#e58308"
        }
      },
      {
        selector: "edge[relation=\"r_asn\"]",
        style: {
          "line-color": "#dc5712"
        }
      },
      {
        selector: "edge[relation=\"r_cidr\"]",
        style: {
          "line-color": "#458994"
        }
      },
      {
        selector: "edge[relation=\"r_cert_chain\"]",
        style: {
          "line-color": "#823835"
        }
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': '#e53f32',
          'border-color': 'red'
        }
      },
      {
        selector: 'edge:selected',
        style: {
          'line-color': '#e53f32'
        }
      }  
    ],
    })  

    layoutOption = {
      name: 'euler',
      // height: 800,
      // width: 1600,
      fit: true, // whether to fit to viewport
      animate: true, // whether to transition the node positions
      avoidOverlap: true,
      springLength: (edge) => 120,
      mass: (node) => 10,
      animateFilter: function ( node, i ){ return true; },   // 决定是否节点的位置应该被渲染
      concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return node.degree();
      },
    }

    cy.layout(layoutOption).run()
    // layout.run()
  }

  function onChangeInBox(){
    let newNode = [
      // { data: { id: 'n0' ,type: 'new'}},
      { data: { id: 'n1',type: 'new' }},
      // { data: { id: 'e0', source: 'n0', target: 'n1' } },
      { data: { id: 'e0', source: 'Cert_022b914fcb91d5f90850e33ef3f59e995fb0a291ddf38d351f6624ca71486a22', target: 'n1' } }
    ]
    cy.add(newNode)
    // cy.layout(layoutOption).run()
  }

  return (
    <div id="main_container">
      <div id="chart" style={{ width: 1600, height: 700, background: "#eee"}}>
        <Checkbox onChange={onChangeInBox}>增加元素</Checkbox>

      </div>
    </div>
  );
}
