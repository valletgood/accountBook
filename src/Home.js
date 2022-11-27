import React, { useContext, useEffect, useState } from 'react';
import { moneyDateContext, moneyDispatchContext, moneyStateContext } from './App';
import { useNavigate } from 'react-router-dom'
import MyButton from './util/MyButton';


const Home = () => {
    const data = useContext(moneyStateContext)

    const date = useContext(moneyDateContext)

    const [money, setMoney] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        let account = 0;
        const plusMoney = data.filter((it) => it.payOption === 'plus')
        const minusMoney = data.filter((it) => it.payOption === 'minus')
        for (let i = 0; i < plusMoney.length; i++) {
            account = account + parseInt(plusMoney[i].pay)
        }
        for (let i = 0; i < minusMoney.length; i++) {
            account = account - parseInt(minusMoney[i].pay)
        }
        setMoney(account)
    }, [data])

    return (
        <div className='Home'>
            <div className='show_title'>
                <MyButton text={'추가하기'} type={'positive'} onClick={() => navigate('/New')} />
                <span>{date}</span>
                <span> 잔액 : {money}원</span>
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