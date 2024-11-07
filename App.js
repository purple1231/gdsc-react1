//이 코드는 리액트 강의 7번까지


import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function WebHeader(props)
{

  console.log(props.title);
  return (
    <header>
      <h1><a href='/' onClick={(event) => //화살표 함수 적용!
        {
          event.preventDefault();
          if (props.onChangeMod) {
            props.onChangeMod(); // props의 함수가 정의되어 있는 경우에만 호출
          } else {
            console.log("props파라미터에 onchangeMod함수가 정의되어 있지 않아냥.");
          }
        }
      }>{props.title}</a></h1>
    </header>
  );
  //중괄호랑 중괄호 사이에 있는 문자열은 표현식으로 저장되기 때문에 그 본연의 값을 음미음미할 수 있다
}









//------------------------------------------------------------------------------------------------------------------------네비게이션 ----
function Nav(props)//topics 배열 받아옴
{
  const lis = []
  for(let i = 0; i < props.topics.length; i++)
  {
    let t = props.topics[i];//받아온 배열 뜻하는거임
    lis.push
    (
      <li key ={t.id}>

        <a id = {t.id} href = {"/read"+t.id} onClick={function(event)
        {
          event.preventDefault();
          props.onChangeMod(event.target.id); //그냥 t.id 해도 되는데..
        }
        }>{t.title}</a>

      </li>
    );//리액트는 자동으로 생성한 키워드는 추적되는게 근거되는 KEY를 써줘야함
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
//---------------------------------------------------------------------------------------------------------------------아티클










}
function Article(props)
{
  return (
    <article>
      <h2>{props.title}</h2><p>
      </p>
      {props.body}
      
    </article>

  );
}











//---------------------------------------------------------------------------------------------------------------------앱

function App() {

  const _mode = useState("welcome"); 
  // 위에 import 한거 보면 알겠지만 이건 상태를 쓴다는 거다 원래 정적이어서 밑에서 값 바꿔도 업데이트가 되지 않는다. 
  //다시 app함수가 실행되지 않기 떄문 하지만 useState를 사용함으로서 이건 가능해지게 되었다는 거시다.
  //useState쓰면 배열이 값이 되는데 0번째: 본연의 값, 1번째: 그 값을 바꿀 떄 사용하는 함수
  const mode = _mode[0];
  const setmode = _mode[1];

  //이는 아래와 같이 단순화할 수 있다.
  const [mode2, setmode2] = useState("welcome");
  const [id, setid] = useState(null);

  const topics = [
    {id:1, title:"html", body:"html is monster"},
    {id:2, title:"css", body:"css is best weapone"},
    {id:3, title:"js", body:"js is the king"}
  ]//실행되는 앱 함수 안에 토픽스 객체를 배열로 넣은 후 이걸 이제 Nav로 이동시킬거임 ㅅㄱ

  let content = null;
  if (mode2 === "welcome")
  {
    content = <Article title = "welcome" body = "환영해d요"></Article>
  }
  else if (mode2 === "read")//만약 리스트들을 클릭하면 mode2가 read로 바뀌겠지 그리고 나서...
  {
    let title, body = null;

    for(let i = 0; i < topics.length; i++)
    {
      if(topics[i].id === Number(id))
      {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title = {title} body = {body}></Article>
  }
  else if (mode2 === "react!!")
    {
      content = <Article title = "리액트" body = "읽습니다"></Article>
    }


















  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <WebHeader title = "React" onChangeMod = {
        function()
        {
          alert("당신은 리액트 버튼을 눌렀어용 ㅎㅎ");
          setmode2("react!!");
        }

      }></WebHeader>
      <WebHeader title = "깠진우" onChangeMod = {
        function()
        {
          alert("header");
          
        }

      }></WebHeader>
      <WebHeader title = "아카라이브"></WebHeader>
      <WebHeader title = "딥웹케인"></WebHeader>



      <Nav topics = {topics} onChangeMod = {
        function(_id)
        {
          alert(_id);  
          //mode = "read";   //이러면 아무일 안일어난다. 값을 바꿀 땐 setMode만이 동적으로 위의 변수를 변화시킨다.
          setmode2("read");
          setid(_id); // id는 topics라는 위에서 정의한 객체에서의 상수이다.

        }
      }></Nav>



      {content}
      
      




    </div>
    //리액트 자기가 만든 태그:컴포넌트s

  );
}

export default App;
