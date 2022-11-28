import React, { useEffect, useReducer, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calendar from 'react-calendar';
import './App.css';
import New from './New';
import Home from './Home';
import Edit from './Edit';
import moment from 'moment';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.itemNo !== action.targetID);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.itemNo === action.data.itemNo ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('money', JSON.stringify(newState))
  return newState
}

export const moneyStateContext = React.createContext();
export const moneyDateContext = React.createContext();
export const moneyDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, [])

  const [value, onChange] = useState(new Date());

  const [date, setDate] = useState(moment(value).format('YYYY년 MM월 DD일'));

  const dataID = useRef(0)

  const onCreate = (date, pay, memo, payOption) => {
    dispatch({
      type: 'CREATE', data: {
        itemNo: dataID.current,
        dateid: date,
        pay,
        memo,
        payOption
      }
    })
    dataID.current += 1;
  }

  const onEdit = (targetID, pay, memo, payOption) => {
    dispatch({
      type: 'EDIT', data: {
        itemNo: targetID,
        dateid: date,
        pay,
        memo,
        payOption
      }
    })
  }

  const onRemove = (targetID) => {
    dispatch({
      type: 'REMOVE', targetID
    })
  }

  useEffect(() => {

    const localData = localStorage.getItem('money');
    if (localData) {
      const moneyList = JSON.parse(localData).sort((a, b) => parseInt(b.itemNo) - parseInt(a.itemNo))
      if (moneyList.length >= 1) {
        dataID.current = parseInt(moneyList[0].id + 1)
        dispatch({ type: "INIT", data: moneyList })
      }
    }

  }, [])
  return (
    <moneyStateContext.Provider value={data}>
      <moneyDateContext.Provider value={date}>
        <moneyDispatchContext.Provider value={{ onCreate, onEdit, onRemove }} >
          <BrowserRouter>
            <div className="App">
              <div className='head_color'>
                <div className='head_color1'>
                  <div id='circle1'></div>
                  소득
                </div>
                <div className='head_color2'>
                  <div id='circle2'></div>소비
                </div>
                <div className='head_color3'>
                  <div id='circle3'></div>오늘
                </div>
              </div>
              <Calendar
                value={value}
                onChange={(value, event) => setDate(moment(value).format('YYYY년 MM월 DD일'))}
                tileContent={({ date, view }) => {
                  const selectDate = data.filter((it) => it.dateid === moment(date).format("YYYY년 MM월 DD일"))

                  //!--- 해당 날짜의 기록이 2개 이상인 경우 dotNo 카운트를 이용해 그 날에 소비와 소득이 같이 기록되면 각각의 원을, 
                  // 같은 옵션이면 하나의 원만 나오도록 설정
                  if (selectDate.length >= 2) {
                    let dotNo = 0;
                    for (let i = 0; i < selectDate.length; i++) {
                      if (selectDate[i].payOption === 'plus') {
                        dotNo += 1;
                      }
                    }
                    if (dotNo === 0) {
                      return (<div className='dot'></div>)
                    } else if (dotNo === selectDate.length) {
                      return (<div className='dot_plus'></div>)
                    } else {
                      return (<div className='dots'>
                        <div className='dot'></div>
                        <div className='dot_plus'></div>
                      </div>)
                    }
                    //아래는 기록이 한개씩만 있을 때 옵션을 비교해 해당하는 원을 출력
                  } else if (data.find((it) => it.dateid === moment(date).format("YYYY년 MM월 DD일") && it.payOption === 'minus')) {
                    return (<div className='dot'></div>)
                  } else if (data.find((it) => it.dateid === moment(date).format("YYYY년 MM월 DD일") && it.payOption === 'plus')) {
                    return (<div className='dot_plus'></div>)
                  }
                }
                }
              />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/New' element={<New />} />
                <Route path='/Edit/:itemNo' element={<Edit />} />
              </Routes>
            </div>
          </BrowserRouter>
        </moneyDispatchContext.Provider>
      </moneyDateContext.Provider>
    </moneyStateContext.Provider>
  );
}

export default App;
