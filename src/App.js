import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Detail from "./pages/details/Detail";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { useDispatch } from "react-redux";
import useFetch from "./hooks/useFetch";
import { getGenres } from "./features/homeSlice";

function App() {
  let allGenres = {};
  let results = {};
  let genresMovie = "";
  let genresTV = "";
  const dispatch = useDispatch();
  genresMovie = useFetch(`/genre/movie/list`);
  results["movie"] = genresMovie?.data?.genres;
  genresTV = useFetch(`genre/tv/list`);
  results["tv"] = genresTV?.data?.genres;

  if (results.movie) {
    results.movie.forEach((item) => (allGenres[item.id] = item));
  }
  if (results.tv) {
    results.tv.forEach((item) => (allGenres[item.id] = item));
  }

  dispatch(getGenres({ ...allGenres }));
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
