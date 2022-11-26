import React, { useContext, useState, useEffect } from 'react';
import { moneyDateContext, moneyDispatchContext, moneyStateContext } from './App';
import { useNavigate } from 'react-router-dom'
import MyButton from './util/MyButton';


const Home = () => {
    const data = useContext(moneyStateContext)

    const date = useContext(moneyDateContext)

    const { onRemove } = useContext(moneyDispatchContext)

    const navigate = useNavigate()

    const handleRemove = () => {
        const handleItem = data.filter((it) => it.dateid === date)
        if (handleItem.length >= 1) {
            if (window.confirm(`정말 ${date}의 기록을 삭제하시겠습니까?`)) {
                onRemove(date)
            }
        } else {
            alert('존재하는 기록이 없습니다.')
        }
    }

    console.log(data)
    console.log(date)

    return (
        <div className='Home'>

            <div className='show_date'>{date}</div>
            {data.map((it) => it.dateid === date ?
                <div className='show_content'>
                    <p>{it.payOption === 'plus' ? '소득 : ' : '소비 : '}{it.memo} <br />{it.pay + '원'}</p>
                </div>
                :
                null)}
            <div className='Home_btn'>
                <MyButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />
                <MyButton text={'설정'} onClick={() => navigate('/Setting')} />
                <MyButton text={'수정하기'} onClick={() => navigate('/Edit')} />
                <MyButton text={'추가하기'} type={'positive'} onClick={() => navigate('/New')} />
            </div>
        </div>
    )
}

export default Home;