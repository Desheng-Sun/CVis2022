import * as d3 from 'd3'
import { partition } from 'd3';
import { useState } from 'react';
import { useEffect } from 'react'

export default function ICClueChart(){
    const [width, setWidth] = useState(1600);
    const [height, setHeight] = useState(1200);
    const [data, setData] = useState({});
    const [dataParam, setDataParam] = useState("");

    useEffect(() => {
        let temp_data = {
            "id": "B",
            "Whois": 0, "pureDomain": 20, "dirtyDomain": 2,
            "children": [
              {
                "id": "B/2",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/2/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/2/~2/19",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/27",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/24",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/25",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/32",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/26",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/22",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/33",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/21",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/15",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/17",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/30",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/31",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/20",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/28",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/18",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/29",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/23",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/2/~2/16",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/2/5",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/2",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/13",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/8",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/3",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/12",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/6",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/11",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/9",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/1",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/4",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/10",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/7",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/2/14",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/4",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/4/~1",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/4/~1/12",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/32",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/34",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/35",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/48",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/11",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/8",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/19",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/25",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/52",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/18",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/7",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/6",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/49",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/46",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/5",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/23",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/9",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/29",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/14",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/3",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/38",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/39",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/43",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/45",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/42",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/50",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/47",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/21",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/37",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/17",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/51",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/31",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/4",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/27",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/36",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/26",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/20",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/15",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/28",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/44",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/41",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/33",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/40",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/24",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/30",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/13",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/10",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/22",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~1/16",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/4/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/4/~2/55",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~2/56",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~2/53",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/4/~2/54",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  }
                ]
              },
              {
                "id": "B/8",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/8/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/8/~2/~2",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/8/~2/~2/42",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/53",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/41",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/52",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/44",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/46",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/47",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/45",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/40",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/55",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/50",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/49",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/38",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/54",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/57",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/51",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/43",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/48",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/39",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~2/56",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      },
                      {
                        "id": "B/8/~2/~1",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/8/~2/~1/26",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/27",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/20",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/15",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/23",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/16",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/18",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/11",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/33",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/25",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/31",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/34",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/14",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/29",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/21",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/37",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/9",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/28",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/30",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/22",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/19",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/36",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/12",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/32",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/10",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/35",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/5",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/24",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/13",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/4",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/7",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/6",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/8",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/17",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/3",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/8/~2/~1/2",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "B/8/~4",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/8/~4/75",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/76",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/70",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/73",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/77",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/71",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/72",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~4/74",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/8/~3",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/8/~3/66",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/61",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/64",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/59",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/60",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/63",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/67",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/65",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/68",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/62",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/8/~3/58",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/8/69",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/8/1",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/1",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/1/146",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/72",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/170",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/114",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/141",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/2",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/102",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/131",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/42",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/104",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/121",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/206",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/184",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/58",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/126",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/178",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/153",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/135",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/194",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/18",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/172",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/26",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/179",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/142",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/134",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/183",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/28",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/136",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/212",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/149",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/127",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/15",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/177",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/17",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/62",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/97",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/65",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/27",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/158",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/92",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/14",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/36",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/66",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/190",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/187",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/159",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/24",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/156",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/99",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/143",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/44",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/34",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/137",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/211",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/45",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/139",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/59",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/201",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/132",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/113",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/182",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/204",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/157",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/20",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/19",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/155",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/120",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/23",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/112",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/123",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/148",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/76",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/199",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/125",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/86",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/83",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/145",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/89",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/68",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/54",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/162",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/47",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/29",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/195",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/16",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/50",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/161",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/22",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/53",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/118",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/35",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/94",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/124",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/80",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/12",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/185",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/209",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/43",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/168",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/1/88",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/10",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/10/6",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/43",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/44",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/62",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/92",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/26",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/39",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/90",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/68",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/31",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/30",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/66",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/94",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/78",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/87",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/12",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/71",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/22",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/29",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/40",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/7",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/2",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/48",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/95",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/18",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/4",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/16",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/61",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/63",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/13",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/84",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/97",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/75",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/53",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/36",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/45",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/70",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/93",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/80",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/81",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/41",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/52",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/74",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/83",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/15",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/47",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/50",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/23",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/24",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/67",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/88",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/96",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/3",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/17",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/56",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/57",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/85",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/5",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/77",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/11",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/60",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/89",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/32",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/42",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/8",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/76",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/10",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/73",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/86",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/54",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/51",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/25",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/21",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/35",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/1",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/72",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/91",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/58",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/55",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/19",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/9",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/59",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/65",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/38",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/49",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/20",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/28",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/14",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/79",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/34",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/99",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/82",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/37",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/69",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/64",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/46",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/33",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/27",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/10/98",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/11",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/11/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/11/~2/79",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/82",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/48",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/53",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/56",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/89",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/64",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/54",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/52",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/84",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/80",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/58",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/55",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/61",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/51",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/86",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/76",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/65",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/63",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/85",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/88",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/78",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/72",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/77",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/81",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/49",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/60",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/75",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/59",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/57",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/62",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/83",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/73",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/50",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/74",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/11/~2/87",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/11/12",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/100",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/43",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/8",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/32",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/30",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/94",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/115",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/39",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/118",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/25",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/36",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/106",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/124",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/37",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/40",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/119",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/121",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/126",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/111",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/116",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/123",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/114",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/103",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/96",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/26",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/42",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/95",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/6",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/93",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/20",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/31",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/45",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/101",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/14",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/68",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/34",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/90",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/99",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/102",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/16",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/132",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/108",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/35",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/107",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/15",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/41",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/22",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/38",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/71",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/122",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/10",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/66",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/67",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/131",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/105",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/19",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/113",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/117",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/69",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/17",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/3",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/11",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/1",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/29",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/24",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/109",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/130",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/44",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/7",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/104",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/4",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/27",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/98",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/21",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/129",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/70",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/91",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/9",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/23",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/2",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/33",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/120",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/46",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/97",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/112",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/5",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/125",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/110",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/92",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/47",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/127",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/13",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/18",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/28",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/11/128",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/3",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/3/5531",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2450",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1570",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1070",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5698",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1524",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4623",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4668",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/563",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3006",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3119",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1675",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2409",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/349",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5191",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/84",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3059",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3195",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1843",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1015",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4057",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/633",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3922",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3923",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4843",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/80",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/69",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/642",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2875",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4706",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2522",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2289",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5548",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5418",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5382",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1983",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5519",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4575",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/150",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5041",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2648",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1218",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2559",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1633",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1419",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5774",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/93",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/973",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2043",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/340",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1990",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/17",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5143",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5216",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4004",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/49",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3562",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3312",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4919",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4709",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3585",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4428",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1777",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5199",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2476",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1135",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1894",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3536",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5061",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4192",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4631",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5187",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4906",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4717",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4647",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4374",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3706",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4272",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5765",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/5522",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/908",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4394",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4172",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/197",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4059",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4605",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3463",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4173",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4166",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2083",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/539",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/1736",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3468",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3153",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/3716",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4379",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2699",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/4768",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/3/2877",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/9",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/9/~4",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~4/372",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/358",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/361",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/359",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/374",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/373",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/368",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/364",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/356",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/363",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/365",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/366",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/371",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/367",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/369",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/362",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/370",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/360",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~4/357",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~5",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~5/411",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/393",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/381",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/377",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/405",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/382",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/409",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/384",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/395",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/408",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/398",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/406",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/403",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/401",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/419",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/417",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/407",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/424",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/421",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/376",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/392",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/415",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/378",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/399",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/413",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/412",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/402",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/375",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/423",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/386",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/380",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/397",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/416",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/385",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/404",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/400",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/387",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/418",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/396",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/394",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/414",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/391",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/388",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/420",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/389",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/422",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/425",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/390",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/379",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/410",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~5/383",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~7",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~7/~2",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/9/~7/~2/684",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/664",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/649",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/591",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/656",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/630",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/653",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/646",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/597",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/641",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/707",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/604",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/706",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/623",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/613",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/605",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/685",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/658",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/575",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/607",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/701",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/581",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/709",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/608",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/609",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/567",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/687",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/617",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/576",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/579",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/629",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/662",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/612",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/624",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/626",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/704",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/594",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/593",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/592",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/669",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/568",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/713",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/644",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/663",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/675",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/618",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/583",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/628",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/716A",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/622",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/590",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/602",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/673",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/660",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/677",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/601",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/667",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/606",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/657",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/570",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/627",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/595",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/652",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/682",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/698",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/586",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/571",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/639",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/681",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/598",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/577",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/654",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/625",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/615",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/714",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/700",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/582",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/670",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/616",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/665",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/672",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/674",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/695",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/650",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/564",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/702",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/621",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/715",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/645",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/659",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/710",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/693",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/599",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/691",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/696",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/565",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/699",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/688",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/620",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~7/~2/610",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      },
                      {
                        "id": "B/9/~7/429",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/467",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/528",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/458",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/433",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/529",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/563",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/457",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/560",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/431B",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/508",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/464A",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/519",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/465",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/541",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/561",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/527",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/512",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/449",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/443",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/437",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/462A",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/557",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/485",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/548",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/495",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/432",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/427",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/475",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/481",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/455",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/511",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/544",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/439A",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/448",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/447",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/489",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/486",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/546",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/501",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/496",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/530",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/470",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/483",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/478",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/545",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/505",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/515",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/476",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/439B",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/462B",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/553",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/436",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/554",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/498",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/493",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/510",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/504",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/471",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/535",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/452",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/556",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/506",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/533",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/532",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/454",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/444",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/513",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/534",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/558",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/441",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/482",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/537",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/539",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/559",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/446",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/480",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/517",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/459A",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/474",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/536",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/538",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/509",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/450",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/543",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/477",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/440",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/439C",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/435",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/464B",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/479",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/542",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/469",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/461",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/500",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/459B",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/562",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/473",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~7/503",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~2/207",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/161",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/176",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/291",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/164",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/312",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/319",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/200",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/270",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/138",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/308",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/225",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/197",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/228",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/146",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/337",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/218",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/127",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/210",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/122",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/313",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/295",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/154",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/292",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/248",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/187",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/279",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/284",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/264",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/184",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/318",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/214",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/215",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/112",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/250",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/336",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/183",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/134",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/283",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/191",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/232",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/162",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/178",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/275",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/229",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/297",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/307",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/179",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/195",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/130",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/120",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/246",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/262",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/198",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/145",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/124",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/216",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/285",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/256",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/201",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/107",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/118",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/259",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/323",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/298",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/188",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/171",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/334",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/324",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/204",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/261",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/212",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/238",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/193",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/202",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/255",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/217",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/199",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/257",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/224",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/258",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/149",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/272",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/131",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/280",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/331",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/208",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/289",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/303",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/249",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/306",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/338",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/158",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/205",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/326",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/144",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/254",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/328",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/104",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~2/293",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~3",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~3/349",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/352",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/343",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/355",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/354",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/350",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/345",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/344",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/348",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/342",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/351",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/346",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/353",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~3/347",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~6",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~6/426",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~1",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~1/~2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/3",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/83",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/58",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/93",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/68",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/88",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/98",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/55",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/32",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/26",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/48",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/53",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/21",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/16",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/9",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/37",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/94",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/10",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/69",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/67",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/96",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/101",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/40",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/34",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/60",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/14",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/77",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/6",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/79",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/39",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/36",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/91",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/38",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/47",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/72",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/87",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/17",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/86",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/75",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/35",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/11",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/8",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/19",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/61",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/5",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/59",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/76",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/31",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/51",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/99",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/44",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/62",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/22",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/41",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/92",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/97",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/74",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/49",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/66",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/100",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/85",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/33",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/63",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/45",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/24",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/52",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/89",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/56",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/54",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/12",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/65",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/28",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/4",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/7",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/81",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/18",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/82",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/29",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/84",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/57",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/90",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/27",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/80",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/95",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/43",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/25",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/78",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/102",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/23",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/42",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/70",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/50",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/73",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/46",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/20",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/64",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/~1/15",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/~8",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/~8/~1",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/9/~8/~1/1697",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1702",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1708",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1705",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1694",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1689",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1711",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1698",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1688",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1704",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1709",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1696",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1695",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1690",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1707",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1693",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1699",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1706",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1700",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1692",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1710",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1691",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1703",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/9/~8/~1/1701",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "B/9/1570",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1202",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1141",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/750",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1112",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1152",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1462",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/944",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1149",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1111",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1004",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1425",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1404",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1299",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1638",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1235",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1072",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/987",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1163",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1247",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1734",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/1734/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/1734/2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/1628",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1129",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1642",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/827",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1480",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1393",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1438",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1498",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/754",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1240",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1016",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1162",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/917",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1007",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1114",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/779",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1416",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1546",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1506",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/722",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1307",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1257",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1069",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1083",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1107",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/822",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1094",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1317",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/907",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/802",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1185",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/791",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/816",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1396",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/794",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/745",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1443",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1659",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1742",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1314",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1356",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1672",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1077",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/947",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1096",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/980",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/877",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1429",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1486",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1614",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/956",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1305",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/743",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1315",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1323",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1127",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1651",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1157",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1733",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/1733/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/9/1733/2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/908",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1037",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/851",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1593",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1422",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1647",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/9/1647/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/9/999",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1346",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1465",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1124",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/949",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/9/1108",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/12",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/12/18",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/39",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/12",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/27",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/32",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/25",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/46",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/34",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/52",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/17",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/54",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/4",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/31",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/15",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/14",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/16",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/5",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/48",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/7",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/10",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/42",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/49",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/41",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/2",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/36",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/44",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/24",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/13",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/1",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/45",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/11",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/35",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/6",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/37",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/28",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/29",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/30",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/20",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/47",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/3",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/33",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/19",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/21",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/55",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/8",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/9",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/51",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/26",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/38",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/53",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/22",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/23",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/40",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/50",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/12/43",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/5",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/5/~1",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~1/14",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/11",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/13",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/6",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/10",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/8",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/5",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/12",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/15",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/7",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/4",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/9",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~1/3",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~9",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~9/108",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~10",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~10/111",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~10/110",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~10/109",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~7",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~7/98",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~7/95",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~7/97",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~7/93",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~7/94",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~7/96",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~7/92",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~2/17",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~2/16",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~2/18",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~4",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~4/20",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/39",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/30",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/33",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/27",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/41",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/23",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/40",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/37",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/38",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/25",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/28",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/43",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/26",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/21",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/36",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/22",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/35",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/42",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/24",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/45",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/44",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/31",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/46",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/29",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/47",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/32",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~4/34",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~3",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~3/19",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~5",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~5/70",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/78",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/76",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/49",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/83",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/69",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/58",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/50",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/66",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/77",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/65",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/56",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/81",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/57",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/52",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/82",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/80",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/68",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/53",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/63",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/55",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/73",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/62",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/48",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/75",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/59",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/74",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/79",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/71",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/72",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/67",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/60",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/61",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/64",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/54",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~5/51",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~6",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~6/91",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/89",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/86",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/90",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/85",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/87",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/84",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~6/88",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/5/~8",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/5/~8/107",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/105",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/104",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/102",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/99",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/103",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/100",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/101",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/5/~8/106",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  }
                ]
              },
              {
                "id": "B/7",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/7/~4",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/~5",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/~2",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/~3",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/64",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/59",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/36",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/2A",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/61",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/14",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/24",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/65",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/3A",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/29",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/44",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/38",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/41",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/13",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/7",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/43",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/16",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/50",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/8",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/32",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/60",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/20",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/28",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/18",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/62",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/57",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/48",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/58",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/17",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/34",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/2B",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/52",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/5",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/54",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/25",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/40",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/45",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/30",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/49",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/12",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/31",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/22",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/3B",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/33",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/37",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/11",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/53",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/21",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/26",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/23",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/42",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/15",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/27",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/51",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/47",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/6",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/46",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/56",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/63",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/9",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/1",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/19",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/35",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/55",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/4",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/39",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/7/10",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              },
              {
                "id": "B/6",
                "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                "children": [
                  {
                    "id": "B/6/~2",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~2/35",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/28",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/39",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/30",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/34",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/23",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/22",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/38",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/33",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/40",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/24",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/41",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/27",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/36",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/29",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/37",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/26",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/32",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/21",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/25",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~2/31",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~5",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~5/~1",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/6/~5/~1/77",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/75",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/74",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/78",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/76",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/79",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/80",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~5/~1/81",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "B/6/~7",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~7/111",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/113",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/114",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/102",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/117",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/109",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/105",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/108",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/101",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/104",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/115",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/116",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/99",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/107",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/100",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/103",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/110",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/106",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~7/112",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~12",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~12/191",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/186",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/190",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/195",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/192",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/188",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/196",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/184",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/185",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/193",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/187",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/194",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/189",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~12/197",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~13",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~13/~2",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/6/~13/~2/203",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~2/205",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~2/208",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~2/207",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~2/204",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~2/206",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      },
                      {
                        "id": "B/6/~13/~3",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/6/~13/~3/214",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/209",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/213",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/216",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/215",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/212",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/218",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/210",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/217",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/211",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~3/219",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      },
                      {
                        "id": "B/6/~13/~1",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/6/~13/~1/201",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~1/200",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~1/198",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~1/202",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~13/~1/199",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "B/6/~1",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~1/6",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/13",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/12",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/4",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/5",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/16",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/20",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/3",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/14",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/7",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/2",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/10",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/8",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/9",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/15",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/17",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/18",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/19",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/11",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~1/1",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~4",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~4/~3",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/6/~4/~3/72",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/67",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/68",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/70",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/65",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/73",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/71",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/66",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/64",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/69",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~3/63",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      },
                      {
                        "id": "B/6/~4/~2",
                        "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                        "children": [
                          {
                            "id": "B/6/~4/~2/50",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/62",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/49",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/48",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/59",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/56",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/61",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/60",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/52",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/55",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/58",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/53",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/54",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/57",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          },
                          {
                            "id": "B/6/~4/~2/51",
                            "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                          }
                        ]
                      },
                      {
                        "id": "B/6/~4/47",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~4/45",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~4/46",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~9",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~9/125",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/128",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/130",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/131",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/129",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/127",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/126",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~9/132",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~11",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~11/181",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~11/183",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~11/178",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~11/182",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~11/179",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~11/180",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~10",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~10/154",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/163",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/156",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/135",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/145",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/167",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/158",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/175",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/174",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/157",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/139",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/169",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/143",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/152",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/148",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/142",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/147",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/170",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/138",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/133",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/168",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/159",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/171",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/151",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/137",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/144",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/164",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/162",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/136",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/166",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/161",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/149",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/146",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/134",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/141",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/165",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/173",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/140",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/160",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/172",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/153",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/150",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~10/155",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~6",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~6/83",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~6/86",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~6/85",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~6/84",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~6/82",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/~8",
                    "Whois": 0, "pureDomain": 10, "dirtyDomain": 8,
                    "children": [
                      {
                        "id": "B/6/~8/118",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~8/121",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~8/120",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~8/122",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~8/124",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~8/123",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      },
                      {
                        "id": "B/6/~8/119",
                        "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                      }
                    ]
                  },
                  {
                    "id": "B/6/91",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/223",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/95",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/90",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/87",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/220",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/89",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/98",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/42",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/176",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/93",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/94",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/44",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/222",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/96",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/43",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/97",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/177",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/221",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/92",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  },
                  {
                    "id": "B/6/88",
                    "Whois": 0, "pureDomain": 8, "dirtyDomain": 6
                  }
                ]
              }
            ]
        }
        setData(temp_data)
    }, [dataParam])

    useEffect(() => {
        drawICClueChart()
    }, [data])
    

    function drawICClueChart(){
        if(JSON.stringify(data) === '{}') return

        
        var maxSum = 0;
        const root = partition(data);
        let focus = root;
        const svg = d3.select("#ICClueChart")
                        .append('svg')
                        .attr("viewBox", [0, 0, width, height])
        const wrapper = svg.append('g').attr("transform", 'translate(0,0)')
        const cell = wrapper.selectAll('g')
                        .data(root.descendants())
                        .join('g')
                        .attr('transform', d => `translate(${d.y0}, ${d.x0})`)

        const widthScale = d3.scaleLinear().domain([0, maxSum]).range([0, width/7])
        // const rect = cell.append('rect')
        //                 .attr("width", d => d.y1 - d.y0 - 1)
        //                 .attr("height", d => rectHeight(d))
        //                 .attr("fill-opacity", 0.6)
        //                 .attr("fill", d => {
        //                     if (!d.depth) return "#ccc";
        //                     while (d.depth > 1) d = d.parent;
        //                     return color(d.data.id);
        //                 })
        //                 .style("cursor", "pointer")
        //                 .on("click", clicked);
        const rectG = cell.append('g')
        const whoisWidth = 20
        for(let i = 0; i<3; i++){
            rectG.append('rect')
                .attr('x', d => {
                    if(d.depth ===0) return d.y1 - d.y0 - 20
                    let widthScale = d3.scaleLinear().domain([0, 22]).range([0, d.y1 - d.y0 - whoisWidth])
                    if(i === 0) return 0
                    if(i === 1) return whoisWidth
                    return widthScale(d.data.dirtyDomain) + whoisWidth
                })
                .attr('y', 0)
                .attr('width', d => {
                    if(d.depth === 0) return 20
                    let widthScale = d3.scaleLinear().domain([0, 22]).range([0, d.y1 - d.y0 - whoisWidth])
                    console.log(d.data.pureDomain, maxSum);
                    if(i === 0) return whoisWidth
                    if(i === 1) return widthScale(d.data.dirtyDomain)-1
                    return d.y1 - d.y0 - whoisWidth - widthScale(d.data.dirtyDomain) - 1
                    // return widthScale(d.data.pureDomain)-1
                })
                .attr('height', d => rectHeight(d))
                .attr('fill', d => { 
                    if(d.depth === 0) return '#dfdfdf'
                    if(i === 0 && d.data.Whois != 0) return '#c9667b'
                    if(i === 0 && d.data.Whois == 0) return '#78d4e3'
                    if(i === 1) return '#aaa';
                    return '#65a487'
                })
                .style('cursor', 'pointer')
                .on('click', clicked)
        }

        const text = cell.append("text")
            .style("user-select", "none")
            .attr("pointer-events", "none")
            .attr("x", 4)
            .attr("y", 13)
            .attr("fill-opacity", d => +labelVisible(d));

        text.append("tspan")
            .text(d => d.data.id);
        const format = d3.format("d")
        const tspan = text.append("tspan")
            .attr("fill-opacity", d => labelVisible(d) * 0.7)
            .text(d => ` ${format(d.data.Whois + d.data.pureDomain + d.data.dirtyDomain)}`);

        cell.append("title")
            .text(d => `${d.ancestors().map(d => d.data.id).reverse().join("/")}\n${format(d.data.Whois + d.data.pureDomain + d.data.dirtyDomain)}`);

        function clicked(event, p) {
            focus = focus === p ? p = p.parent : p;

            root.each(d => d.target = {
            x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
            x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
            y0: d.y0 - p.y0,
            y1: d.y1 - p.y0
            });

            const t = cell.transition().duration(750)
                .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

            // rect.transition(t).attr("height", d => rectHeight(d.target));
            text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
            tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
        }
        
        function rectHeight(d) {
            return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
        }

        function labelVisible(d) {
            return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
        }
        // 计算partition布局
        function partition(data){
            const root = d3.hierarchy(data)
                .sum(d => d.Whois + d.pureDomain + d.dirtyDomain)
                .sort(function(a, b){
                    // 计算包含最多的节点数量
                    // var oldMaxSum = maxSum;
                    // maxSum = Math.max(b.data.pureDomain + b.data.dirtyDomain, a.data.pureDomain + a.data.dirtyDomain, oldMaxSum)
                    // console.log(a, b);
                    return b.height - a.height || (b.value) - (a.value)
                });  
            return d3.partition()
                .size([height, width])
                (root);
        }
         // 视图缩放
        let zoomHandler = d3
        .zoom()
        .on("zoom", zoomAction)
        .filter(function (event) {
            return !event.button && event.type != "dblclick";
        });
        function zoomAction(event) {
        wrapper.attr(
            "transform",
            `translate(${event.transform.x}, ${event.transform.y})` +
            "scale(" +
            event.transform.k +
            ")"
            );
        }
        zoomHandler(svg);
        }

    return <div id="ICClueChart"></div>

}