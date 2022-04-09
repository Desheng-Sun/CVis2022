import './App.css';
import {useEffect} from 'react';

// router
import {Routes, Route} from "react-router-dom";

// 数据请求接口
import {helloworld} from './apis/api.js';

// 引入自定义组件
import MainView from './components/main-view';

function App() {
  /**
   * 前后端通信的一个例子
   */
  useEffect(()=>{
    helloworld().then((res)=>console.log(res));
  })

  return (
    <div className="App">
      <Routes>
        <Route key="mainview" path="/" element={<MainView />} />
      </Routes>
    </div>
  );
}

export default App;
