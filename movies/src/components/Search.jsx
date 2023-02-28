import React from 'react'

export const Search = ({search,inputSearch}) => {
  return (
    <section className='col-xxl-8 form-group mx-auto'>   
    <h1 className='text-center text-white'>Movie info</h1>
    <input type="text" placeholder='Search' className='form-control' value={inputSearch} onChange={(e)=>search(e)}/>
  </section>
)
}
