import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";
import lasso from "./d3-lasso";
import d3ContextMenu from "d3-context-menu";
import PubSub from "pubsub-js";

import "./index.css";
import { icclue, skeletonChartSds } from "../../apis/api";

const d3Lasso = lasso;

export default function SkeletonChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState({});
  const [dataParam, setDataParam] = useState("");
  const [selectedNode, setSelectedNode] = useState([]);
  const [currIc, setCurrIc] = useState(""); // 当前已选择的ic

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  // 请求数据
  useEffect(() => {
    let dt = {
      nodes: [
        {
          id: "Myriel",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Napoleon",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Mlle.Baptistine",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Mme.Magloire",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "CountessdeLo",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Geborand",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Champtercier",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Cravatte",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Count",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "OldMan",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Labarre",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Valjean",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Marguerite",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Mme.deR",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Isabeau",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Gervais",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Tholomyes",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Listolier",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Fameuil",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Blacheville",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Favourite",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Dahlia",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Zephine",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Fantine",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Mme.Thenardier",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Thenardier",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Cosette",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Javert",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Fauchelevent",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 0,
        },
        {
          id: "Bamatabois",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Perpetue",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 3,
        },
        {
          id: "Simplice",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Scaufflaire",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Woman1",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Judge",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Champmathieu",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Brevet",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Chenildieu",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Cochepaille",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 2,
        },
        {
          id: "Pontmercy",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Boulatruelle",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 6,
        },
        {
          id: "Eponine",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Anzelma",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Woman2",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "MotherInnocent",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 0,
        },
        {
          id: "Gribier",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 0,
        },
        {
          id: "Jondrette",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 7,
        },
        {
          id: "Mme.Burgon",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 7,
        },
        {
          id: "Gavroche",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Gillenormand",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Magnon",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Mlle.Gillenormand",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Mme.Pontmercy",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Mlle.Vaubois",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Lt.Gillenormand",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Marius",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "BaronessT",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Mabeuf",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Enjolras",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Combeferre",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Prouvaire",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Feuilly",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Courfeyrac",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Bahorel",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Bossuet",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Joly",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "Grantaire",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
        {
          id: "MotherPlutarch",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 9,
        },
        {
          id: "Gueulemer",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Babet",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Claquesous",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Montparnasse",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Toussaint",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 5,
        },
        {
          id: "Child1",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 10,
        },
        {
          id: "Child2",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 10,
        },
        {
          id: "Brujon",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 4,
        },
        {
          id: "Mme.Hucheloup",
          industry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 8,
        },
      ],
      links: [
        { source: "Napoleon", target: "Myriel", value: 1 },
        { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
        { source: "Mme.Magloire", target: "Myriel", value: 10 },
        { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
        { source: "CountessdeLo", target: "Myriel", value: 1 },
        { source: "Geborand", target: "Myriel", value: 1 },
        { source: "Champtercier", target: "Myriel", value: 1 },
        { source: "Cravatte", target: "Myriel", value: 1 },
        { source: "Count", target: "Myriel", value: 2 },
        { source: "OldMan", target: "Myriel", value: 1 },
        { source: "Valjean", target: "Labarre", value: 1 },
        { source: "Valjean", target: "Mme.Magloire", value: 3 },
        { source: "Valjean", target: "Mlle.Baptistine", value: 3 },
        { source: "Valjean", target: "Myriel", value: 5 },
        { source: "Marguerite", target: "Valjean", value: 1 },
        { source: "Mme.deR", target: "Valjean", value: 1 },
        { source: "Isabeau", target: "Valjean", value: 1 },
        { source: "Gervais", target: "Valjean", value: 1 },
        { source: "Listolier", target: "Tholomyes", value: 4 },
        { source: "Fameuil", target: "Tholomyes", value: 4 },
        { source: "Fameuil", target: "Listolier", value: 4 },
        { source: "Blacheville", target: "Tholomyes", value: 4 },
        { source: "Blacheville", target: "Listolier", value: 4 },
        { source: "Blacheville", target: "Fameuil", value: 4 },
        { source: "Favourite", target: "Tholomyes", value: 3 },
        { source: "Favourite", target: "Listolier", value: 3 },
        { source: "Favourite", target: "Fameuil", value: 3 },
        { source: "Favourite", target: "Blacheville", value: 4 },
        { source: "Dahlia", target: "Tholomyes", value: 3 },
        { source: "Dahlia", target: "Listolier", value: 3 },
        { source: "Dahlia", target: "Fameuil", value: 3 },
        { source: "Dahlia", target: "Blacheville", value: 3 },
        { source: "Dahlia", target: "Favourite", value: 5 },
        { source: "Zephine", target: "Tholomyes", value: 3 },
        { source: "Zephine", target: "Listolier", value: 3 },
        { source: "Zephine", target: "Fameuil", value: 3 },
        { source: "Zephine", target: "Blacheville", value: 3 },
        { source: "Zephine", target: "Favourite", value: 4 },
        { source: "Zephine", target: "Dahlia", value: 4 },
        { source: "Fantine", target: "Tholomyes", value: 3 },
        { source: "Fantine", target: "Listolier", value: 3 },
        { source: "Fantine", target: "Fameuil", value: 3 },
        { source: "Fantine", target: "Blacheville", value: 3 },
        { source: "Fantine", target: "Favourite", value: 4 },
        { source: "Fantine", target: "Dahlia", value: 4 },
        { source: "Fantine", target: "Zephine", value: 4 },
        { source: "Fantine", target: "Marguerite", value: 2 },
        { source: "Fantine", target: "Valjean", value: 9 },
        { source: "Mme.Thenardier", target: "Fantine", value: 2 },
        { source: "Mme.Thenardier", target: "Valjean", value: 7 },
        { source: "Thenardier", target: "Mme.Thenardier", value: 13 },
        { source: "Thenardier", target: "Fantine", value: 1 },
        { source: "Thenardier", target: "Valjean", value: 12 },
        { source: "Cosette", target: "Mme.Thenardier", value: 4 },
        { source: "Cosette", target: "Valjean", value: 31 },
        { source: "Cosette", target: "Tholomyes", value: 1 },
        { source: "Cosette", target: "Thenardier", value: 1 },
        { source: "Javert", target: "Valjean", value: 17 },
        { source: "Javert", target: "Fantine", value: 5 },
        { source: "Javert", target: "Thenardier", value: 5 },
        { source: "Javert", target: "Mme.Thenardier", value: 1 },
        { source: "Javert", target: "Cosette", value: 1 },
        { source: "Fauchelevent", target: "Valjean", value: 8 },
        { source: "Fauchelevent", target: "Javert", value: 1 },
        { source: "Bamatabois", target: "Fantine", value: 1 },
        { source: "Bamatabois", target: "Javert", value: 1 },
        { source: "Bamatabois", target: "Valjean", value: 2 },
        { source: "Perpetue", target: "Fantine", value: 1 },
        { source: "Simplice", target: "Perpetue", value: 2 },
        { source: "Simplice", target: "Valjean", value: 3 },
        { source: "Simplice", target: "Fantine", value: 2 },
        { source: "Simplice", target: "Javert", value: 1 },
        { source: "Scaufflaire", target: "Valjean", value: 1 },
        { source: "Woman1", target: "Valjean", value: 2 },
        { source: "Woman1", target: "Javert", value: 1 },
        { source: "Judge", target: "Valjean", value: 3 },
        { source: "Judge", target: "Bamatabois", value: 2 },
        { source: "Champmathieu", target: "Valjean", value: 3 },
        { source: "Champmathieu", target: "Judge", value: 3 },
        { source: "Champmathieu", target: "Bamatabois", value: 2 },
        { source: "Brevet", target: "Judge", value: 2 },
        { source: "Brevet", target: "Champmathieu", value: 2 },
        { source: "Brevet", target: "Valjean", value: 2 },
        { source: "Brevet", target: "Bamatabois", value: 1 },
        { source: "Chenildieu", target: "Judge", value: 2 },
        { source: "Chenildieu", target: "Champmathieu", value: 2 },
        { source: "Chenildieu", target: "Brevet", value: 2 },
        { source: "Chenildieu", target: "Valjean", value: 2 },
        { source: "Chenildieu", target: "Bamatabois", value: 1 },
        { source: "Cochepaille", target: "Judge", value: 2 },
        { source: "Cochepaille", target: "Champmathieu", value: 2 },
        { source: "Cochepaille", target: "Brevet", value: 2 },
        { source: "Cochepaille", target: "Chenildieu", value: 2 },
        { source: "Cochepaille", target: "Valjean", value: 2 },
        { source: "Cochepaille", target: "Bamatabois", value: 1 },
        { source: "Pontmercy", target: "Thenardier", value: 1 },
        { source: "Boulatruelle", target: "Thenardier", value: 1 },
        { source: "Eponine", target: "Mme.Thenardier", value: 2 },
        { source: "Eponine", target: "Thenardier", value: 3 },
        { source: "Anzelma", target: "Eponine", value: 2 },
        { source: "Anzelma", target: "Thenardier", value: 2 },
        { source: "Anzelma", target: "Mme.Thenardier", value: 1 },
        { source: "Woman2", target: "Valjean", value: 3 },
        { source: "Woman2", target: "Cosette", value: 1 },
        { source: "Woman2", target: "Javert", value: 1 },
        { source: "MotherInnocent", target: "Fauchelevent", value: 3 },
        { source: "MotherInnocent", target: "Valjean", value: 1 },
        { source: "Gribier", target: "Fauchelevent", value: 2 },
        { source: "Mme.Burgon", target: "Jondrette", value: 1 },
        { source: "Gavroche", target: "Mme.Burgon", value: 2 },
        { source: "Gavroche", target: "Thenardier", value: 1 },
        { source: "Gavroche", target: "Javert", value: 1 },
        { source: "Gavroche", target: "Valjean", value: 1 },
        { source: "Gillenormand", target: "Cosette", value: 3 },
        { source: "Gillenormand", target: "Valjean", value: 2 },
        { source: "Magnon", target: "Gillenormand", value: 1 },
        { source: "Magnon", target: "Mme.Thenardier", value: 1 },
        { source: "Mlle.Gillenormand", target: "Gillenormand", value: 9 },
        { source: "Mlle.Gillenormand", target: "Cosette", value: 2 },
        { source: "Mlle.Gillenormand", target: "Valjean", value: 2 },
        { source: "Mme.Pontmercy", target: "Mlle.Gillenormand", value: 1 },
        { source: "Mme.Pontmercy", target: "Pontmercy", value: 1 },
        { source: "Mlle.Vaubois", target: "Mlle.Gillenormand", value: 1 },
        { source: "Lt.Gillenormand", target: "Mlle.Gillenormand", value: 2 },
        { source: "Lt.Gillenormand", target: "Gillenormand", value: 1 },
        { source: "Lt.Gillenormand", target: "Cosette", value: 1 },
        { source: "Marius", target: "Mlle.Gillenormand", value: 6 },
        { source: "Marius", target: "Gillenormand", value: 12 },
        { source: "Marius", target: "Pontmercy", value: 1 },
        { source: "Marius", target: "Lt.Gillenormand", value: 1 },
        { source: "Marius", target: "Cosette", value: 21 },
        { source: "Marius", target: "Valjean", value: 19 },
        { source: "Marius", target: "Tholomyes", value: 1 },
        { source: "Marius", target: "Thenardier", value: 2 },
        { source: "Marius", target: "Eponine", value: 5 },
        { source: "Marius", target: "Gavroche", value: 4 },
        { source: "BaronessT", target: "Gillenormand", value: 1 },
        { source: "BaronessT", target: "Marius", value: 1 },
        { source: "Mabeuf", target: "Marius", value: 1 },
        { source: "Mabeuf", target: "Eponine", value: 1 },
        { source: "Mabeuf", target: "Gavroche", value: 1 },
        { source: "Enjolras", target: "Marius", value: 7 },
        { source: "Enjolras", target: "Gavroche", value: 7 },
        { source: "Enjolras", target: "Javert", value: 6 },
        { source: "Enjolras", target: "Mabeuf", value: 1 },
        { source: "Enjolras", target: "Valjean", value: 4 },
        { source: "Combeferre", target: "Enjolras", value: 15 },
        { source: "Combeferre", target: "Marius", value: 5 },
        { source: "Combeferre", target: "Gavroche", value: 6 },
        { source: "Combeferre", target: "Mabeuf", value: 2 },
        { source: "Prouvaire", target: "Gavroche", value: 1 },
        { source: "Prouvaire", target: "Enjolras", value: 4 },
        { source: "Prouvaire", target: "Combeferre", value: 2 },
        { source: "Feuilly", target: "Gavroche", value: 2 },
        { source: "Feuilly", target: "Enjolras", value: 6 },
        { source: "Feuilly", target: "Prouvaire", value: 2 },
        { source: "Feuilly", target: "Combeferre", value: 5 },
        { source: "Feuilly", target: "Mabeuf", value: 1 },
        { source: "Feuilly", target: "Marius", value: 1 },
        { source: "Courfeyrac", target: "Marius", value: 9 },
        { source: "Courfeyrac", target: "Enjolras", value: 17 },
        { source: "Courfeyrac", target: "Combeferre", value: 13 },
        { source: "Courfeyrac", target: "Gavroche", value: 7 },
        { source: "Courfeyrac", target: "Mabeuf", value: 2 },
        { source: "Courfeyrac", target: "Eponine", value: 1 },
        { source: "Courfeyrac", target: "Feuilly", value: 6 },
        { source: "Courfeyrac", target: "Prouvaire", value: 3 },
        { source: "Bahorel", target: "Combeferre", value: 5 },
        { source: "Bahorel", target: "Gavroche", value: 5 },
        { source: "Bahorel", target: "Courfeyrac", value: 6 },
        { source: "Bahorel", target: "Mabeuf", value: 2 },
        { source: "Bahorel", target: "Enjolras", value: 4 },
        { source: "Bahorel", target: "Feuilly", value: 3 },
        { source: "Bahorel", target: "Prouvaire", value: 2 },
        { source: "Bahorel", target: "Marius", value: 1 },
        { source: "Bossuet", target: "Marius", value: 5 },
        { source: "Bossuet", target: "Courfeyrac", value: 12 },
        { source: "Bossuet", target: "Gavroche", value: 5 },
        { source: "Bossuet", target: "Bahorel", value: 4 },
        { source: "Bossuet", target: "Enjolras", value: 10 },
        { source: "Bossuet", target: "Feuilly", value: 6 },
        { source: "Bossuet", target: "Prouvaire", value: 2 },
        { source: "Bossuet", target: "Combeferre", value: 9 },
        { source: "Bossuet", target: "Mabeuf", value: 1 },
        { source: "Bossuet", target: "Valjean", value: 1 },
        { source: "Joly", target: "Bahorel", value: 5 },
        { source: "Joly", target: "Bossuet", value: 7 },
        { source: "Joly", target: "Gavroche", value: 3 },
        { source: "Joly", target: "Courfeyrac", value: 5 },
        { source: "Joly", target: "Enjolras", value: 5 },
        { source: "Joly", target: "Feuilly", value: 5 },
        { source: "Joly", target: "Prouvaire", value: 2 },
        { source: "Joly", target: "Combeferre", value: 5 },
        { source: "Joly", target: "Mabeuf", value: 1 },
        { source: "Joly", target: "Marius", value: 2 },
        { source: "Grantaire", target: "Bossuet", value: 3 },
        { source: "Grantaire", target: "Enjolras", value: 3 },
        { source: "Grantaire", target: "Combeferre", value: 1 },
        { source: "Grantaire", target: "Courfeyrac", value: 2 },
        { source: "Grantaire", target: "Joly", value: 2 },
        { source: "Grantaire", target: "Gavroche", value: 1 },
        { source: "Grantaire", target: "Bahorel", value: 1 },
        { source: "Grantaire", target: "Feuilly", value: 1 },
        { source: "Grantaire", target: "Prouvaire", value: 1 },
        { source: "MotherPlutarch", target: "Mabeuf", value: 3 },
        { source: "Gueulemer", target: "Thenardier", value: 5 },
        { source: "Gueulemer", target: "Valjean", value: 1 },
        { source: "Gueulemer", target: "Mme.Thenardier", value: 1 },
        { source: "Gueulemer", target: "Javert", value: 1 },
        { source: "Gueulemer", target: "Gavroche", value: 1 },
        { source: "Gueulemer", target: "Eponine", value: 1 },
        { source: "Babet", target: "Thenardier", value: 6 },
        { source: "Babet", target: "Gueulemer", value: 6 },
        { source: "Babet", target: "Valjean", value: 1 },
        { source: "Babet", target: "Mme.Thenardier", value: 1 },
        { source: "Babet", target: "Javert", value: 2 },
        { source: "Babet", target: "Gavroche", value: 1 },
        { source: "Babet", target: "Eponine", value: 1 },
        { source: "Claquesous", target: "Thenardier", value: 4 },
        { source: "Claquesous", target: "Babet", value: 4 },
        { source: "Claquesous", target: "Gueulemer", value: 4 },
        { source: "Claquesous", target: "Valjean", value: 1 },
        { source: "Claquesous", target: "Mme.Thenardier", value: 1 },
        { source: "Claquesous", target: "Javert", value: 1 },
        { source: "Claquesous", target: "Eponine", value: 1 },
        { source: "Claquesous", target: "Enjolras", value: 1 },
        { source: "Montparnasse", target: "Javert", value: 1 },
        { source: "Montparnasse", target: "Babet", value: 2 },
        { source: "Montparnasse", target: "Gueulemer", value: 2 },
        { source: "Montparnasse", target: "Claquesous", value: 2 },
        { source: "Montparnasse", target: "Valjean", value: 1 },
        { source: "Montparnasse", target: "Gavroche", value: 1 },
        { source: "Montparnasse", target: "Eponine", value: 1 },
        { source: "Montparnasse", target: "Thenardier", value: 1 },
        { source: "Toussaint", target: "Cosette", value: 2 },
        { source: "Toussaint", target: "Javert", value: 1 },
        { source: "Toussaint", target: "Valjean", value: 1 },
        { source: "Child1", target: "Gavroche", value: 2 },
        { source: "Child2", target: "Gavroche", value: 2 },
        { source: "Child2", target: "Child1", value: 3 },
        { source: "Brujon", target: "Babet", value: 3 },
        { source: "Brujon", target: "Gueulemer", value: 3 },
        { source: "Brujon", target: "Thenardier", value: 3 },
        { source: "Brujon", target: "Gavroche", value: 1 },
        { source: "Brujon", target: "Eponine", value: 1 },
        { source: "Brujon", target: "Claquesous", value: 1 },
        { source: "Brujon", target: "Montparnasse", value: 1 },
        { source: "Mme.Hucheloup", target: "Bossuet", value: 1 },
        { source: "Mme.Hucheloup", target: "Joly", value: 1 },
        { source: "Mme.Hucheloup", target: "Grantaire", value: 1 },
        { source: "Mme.Hucheloup", target: "Bahorel", value: 1 },
        { source: "Mme.Hucheloup", target: "Courfeyrac", value: 1 },
        { source: "Mme.Hucheloup", target: "Gavroche", value: 1 },
        { source: "Mme.Hucheloup", target: "Enjolras", value: 1 },
      ],
    };
    setData(dt);
  }, []);

  // 监听选择的节点的变化
  useEffect(() => {
    skeletonChartSds().then((res) => {
      setData(res);
    });
  }, [currIc]);

  useEffect(() => {
    drawChart();
  }, [svgWidth, svgHeight, data]);

  PubSub.subscribe("icicleSelect", (msg, ic) => {
    setCurrIc(ic);
  });

  // 绘制结构图
  function drawChart() {
    if (JSON.stringify(data) === "{}") return;
    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d, i) => Object.create({ ...d, group: i })); // 将每一个点单独看成一个group，被选中的group添加背景颜色
    // const nodes = data.nodes.map((d, i) => Object.create(d));

    d3.selectAll("div#skeleton-chart svg").remove();
    const svg = d3
      .select("#skeleton-chart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("viewBox", [0, 0, svgWidth, svgHeight]);
    var displayGroupOnHover = false,
      scaleFactor = 1.2, // 值为1表示紧连边缘的点
      margin = scaleFactor,
      nodeRadius = 10,
      onHover = undefined,
      onClick = undefined,
      onLeave = undefined,
      chargeStrength = undefined,
      linkStrength = undefined,
      industryType = ["A", "B", "C", "D", "E"], // 一共有9种产业
      combinationOrder = ["AB", "AE", "BCD"]; // 按字母对所有产业组合进行排序
    const wrapper = svg.append("g").attr("transform", `translate(0, 0)`);

    // create groups, links and nodes
    const groups = wrapper.append("g").attr("class", "groups");
    // 节点的右键事件
    const menu = [
      {
        title: "取消选择",
        action: function (groupId, event) {
          d3.select(this)
            .classed("selected", false)
            .attr("fill", "white")
            .attr("opacity", 0.2);

          // 获取被取消数据对应的numId
          let numId = nodes
            .filter((d) => d.group == groupId)
            .map((d) => d.id)[0];
          // 从选择的数据中删掉被取消的元素
          setSelectedNode((selectedNode) =>
            selectedNode.filter((d) => d != numId)
          );
        },
      },
    ];
    const link = wrapper
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1)
      .attr("stroke", "#ccc");
    const nodeColor = d3.scaleOrdinal(d3.schemeCategory10);
    const nodeG = wrapper
      .append("g")
      .attr("class", "nodeG")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("fill", "white")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
    nodeG.append("title").text(function (d) {
      return d.id;
    });
    var innerCirlceColor = ["#ffd006", "#67bbd7"];
    nodeG
      .append("circle")
      .attr("r", 2)
      .attr("fill", "white")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", (d, index) => innerCirlceColor[index % 2]);

    if (typeof onHover === "function") {
      nodeG.on("mouseover", onHover);
    }
    if (typeof onLeave === "function") {
      nodeG.on("mouseout", onLeave);
    }
    if (typeof onClick === "function") {
      nodeG.on("click", onClick);
    }
    function onHover() {
      console.log(this);
    }

    // 绘制每个节点的内部图
    const industryColor = {
      0: "#c3e6a1",
      1: "#e4657f",
      2: "#a17fda",
      3: "#ff9f6d",
      4: "#4caead",
      5: "#64d9d7",
      6: "#82b461",
      7: "#fffb96",
      8: "#87ccff",
    };
    const arc = d3
      .arc()
      .innerRadius((i, j) => 2 + 2 * j)
      .outerRadius((i, j) => 2 + 2 * (j + 1))
      .startAngle((i) => ((2 * Math.PI) / combinationOrder.length) * i - 2)
      .endAngle((i) => ((2 * Math.PI) / combinationOrder.length) * (i + 1) - 2)
      .cornerRadius(60)
      .padAngle(0.5);

    for (let i = 0; i < combinationOrder.length; i++) {
      let currInduYIndex = [],
        first_flag = true;
      for (var j = 0; j < industryType.length; j++) {
        nodeG
          .append("path")
          .attr("d", arc(i, j))
          .attr("stroke", "none")
          .attr("fill", (d) => {
            if (first_flag) {
              for (let indus in d.industry) {
                if (
                  combinationOrder.indexOf(d.industry[indus]["industry"]) == i
                ) {
                  // 当前产业与当前弧对应的产业一致
                  let currIndu = d.industry[indus]["industry"]; // 当前产业集合，然后获取当前产业集合包含的子产业对应的径向索引
                  currInduYIndex = currIndu
                    .split("")
                    .map((value) => industryType.indexOf(value));
                  break;
                }
              }
            }
            first_flag = false;
            if (currInduYIndex.length != 0 && currInduYIndex.indexOf(j) != -1) {
              return industryColor[j];
            }
            return "white";
          });
      }
    }

    // 定义simulation
    const simulation = d3
      .forceSimulation()
      .nodes(nodes)
      .force("charge", d3.forceManyBody().strength(-50));
    if (linkStrength && typeof linkStrength === "number") {
      simulation.force(
        "link",
        d3
          .forceLink()
          .links(links)
          .id((d) => d.id)
          .strength(linkStrength)
      );
    } else {
      // simulation.force('link', d3.forceLink().links(links).id(d => d.id));
      simulation.force(
        "link",
        d3
          .forceLink()
          .links(links)
          .id((d) => d.id)
          .strength((d) => (d.source.group == d.target.group ? 0.6 : 0.1))
      );
    }
    simulation
      .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
      .force("collision", d3.forceCollide().radius(19));
    simulation.on("tick", tick);
    function tick() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeG.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
      updateGroups(groupPath, groupIds, nodeG, margin);
    }

    // 选择group中的节点，检索该节点的位置并返回特定点的convex hull（最少为3个点，否则返回null）
    const groupIds = [...new Set(nodes.map((n) => +n.group))]
      .map((groupId) => ({
        groupId: groupId,
        count: nodes.filter((n) => +n.group == groupId).length,
      }))
      .map((group) => group.groupId);

    const groupPath = groups
      .selectAll(".path_placeholder")
      .data(groupIds, (d) => +d)
      .join("g")
      .attr("class", "path_placeholder")
      .attr("groupId", (d) => d)
      .append("path")
      .attr("stroke", "grey")
      .attr("fill", "white")
      //   .attr("fill", (d) => nodeColor(d))
      .attr("opacity", 0.2)
      .on("contextmenu", d3ContextMenu(menu));
    // .on('mouseover', (event, d) => {
    //   d3.select(this).transition()
    //   .duration(2000)
    //   .attr('opacity', 0.8);
    //   console.log(this);
    // })
    // .on('mouseout', (event, d) => {
    //   d3.select(this).transition()
    //   .duration(2000)
    //   .attr('opacity', 0.2);
    // })

    if (displayGroupOnHover) {
      groupPath.transition().duration(2000).attr("opacity", 0.8);
    }

    // 对group添加交互
    // groups.selectAll('.path_placeholder')
    //   .call(d3.drag()
    //     .on('start', group_dragstarted)
    //     .on('drag', group_dragged)
    //     .on('end', group_dragended)
    //   )
    //拖拽节点
    function dragstarted(evt, d) {
      if (!evt.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(evt, d) {
      d.fx = evt.x;
      d.fy = evt.y;
    }
    function dragended(evt, d) {
      if (!evt.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // 拖拽group
    function group_dragstarted(event, groupId) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d3.select(this).select("path").style("stroke-width", 3);
    }
    function group_dragged(event, groupId) {
      nodeG
        .filter(function (d) {
          return d.group == groupId;
        })
        .each(function (d) {
          d.x += event.dx;
          d.y += event.dy;
        });
    }
    function group_dragended(event, groupId) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d3.select(this).select("path").style("stroke-width", 1);
    }

    // // 生成group表示，检索group中的节点的位置，返回特定点的convex hull，至少有三个点，否则返回null
    function polygonGenerator(groupId, node) {
      var node_coords = nodeG
        .filter((d) => d.group == groupId)
        .data()
        .map((d) => [d.x, d.y]);
      // 处理点数小于3的组
      if (node_coords.length == 2) {
        let point_x1 = node_coords[0][0],
          point_y1 = node_coords[0][1];
        let point_x2 = node_coords[1][0],
          point_y2 = node_coords[1][1];
        node_coords = [];
        node_coords.push([point_x1, point_y1 + nodeRadius]);
        node_coords.push([point_x1, point_y1 - nodeRadius]);
        node_coords.push([point_x2, point_y2 + nodeRadius]);
        node_coords.push([point_x2, point_y2 - nodeRadius]);
      } else if (node_coords.length == 1) {
        let point_x = node_coords[0][0],
          point_y = node_coords[0][1];
        node_coords = [];
        node_coords.push([point_x - nodeRadius, point_y + nodeRadius]);
        node_coords.push([point_x + nodeRadius, point_y + nodeRadius]);
        node_coords.push([point_x + nodeRadius, point_y - nodeRadius]);
        node_coords.push([point_x - nodeRadius, point_y - nodeRadius]);
      }
      return d3.polygonHull(node_coords);
    }
    function updateGroups(groupPath, groupIds, node, margin) {
      const valueline = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(d3["curveCardinalClosed"]);

      groupIds.forEach((groupId) => {
        let centroid = [];
        let path = groupPath
          .filter((d) => d == groupId)
          .attr("transform", "scale(1) translate(0,0)")
          .attr("d", (d) => {
            const polygon = polygonGenerator(d, node);
            centroid = d3.polygonCentroid(polygon);
            // 适当缩放形状：移动g元素到质心点，translate g围绕中心的所有路径
            return valueline(
              polygon.map((point) => [
                point[0] - centroid[0],
                point[1] - centroid[1],
              ])
            );
          });
        d3.select(path.node().parentNode).attr(
          "transform",
          "translate(" +
            centroid[0] +
            "," +
            centroid[1] +
            ") scale(" +
            margin +
            ")"
        );
      });
    }

    // 视图缩放：缩放了就不会有选择
    // let zoomHandler = d3
    //   .zoom()
    //   .on("zoom", zoomAction)
    //   .filter(function (event) {
    //     return !event.button && event.type != "dblclick";
    //   });
    // function zoomAction(event) {
    //   wrapper.attr(
    //     "transform",
    //     `translate(${event.transform.x}, ${event.transform.y})` +
    //       "scale(" +
    //       event.transform.k +
    //       ")"
    //     );
    // }
    // zoomHandler(svg);

    // ----------------   LASSO STUFF . ----------------
    var lasso_start = function () {
      // 可以选择在框选之前删除所有的样式
      // lasso.items()
      //     .classed("not_possible",true)
      //     .classed("selected",false);
    };

    var lasso_draw = function () {
      lasso
        .possibleItems()
        .selectAll("path")
        .attr("fill", "#fe2236")
        .attr("opacity", 0.5);

      // lasso.notPossibleItems()
      //     .classed("not_possible",true)
      //     .classed("possible",false);
    };

    var lasso_end = function () {
      lasso.selectedItems().selectAll("path").classed("selected", "selected");

      // 保留多次选择的结果
      d3.selectAll(".path_placeholder path")
        .filter(function (d) {
          return d3.select(this).attr("class") != "selected";
        })
        .attr("fill", "white")
        .attr("opacity", 0.2);

      // lasso.notSelectedItems()
      //     .selectAll('path')
      //     .attr('fill', 'none')
      //     .attr("opacity", 0.5);

      // 获取选中的数据对应的numId
      var groupIdArr = lasso.selectedItems()._groups[0].map((d) => d.__data__);
      if (groupIdArr.length != 0) {
        let numIdArr = nodes
          .filter((d) => groupIdArr.includes(d.group))
          .map((d) => d.id);
        setSelectedNode((selectedNode) =>
          Array.from(new Set([...selectedNode, ...numIdArr]))
        );
      }
    };

    const lasso = d3Lasso()
      .closePathDistance(305)
      .closePathSelect(true)
      .targetArea(svg)
      .items(d3.selectAll(".path_placeholder"))
      .on("start", lasso_start)
      .on("draw", lasso_draw)
      .on("end", lasso_end);

    svg.call(lasso);
  }

  return (
    <div id="skeleton-chart" style={{ width: "100%", height: "100%" }}></div>
  );
}
