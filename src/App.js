import {Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

//components
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ListPage from "./pages/List";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderDetail from "./pages/ViewOrderDetail";

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/book/list" element={<ListPage/>}/>
        <Route path="/book/view/:bookId" element={<Detail/>}/>
        <Route path="/book/orders" element={<ViewOrders/>}/>
        <Route path="/books/orders/:bookId" element={<ViewOrderDetail/>}/>
      </Routes>
      <MyFooter/>
    </div>
  );
}

export default App;
