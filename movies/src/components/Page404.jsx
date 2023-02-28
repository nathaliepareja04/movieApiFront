import React from 'react'
import { Link } from 'react-router-dom'

export const Page404 = () => {
  return (
    <div className="text-center text-white">
        <h1>Error 404 Página no encontrada</h1>
        <Link to="/" className="btn btn-primary">Ir a la página principal</Link>
    </div>
  )
}
