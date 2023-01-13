import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenre from '../../hooks/useGenre';

const Movies = () => {

  const [page , setPage] = useState(1);
  const [content , setContent] = useState([])
  const [numOfPages , setNumOfPages] = useState(1)
  const [selectedGenres , setSelectedGenres] = useState([]);
  const [genres , setGenres] = useState([])
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_monetization_types=flatrate`)
    setContent(data.results);
    setNumOfPages(data.total_pages)
  }

  useEffect(()=>{
    fetchMovies()
  } , [page , genreforURL])

  const renderedContent = content.map((c)=>{
    return <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average}/>
  })

  return (
    <div>
        <span className='pageTitle'>movies</span>
        <Genres  selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} type="movie" setPage={setPage}></Genres>
        <div className='trending'>
            {renderedContent}
        </div>

        <CustomPagination setPage={setPage} numOfPages = {numOfPages}/>
    </div>
  )
}

export default Movies