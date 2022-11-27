import React, { useContext } from 'react';
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
            <div className='show_date'>
                <MyButton text={'설정'} onClick={() => navigate('/Setting')} />
                {date}
                <MyButton text={'추가하기'} type={'positive'} onClick={() => navigate('/New')} />
            </div>
            <div className='show_box'>
                {data.map((it) => it.dateid === date ?
                    <div className='show_content'>
                        <p>{it.payOption === 'plus' ? '소득 : ' : '소비 : '}{it.memo} <br />{it.pay + '원'}</p>
                        <MyButton text={'수정하기'} onClick={() => navigate(`/Edit/${it.itemNo}`)} />
                        <MyButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />
                    </div>
                    :
                    null)}
            </div>
        </div>
    )
}

export default Home;