export default function SearchBar() {
  let s_1 = 0.00000001;
  let s_2 = 0.0002;
  var jsnx = require("jsnetworkx");
  var G = new jsnx.Graph();
  G.addEdgesFrom(
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
      [5, 6],
      [4, 8],
      [5, 7],
    ],
    { weight: 3 }
  );
  // console.log(G.getEdgeData(1, 4))
  let bc = jsnx.betweennessCentrality(G)._numberValues;
  let bcarr = [];
  for (let i = 0; i < Object.keys(bc).length; i++) {
    bcarr.push({ name: Object.keys(bc)[i], value: Object.values(bc)[i] });
  }
  var compare = function (obj1, obj2) {
    var val1 = obj1.value;
    var val2 = obj2.value;
    if (val1 < val2) return 1;
    else if (val1 > val2) return -1;
    else return 0;
  };
  bcarr = bcarr.sort(compare);
  let selectbcarr = [];
  for (let i = 0; i < bcarr.length; i++) {
    if ((i + 1) * s_1 > bcarr[i].value) break;
    selectbcarr.push(bcarr[i]);
  }
  let dc = jsnx.degree(G)._numberValues;
  let dcarr = [];
  for (let i = 0; i < Object.keys(dc).length; i++) {
    dcarr.push({ name: Object.keys(dc)[i], value: Object.values(dc)[i] });
  }
  dcarr = dcarr.sort(compare);
  let selectdcarr = [];
  for (let i = 0; i < dcarr.length; i++) {
    if ((i + 1) * s_2 > dcarr[i].value) break;
    selectdcarr.push(dcarr[i]);
  }
  function getIntersectionData(dataA, dataB) {
    outLoop: for (let i = dataA.length - 1; i >= 0; i--) {
      for (let j = 0; j < dataB.length; j++) {
        if (dataA[i].id === dataB[j].id) {
          continue outLoop;
        }
      }
      dataA.splice(i, 1);
    }
    return dataA;
  }
  var result = getIntersectionData(selectbcarr, selectdcarr);
  let selectnodes = [];
  for (let i = 0; i < result.length; i++) {
    selectnodes.push(Number(result[i].name));
  }
  let selectedges = jsnx.edges(G, selectnodes);
  var g = new jsnx.Graph();
  g.addEdgesFrom(selectedges);
  let dropnodes = [];
  for (let i = 0; i < selectnodes.length; i++) {
    let path = [];
    for (let j = i + 1; j < selectnodes.length; j++) {
      if (!jsnx.hasPath(g, { source: selectnodes[i], target: selectnodes[j] }))
        path.push(true);
    }
    if (path.length == selectnodes.length - i) dropnodes.push(i);
  }
  g.removeNodesFrom(dropnodes);
}
