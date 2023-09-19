import { Grid } from "@mui/material"
import { fetcher } from "../../../util/API"
import Cards from "@/components/Cards"
import Link from "next/link"
import styles from "@/styles/tvshow.module.css"
import SearchBar from "@/components/Searchbar"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const tvshow = ({ latestMovie, selectedGenre }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()
  const { genre, search, list } = router.query

  const [tvshow, settvshow] = useState([])

  const handleSearch = async (searchTerm) => {
    const defaultApiRoute = `search/movie?query=${searchTerm}&include_adult=false&language=en-US`

    const apiRoute = genre
      ? `search/movie?query=${searchTerm}&include_adult=false&language=en-US&with_genres=${genre}`
      : defaultApiRoute

    const data = await fetcher(apiRoute)
    setSearchResults(data.results)
  }

  const fetchtvshowByList = async (movieList) => {
    try {
      const apiRoute = `/movie/${movieList}?language=en-US`
      const data = await fetcher(apiRoute)
      settvshow(data.results)
    } catch (error) {
      console.error("Error fetching tvshow:", error)
      settvshow([])
    }
  }

  useEffect(() => {
    if (list) {
      fetchtvshowByList(list)
    }
  }, [list])

  useEffect(() => {
    if (!genre) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, genre])

  const genreFilteredtvshow = genre
    ? latestMovie.results.filter((movie) =>
        movie.genre_ids.includes(parseInt(genre)),
      )
    : latestMovie.results

  let filteredtvshow

  if (genre) {
    filteredtvshow = latestMovie.results.filter((movie) => {
      const includesGenre = !genre || movie.genre_ids.includes(parseInt(genre))

      const includesSearch =
        !searchTerm ||
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())

      return includesGenre && includesSearch
    })
  } else {
    filteredtvshow = searchTerm ? searchResults : genreFilteredtvshow
  }

  if (list) {
    filteredtvshow = tvshow
    console.log(tvshow)
  }

  return (
    <div className={styles.wrapper}>
      <SearchBar onSearch={setSearchTerm} placeh={"Search tvshow..."} />

      <Grid container spacing={2}>
        {filteredtvshow.map((movie) => {
          return (
            <Grid key={movie.id} item md={3} className={styles.gridItem}>
              <Link href={`tvshow/${movie.id}`}>
                <Cards {...movie} />
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
export default tvshow

export async function getStaticProps() {
  const data = await fetcher("trending/tv/day?language=en-US")
  return {
    props: {
      latestMovie: data,
    },
  }
}
