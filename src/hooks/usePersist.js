import {useState, useEffect} from 'react'

const usePersist = () => {

    // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)
    const [persist, setPersist] = useState(true)

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])
    
  return [persist, setPersist]
}

export default usePersist 