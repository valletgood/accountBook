import { useContext, useState, useEffect, useRef } from 'react';
import { moneyDateContext, moneyDispatchContext, moneyStateContext } from './App';
import { useNavigate } from 'react-router-dom'
import MyButton from './util/MyButton';

const Edit = () => {
    const data = useContext(moneyStateContext)

    const date = useContext(moneyDateContext)

    const { onEdit } = useContext(moneyDispatchContext)

    const navigate = useNavigate()

    const memoRef = useRef();

    const payRef = useRef();

    const [memo, setMemo] = useState('');

    const [pay, setPay] = useState('');

    const [payOption, setPayOption] = useState('');

    const handleEdit = () => {
        if (memo.length < 1) {
            memoRef.current.focus();
            return;
        } else if (pay.length < 1) {
            payRef.current.focus();
            return;
        } else {
            if (pay.type == String) {
                const regex = /[^0-9]/g;
                const result = pay.replace(regex, "");
                const changePay = parseInt(result);
                onEdit(date, changePay, memo, payOption)
                alert('수정이 완료되었습니다.')
            } else {
                onEdit(date, pay, memo, payOption)
                alert('수정이 완료되었습니다.')
            }
        }
        navigate('/', { replace: true })
    }

    useEffect(() => {
        if (data) {
            const originData = data.filter((it) => it.dateid === date)
            if (originData.length >= 1) {
                setMemo(originData[0].memo)
                setPay(originData[0].pay)
                setPayOption(originData[0].payOption)
            } else {
                if (window.confirm('이벤트가 없습니다. 새로 추가하시겠습니까?')) {
                    navigate('/New', { replace: true })
                } else {
                    alert('홈 화면으로 이동합니다.')
                    navigate('/', { replace: true })
                }
            }
        }
    }, [date])


    return (
        <div className='Edit'>
            <p>{date}의 기록 수정
                <select value={payOption} onChange={(e) => setPayOption(e.target.value)}>
                    <option value=''>-----</option>
                    <option value='minus'>소비</option>
                    <option value='plus'>소득</option>
                </select>
            </p>
            <p>
                <input ref={memoRef} type='text' value={memo} onChange={(e) => setMemo(e.target.value)} />
            </p>
            <p>
                <input ref={payRef} type='number' value={pay} onChange={(e) => setPay(e.target.value)} />
            </p>
            <MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />
            <MyButton text={'수정하기'} type={'positive'} onClick={handleEdit} />
        </div>
    )
}

export default Edit;