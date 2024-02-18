import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenresAndSortByFilter,
  setPageExplore,
} from "../../features/homeSlice";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { mediaType } = useParams();
  const { pageExplore, genresAndSortByFilter } = useSelector(
    (state) => state.home
  );

  const dispatch = useDispatch();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const { data: exploreResult } = useFetch(
    `/discover/${mediaType}`,
    pageExplore,
    genresAndSortByFilter?.genres,
    genresAndSortByFilter?.sort_by
  );

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        const genresFilter = selectedItems.map((item) => item.id);
        filters.with_genres = genresFilter;
      } else {
        delete filters.with_genres;
      }
    }
    dispatch(
      getGenresAndSortByFilter({
        genres: filters.with_genres,
        sort_by: filters.sort_by,
      })
    );

    dispatch(setPageExplore(1));
  };

  useEffect(() => {
    if (exploreResult) {
      setLoading(true);
      if (pageExplore === 1) {
        setData([...exploreResult.results]);
      } else {
        setData([...data, ...exploreResult.results]);
      }
      setTotalPages(exploreResult.total_pages);
    }
    setLoading(false);
  }, [genre, sortBy, exploreResult]);

  useEffect(() => {
    filters = {};
    setData(null);
    dispatch(setPageExplore(1));
    setSortBy(null);
    setGenre(null);
  }, [mediaType]);

  return (
    <div className="explore-page">
      <ContentWrapper>
        <div className="page-header">
          <div className="page-title">
            {mediaType === "movie" ? "Explore Movies" : "Explore TV Shows"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select Genres"
              className="react-select-container genres"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortBy}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortby"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            <InfiniteScroll
              className="content"
              dataLength={data?.length || []}
              next={() => dispatch(setPageExplore(pageExplore + 1))}
              hasMore={pageExplore <= totalPages}
              loader={<Spinner />}
            >
              {data?.map((item, index) => {
                if (item.media_type === "person") return;
                return <Card key={index} data={item} mediaType={mediaType} />;
              })}
            </InfiniteScroll>
          </>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Explore;
