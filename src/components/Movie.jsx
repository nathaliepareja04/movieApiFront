import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Loading } from './Loading'


export const Movie = () => {

    const navigate=useNavigate()
    const{id}=useParams()
    const[movie,setMovie]=useState({})
    const[error,setError]=useState(false)
    const[loading,setLoading]=useState(false)


    useEffect(()=>{
        const searchMovie=async()=>{
            try {
                setLoading(true)
                const {data} =await axios.get(`http://www.omdbapi.com/?apikey=49565df5&i=${id}`)
                setLoading(false)

                if(data.Error){
                    setError(true)
                    Swal.fire({
                        icon: 'error',
                        title: 'Pelicula no encontrada por el id',
                      })
                    return
                }
                setMovie(data)
            } catch (error) {
                setLoading(false)
                console.log("error en searchmovie",error.message)
            }
        }
        searchMovie()
    },[id])

  return (
    <div>
      {loading?(<Loading/>):
            (<div className="card-group h-100">
            <div className="card mt-4 d-flex">
                {!error? (<div className="row">
                        <div className="col-xxl-4">
                            {movie.Poster==="N/A"? (
                                <img src='/img/movieimg.png' alt="img"/>
                                ) : (
                                <img src={movie.Poster} alt="img"/>)}
                        </div>
                        <div className="col-xxl-8">
                            <div className="card-body">
                                <h4 className="card-title">
                                    {movie.Title} <strong>{movie.Year}</strong>
                                </h4>
                                <p className='card-text'>{movie.Plot}</p>
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-text">
                                        <span className='badge bg-primary'>
                                            Rating{movie.imdbRating}
                                        </span>
                                    </h5>
                                    <button className="btn btn-success" onClick={()=>navigate(-1)}>Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ):
                    <div className="text-center">
                        <h1>Error, pelicula no encontrada, el id es incorrecto</h1>
                        <Link to="/" className="btn btn-primary">Ir a la página principal</Link>
                    </div>
                }
            </div>
            </div>
        )}

    </div>
  )
}
