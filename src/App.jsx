import { useState } from 'react'
import './App.css'

const App = () => {
  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [count, setCount] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [detailTitle, setDetailTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');
  let [date, setDate] = useState(['2025년 02월 10일', '2025년 02월 11일', '2025년 02월 12일']);


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}년 ${month}월 ${day}일`;
  };

  // state 를 사용하는 이유?
  // 변동시 자동으로 html에 반영되게 만들고 싶을때(리랜더링)

  const click = (index) => {
    let countCopy = [...count];
    countCopy[index] = countCopy[index] + 1;
    setCount(countCopy);
  };
  
  const testing = (e) => {
    setInputValue(e.target.value);
  };

  const create = () => {
    let newTitle = [...title];
    newTitle.push(inputValue);
    setTitle(newTitle);

    let newCount = [...count];
    newCount.push(0);
    setCount(newCount);

    let newDate = [...date];
    newDate.push(getCurrentDate());
    setDate(newDate);
  };

  const handleDelete = (index) => {
    let newTitle = [...title];
    newTitle = newTitle.filter((item) => 
      item !== newTitle[index]
    );
    setTitle(newTitle);
  };

  const viewDetail = (index) => {
    setModal(!modal);
    setDetailTitle(index);
  };
  
  return (
    <div className='App'>
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>
      {
        title.map((a, i) => {
          return (
            <div className='list' key={i}>
              <h4 onClick={() => viewDetail(i)}>{a}
              {/* <span onClick={(e) => click(i) }>👍</span> */}
              <span onClick={(e) => { e.stopPropagation(); click(i);}}>👍</span>
              { count[i] }
              <button onClick={(e) => {e.stopPropagation(); handleDelete(i);}} style={{marginLeft: '5px', backgroundColor: 'red'}} >삭제</button>
              </h4>
              <p>{ date[i] } 발행</p>
            </div>
          ) 
        })
      }

      {
        modal === true ? <Modal title={title} setTitle={setTitle} detailTitle={detailTitle} /> : null
      }
      <div style={{marginTop: '20px'}}>
        <input onChange={(e) => testing(e)} />
        <button onClick={() => create()} style={{marginLeft: '10px'}}>글쓰기</button>
      </div>
    </div>
  )
}

const Modal = (props) => {
  let [modify, setModify] = useState(false);
  let [modifyInputTitleValue, setModifyInputTitleValue] = useState('');

  const finish = () => {
    let newTitle = [...props.title];
    newTitle[props.detailTitle] = modifyInputTitleValue; // props.detailTitle = 수정할 글의 인덱스
    props.setTitle(newTitle);
    setModify(false); // 수정 완료 후 수정 모드 해제
  };

  const clickModify = () => {
    setModify(!modify);
  };

  const handleTitleInput = (e) => {
    setModifyInputTitleValue(e.target.value);
  };

  return (
    <div className='modal'>
      {
        modify === false ?
      <h4>{ props.title[props.detailTitle] }</h4> :
      <input placeholder='제목을 입력해주세요' onChange={(e) => handleTitleInput(e)} />
      }
      <p>날짜</p>
      <p>상세내용</p>
      {/* <button onClick={() => changeTitle()}>글수정</button> */}
      {
        modify === false ?
        <button onClick={() => clickModify()}>글수정</button> :
        <div>
          <button onClick={() => finish()}>수정완료</button>
          <button style={{marginLeft: '10px'}} onClick={() => clickModify()}>취소</button>
        </div>
      }
    </div>
  )
};

export default App
