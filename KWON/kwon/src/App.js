

import { BrowserRouter, Routes, Route, } from "react-router-dom"; // 

import Home from './pages/Home';  // Dashboard 컴포넌트 임포트
import HomeAdd from './pages/HomeAdd';
import HomeUpdate from './pages/HomeUpdate';
import CardDetail from './pages/CardDetail'; // 새로 추가된 상세 페이지
import Gongji from './pages/Gongji';
import GongjiAdd from './pages/GongjiAdd';
import GongjiUpdate from './pages/GongjiUpdate'
import Register from './pages/Register';
import Login from './pages/Login'
import Board from './pages/Board'
import BoardAdd from './pages/BoardAdd'
import BoardDetail from './pages/BoardDetail'
import BoardUpdate from './pages/BoardUpdate'
import CardAdd from  './pages/CardAdd'
import CardUpdate from './pages/CardUpdate'
import Anime from './pages/Anime'
import Comic from './pages/Comic'
import ComicAdd from './pages/ComicAdd'
import ComicDetail from './pages/ComicDetail'
import ComicUpdate from './pages/ComicUpdate'
import Cart from './pages/Cart'

function App() {
  return (
    <BrowserRouter>     
    <div>
  
    <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/mypage" element={<MyPage />} /> 
          <Route path="/homeadd" element={<HomeAdd />} />
          <Route path="/homeupdate" element={<HomeUpdate />} />
          <Route path="/carddetail/:uuid" element={<CardDetail />} />
          <Route path="/gongji" element={<Gongji />} />
          <Route path="/gongjiadd" element={<GongjiAdd />} />
          <Route path="/gongjiupdate/:gno" element={<GongjiUpdate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/boardadd" element={<BoardAdd />} />
          <Route path="/boarddetail/:boardId" element={<BoardDetail />} />
          <Route path="/boardupdate/:boardId" element={<BoardUpdate />} />
          <Route path="/cardadd/:uuid" element={<CardAdd />} />
          <Route path="/cardupdate/:animeId" element={<CardUpdate />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="/comicadd" element={<ComicAdd />} />
          <Route path="/comicdetail/:uuid" element={<ComicDetail />} />
          <Route path="/comicupdate/:uuid" element={<ComicUpdate />} />
          <Route path="/cart" element={<Cart />} />
        
        </Routes>
  </div>
  </BrowserRouter>
  );
}



// MyPage 컴포넌트
function MyPage() {
  return <h1>MyPage</h1>;
}



export default App;
