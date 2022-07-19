import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card';
import api from '../../utils/api';

const MyList = () => {

    const [favList, setFavlist] = useState ([]);
    const [nameMovieFav, setMovieFav] = useState([]);

    useEffect(() => {
        api('GET', 'favs').then((favs) => setFavlist(favs));
    }, [favList]);

    useEffect(() => {
        api('GET', 'movies')
    }, [])
        
  return (
  <div>Lista de favoritos 
    {favList && favList.map(({_id}) => (
        <Card
        id = {_id}
        />
    ))}
    
 </div>
)
}
export default MyList
