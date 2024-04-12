import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletePropertyId, getPropertyIds } from "../services/storeCartItems";
import SingleProperty from "../components/cartDetails/SingleProperty";
import { AuthContext } from "../providers/AuthProvider";

const Cart = () => {
  const { estates, setCartNumber } = useContext(AuthContext);
  const [selectedEstates, setSelectedEstates] = useState([]);
  const [deleteCall, setDeleteCall] = useState(true);
  const [totalPrice, setTotalPrice] = useState("");

  // Calculate Total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let estate of selectedEstates) {
      const price = parseFloat(estate.price.replace(/[^0-9.-]+/g, ""));
      totalPrice += price;
    }
    const formattedTotalPrice = totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    setTotalPrice(formattedTotalPrice);
  };

  //  handle the delete button and delete the ids from the local storage
  const handleDeleteProperty = (id) => {
    deletePropertyId(id);
    setDeleteCall(true);
  };

  //   get the stored Property ids and filter them from the all estates
  useEffect(() => {
    if (deleteCall) {
      const currPropIds = getPropertyIds();
      setCartNumber(currPropIds.length);
      const newEstates = estates.filter((estate) =>
        currPropIds.includes(estate.id)
      );
      setSelectedEstates(newEstates);
      setDeleteCall(false);
    }
  }, [deleteCall]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedEstates]);

  return (
    <>
      <Helmet>
        <title>Homestead | Cart</title>
      </Helmet>
      <div className="my-10  container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="hero py-10 bg-base-100 rounded-xl">
          <div className="hero-content w-full flex-col">
            <div className="text-center lg:text-left ">
              <h1 className="text-4xl font-bold">
                {selectedEstates.length > 0
                  ? "Your Cart Details"
                  : "You Didn't Select Any Property Yet!"}
              </h1>
            </div>
            {selectedEstates.length > 0 && (
              <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <div className="overflow-x-auto py-7">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Property Name</th>
                        <th>Status</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEstates.map((sEstate, index) => (
                        <SingleProperty
                          index={index}
                          key={sEstate.id}
                          sEstate={sEstate}
                          handleDeleteProperty={handleDeleteProperty}
                        />
                      ))}
                      <tr>
                        <th className="text-right" colSpan={3}>
                          Total=
                        </th>
                        <th>{totalPrice}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
