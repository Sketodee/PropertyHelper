import React, { useState, useEffect } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Carousel from '../general/Carousel';
import { useGetAllProductByFilterMutation } from '../../features/product/productApiSlice';

const ProductDetail = () => {
    let { Id } = useParams();
    const [productData, setProductData] = useState([])
    const [loading, setLoading] = useState(true);
    const [getAllProductByFilter] = useGetAllProductByFilterMutation()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const credentials = {
                    Id: Id,
                    Name: '',
                    PageNumber: 1
                };
                const data = await getAllProductByFilter(credentials).unwrap()
                setProductData(data.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='dark:text-white bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3'>
            {productData.map((product, index) => {
                return (
                    <div className='flex'>
                        <Carousel key={index} slides={product.imageLinks} />
                        <div className=' w-4/5 '>
                            <div className="px-10 py-4">
                                <p className='text-4xl font-medium'>{product.name}</p>
                                <hr className='my-3' />
                                
                                <p className='text-3xl font-medium'>N {product.pricing.total.toLocaleString()}</p>

                                <div className='flex items-center py-2'>
                                    <div className='flex items-end  text-gray-400 font-light pe-5' >
                                        <IoLocationSharp className='text-3xl ' />
                                        <p className='text-lg'> {product.location}</p>
                                    </div>
                                    <p className='px-4 rounded-full text-white text-lg font-light bg-green-500'> {product.isAvailable ? 'Available' : 'Not Available'} </p>
                                </div>

                                <div className='flex items-center text-gray-400 font-light ps-2' >
                                    <FaStar className='text-xl text-yellow-500' />
                                    <p className='text-xl ps-2'> 4.5</p>
                                </div>
                                
                                <p className='text-2xl font-medium pt-5 pb-2'>Pricing Details</p>
                                {Object.entries(product.pricing).map(([key, value]) =>  {
                                    if(key !== 'total' && key !== 'unit')
                                    return(
                                        <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)} : N {value.toLocaleString()}</p>
                                    )
                                })}

<p className='text-2xl font-medium pt-5 pb-2'>Description</p>
<p> {product.description} </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductDetail