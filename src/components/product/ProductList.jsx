import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useGetAllProductMutation, useGetAllProductByFilterMutation } from '../../features/product/productApiSlice';
import { Link } from 'react-router-dom';

import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const ProductList = ({openModal}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0)
  const [batch, setBatch] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  const [getAllProduct] = useGetAllProductMutation()
const [getAllProductByFilter] = useGetAllProductByFilterMutation()

  // const [getAllConsultant] = useGetAllConsultantMutation()
  // const [getAllConsultantByFilter] = useGetAllConsultantByFilterMutation()


  const productsPerPage = 10;
  var productData = products

  const handleSearchChange = (event) => {
    setCurrentPage(1)
    setBatch(0)
    setSearchQuery(event.target.value);
  };

  // Get current customers
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productData;

  // Change page
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    // console.log(totalCount < (pageNumber - 1) * 10 )
  }
  const next = () => {
    // setCurrentPage(prev => prev + 1)
    if (totalCount > ((batch + 1) * 100)) {
      setBatch(prev => prev + 1)
      setCurrentPage(((batch + 1) * 10) + 1)
    }
  }
  const previous = () => {
    if (batch * 10 >= 10) {
      setBatch(prev => prev - 1)
      setCurrentPage(((batch - 1) * 10) + 1)
    }
  }

  const fetchData = async (page) => {
    try {
      const credentials = {
        PageNumber: page //initialize the first page loading 
      };
      const response = await getAllProduct(credentials).unwrap()
      setProducts(response.data.data)
      setTotalCount(response.data.totalCount)
    } catch (error) {
      //    console.log(error)
    }
  };

  const search = async (query, page) => {
    try {
      const credentials = {
        Id: '',
        Name: query,
        PageNumber: page
      };
      const response = await getAllProductByFilter(credentials).unwrap()
      setProducts(response.data.data)
      setTotalCount(response.data.totalCount)
    } catch (error) {
      //    console.log(error)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() === '') {
        fetchData(currentPage)
      } else {
        search(searchQuery, currentPage);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);

  }, [searchQuery, currentPage]);

  //make the first call to return the first page 
  useEffect(() => {
    // fetchData();
    if (searchQuery.trim() === '') {
      fetchData(currentPage);
    } else {
      search(searchQuery, currentPage);
    }
  }, [currentPage])
  
  return (
    <div >
      <div className="bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3">
        <div className="max-w mx-auto flex justify-between items-center px-2 ">
          <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative py-3 w-4/5">
            <input type="search" id="default-search" value={searchQuery} onChange={handleSearchChange} className="block w-full px-2 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." required />
            <button onClick={search} className="text-white absolute end-1.5 top-3.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoSearch className='text-2xl text-white' /></button>
          </div>
          <button onClick={openModal} className="bg-blue-700 text-white flex items-center  px-4 py-2 rounded">
            <FaPlus />
            <p className='ps-2 hidden sm:block'>Add Product</p>
          </button>
        </div>
        {/* map through products here */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {currentProducts.map((product, index) => (
                 <Link to={`/dashboard/product/${product.id}`}  key={index} className="bg-gray-200 dark:bg-gray-700 rounded-2xl">
                 <div className="100 p-3 rounded-2xl md:flex">
                   <div className="md:w-1/2 h-60">
                     {/* <img src="/assets/2149661457-min.jpg" alt="Description" className="h-full w-full object-cover rounded-xl" /> */}
                     <img src={product.imageLinks[0]} alt="Description" className="h-full w-full object-cover rounded-xl" />
                   </div>
                   <div className="md:w-1/2 h-full p-3 dark:text-white">
                     <h2 className="text-3xl font-bold">{product.name}</h2>
                     <p className='text-2xl pt-3'>N {product.pricing.total.toLocaleString()} <span className='text-sm'>per sqm</span> </p>
                     <div className='flex justify-between items-end py-2'>
                       <div className='flex items-end  text-gray-400 font-light' >
                         <IoLocationSharp className='text-2xl ' />
                         <p className='text-sm'> {product.location}</p>
                       </div>
                       <div className='flex items-center text-gray-400 font-light' >
                         <FaStar className='text-xl text-yellow-500' />
                         <p className='text-xl ps-2'> 4.5</p>
                       </div>
                       <p className='px-4 rounded-full text-white text-sm font-light bg-green-500'> {product.isAvailable ? 'Available' : 'Not Available'} </p>
                     </div>
                     <div className="">
                       <p className='font-medium'>Description:</p>
                       <p className='text-sm text-gray-400'> {product.description} </p>
                     </div>
                   </div>
                 </div>
               </Link>
        ))}
        </div>
      </div>


      {/* pagination starts */}



      <div className="flex items-center justify-center py-4">
        <div className="w-full sm:w-3/5 flex items-center justify-between">
          <div onClick={previous} className="flex items-center pt-3 text-gray-600 dark:text-gray-300 hover:text-indigo-700 cursor-pointer">
            <p className="text-sm sm:text-xs ml-3 font-light leading-none ">Prev</p>
          </div>
          <div className="flex">
            {[...Array(10)].map((_, index) => (
              <button disabled={totalCount < (index + (10 * batch)) * 10} key={index} onClick={() => paginate(index + 1 + (10 * batch))}
                className={`leading-none cursor-pointer pt-3 mr-0 sm:mr-4 px-1 sm:px-0
                                ${currentPage === index + 1 + (10 * batch) ? 'dark:text-gray-200 text-gray-700 font-bold' : 'dark:text-gray-400 text-gray-500 font-light'}
                                      ${totalCount < (index + (10 * batch)) * 10 ? 'dark:text-gray-600 text-gray-300 text-sm' : ' '}
                                `}>
                {index + 1 + (10 * batch)}
              </button>
            ))}
          </div>
          <div onClick={next} className="flex items-center pt-3 text-gray-600 dark:text-gray-300 hover:text-indigo-700 cursor-pointer">
            <p className="text-sm font-light leading-none mr-3">Next</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList