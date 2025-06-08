

// import React, { useState, useEffect } from 'react';
// import { User } from 'lucide-react';
// import { useAuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// export default function AdminPage() {
//   const { userData } = useAuthContext();
//   const [isLoading, setIsLoading] = useState(true);
//   const [fullName, setFullName] = useState("");
//   const [emailId, setEmailId] = useState("");
//   const [gender, setGender] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [editedStatuses, setEditedStatuses] = useState({});
//   const [isUpdating, setIsUpdating] = useState(false);

//   const location = useLocation();

//   useEffect(() => {
//     setTimeout(() => {
//       const fname = localStorage.getItem("FullName");
//       const mailId = localStorage.getItem("EmailId");
//       const gend = localStorage.getItem("Gender");
//       setFullName(fname);
//       setEmailId(mailId);
//       setGender(gend);
//       setIsLoading(false);
//     }, 3000);
//   }, [userData]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`http://localhost:9000/api/fetchUserOrders`);
//         console.log("Fetched orders:", res.data);
//         setOrders(res.data);
        
//         // Initialize edited statuses with current order statuses
//         const initialStatuses = {};
//         res.data.forEach(order => {
//           initialStatuses[order._id] = order.status;
//         });
//         setEditedStatuses(initialStatuses);
//       } catch (err) {
//         console.error("Failed to fetch orders:", err);
//         alert("Failed to fetch orders. Please try again.");
//       }
//     };
//     fetchOrders();
//   }, [location.pathname]);

//   const handleStatusChange = (orderId, newStatus) => {
//     console.log(`Changing status for order ${orderId} to ${newStatus}`);
//     setEditedStatuses(prev => ({
//       ...prev,
//       [orderId]: newStatus
//     }));
//   };

//   const updateAllStatuses = async () => {
//     setIsUpdating(true);
    
//     try {
//       // Find all orders that have status changes
//       const updates = Object.entries(editedStatuses).filter(([id, newStatus]) => {
//         const order = orders.find(o => o._id === id);
//         const hasChanged = order && order.status !== newStatus;
//         console.log(`Order ${id}: ${order?.status} -> ${newStatus}, Changed: ${hasChanged}`);
//         return hasChanged;
//       });

//       console.log("Updates to be made:", updates);

//       if (updates.length === 0) {
//         alert("No changes to save.");
//         setIsUpdating(false);
//         return;
//       }

//       // Update each order status
//       const updatePromises = updates.map(async ([orderId, newStatus]) => {
//         try {
//           console.log(`Updating order ${orderId} to status ${newStatus}`);
//           const response = await axios.put(`http://localhost:9000/api/updateOrderStatus`, {
//             orderId,
//             newStatus
//           });
//           console.log(`Successfully updated order ${orderId}:`, response.data);
//           return { orderId, newStatus, success: true };
//         } catch (error) {
//           console.error(`Failed to update order ${orderId}:`, error);
//           return { orderId, newStatus, success: false, error: error.message };
//         }
//       });

//       const results = await Promise.all(updatePromises);
      
//       // Check if all updates were successful
//       const failedUpdates = results.filter(result => !result.success);
      
//       if (failedUpdates.length > 0) {
//         console.error("Failed updates:", failedUpdates);
//         alert(`Failed to update ${failedUpdates.length} order(s). Please try again.`);
//       } else {
//         // Update the orders state with new statuses
//         const updatedOrders = orders.map(order => ({
//           ...order,
//           status: editedStatuses[order._id] || order.status
//         }));
//         setOrders(updatedOrders);
        
//         alert("All changes saved successfully!");
//         console.log("All orders updated successfully");
//       }

//     } catch (error) {
//       console.error("Error in updateAllStatuses:", error);
//       alert("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // Function to update individual order status (alternative approach)
//   const updateSingleOrderStatus = async (orderId, newStatus) => {
//     try {
//       console.log(`Updating single order ${orderId} to ${newStatus}`);
      
//       const response = await axios.put(`http://localhost:9000/api/updateOrderStatus`, {
//         orderId,
//         newStatus
//       });

//       if (response.data) {
//         // Update the orders state immediately
//         const updatedOrders = orders.map(order => 
//           order._id === orderId ? { ...order, status: newStatus } : order
//         );
//         setOrders(updatedOrders);
        
//         // Update the edited statuses
//         setEditedStatuses(prev => ({
//           ...prev,
//           [orderId]: newStatus
//         }));

//         alert("Order status updated successfully!");
//         console.log(`Order ${orderId} status updated to ${newStatus}`);
//       }
//     } catch (error) {
//       console.error(`Error updating order ${orderId}:`, error);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   if (isLoading || !fullName) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-lg font-medium">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-6">
      
//         <h2 className="text-3xl font-bold text-gray-800">AdminPage</h2>

//       <div className="bg-white rounded-2xl shadow-xl mt-10 p-8 w-full max-w-3xl">

//         {/* Profile Section */}
//         <div className="flex flex-col items-center text-center mb-8">
//           <div className="flex justify-center items-center mb-4">
//             <User size={60} className="text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
//           <p className="text-gray-600 text-sm mt-1"><span className="font-semibold">Email:</span> {emailId}</p>
//           <p className="text-gray-600 text-sm"><span className="font-semibold">Gender:</span> {gender}</p>
//           <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-shadow hover:shadow-lg">
//             Edit Profile
//           </button>
//         </div>

//         {/* Orders Section */}
//         <div className="mt-10">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Orders</h2>

