import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import styles from "@/styles/cards.module.css"

export default function Cards({
  name,
  title,
  overview,
  poster_path,
  release_date,
  popularity,
}) {
  const images = `https://image.tmdb.org/t/p/original${poster_path}`

  return (
    <Card className={styles.container}>
      <CardMedia
        component="img"
        alt={title}
        image={images}
        className={styles.imagesStyles}
      />
      <CardContent className={styles.textStyles}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={styles.titleStyles}
        >
          <h4>{title || name}</h4>
          <h6>{release_date}</h6>
        </Typography>
        <Typography variant="body2" className={styles.overviewStyles}>
          {overview}
        </Typography>
        <Typography
          variant="body2"
          className={styles.overviewStyles}
          sx={{ fontSize: "1.5rem" }}
        >
          Popularity: {popularity}
        </Typography>
      </CardContent>
    </Card>
  )
}
