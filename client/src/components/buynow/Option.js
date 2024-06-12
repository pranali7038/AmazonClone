import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({ deletedata, get }) => {
    const removedata = async () => {
        try {
            const res = await fetch(`/remove/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log("Response data:", data);

            if (res.status === 400 || !data) {
                //console.log("Error: ID not found or other issue");
                //alert("Item deletion failed");
                toast.warn("item not removed from cart try later!",{
                    position:"top-center",
                  })
            } else {
                //console.log("Item deleted successfully");
                toast.success("item removed from cart",{
                    position:"top-center",
                  })
                get(); // Refresh the cart data
            }
        } catch (error) {
            console.log("Error: Something went wrong", error);
            alert("Item deletion failed");
        }
    };

    return (
        <div className='add_remove_select'>
            <select>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={removedata}>Delete</p><span>|</span>
            <p className='forremovemedia'>Save For Later</p><span>|</span>
            <p className='forremovemedia'>See More like this</p>
            <ToastContainer/>
        </div>
    );
};

export default Option;
