import React from "react"
import Poster from "@/components/singleMovie/Poster"
import { fetcher } from "../../util/API"
import TrailerActorContainer from "@/components/singleMovie/Container"

export default function MoviePage({ movie, credits, trailer, similar }) {
  const video = trailer.results.find((result) => result)
  const relatedMovies = similar.results.map((result) => result)
  return (
    <>
      <Poster movie={movie} credits={credits} />
      <br></br>
      <TrailerActorContainer
        relatedMovies={relatedMovies}
        actors={credits}
        video={video.key}
      />
    </>
  )
}

// Define the getServerSideProps function to fetch data for a specific movie
export async function getServerSideProps(context) {
  const { movieId } = context.query

  const movie = await fetcher(`/movie/${movieId}?language=en-US`)
  const credits = await fetcher(`/movie/${movieId}/credits?language=en-US`)
  const trailer = await fetcher(`/movie/${movieId}/videos?language=en-US`)
  const similar = await fetcher(
    `/movie/${movieId}/similar?language=en-US&page=1`,
  )

  return {
    props: {
      movie: movie,
      credits: credits,
      trailer: trailer,
      similar: similar,
    },
  }
}
