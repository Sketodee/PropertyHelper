import React from 'react'
import { useParams } from 'react-router-dom';
import Carousel from '../general/Carousel';

const ProductDetail = () => {
    let { Id } = useParams();
    let p = [
        // "https://res.cloudinary.com/drrbebmby/image/upload/v1718992549/fu7vwmce2p6hgyzausv1.jpg",
  "https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg?t=st=1719010109~exp=1719013709~hmac=2a9f065fa20ee06f477f2a7245e596dee4ac147c9b893a31a0de7e86b5b4eae6&w=1380",
  "https://img.freepik.com/free-photo/modern-country-houses-construction_1385-16.jpg?t=st=1719010435~exp=1719014035~hmac=59052c9ced581b36de6f157b23e38b0db901460414f9d0775d5cb11cb4e645a9&w=996",
  "https://img.freepik.com/free-photo/new-buildings-with-green-areas_1122-1533.jpg?t=st=1719010510~exp=1719014110~hmac=4c40c1469e386c1b9ac84b7dc83ed5d7d67993225d8d342b8010f86f251cc427&w=1380"
    ]
  return (
    <div className='dark:text-white'>
        <p>Showing product {Id} </p>
        <Carousel  slides={p}/> 
    </div>
  )
}

export default ProductDetail