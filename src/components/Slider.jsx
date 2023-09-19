import * as React from "react"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import MobileStepper from "@mui/material/MobileStepper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Buttons from "@/components/Buttons"
import "@/styles/slider.module.css"
import { useState } from "react"
import styles from "@/styles/Home.module.css"
import Link from "next/link"

export default function Slider({ movies }) {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = movies.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    transition: "color 0.3s, text-shadow 0.3s",
  }

  const hoverStyle = {
    color: "#Fcff09",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  }

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Card sx={{ maxWidth: "100%", background: "transparent" }}>
        <div className={styles.container}>
          <div className={styles.overlaycontainer}>
            <svg width="100%" height="100%" viewBox="0 0 1730 740">
              <path
                d="M-19 0.5H1732V788.5H-19V0.5Z"
                fill="url(#paint0_linear_13_2461)"
              />
              <defs>
                <linearGradient
                  className={styles.overlayindex}
                  id="paint0_linear_13_2461"
                  x1="674.538"
                  y1="818.999"
                  x2="667.631"
                  y2="37.4997"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0.270833"
                    stop-color="#0D0C0F"
                    stop-opacity="0.85"
                  />
                  <stop
                    offset="0.46875"
                    stop-color="#0D0C0F"
                    stop-opacity="0"
                  />
                  <stop
                    offset="0.682292"
                    stop-color="#0D0C0F"
                    stop-opacity="0.284314"
                  />
                  <stop offset="1" stop-color="#0D0C0F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <CardMedia
            className={styles.slider}
            component="img"
            alt={movies[activeStep].title}
            height="540"
            image={`https://image.tmdb.org/t/p/original${movies[activeStep].backdrop_path}`}
          />
        </div>
        <CardContent className={styles.CardContent}>
          <Link
            href={`/${movies[activeStep].id}`}
            style={linkStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
          >
            <Typography gutterBottom variant="h5" component="div">
              {movies[activeStep].title}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions className={styles.sliderbutton}>
          <Buttons
            btext={
              <div>
                <img src="/play.svg" style={{ marginTop: "10px" }} /> Continue
                Watching
              </div>
            }
          />
          <Button className={styles.button} size="small">
            Watchlist
          </Button>
        </CardActions>
      </Card>
      <MobileStepper
        sx={{ backgroundColor: "transparent" }}
        className={styles.sliderarrows}
        position="static"
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft
                sx={{ fontSize: "120px", color: "white", opacity: 0.2 }}
              />
            ) : (
              <KeyboardArrowRight sx={{ fontSize: "120px", color: "white" }} />
            )}
          </Button>
        }
        backButton={
          <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight sx={{ fontSize: "120px", color: "white" }} />
            ) : (
              <KeyboardArrowLeft sx={{ fontSize: "120px", color: "white" }} />
            )}
          </Button>
        }
      />
    </Box>
  )
}
