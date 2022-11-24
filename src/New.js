import { useContext, useRef, useState } from 'react'
import { moneyDateContext, moneyDispatchContext } from './App'
import MyButton from './util/MyButton'
import { useNavigate } from 'react-router-dom'

const New = () => {
    const date = useContext(moneyDateContext)

    const { onCreate } = useContext(moneyDispatchContext)

    const navigate = useNavigate()

    const memoRef = useRef();

    const payRef = useRef();

    const [memo, setMemo] = useState('');

    const [pay, setPay] = useState('');

    const [payOption, setPayOption] = useState('');

    const handleCreate = () => {
        if (memo.length < 1) {
            memoRef.current.focus();
            return;
        } else if (pay.length < 1) {
            payRef.current.focus();
            return;
        } else {
            const regex = /[^0-9]/g;
            const result = pay.replace(regex, "");
            const changePay = parseInt(result);
            onCreate(date, changePay, memo, payOption)
            alert('저장이 완료되었습니다.')
        }
        navigate('/', { replace: true })
    }
    return (
        <div className='New'>
            <p>{date}의 기록 추가
                <select value={payOption} onChange={(e) => setPayOption(e.target.value)}>
                    <option value=''>-----</option>
                    <option value='minus'>소비</option>
                    <option value='plus'>소득</option>
                </select>
            </p>
            <p>
                <input ref={memoRef} type='text' value={memo} onChange={(e) => setMemo(e.target.value)} placeholder='메모를 입력해주세요!' />
            </p>
            <p>
                <input ref={payRef} type='text' value={pay} onChange={(e) => setPay(e.target.value)} placeholder='금액을 입력해주세요!' />
            </p>
            <MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />
            <MyButton text={'추가하기'} type={'positive'} onClick={handleCreate} />
        </div>
    )
}

export default New