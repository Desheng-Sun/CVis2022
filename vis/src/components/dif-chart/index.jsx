import * as d3 from "d3";
import { useEffect, useState } from "react";
import "../dif-chart/index.css";

export default function DifChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);
  useEffect(() => {
    d3.selectAll("div#difference-chart svg").remove();
    draw();
  });


  // 绘制结构图
  function draw() {
    let radius = svgWidth / 2;

    let rawdata = {
      "name": "root",
      "children": [
        {
          "numId": 3,
          "id": "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          "name": "5.180.xxx.xxx",
          "type": "IP",
          "children": [
            {
              "numId": 4,
              "id": "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
              "name": "9ace6aae20",
              "type": "Cert",
              "children": [
                {
                  "name": "ABCE",
                  "num": 6,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 1,
                      "children": [
                        {
                          "name": "BC",
                          "num": 3,
                          "value": 5
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 20,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "BC",
                          "num": 0,
                          "value": 5
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 67,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "BC",
                          "num": 0,
                          "value": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "numId": 101,
              "id": "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              "name": "9032204fc4",
              "type": "Cert",
              "children": [
                {
                  "name": "ABCE",
                  "num": 17,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "BC",
                          "num": 3,
                          "value": 5
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 9,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 1,
                      "children": [
                        {
                          "name": "BC",
                          "num": 0,
                          "value": 5
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 7,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "BC",
                          "num": 0,
                          "value": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "numId": 102,
              "id": "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
              "name": "164.155.xxx.xxx",
              "type": "IP",
              "children": [
                {
                  "name": "ABCE",
                  "num": 24,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 1,
                      "children": [
                        {
                          "name": "B",
                          "num": 11,
                          "children": [
                            {
                              "name": "A",
                              "num": null,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 2,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 0,
                          "children": [
                            {
                              "name": "A",
                              "num": 0,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 105,
                          "children": [
                            {
                              "name": "A",
                              "num": 1,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "numId": 5719,
              "id": "IP_7f8392f3c34ce8ad1c7fefb44b43b221218679f9ebf77d557cf86dcd7b4e57ca",
              "name": "199.59.xxx.xxx",
              "type": "IP",
              "children": [
                {
                  "name": "ABCE",
                  "num": 24,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 1,
                      "children": [
                        {
                          "name": "B",
                          "num": 11,
                          "children": [
                            {
                              "name": "BC",
                              "num": 3,
                              "children": [
                                {
                                  "name": "A",
                                  "num": null,
                                  "children": [
                                    {
                                      "name": "G",
                                      "num": null,
                                      "value": 5
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 2,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 0,
                          "children": [
                            {
                              "name": "BC",
                              "num": 0,
                              "children": [
                                {
                                  "name": "A",
                                  "num": 0,
                                  "children": [
                                    {
                                      "name": "G",
                                      "num": 0,
                                      "value": 5
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 6,
                          "children": [
                            {
                              "name": "BC",
                              "num": 0,
                              "children": [
                                {
                                  "name": "A",
                                  "num": 3,
                                  "children": [
                                    {
                                      "name": "G",
                                      "num": 1,
                                      "value": 5
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "numId": 35959,
              "id": "IP_2ecbab579fa0523913c5b56ca5a02dda98f0cdc12153c79a81a93d2560cdf202",
              "name": "23.108.xxx.xxx",
              "type": "IP",
              "children": [
                {
                  "name": "ABCE",
                  "num": 26,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 1,
                      "children": [
                        {
                          "name": "B",
                          "num": 2,
                          "children": [
                            {
                              "name": "BC",
                              "num": 0,
                              "children": [
                                {
                                  "name": "BG",
                                  "num": null,
                                  "children": [
                                    {
                                      "name": "G",
                                      "num": null,
                                      "value": 5
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 9,
                          "children": [
                            {
                              "name": "BC",
                              "num": 3,
                              "children": [
                                {
                                  "name": "BG",
                                  "num": 0,
                                  "children": [
                                    {
                                      "name": "G",
                                      "num": 0,
                                      "value": 5
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 27,
                          "children": [
                            {
                              "name": "BC",
                              "num": 0,
                              "children": [
                                {
                                  "name": "BG",
                                  "num": 2,
                                  "children": [
                                    {
                                      "name": "G",
                                      "num": 1,
                                      "value": 5
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "numId": 4,
          "id": "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
          "name": "9ace6aae20",
          "type": "Cert",
          "children": [
            {
              "numId": 102,
              "id": "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
              "name": "164.155.xxx.xxx",
              "type": "IP",
              "children": [
                {
                  "name": "ABCE",
                  "num": 85,
                  "children": [
                    {
                      "name": "B",
                      "num": null,
                      "value": 5
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 2,
                  "children": [
                    {
                      "name": "B",
                      "num": 0,
                      "value": 5
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "B",
                      "num": 105,
                      "value": 5
                    }
                  ]
                }
              ]
            },
            {
              "numId": 5719,
              "id": "IP_7f8392f3c34ce8ad1c7fefb44b43b221218679f9ebf77d557cf86dcd7b4e57ca",
              "name": "199.59.xxx.xxx",
              "type": "IP",
              "children": [
                {
                  "name": "ABCE",
                  "num": 85,
                  "children": [
                    {
                      "name": "A",
                      "num": null,
                      "children": [
                        {
                          "name": "B",
                          "num": null,
                          "children": [
                            {
                              "name": "G",
                              "num": null,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 2,
                  "children": [
                    {
                      "name": "A",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 0,
                          "children": [
                            {
                              "name": "G",
                              "num": 0,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "A",
                      "num": 3,
                      "children": [
                        {
                          "name": "B",
                          "num": 6,
                          "children": [
                            {
                              "name": "G",
                              "num": 1,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "numId": 101,
          "id": "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          "name": "9032204fc4",
          "type": "Cert",
          "children": [
            {
              "numId": 112,
              "id": "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
              "name": "172.255.xxx.xxx",
              "type": "IP",
              "children": [
                {
                  "name": "ABCE",
                  "num": 14,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 1,
                      "children": [
                        {
                          "name": "B",
                          "num": null,
                          "children": [
                            {
                              "name": "BG",
                              "num": null,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 2,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 18,
                          "children": [
                            {
                              "name": "BG",
                              "num": 1,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "ABCE",
                  "num": 0,
                  "children": [
                    {
                      "name": "ABCEG",
                      "num": 0,
                      "children": [
                        {
                          "name": "B",
                          "num": 0,
                          "children": [
                            {
                              "name": "BG",
                              "num": 0,
                              "value": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
    function partition(data) {
      return (d3.partition().size([2 * Math.PI, radius * radius])(
        d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      )
      )
    }
    const root = partition(rawdata);
    // console.log(root);
    // console.log(root.descendants())
    let color = d3
      .scaleOrdinal()
      .domain(d3.range(6))
      .range(["#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb"])
    let svg = d3
      .select("#difference-chart")
      .append("svg")
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // let element = svg.node();
    // element.value = { sequence: [], percentage: 0.0 };

    // let label = svg
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("fill", "#888")
    //   .style("visibility", "hidden");

    // label
    //   .append("tspan")
    //   .attr("class", "percentage")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("dy", "-0.1em")
    //   .attr("font-size", "3em")
    //   .text("");

    // label
    //   .append("tspan")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("dy", "1.5em")
    //   .text("of visits begin with this sequence");

    svg
      .attr("viewBox", `${-radius} ${-radius} ${svgWidth} ${svgWidth}`)
      .style("max-width", `${svgWidth}px`)
      .style("font", "12px sans-serif");

    let arc = d3
      .arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(1 / radius)
      .cornerRadius(60)
      // .padRadius(0.9)
      .innerRadius(d => {
        if (d.depth === 1) return 0
        return Math.sqrt(d.y0)
      })
      .outerRadius(d => {
        if (!d.depth) return 0
        return Math.sqrt(d.y1) - 1
      })
    const path = svg
      .append("g")
      .selectAll("path")
      .data(root.descendants())
      .join("path")
      .attr("fill", d => {
        if (undefined == d.data.num) return "#9e70cf"
        return color(d.data.name)
      })
      .attr("opacity", d => {
        return d.data.num / 10
      })
      .attr("d", arc);

    // svg
    //   .append("g")
    //   .attr("fill", "none")
    //   .attr("pointer-events", "all")
    //   .on("mouseleave", () => {
    //     path.attr("fill-opacity", 1);
    //     label.style("visibility", "hidden");
    //     // Update the value of this view
    //     element.value = { sequence: [], percentage: 0.0 };
    //     element.dispatchEvent(new CustomEvent("input"));
    //   })
    //   .selectAll("path")
    //   .data(
    //     root.descendants().filter(d => {
    //       // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
    //       return d.depth && d.x1 - d.x0 > 0.001;
    //     })
    //   )
    //   .join("path")
    //   .attr("d", mousearc)
    //   .on("mouseenter", (event, d) => {
    //     // Get the ancestors of the current segment, minus the root
    //     let sequence = d
    //       .ancestors()
    //       .reverse()
    //       .slice(1);
    //     // Highlight the ancestors
    //     path.attr("fill-opacity", node =>
    //       sequence.indexOf(node) >= 0 ? 1.0 : 0.3
    //     );
    //     const percentage = ((100 * d.value) / root.value).toPrecision(3);
    //     label
    //       .style("visibility", null)
    //       .select(".percentage")
    //       .text(percentage + "%");
    //     // Update the value of this view with the currently hovered sequence and percentage
    //     element.value = { sequence, percentage };
    //     element.dispatchEvent(new CustomEvent("input"));
    //   });
  }


  return (
    <div
      id="difference-chart"
      style={{ width: svgWidth, height: svgHeight }}
    ></div>
  );
}
