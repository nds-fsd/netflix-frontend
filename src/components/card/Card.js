import React from 'react'
import './Card.css'

const Card = ({title, img}) => {
    

    return (
        <div className='wrapperCard'>
            <div className='wrapperImg'>
                <img src={img} alt=''/>
                <div className='textInsideimg'>{title}</div>
            </div>
        </div>
    )
}

export default Card