import React, { useRef } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Image from "../../../components/lazyLoadimage/Image";
import avatar from "../../../assets/avatar.png";
import { IMAGE_URL } from "../../../app/config";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function Cast({ data, loading }) {
  const skeleton = () => (
    <div className="skeleton-item">
      <div className="circle skeleton"></div>
      <div className="row skeleton"></div>
      <div className="row2 skeleton"></div>
    </div>
  );

  const castContainer = useRef();

  const navigation = (direction) => {
    const container = castContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 22)
        : container.scrollLeft + (container.offsetWidth + 22);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="cast-section">
      <ContentWrapper>
        <div className="section-heading">Top Cast</div>
        <BsFillArrowLeftCircleFill
          className="carousel-left arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="list-items" ref={castContainer}>
            {data?.map((item) => (
              <div className="list-item" key={item.id}>
                <div className="profile-img">
                  <Image
                    src={`${
                      item?.profile_path
                        ? `${IMAGE_URL}${item?.profile_path}`
                        : avatar
                    }`}
                  />
                </div>
                <div className="name">{item.name}</div>
                <div className="character">{item.character}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cast-skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Cast;
