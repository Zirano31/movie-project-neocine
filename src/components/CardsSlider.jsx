import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Buttons from "@/components/Buttons"
import "@/styles/slider.module.css"
import Image from "next/image"
import Cards from "@/components/Cards"
import SmallCards from "@/components/SmallCards"

export default function CardsSlider({ movies }) {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const itemsPerRow = 5
  const maxSteps = Math.ceil(movies.length / itemsPerRow)
  const [loading, setLoading] = useState(true)

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, maxSteps - 1),
    )
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0))
  }

  const startIndex = activeStep * itemsPerRow
  const endIndex = Math.min(startIndex + itemsPerRow, movies.length)
  const displayedMovies = movies.slice(startIndex, endIndex)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, display: "flex", gap: "10px" }}>
      <MobileStepper
        sx={{ backgroundColor: "transparent" }}
        className="smallSliderArrow"
        position="static"
        nextButton={
          <Button size="small" onClick={handleNext}>
            <KeyboardArrowRight sx={{ fontSize: "4rem", color: "white" }} />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            <KeyboardArrowLeft sx={{ fontSize: "4rem", color: "white" }} />
          </Button>
        }
      />
      <div className="slider-container">
        {loading ? (
          <SmallCards loading={loading} />
        ) : (
          displayedMovies.map((movie, index) => (
            <div className="slider-item" key={index}>
              <SmallCards {...movie} />
            </div>
          ))
        )}
      </div>
    </Box>
  )
}
