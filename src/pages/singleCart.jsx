import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleCart = () => {
    const {id} = useParams()
    const [singleProduct, setSingleProduct] = useState()
    
    


    const products = async () => {
        try {
            const data = await fetch(`https://dummyjson.com/products/${id}`);
            const response = await data.json()
            setSingleProduct(response.products)


        } catch (error) {
            console.log(error);

        }
    }
    
    useEffect(() => {
        products()
    }, [])


  return (
    <>
    {singleProduct && singleProduct.map((item) => {
        return <dialog id="my_modal_3" className="modal" key={item.id}>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                    <h3 className="font-bold text-lg text-pink-700">{item.brand}</h3>
                <figure className="px-10 pt-10 w-[250px]">
                    <img
                        src={item.thumbnail}
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                    <h3 className="font-bold text-lg text-pink-700">{item.title}</h3>
                <p className="py-4">{item.description}</p>
                
            </div>
        </dialog>

    })}
    </>
  )
}

export default SingleCart