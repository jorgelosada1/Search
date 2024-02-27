
import withoutResults from '../mocks/withoutResults.json'
import { useState } from 'react'

export function useMovies({search}){
   const [responseMovies, setResponseMovies] = useState([])

    const movies = responseMovies.Search
  
    const mappedMovies = movies?.map(movie =>({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    const getMovies = () => {
      if(search){
        fetch(`http://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
        .then(res => res.json())
        .then (json =>{
          setResponseMovies(json)
        })
      } else{
        setResponseMovies(withoutResults)
      }
    }

   return{ movies: mappedMovies, getMovies }
  }