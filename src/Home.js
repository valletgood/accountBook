import React, { useContext, useEffect, useState } from 'react';
import { moneyDateContext, moneyStateContext } from './App';
import { useNavigate } from 'react-router-dom'
import MyButton from './util/MyButton';
import moment from 'moment';


const Home = () => {
    const data = useContext(moneyStateContext)

    const date = useContext(moneyDateContext)

    const [money, setMoney] = useState()

    const navigate = useNavigate()

    const [curDate, setCurDate] = useState(new Date())

    //!---- 현재 날짜 기준으로 잔액이 얼마인지 계산

    useEffect(() => {

        if (data) {
            const firstDay = moment(new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            )).format('YYYY년 MM월 DD일')
            const lastDay = moment(new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1, 0,
                23, 59, 59
            )).format("YYYY년 MM월 DD일")
            let account = 0;
            const plusMoney = data.filter((it) => it.payOption === 'plus' && it.dateid >= firstDay && it.dateid <= lastDay)
            const minusMoney = data.filter((it) => it.payOption === 'minus' && it.dateid >= firstDay && it.dateid <= lastDay)
            for (let i = 0; i < plusMoney.length; i++) {
                account = account + parseInt(plusMoney[i].pay)
            }
            for (let i = 0; i < minusMoney.length; i++) {
                account = account - parseInt(minusMoney[i].pay)
            }
            setMoney(account)

        }
    }, [data, curDate])

    return (
        <div className='Home'>
            <div className='show_title'>
                <MyButton text={'추가하기'} type={'positive'} onClick={() => navigate('/New')} />
                <span>{date}</span>
                <span> 이번 달 : {money}원</span>
            </div>
            <div className='show_box'>
                {data.map((it) => it.dateid === date ?
                    <div className='show_content'>
                        <p>{it.payOption === 'plus' ? '소득 : ' : '소비 : '}{it.memo} <br />{it.pay + '원'}</p>
                        <MyButton text={'수정하기'} onClick={() => navigate(`/Edit/${it.itemNo}`)} />
                    </div>
                    :
                    null)}
            </div>
        </div>
    )
}

export default Home;