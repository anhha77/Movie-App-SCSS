import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
function Similar({ mediaType, id }) {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "movie" ? "Similar Movies" : "Similar TV Shows";

  if (data?.results.length === 0) return;

  return (
    <Carousel
      data={data}
      media_type={mediaType}
      loading={loading}
      title={title}
    />
  );
}

export default Similar;
