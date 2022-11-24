const MyHeader = (leftBtn, centerBtn, rightBtn) => {
    return (
        <header>
            <div className='left_btn'>
                {leftBtn}
            </div>
            <div className='center_btn'>
                {centerBtn}
            </div>
            <div className='right_btn'>
                {rightBtn}
            </div>
        </header>
    )
}

export default MyHeader