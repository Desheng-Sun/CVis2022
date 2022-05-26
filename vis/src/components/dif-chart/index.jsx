import * as d3 from "d3";
import { useEffect, useState } from "react";
import "../dif-chart/index.css";

export default function DifChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState({});

  // // 随系统缩放修改画布大小
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

  useEffect(() => {
    let rawdata = {
      name: "root",
      depthmax: 7,
      ICLinksNum: 8,
      startICNum: 3,
      children: [
        {
          numId: 3,
          id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          name: "5.180.xxx.xxx",
          type: "IP",
          startICNum: 0,
          startICLinkNum: 0,
          children: [
            {
              numId: 4,
              id: "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
              name: "9ace6aae20",
              type: "Cert",
              nowICLinksNum: 1,
              nowICNum: 1,
              children: [
                {
                  name: "ABCE",
                  num: 6,
                  nowICIndex: 1,
                  nowICLinksIndex: 1,
                  childrenLen: 4,
                  index: 1,
                  children: [
                    {
                      name: "ABCEG",
                      num: 1,
                      nowICIndex: 1,
                      nowICLinksIndex: 1,
                      childrenLen: 4,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 11,
                          nowICIndex: 1,
                          nowICLinksIndex: 1,
                          childrenLen: 4,
                          index: 1,
                          children: [
                            {
                              name: "BC",
                              num: 3,
                              nowICIndex: 1,
                              nowICLinksIndex: 1,
                              childrenLen: 4,
                              index: 1,
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 20,
                  nowICIndex: 1,
                  nowICLinksIndex: 1,
                  childrenLen: 4,
                  index: 2,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 1,
                      childrenLen: 4,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 1,
                          nowICLinksIndex: 1,
                          childrenLen: 4,
                          index: 2,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 1,
                              childrenLen: 4,
                              index: 2,
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 67,
                  nowICIndex: 1,
                  nowICLinksIndex: 1,
                  childrenLen: 4,
                  index: 3,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 1,
                      childrenLen: 4,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 1,
                          nowICLinksIndex: 1,
                          childrenLen: 4,
                          index: 3,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 1,
                              childrenLen: 4,
                              index: 3,
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              numId: 101,
              id: "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              name: "9032204fc4",
              type: "Cert",
              nowICLinksNum: 2,
              nowICNum: 1,
              children: [
                {
                  name: "ABCE",
                  num: 17,
                  nowICIndex: 1,
                  nowICLinksIndex: 2,
                  childrenLen: 4,
                  index: 1,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 2,
                      childrenLen: 4,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 11,
                          nowICIndex: 1,
                          nowICLinksIndex: 2,
                          childrenLen: 4,
                          index: 1,
                          children: [
                            {
                              name: "BC",
                              num: 3,
                              nowICIndex: 1,
                              nowICLinksIndex: 2,
                              childrenLen: 4,
                              index: 1,
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 9,
                  nowICIndex: 1,
                  nowICLinksIndex: 2,
                  childrenLen: 4,
                  index: 2,
                  children: [
                    {
                      name: "ABCEG",
                      num: 1,
                      nowICIndex: 1,
                      nowICLinksIndex: 2,
                      childrenLen: 4,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 1,
                          nowICLinksIndex: 2,
                          childrenLen: 4,
                          index: 2,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 2,
                              childrenLen: 4,
                              index: 2,
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 7,
                  nowICIndex: 1,
                  nowICLinksIndex: 2,
                  childrenLen: 4,
                  index: 3,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 2,
                      childrenLen: 4,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 1,
                          nowICLinksIndex: 2,
                          childrenLen: 4,
                          index: 3,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 2,
                              childrenLen: 4,
                              index: 3,
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              numId: 102,
              id: "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
              name: "164.155.xxx.xxx",
              type: "IP",
              nowICLinksNum: 3,
              nowICNum: 1,
              children: [
                {
                  name: "ABCE",
                  num: 24,
                  nowICIndex: 1,
                  nowICLinksIndex: 3,
                  childrenLen: 5,
                  index: 1,
                  children: [
                    {
                      name: "ABCEG",
                      num: 1,
                      nowICIndex: 1,
                      nowICLinksIndex: 3,
                      childrenLen: 5,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 11,
                          nowICIndex: 1,
                          nowICLinksIndex: 3,
                          childrenLen: 5,
                          index: 1,
                          children: [
                            {
                              name: "BC",
                              num: 3,
                              nowICIndex: 1,
                              nowICLinksIndex: 3,
                              childrenLen: 5,
                              index: 1,
                              children: [
                                {
                                  name: "A",
                                  num: 0,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 3,
                                  childrenLen: 5,
                                  index: 1,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 2,
                  nowICIndex: 1,
                  nowICLinksIndex: 3,
                  childrenLen: 5,
                  index: 2,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 3,
                      childrenLen: 5,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 1,
                          nowICLinksIndex: 3,
                          childrenLen: 5,
                          index: 2,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 3,
                              childrenLen: 5,
                              index: 2,
                              children: [
                                {
                                  name: "A",
                                  num: 0,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 3,
                                  childrenLen: 5,
                                  index: 2,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 1,
                  nowICLinksIndex: 3,
                  childrenLen: 5,
                  index: 3,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 3,
                      childrenLen: 5,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 105,
                          nowICIndex: 1,
                          nowICLinksIndex: 3,
                          childrenLen: 5,
                          index: 3,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 3,
                              childrenLen: 5,
                              index: 3,
                              children: [
                                {
                                  name: "A",
                                  num: 1,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 3,
                                  childrenLen: 5,
                                  index: 3,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              numId: 5719,
              id: "IP_7f8392f3c34ce8ad1c7fefb44b43b221218679f9ebf77d557cf86dcd7b4e57ca",
              name: "199.59.xxx.xxx",
              type: "IP",
              nowICLinksNum: 4,
              nowICNum: 1,
              children: [
                {
                  name: "ABCE",
                  num: 24,
                  nowICIndex: 1,
                  nowICLinksIndex: 4,
                  childrenLen: 7,
                  index: 1,
                  children: [
                    {
                      name: "ABCEG",
                      num: 1,
                      nowICIndex: 1,
                      nowICLinksIndex: 4,
                      childrenLen: 7,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 11,
                          nowICIndex: 1,
                          nowICLinksIndex: 4,
                          childrenLen: 7,
                          index: 1,
                          children: [
                            {
                              name: "BC",
                              num: 3,
                              nowICIndex: 1,
                              nowICLinksIndex: 4,
                              childrenLen: 7,
                              index: 1,
                              children: [
                                {
                                  name: "A",
                                  num: 0,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 4,
                                  childrenLen: 7,
                                  index: 1,
                                  children: [
                                    {
                                      name: "C",
                                      num: 0,
                                      nowICIndex: 1,
                                      nowICLinksIndex: 4,
                                      childrenLen: 7,
                                      index: 1,
                                      children: [
                                        {
                                          name: "G",
                                          num: 0,
                                          nowICIndex: 1,
                                          nowICLinksIndex: 4,
                                          childrenLen: 7,
                                          index: 1,
                                          value: 5,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 2,
                  nowICIndex: 1,
                  nowICLinksIndex: 4,
                  childrenLen: 7,
                  index: 2,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 4,
                      childrenLen: 7,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 1,
                          nowICLinksIndex: 4,
                          childrenLen: 7,
                          index: 2,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 4,
                              childrenLen: 7,
                              index: 2,
                              children: [
                                {
                                  name: "A",
                                  num: 0,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 4,
                                  childrenLen: 7,
                                  index: 2,
                                  children: [
                                    {
                                      name: "C",
                                      num: 0,
                                      nowICIndex: 1,
                                      nowICLinksIndex: 4,
                                      childrenLen: 7,
                                      index: 2,
                                      children: [
                                        {
                                          name: "G",
                                          num: 0,
                                          nowICIndex: 1,
                                          nowICLinksIndex: 4,
                                          childrenLen: 7,
                                          index: 2,
                                          value: 5,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 1,
                  nowICLinksIndex: 4,
                  childrenLen: 7,
                  index: 3,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 4,
                      childrenLen: 7,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 6,
                          nowICIndex: 1,
                          nowICLinksIndex: 4,
                          childrenLen: 7,
                          index: 3,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 4,
                              childrenLen: 7,
                              index: 3,
                              children: [
                                {
                                  name: "A",
                                  num: 3,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 4,
                                  childrenLen: 7,
                                  index: 3,
                                  children: [
                                    {
                                      name: "C",
                                      num: 5,
                                      nowICIndex: 1,
                                      nowICLinksIndex: 4,
                                      childrenLen: 7,
                                      index: 3,
                                      children: [
                                        {
                                          name: "G",
                                          num: 1,
                                          nowICIndex: 1,
                                          nowICLinksIndex: 4,
                                          childrenLen: 7,
                                          index: 3,
                                          value: 5,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              numId: 35959,
              id: "IP_2ecbab579fa0523913c5b56ca5a02dda98f0cdc12153c79a81a93d2560cdf202",
              name: "23.108.xxx.xxx",
              type: "IP",
              nowICLinksNum: 5,
              nowICNum: 1,
              children: [
                {
                  name: "ABCE",
                  num: 26,
                  nowICIndex: 1,
                  nowICLinksIndex: 5,
                  childrenLen: 7,
                  index: 1,
                  children: [
                    {
                      name: "ABCEG",
                      num: 1,
                      nowICIndex: 1,
                      nowICLinksIndex: 5,
                      childrenLen: 7,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 2,
                          nowICIndex: 1,
                          nowICLinksIndex: 5,
                          childrenLen: 7,
                          index: 1,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 5,
                              childrenLen: 7,
                              index: 1,
                              children: [
                                {
                                  name: "BG",
                                  num: 0,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 5,
                                  childrenLen: 7,
                                  index: 1,
                                  children: [
                                    {
                                      name: "C",
                                      num: 0,
                                      nowICIndex: 1,
                                      nowICLinksIndex: 5,
                                      childrenLen: 7,
                                      index: 1,
                                      children: [
                                        {
                                          name: "G",
                                          num: 0,
                                          nowICIndex: 1,
                                          nowICLinksIndex: 5,
                                          childrenLen: 7,
                                          index: 1,
                                          value: 5,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 1,
                  nowICLinksIndex: 5,
                  childrenLen: 7,
                  index: 2,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 5,
                      childrenLen: 7,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 9,
                          nowICIndex: 1,
                          nowICLinksIndex: 5,
                          childrenLen: 7,
                          index: 2,
                          children: [
                            {
                              name: "BC",
                              num: 3,
                              nowICIndex: 1,
                              nowICLinksIndex: 5,
                              childrenLen: 7,
                              index: 2,
                              children: [
                                {
                                  name: "BG",
                                  num: 0,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 5,
                                  childrenLen: 7,
                                  index: 2,
                                  children: [
                                    {
                                      name: "C",
                                      num: 0,
                                      nowICIndex: 1,
                                      nowICLinksIndex: 5,
                                      childrenLen: 7,
                                      index: 2,
                                      children: [
                                        {
                                          name: "G",
                                          num: 0,
                                          nowICIndex: 1,
                                          nowICLinksIndex: 5,
                                          childrenLen: 7,
                                          index: 2,
                                          value: 5,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 1,
                  nowICLinksIndex: 5,
                  childrenLen: 7,
                  index: 3,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 1,
                      nowICLinksIndex: 5,
                      childrenLen: 7,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 27,
                          nowICIndex: 1,
                          nowICLinksIndex: 5,
                          childrenLen: 7,
                          index: 3,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 1,
                              nowICLinksIndex: 5,
                              childrenLen: 7,
                              index: 3,
                              children: [
                                {
                                  name: "BG",
                                  num: 2,
                                  nowICIndex: 1,
                                  nowICLinksIndex: 5,
                                  childrenLen: 7,
                                  index: 3,
                                  children: [
                                    {
                                      name: "C",
                                      num: 1,
                                      nowICIndex: 1,
                                      nowICLinksIndex: 5,
                                      childrenLen: 7,
                                      index: 3,
                                      children: [
                                        {
                                          name: "G",
                                          num: 1,
                                          nowICIndex: 1,
                                          nowICLinksIndex: 5,
                                          childrenLen: 7,
                                          index: 3,
                                          value: 5,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          numId: 4,
          id: "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
          name: "9ace6aae20",
          type: "Cert",
          startICNum: 1,
          startICLinkNum: 5,
          children: [
            {
              numId: 102,
              id: "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
              name: "164.155.xxx.xxx",
              type: "IP",
              nowICLinksNum: 6,
              nowICNum: 2,
              children: [
                {
                  name: "ABCE",
                  num: 85,
                  nowICIndex: 2,
                  nowICLinksIndex: 6,
                  childrenLen: 3,
                  index: 1,
                  children: [
                    {
                      name: "A",
                      num: 0,
                      nowICIndex: 2,
                      nowICLinksIndex: 6,
                      childrenLen: 3,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 2,
                          nowICLinksIndex: 6,
                          childrenLen: 3,
                          index: 1,
                          value: 5,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 2,
                  nowICIndex: 2,
                  nowICLinksIndex: 6,
                  childrenLen: 3,
                  index: 2,
                  children: [
                    {
                      name: "A",
                      num: 0,
                      nowICIndex: 2,
                      nowICLinksIndex: 6,
                      childrenLen: 3,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 2,
                          nowICLinksIndex: 6,
                          childrenLen: 3,
                          index: 2,
                          value: 5,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 2,
                  nowICLinksIndex: 6,
                  childrenLen: 3,
                  index: 3,
                  children: [
                    {
                      name: "A",
                      num: 1,
                      nowICIndex: 2,
                      nowICLinksIndex: 6,
                      childrenLen: 3,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 105,
                          nowICIndex: 2,
                          nowICLinksIndex: 6,
                          childrenLen: 3,
                          index: 3,
                          value: 5,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              numId: 5719,
              id: "IP_7f8392f3c34ce8ad1c7fefb44b43b221218679f9ebf77d557cf86dcd7b4e57ca",
              name: "199.59.xxx.xxx",
              type: "IP",
              nowICLinksNum: 7,
              nowICNum: 2,
              children: [
                {
                  name: "ABCE",
                  num: 85,
                  nowICIndex: 2,
                  nowICLinksIndex: 7,
                  childrenLen: 5,
                  index: 1,
                  children: [
                    {
                      name: "A",
                      num: 0,
                      nowICIndex: 2,
                      nowICLinksIndex: 7,
                      childrenLen: 5,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 2,
                          nowICLinksIndex: 7,
                          childrenLen: 5,
                          index: 1,
                          children: [
                            {
                              name: "C",
                              num: 0,
                              nowICIndex: 2,
                              nowICLinksIndex: 7,
                              childrenLen: 5,
                              index: 1,
                              children: [
                                {
                                  name: "G",
                                  num: 0,
                                  nowICIndex: 2,
                                  nowICLinksIndex: 7,
                                  childrenLen: 5,
                                  index: 1,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 2,
                  nowICIndex: 2,
                  nowICLinksIndex: 7,
                  childrenLen: 5,
                  index: 2,
                  children: [
                    {
                      name: "A",
                      num: 0,
                      nowICIndex: 2,
                      nowICLinksIndex: 7,
                      childrenLen: 5,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 2,
                          nowICLinksIndex: 7,
                          childrenLen: 5,
                          index: 2,
                          children: [
                            {
                              name: "C",
                              num: 0,
                              nowICIndex: 2,
                              nowICLinksIndex: 7,
                              childrenLen: 5,
                              index: 2,
                              children: [
                                {
                                  name: "G",
                                  num: 0,
                                  nowICIndex: 2,
                                  nowICLinksIndex: 7,
                                  childrenLen: 5,
                                  index: 2,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 2,
                  nowICLinksIndex: 7,
                  childrenLen: 5,
                  index: 3,
                  children: [
                    {
                      name: "A",
                      num: 3,
                      nowICIndex: 2,
                      nowICLinksIndex: 7,
                      childrenLen: 5,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 6,
                          nowICIndex: 2,
                          nowICLinksIndex: 7,
                          childrenLen: 5,
                          index: 3,
                          children: [
                            {
                              name: "C",
                              num: 5,
                              nowICIndex: 2,
                              nowICLinksIndex: 7,
                              childrenLen: 5,
                              index: 3,
                              children: [
                                {
                                  name: "G",
                                  num: 1,
                                  nowICIndex: 2,
                                  nowICLinksIndex: 7,
                                  childrenLen: 5,
                                  index: 3,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          numId: 101,
          id: "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          name: "9032204fc4",
          type: "Cert",
          startICNum: 2,
          startICLinkNum: 7,
          children: [
            {
              numId: 112,
              id: "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
              name: "172.255.xxx.xxx",
              type: "IP",
              nowICLinksNum: 8,
              nowICNum: 3,
              children: [
                {
                  name: "ABCE",
                  num: 14,
                  nowICIndex: 3,
                  nowICLinksIndex: 8,
                  childrenLen: 5,
                  index: 1,
                  children: [
                    {
                      name: "ABCEG",
                      num: 1,
                      nowICIndex: 3,
                      nowICLinksIndex: 8,
                      childrenLen: 5,
                      index: 1,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 3,
                          nowICLinksIndex: 8,
                          childrenLen: 5,
                          index: 1,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 3,
                              nowICLinksIndex: 8,
                              childrenLen: 5,
                              index: 1,
                              children: [
                                {
                                  name: "BG",
                                  num: 0,
                                  nowICIndex: 3,
                                  nowICLinksIndex: 8,
                                  childrenLen: 5,
                                  index: 1,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 2,
                  nowICIndex: 3,
                  nowICLinksIndex: 8,
                  childrenLen: 5,
                  index: 2,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 3,
                      nowICLinksIndex: 8,
                      childrenLen: 5,
                      index: 2,
                      children: [
                        {
                          name: "B",
                          num: 18,
                          nowICIndex: 3,
                          nowICLinksIndex: 8,
                          childrenLen: 5,
                          index: 2,
                          children: [
                            {
                              name: "BC",
                              num: 1,
                              nowICIndex: 3,
                              nowICLinksIndex: 8,
                              childrenLen: 5,
                              index: 2,
                              children: [
                                {
                                  name: "BG",
                                  num: 1,
                                  nowICIndex: 3,
                                  nowICLinksIndex: 8,
                                  childrenLen: 5,
                                  index: 2,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ABCE",
                  num: 0,
                  nowICIndex: 3,
                  nowICLinksIndex: 8,
                  childrenLen: 5,
                  index: 3,
                  children: [
                    {
                      name: "ABCEG",
                      num: 0,
                      nowICIndex: 3,
                      nowICLinksIndex: 8,
                      childrenLen: 5,
                      index: 3,
                      children: [
                        {
                          name: "B",
                          num: 0,
                          nowICIndex: 3,
                          nowICLinksIndex: 8,
                          childrenLen: 5,
                          index: 3,
                          children: [
                            {
                              name: "BC",
                              num: 0,
                              nowICIndex: 3,
                              nowICLinksIndex: 8,
                              childrenLen: 5,
                              index: 3,
                              children: [
                                {
                                  name: "BG",
                                  num: 0,
                                  nowICIndex: 3,
                                  nowICLinksIndex: 8,
                                  childrenLen: 5,
                                  index: 3,
                                  value: 5,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    setData(rawdata);
  }, []);
  // 绘制结构图
  function draw() {
    if (JSON.stringify(data) === "{}") return;
    let radius = Math.min(svgWidth / 2, svgHeight / 2);
    function partition(data) {
      return d3.partition().size([2 * Math.PI, radius * radius])(
        d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value)
      );
    }
    let ICNodesPad = (Math.PI * 2) / data.ICLinksNum / 10;
    let ICLinksPad = (Math.PI * 2) / data.ICLinksNum / 50;
    let childrenPad = 1 / radius / 2;
    let childrenLen =
      (Math.PI * 2 -
        ICNodesPad * data.startICNum -
        ICLinksPad * (data.ICLinksNum + data.startICNum)) /
      (data.ICLinksNum * 3);
    const root = partition(data);
    let innerRadius = (radius / 10) * 5;
    let radiusUse = (radius / (10 * data.depthmax)) * 4;
    let color = d3
      .scaleOrdinal()
      .domain(d3.range(6))
      .range([
        "#5d85cf",
        "#7c6561",
        "#da7847",
        "#6fb971",
        "#9e70cf",
        "#bbbbbb",
        "#123456",
      ]);
    let svg = d3
      .select("#difference-chart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg
      .attr("viewBox", `${-radius} ${-radius} ${svgWidth} ${svgWidth}`)
      .style("max-width", `${svgWidth}px`)
      .style("font", "12px sans-serif");

    let arc = d3
      .arc()
      .startAngle((d) => {
        if (d.depth > 2) {
          let startAngle =
            d.data.nowICIndex * ICNodesPad +
            (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad +
            childrenPad +
            childrenLen * ((d.data.nowICLinksIndex - 1) * 3 + d.data.index - 1);
          return startAngle;
        } else if (d.depth === 1) {
          let startAngle =
            (d.data.startICNum + 1) * ICNodesPad +
            (d.data.startICLinkNum + d.data.startICNum) * ICLinksPad +
            d.data.startICLinkNum * 3 * childrenLen;
          return startAngle;
        }
      })
      .endAngle((d) => {
        if (d.depth > 2) {
          let endAngle =
            d.data.nowICIndex * ICNodesPad +
            (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad -
            childrenPad +
            childrenLen * ((d.data.nowICLinksIndex - 1) * 3 + d.data.index);
          return endAngle;
        } else if (d.depth === 1) {
          let endAngle =
            (d.data.startICNum + 1) * ICNodesPad +
            (d.data.startICLinkNum +
              d.data.children.length +
              d.data.startICNum +
              2) *
              ICLinksPad +
            (d.data.startICLinkNum + d.data.children.length) * 3 * childrenLen;
          return endAngle;
        }
      })
      .cornerRadius(5)
      .innerRadius((d) => {
        if (d.depth === 1) {
          return (innerRadius * 9) / 10;
        } else if (d.depth > 2) {
          return (
            (innerRadius * 19) / 20 +
            1 +
            radiusUse *
              (root.data.depthmax / d.data.childrenLen) *
              (d.depth - 3)
          );
        }
      })
      .outerRadius((d) => {
        if (d.depth === 1) {
          return radiusUse * root.data.depthmax + innerRadius;
        } else if (d.depth > 2) {
          return (
            radiusUse *
              (root.data.depthmax / d.data.childrenLen) *
              (d.depth - 2) +
            (innerRadius * 19) / 20 -
            1
          );
        }
      });

    const g = svg.append("g");

    g.selectAll("path")
      .data(root.descendants().filter((d) => d.depth !== 0))
      .join("path")
      .attr("fill", (d) => {
        if (d.depth === 1 || d.depth === 2) {
          return "#ffffff";
        }
        return color(d.data.name);
      })
      .attr("stroke", (d) => {
        if (d.depth <= 2) {
          return "black";
        }
      })
      .attr("d", arc);

    g.selectAll("datatext")
      .data(root.descendants().filter((d) => d.depth !== 0))
      .join("text")
      .attr("class", "datatext")
      .attr("text-anchor", "middle")
      .attr("transform", (d) => {
        let x, y;
        if (d.depth === 1) {
          x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
          y = (innerRadius * 9) / 10 + 2;
          if (x >= 90 && x <= 270) {
            y = y + 8;
          }
        } else if (d.depth === 2) {
          console.log(d);
          x =
            ((d.data.nowICNum * ICNodesPad +
              (d.data.nowICLinksNum + d.data.nowICNum - 1) * ICLinksPad +
              childrenLen * ((d.data.nowICLinksNum - 1) * 3 + 1.5)) *
              180) /
            Math.PI;
          y = innerRadius + radiusUse * root.data.depthmax - 3;
          if (x < 90 || x > 270) {
            y = y - 8;
          }
        } else {
          x =
            ((d.data.nowICIndex * ICNodesPad +
              (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad +
              childrenLen *
                ((d.data.nowICLinksIndex - 1) * 3 + d.data.index - 0.5)) *
              180) /
            Math.PI;
          y =
            (innerRadius * 19) / 20 +
            radiusUse *
              (root.data.depthmax / d.data.childrenLen) *
              (d.depth - 2.5);
        }
        return `rotate(${x - 90}) translate(${y},${0}) rotate(${
          x < 90 || x > 270 ? 90 : 270
        })`;
      })
      .text((d) => {
        return d.data.name;
      });

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
