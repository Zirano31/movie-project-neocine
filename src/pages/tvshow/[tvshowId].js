import React from "react"
import Poster from "@/components/singleMovie/Poster"
import { fetcher } from "../../../util/API"
import TrailerActorContainer from "@/components/singleMovie/Container"

export default function ShowPage({ tvshow, credits, trai, similar }) {
  const video = trai.results.find((result) => result)
  const relatedshows = similar.results.map((result) => result)
  return (
    <>
      <Poster movie={tvshow} />
      <br></br>
      <TrailerActorContainer
        relatedMovies={relatedshows}
        actors={credits}
        video={video}
      />
    </>
  )
}

// Define the getServerSideProps function to fetch data for a specific movie
export async function getServerSideProps(context) {
  const { tvshowId } = context.query

  const tvshow = await fetcher(`/tv/${tvshowId}?language=en-US`)
  const credits = await fetcher(`/tv/${tvshowId}/credits?language=en-US`)
  const trailer = await fetcher(`/tv/${tvshowId}/videos?language=en-US`)
  const similar = await fetcher(`/tv/${tvshowId}/similar?language=en-US&page=1`)

  return {
    props: {
      tvshow: tvshow,
      credits: credits,
      trai: trailer,
      similar: similar,
    },
  }
}
