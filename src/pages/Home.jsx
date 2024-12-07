import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../configration/redux/reducers/cartSlice';


const Home = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [singleItem, setSingleItem] = useState()
    const dispatch = useDispatch();




    const products = async () => {
        try {
            const data = await fetch("https://dummyjson.com/products");
            const response = await data.json()
            setProduct(response.products)

        } catch (error) {
            console.log(error);

        } finally {

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
            Quantity: 1
        }))


    }

    const itemdetail = (item) => {
        setSingleItem(item)
        document.getElementById('my_modal_4').showModal()


    }

    const addSingleItem = (singleItem) => {
        dispatch(addToCart({
            id: singleItem.id,
            Title: singleItem.title,
            Description: singleItem.description,
            Thumbnail: singleItem.thumbnail,
            Price: singleItem.price,
            unitPrice: singleItem.price,
            Quantity: 1
        }))


    }





    return (
        <>
            <div className='text-center pt-24 '>
                {loading && loading ? <span className=" loading loading-lg "></span> : null}
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
                                <button className="btn btn-success mt-2" onClick={() => itemdetail(item)}>Show more</button>
                            </div>
                        </div>
                    </div>
                })}

                {singleItem && singleItem ? <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="card lg:card-side bg-base-100">
                            <figure className='w-[700px] '>
                                <img
                                    src={singleItem.thumbnail}
                                    alt="Album"
                                    className='rounded-md' />
                            </figure>

                            <div className="mt-12">
                                <h2 className="card-title pb-3">{singleItem.title}</h2>
                                <p>{singleItem.description}</p>
                                <h2 className="card-title text-green-700 mt-5">$ {singleItem.price}</h2>
                                <div className="card-actions justify-start mb-0 ">
                                </div>
                               

                                {/* rating */}
                                <div className="rating mt-9">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        defaultChecked />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                </div>
                                <div className="card-actions justify-end  mt-10 me-10">
                                    <button className=" btn btn-outline btn-accent text-xs" onClick={() => addSingleItem(singleItem)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                                

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                        </div>
                    </div>
                </dialog> : null}











            </div>
        </>
    )
}

export default Home