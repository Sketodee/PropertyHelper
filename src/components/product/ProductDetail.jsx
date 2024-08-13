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

    const getUnitLabel = (duration) => {
        switch (duration) {
            case 0:
                return 'Square Meters';
            case 1:
                return 'Plot';
            // Add more cases if there are other durations
            default:
                return `${duration} months`;
        }
    };

    const getDurationLabel = (duration) => {
        switch (duration) {
            case 0:
                return 'Outright';
            case 1:
                return 'Three Months';
            case 2:
                return 'Six Months';
            case 1:
                return 'One Year';
            // Add more cases if there are other durations
            default:
                return `${duration} months`;
        }
    };

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
                    <div key={index} className='flex'>
                        <Carousel key={index} slides={product.imageLinks} />
                        <div className=' w-4/5 '>
                            <div className="px-10 py-4">
                                <p className='text-2xl font-light'>{product.name}</p>
                                <hr className='my-3' />

                                {/* <p className='text-3xl font-medium'>N {product.pricing.total.toLocaleString()}</p> */}

                                <div className='flex items-end py-2'>
                       <div className='flex items-center font-light border-r border-gray-400 pe-2' >
                         <IoLocationSharp className='text-2xl ' />
                         <p className='text-sm'> {product.location}</p>
                       </div>
                       <div className='flex items-center text-gray-400 font-light border-r border-gray-400 ps-2 pe-2' >
                         <FaStar className='text-xl text-yellow-500' />
                         <p className='text-l ps-2'> 4.5</p>
                       </div>
                       <div className='ps-2'>
                         <p className='px-4 py-1 rounded-full text-white text-sm font-light bg-green-500'> {product.isAvailable ? 'Available' : 'Not Available'} </p>
                       </div>
                     </div>

                                <div>
                                    <p className='text-xl font-light pt-5 pb-2'>Description :</p>
                                    <p className='text-sm font-light'> {product.description} </p>
                                </div>


                                <div className='pb-6'>
                                    <p className='text-xl font-light pt-5 pb-2'>Pricing Details</p>
                                    <p className='text-sm font-light'>Product Size : {product.size}</p>
                                    <p className='text-sm font-light'>Product Unit : {getUnitLabel(product.unit)} </p>
                                </div>
                                

                                <table
                                        className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                        <thead
                                            className="border-b border-neutral-200 ">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 text-center">Duration</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 text-center">Price Per {getUnitLabel(product.unit)}</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 text-center">Survey Per {getUnitLabel(product.unit)}</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 text-center">Development Per {getUnitLabel(product.unit)}</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 text-center">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.pricing.map((item, index) => (
                                                    <tr key={index}
                                                        className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                                        <td className="whitespace-nowrap px-6 py-4 text-center font-medium">{getDurationLabel(item.duration)}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{item.price.toLocaleString()}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{item.survey.toLocaleString()}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{item.development.toLocaleString()}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{item.total.toLocaleString()}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                        
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductDetail