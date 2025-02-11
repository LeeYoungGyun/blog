import { useState } from 'react'
import './App.css'

const App = () => {
  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [count, setCount] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [detailTitle, setDetailTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');


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
  };

  const handleDelete = (index) => {
    let newTitle = [...title];
    newTitle = newTitle.filter((item) => 
      item !== newTitle[index]
    );
    setTitle(newTitle);
  };


  
  // const changeOrder = () => {
  //   let copy = [...a];
  //   setTitle(copy.sort());
  // };

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
              
              <p>2월 17일 발행</p>
            </div>
          ) 
        })
      }

      {
        modal === true ? <Modal title={title} setTitle={setTitle} detailTitle={detailTitle} /> : null
      }
      <input onChange={(e) => testing(e)} />
      <button onClick={() => create()} style={{marginLeft: '10px'}}>글쓰기</button>
    </div>
  )
}

const Modal = (props) => {

  const changeTitle = () => {
    props.setTitle(['여자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  };
  return (
    <div className='modal'>
      <h4>{ props.title[props.detailTitle] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => changeTitle()}>글수정</button>
    </div>
  )
};

export default App
