import { useEffect, useState } from "react";
import BulletChart from "../bullet-chart";
import DetailList from "../detail-list";
import "./index.css";
export default function CombineTable({ w, h, b }) {
  const [bcWidth, setBcWidth] = useState(0);
  const [bcHeight, setBcHeight] = useState(0);
  const [dlWidth, setDlWidth] = useState(0);
  const [dlHeight, setDlHeight] = useState(0);
  const [belong, setBelong] = useState("");
  useEffect(() => {
    setBcWidth(
      document.getElementById("combine-table-bc-" + b).getBoundingClientRect()
        .width
    );
    setBcHeight(
      document.getElementById("combine-table-bc-" + b).getBoundingClientRect()
        .height
    );
    setDlWidth(
      document.getElementById("combine-table-dl-" + b).getBoundingClientRect()
        .width
    );
    setDlHeight(
      document.getElementById("combine-table-dl-" + b).getBoundingClientRect()
        .height
    );
    setBelong(b);
  }, [w, h, b]);

  return (
    <div id={"combine-table-" + b} style={{ width: w, height: h }}>
      <div id={"combine-table-bc-" + b}>
        <BulletChart
          w={bcWidth}
          h={bcHeight}
          divname={"combine-table-bc-" + b}
        />
      </div>
      <div id={"combine-table-dl-" + b}>
        <DetailList
          w={dlWidth}
          h={dlHeight}
          divname={"combine-table-dl-" + b}
        />
      </div>
    </div>
  );
}
