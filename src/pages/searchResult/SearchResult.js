import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import Card from "../../components/card/Card";

import "./style.scss";
import { setPageSearch } from "../../features/homeSlice";
import { useDispatch, useSelector } from "react-redux";

function SearchResult() {
  const [data, setData] = useState([]);
  // const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const { query } = useParams();
  const dispatch = useDispatch();
  const { pageSearch } = useSelector((state) => state.home);

  const { data: searchResult } = useFetch(
    `/search/multi?query=${query}`,
    pageSearch
  );

  useEffect(() => {
    if (searchResult) {
      setLoading(true);
      if (pageSearch === 1) {
        setData([...searchResult.results]);
      } else {
        setData([...data, ...searchResult.results]);
      }
      setTotalPages(searchResult.total_pages);
      setTotalResults(searchResult.total_results);
    }
    setLoading(false);
  }, [query, searchResult]);

  return (
    <div className="search-results-page">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {totalResults ? (
            <>
              <div className="page-title">
                {`Search ${
                  totalResults > 1
                    ? `${totalResults} results`
                    : `${totalResults} result`
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data.length || []}
                next={() => dispatch(setPageSearch(pageSearch + 1))}
                hasMore={pageSearch <= totalPages}
                loader={<Spinner />}
              >
                {data.map((item, index) => {
                  if (item.media_type === "person") return;
                  return <Card key={index} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="result-not-found">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}

export default SearchResult;
