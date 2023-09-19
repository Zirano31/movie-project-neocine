import * as React from "react"
import SizeAvatars from "@/components/singleMovie/actorAvatar"
import Moviecards from "./similarMovies"
import styles from "@/styles/Home.module.css"
import CardsSlider from "@/components/CardsSlider"

export default function TrailerActorContainer({
  relatedMovies,
  actors,
  video = "",
}) {
  const array1 = actors.cast.slice(0, 5)
  const array2 = relatedMovies.slice(0, 20)
  
  return (
    <>
      <div className="bgBox"></div>
      <div className="trailer_actor_Container">
        <div>
          <h2 className="trailerTitle">Trailer:</h2>
          <iframe
            id="video"
            src={`https://www.youtube.com/embed/${video}`}
            style={{ borderRadius: "5%" }}
            allowFullScreen
          ></iframe>
        </div>

        <div className="five_actors_container">
          <h2 className="ActorsTitle">Actors:</h2>
          <SizeAvatars className="actorCard" array={array1}></SizeAvatars>
        </div>
      </div>

      <div className="cardContainer">
        <h2>Similar:</h2>
        <CardsSlider className="MoviepageSlider" movies={array2} />
      </div>
    </>
  )
}
