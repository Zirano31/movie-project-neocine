import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import Image from "next/image"
import GernresList from "./GenresList"
import { MoviesList } from "./MoviesList"
import Drawer from "@mui/material/Drawer"
import GenresList from "./GenresList"
import Link from "next/link"
import { useState, useEffect } from "react"
import { fetcher } from "../../util/API"
import { useRouter } from "next/router"
import Cards from "./Cards"
import styles from "@/styles/navbarSearch.module.css"

// search component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

const DrawerWrapper = styled(Box)(({ theme }) => ({
  width: "250px",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "250px",
  },
}))

export default function Navbar({
  movieGenresList,
  movieslist,
  onSearch,
  onGenreSelect,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState([])
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedGenre, setSelectedGenre] = React.useState(null)
  const [selectedGenreId, setSelectedGenreId] = useState(null)
  const [genresMovie, setGenresMovie] = useState(null)
  const router = useRouter()

  const navigateToMovies = () => {
    setTimeout(() => {
      router.push("/movies")
    }, 5000)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher("genre/movie/list?language=en")
      setGenresMovie(response)
    }

    fetchData()
  }, [])

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId)
    router.push(`/movies?genre=${genreId}`)
    console.log("genre in navbar is ", genreId)
  }

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
    }

    const results = await onSearch(searchQuery)
    setSearchResults(results)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: "black",
          display: "flex",
          alignItems: "space-between",
        }}
      >
        <Toolbar>
          <div>
            <Link href="/">
              <Image
                src="/../../logo.svg"
                layout="responsive"
                width={100}
                height={100}
                alt="NeoCine Logo"
              />
            </Link>
          </div>
          <div style={{ display: "flex", flex: "1", justifyContent: "center" }}>
            <HomeBtn />

            <GenresList
              Genres={genresMovie}
              tag={"Genres"}
              onGenreSelect={handleGenreSelect}
            />

            <MoviesList />
            <Tvshowbutton />

            <ActorsBtn />
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
          </Search>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          ></StyledMenu>
        </Toolbar>
      </AppBar>
      <DrawerWrapper>
        <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
          <div
            role="presentation"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
            className={styles.drawerContainer}
          >
            <h2 className={styles.searchTitle}>Search Results:</h2>
            <ul className={styles.movieListContainer}>
              {searchResults.map((result) => (
                <>
                  <li key={result.id} className={styles.movieItem}>
                    <Link href={`/${result.id}`} className={styles.movieLink}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                        alt={result.title}
                        className={styles.movieImage}
                      />

                      <p className={styles.movietitle}>{result.title}</p>

                      <p className={styles.releaseDate}>
                        {result.release_date}
                      </p>
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </Drawer>
      </DrawerWrapper>
    </Box>
  )
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))

export function Tvshowbutton() {
  return (
    <div>
      <Link href="/tvshow">
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: "black",
            "&:hover": {
              backgroundColor: "#F5C518",
              color: "white",
            },
          }}
        >
          Tvshow
        </Button>
      </Link>
    </div>
  )
}
export function ActorsBtn() {
  return (
    <div>
      <Link href="/actor">
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: "black",
            "&:hover": {
              backgroundColor: "#F5C518",
              color: "white",
            },
          }}
        >
          Actors
        </Button>
      </Link>
    </div>
  )
}
export function HomeBtn() {
  return (
    <div>
      <Link href="/">
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: "black",
            "&:hover": {
              backgroundColor: "#F5C518",
              color: "white",
            },
          }}
        >
          home
        </Button>
      </Link>
    </div>
  )
}
