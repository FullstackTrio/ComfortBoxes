import React from 'react';

/**
 * OrderList component:
 * Displays list of orders for reviewing by status and editing status category
 */
export default function OrderList ({orders}) {
  return (
    <div id='orderList'>
      <h4>Order List</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order,i) => (
              <tr key={i}>
                <td>{order.user_id}</td>
                <td>{order.email}</td>
                <td>{order.address} {order.city}, {order.state}</td>
                <td>{order.status}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    )

}


// function Orders ({status}) {
//     // Filter orders on status
//     //
//     return (
//     <div className='productList'>
//       {
//         category.products.map(product => {
//           return (
//             <div key={product.id} className='product'>
//               <NavLink to={`/products/${product.id}`}>
//                 <img src={product.img}/>
//               </NavLink>
//               <div>{product.title}</div>
//               <button name={product.id} onClick={addAProductToBox}>Add</button>
//             </div>
//           )
//         })
//       }
//     </div>
//   );
// }
