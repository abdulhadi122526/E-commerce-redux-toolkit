import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../configration/redux/reducers/cartSlice';


const Home = () => {
    const [product, setProduct] = useState()
    const [loading , setLoading] = useState(true)

    
    const dispatch = useDispatch();


    const products = async () => {
        try {
            const data = await fetch("https://dummyjson.com/products");
            const response = await data.json()
            setProduct(response.products)
            
        } catch (error) {
            console.log(error);
            
        } finally{
            
            setLoading(false)
        }
    }
    console.log(product);
    useEffect(() => {
        products()
    }, [])

    const addItem = (item) => {
        dispatch(addToCart({
            id: item.id,
            Title: item.title,
            Description: item.description,
            Thumbnail: item.thumbnail,
            Price: item.price,
            unitPrice: item.price,
            Quantity:  1
        }))

     
    }







    return (
        <>
        <div className='text-center pt-24 '>
            {loading && loading  ? <span className=" loading loading-lg "></span> : null}
        </div>

            <div className='grid grid-cols-4'>
                {product && product.map((item, index) => {
                    return <div key={index} className="card bg-base-100 w-[300px] mt-12 mx-auto shadow-xl border relative pb-12">
                        <figure className="px-10 pt-10 h-[220px]">
                            <img
                                src={item.thumbnail}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body ">
                            <h2 className="card-title">{item.title}</h2>
                            <h2 className="card-title">${item.price}</h2>
                            <div className="card-actions absolute bottom-3">
                                <button className="btn btn-success mt-2" onClick={() => addItem(item)} >Add to cart</button>
                                <button className="btn btn-success mt-2" >Show more</button>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </>
    )
}

export default Home