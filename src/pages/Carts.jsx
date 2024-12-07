import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, deleteCartItem, increaseQuantity } from '../configration/redux/reducers/cartSlice'
import Swal from 'sweetalert2'

const Carts = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.cart.cartItem)

  console.log(selector);

  const increase = (item) => {
    dispatch(increaseQuantity(item))
  }
  const deCrease = (item) => {
    dispatch(decreaseQuantity(item))


  }
  const deleteCart = (item) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-5",
        cancelButton: "btn btn-error"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCartItem(item))

      } else if (

        result.dismiss === Swal.DismissReason.cancel
      );
    });

  }

















  return (
    <>
      <h1 className='text-center text-5xl pb-20 text-fuchsia-700'>Your Products</h1>

      {selector && selector.map((item, index) => {
        return <div key={index} className='w-[700px]  mx-auto my-5 border rounded-md'>

          <div className="card lg:card-side bg-base-100 rounded-md shadow-md">
            <figure className='w-[1000px]'>
              <img
                src={item.Thumbnail}
                alt="Album"
                className='rounded-md' />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.Title}</h2>
              <p>{item.Description}</p>
              <h2 className="card-title text-green-700">$ {item.Price}</h2>
              <div className="card-actions justify-start mb-0 ">
                <button className="text-3xl " onClick={() => increase(item)}>+</button>
                <span className='text-2xl pt-1'>{item.Quantity}</span>
                <button className="text-3xl" onClick={() => deCrease(item)}>-</button>
              </div>
              <div className="card-actions justify-end mb-0 ">
                <button className=" btn btn-outline btn-error text-xs" onClick={() => deleteCart(item)}>Remove from cart</button>

              </div>

            </div>
          </div>
        </div>
      })}
    </>
  )
}

export default Carts