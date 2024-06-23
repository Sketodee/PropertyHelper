import React, {useState} from 'react'
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

const Carousel = ({slides}) => {
    const [current, setCurrent] = useState(0)

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1)
        else setCurrent(current -1)
    }
    let nextSlide = () => {
        if (current === slides.length -1) setCurrent(0)
        else setCurrent(current + 1)
    }

  return (
    <div className='w-2/3'>
        <div className='overflow-hidden relative h-auto '> 
            <div className={`flex transition ease-out duration-40`}
            style={{transform: `translateX(-${current*100}%)`}}
            >
                {slides.map((s, i) => {
                    return <img className="object-cover rounded-sm" key={i} src={s}/>
                })}
            </div>

            <div className='absolute top-0 h-full w-full flex text-white justify-between items-center px-10 text-3xl'>
                <button onClick={previousSlide}> <FaCircleArrowLeft /> </button>
                <button onClick={nextSlide}> <FaCircleArrowRight /> </button>
            </div>

            <div className='absolute bottom-0 py-4 flex justify-center gap-5 w-full'>
                {slides.map((s, index) => {
                    return(
                        <div key={index} 
                        // onClick={()=>setCurrent(index)}
                        className={`rounded-full  w-3 h-3 ${index ==current ? 'bg-white' : 'bg-gray-300'}`}>

                        </div>
                    ) 
                })}
            </div>

        </div>
        <div className='flex cursor-pointer gap-4 items-center py-3'>
            {slides.map((s, index) => {
                return <img key={index} onClick={() => setCurrent(index)} src={s} className={`${index ==current ? 'w-20 h-20 border-2 border-blue-500' : 'w-20 h-20'}}`}/>
            })}
        </div>
    </div>
  )
}

export default Carousel