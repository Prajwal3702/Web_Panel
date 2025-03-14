import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import TopRated from "./Components/TopRated/Toprated.jsx";
import Upcoming from "./Components/Upcoming/Upcoming.jsx";
import Search from "./Components/Search/Search.jsx";
import MovieDetail from "./Components/MovieDetail/MovieDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
