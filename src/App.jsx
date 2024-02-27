import './App.css'
import { useEffect, useRef, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/movies'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía');
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número');
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres');
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}


function App() {

  const {search, setSearch, error} = useSearch()
  const {movies, getMovies} = useMovies({search})


  const handleSubmit = (event)=>{
    event.preventDefault()
    getMovies()
  }
  const handleChange = (event) =>{
    setSearch(event.target.value)
  }
  


  return (
    
      <div className='page'>

        <header>
          <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Start Wars, The Matrix ...' />
          <button type='submit'>Buscar</button>

        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
        </header>
        <main>
          {
            <Movies movies={movies}/>
          }
        </main>

      </div>
    
  )
}

export default App
