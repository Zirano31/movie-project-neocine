//poster component
// import Card from "@mui/material/Card"
// import CardActions from "@mui/material/CardActions"
// import CardContent from "@mui/material/CardContent"
// import CardMedia from "@mui/material/CardMedia"
// import Button from "@mui/material/Button"
// import Typography from "@mui/material/Typography"
import * as React from "react"
import SimpleContainer from "./poster_components/SimpleContainer"

export default function Poster({ movie, credits }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`

  const direct = credits && credits.cast
  ? credits.cast.find((member) => member.known_for_department === "Directing")
  : null;
  



  return (
    <>
      <SimpleContainer
        productionCompany={movie.production_companies}
        movie={movie}
        image={imageUrl}
        direc={direct}
      ></SimpleContainer>
    </>
  )
}
