import './App.css';
import {useEffect} from 'react';

// router
import {Routes, Route} from "react-router-dom";

// 数据请求接口
import {helloworld, qone} from './apis/api.js';

// 引入自定义组件
import MainView from './components/main-view';
import SubChart2 from './components/sub-chart2';
// import SubChart from './components/sub-chart';
// 引入问题一的自定义组件


function App() {
  /**
   * 前后端通信的一个例子
   */
  useEffect(()=>{
    qone().then((res)=>console.log(res));
  })

  return (
    <div className="App">
      <Routes>
        <Route key="mainview" path="/" element={<MainView />} />
        <Route key="subchart2" path="/subchart2" element={<SubChart2 />} />
      </Routes>
    </div>
  );
}

export default App;
