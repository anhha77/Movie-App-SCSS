import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../lazyLoadimage/Image";
import PosterFallBack from "../../assets/no-poster.png";
import "./style.scss";
import { IMAGE_URL } from "../../app/config";
import CircleRating from "../circleRating/circleRating";
import Genres from "../genres/Genres";

function Carousel({ data, loading, media_type, title }) {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeletonItem = () => (
    <div className="skeleton-item">
      <div className="poster-block skeleton"></div>
      <div className="text-block">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  );
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carousel-title">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carousel-left arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carousel-items" ref={carouselContainer}>
            {data?.results.map((item) => {
              const posterUrl = item.poster_path
                ? `${IMAGE_URL}/${item.poster_path}`
                : PosterFallBack;
              return (
                <div
                  className="carousel-item"
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || media_type}/${item.id}`)
                  }
                >
                  <div className="poster-block">
                    <Image src={posterUrl} />
                    <CircleRating
                      rating={Math.ceil(item.vote_average * 10) / 10}
                    />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="text-block">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading-skeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
