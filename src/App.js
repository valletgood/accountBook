import React, { useEffect, useReducer, useState } from 'react';
import Calendar from 'react-calendar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import moment from 'moment';
import './App.css';

import New from './New';
import Home from './Home';

import { dummy } from './util/dummy';
import Setting from './Setting';
import Edit from './Edit';

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
      newState = state.filter((it) => it.dateid !== action.targetDate);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.dateid === action.data.dateid ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState
}


export const moneyStateContext = React.createContext();
export const moneyDateContext = React.createContext();
export const moneyDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, [])

  const [value, onChange] = useState(new Date());

  const [date, setDate] = useState(moment(value).format('YYYY년 MM월 DD일'));

  const [dotDate, setDotDate] = useState()

  // const [itemList, setItemList] = useState([])

  const onCreate = (date, pay, memo, payOption) => {
    dispatch({
      type: 'CREATE', data: {
        dateid: date,
        pay,
        memo,
        payOption
      }
    })
  }

  const onEdit = (targetDate, pay, memo, payOption) => {
    dispatch({
      type: 'EDIT', data: {
        dateid: targetDate,
        pay,
        memo,
        payOption
      }
    })
  }

  const onRemove = (targetDate) => {
    dispatch({
      type: 'REMOVE', targetDate
    })
  }

  useEffect(() => {

    dispatch({ type: 'INIT', data: dummy })

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
                  if (selectDate.length >= 2) {
                    return (<div className='dots'>
                      <div className='dot'></div>
                      <div className='dot_plus'></div>
                    </div>)
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
                <Route path='/Setting' element={<Setting />} />
                <Route path='/Edit' element={<Edit />} />
              </Routes>
            </div>
          </BrowserRouter>
        </moneyDispatchContext.Provider>
      </moneyDateContext.Provider>
    </moneyStateContext.Provider>
  );
}

export default App;
