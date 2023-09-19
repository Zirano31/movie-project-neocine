import * as React from "react"
import BasicRating from "../BasicRating"
import Buttons from "@/components/Buttons"
import Image from "next/image"
import styles from "@/styles/Single.module.css"
import Container from "@/components/singleMovie/Container"

export default function SimpleContainer({
  movie,
  image,
  productionCompany,
  direc,
}) {
 
  return (
    <React.Fragment>
      <div
        className="simpleContainer"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          borderRadius: 25,
          height: "30rem",
        }}
      >
        <div className="parent">
          <div className="grid-item content">
            <h1>{movie.title || movie.name}</h1>
            <BasicRating movie={movie} />
            <p>{movie.overview}</p> <br />
            <div>
              {" "}
              <h3>Director:</h3>
              <p>{direc ? direc.name : "Not available"}</p>
            </div>{" "}
            <br />
            <b> Release date :</b> {movie.release_date} <br /> <b> language:</b>{" "}
            {movie.original_language}{" "}
          </div>
          <div className="grid-item poster">
            <img src={image} alt="Actor Image" id="movie-image" />
          </div>
          <div className="grid-item">
            <Buttons className="watch" href="#video" btext="watch trailer">
              {" "}
            </Buttons>
          </div>
          <div className="grid-item">
            <strong>Production companies: </strong> <br />
            {productionCompany.map((company) => (
              <div style={{ display: "inline-block" }} key={company.id}>
                {" "}
                <pre>
                  <span>{company.name}</span>{" "}
                </pre>
                <img
                  style={{ maxWidth: "20px" }}
                  src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                  alt="logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
