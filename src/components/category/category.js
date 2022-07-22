import React from "react";



const Category = ({category}) => {
console.log(category)
    return(
        <>
        <div>{category.categoryName}</div>
        {category.movies.map(movie=><div>{movie?.description}</div>)}
    
        </>
    
    )};


export default Category;