//           {orders.length === 0 ? (
//             <p className="text-gray-500 text-center">No orders found.</p>
//           ) : (
//             <>
//               {orders.map((order, idx) => (
//                 <div key={order._id} className="border rounded-lg shadow-sm p-4 mb-6 bg-gray-50 hover:shadow-md transition">
//                   <div className="mb-2">
//                     <p className="text-lg font-semibold text-red-600">Order #{idx + 1}</p>
//                     <p className="text-sm text-gray-700">Order ID: <span className="text-gray-600 font-mono">{order._id}</span></p>
//                     <p className="text-sm text-gray-700">Customer: <span className="text-gray-600 font-medium">{order.username || 'N/A'}</span></p>
//                     <p className="text-sm text-gray-700">Ordered on: <span className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</span></p>
//                     <p className="text-sm text-gray-700">
//                       Current Status: 
//                       <span className={`capitalize ml-1 px-2 py-1 rounded text-xs font-semibold ${
//                         order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                         order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
//                         order.status === 'delivered' ? 'bg-green-100 text-green-800' :
//                         order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                         'bg-gray-100 text-gray-800'
//                       }`}>
//                         {order.status}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-800 mt-1 font-medium">Total: ₹{order.totalAmount}</p>

//                     {/* Status Update Section */}
//                     <div className="mt-3 p-3 bg-white rounded border">
//                       <div className="flex items-center gap-3">
//                         <label className="text-sm font-medium text-gray-700">Update Status:</label>
//                         <select
//                           value={editedStatuses[order._id] || order.status}
//                           onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                           className="px-3 py-1 rounded border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="shipped">Shipped</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
                        
//                         {/* Individual Update Button */}
//                         <button
//                           onClick={() => updateSingleOrderStatus(order._id, editedStatuses[order._id])}
//                           disabled={editedStatuses[order._id] === order.status}
//                           className={`px-3 py-1 text-xs font-medium rounded transition ${
//                             editedStatuses[order._id] === order.status
//                               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                               : 'bg-blue-600 hover:bg-blue-700 text-white'
//                           }`}
//                         >
//                           {editedStatuses[order._id] === order.status ? 'No Changes' : 'Update Now'}
//                         </button>
//                       </div>
                      
//                       {editedStatuses[order._id] !== order.status && (
//                         <p className="text-xs text-orange-600 mt-1">
//                           Will change from "{order.status}" to "{editedStatuses[order._id]}"
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Items:</h4>
//                     <ul className="space-y-2">
//                       {order.items.map((item, i) => (
//                         <li key={i} className="flex items-center justify-between text-sm bg-white p-2 rounded shadow">
//                           <div>
//                             <p className="font-medium">{item.name}</p>
//                             <p className="text-gray-500 text-xs">Qty: {item.quantity} × ₹{item.price}</p>
//                           </div>
//                           {item.imgUrl && (
//                             <img
//                               src={item.imgUrl}
//                               alt={item.name}
//                               className="w-12 h-12 object-cover rounded-md border"
//                             />
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}

//               {/* Global Update Button */}
//               <div className="text-center mt-6">
//                 <button
//                   onClick={updateAllStatuses}
//                   disabled={isUpdating}
//                   className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-shadow ${
//                     isUpdating
//                       ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
//                       : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
//                   }`}
//                 >
//                   {isUpdating ? 'Saving Changes...' : 'Save All Changes'}
//                 </button>
//                 <p className="text-xs text-gray-500 mt-2">
//                   This will update all orders with changed statuses
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [gender, setGender] = useState("");
  const [orders, setOrders] = useState([]);
  const [editedStatuses, setEditedStatuses] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fname = localStorage.getItem("FullName");
    const mailId = localStorage.getItem("EmailId");
    const gend = localStorage.getItem("Gender");
    setFullName(fname);
    setEmailId(mailId);
    setGender(gend);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/fetchUserOrders`);
        setOrders(res.data);
        const initialStatuses = {};
        res.data.forEach(order => {
          initialStatuses[order._id] = order.status;
        });
        setEditedStatuses(initialStatuses);
      } catch (err) {
        alert("Failed to fetch orders. Please try again.");
      }
    };
    fetchOrders();
  }, [location.pathname]);

  const handleStatusChange = (orderId, newStatus) => {
    setEditedStatuses(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const updateAllStatuses = async () => {
    setIsUpdating(true);
    const updates = Object.entries(editedStatuses).filter(([id, newStatus]) => {
      const order = orders.find(o => o._id === id);
      return order && order.status !== newStatus;
    });

    if (updates.length === 0) {
      alert("No changes to save.");
      setIsUpdating(false);
      return;
    }

    try {
      const res = await axios.put("http://localhost:9000/api/updateOrderStatuses", {
        updates: updates.map(([orderId, newStatus]) => ({ orderId, newStatus }))
      });

      if (res.data.success) {
        const updatedOrders = orders.map(order => ({
          ...order,
          status: editedStatuses[order._id] || order.status
        }));
        setOrders(updatedOrders);
        alert("All order statuses updated successfully.");
      } else {
        alert("Some updates failed. Please check logs.");
      }
    } catch (err) {
      alert("Error updating statuses.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Page</h2>
      <div className="mt-4">
        <p>Name: {fullName}</p>
        <p>Email: {emailId}</p>
        <p>Gender: {gender}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Orders</h3>
        {orders.map(order => (
          <div key={order._id} className="border p-3 mb-4 rounded">
            <p><strong>ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <select
              value={editedStatuses[order._id]}
              onChange={e => handleStatusChange(order._id, e.target.value)}
              className="mt-2 border p-1"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
        <button
          onClick={updateAllStatuses}
          disabled={isUpdating}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
