import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import { deletePropertyId, getPropertyIds } from "../services/storeCartItems";
import SingleProperty from "../components/cartDetails/SingleProperty";
import { AuthContext } from "../providers/AuthProvider";

const Cart = () => {
  const { user, estates, setCartNumber, currTheme } = useContext(AuthContext);
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
    deletePropertyId(user?.email, id);
    setDeleteCall(true);
    toast("Items deleted succesfully");
  };

  //   get the stored Property ids and filter them from the all estates
  useEffect(() => {
    if (deleteCall) {
      const currPropIds = getPropertyIds(user?.email);
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
              <h1
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="text-4xl font-bold"
              >
                {selectedEstates.length > 0
                  ? "Your Cart Details"
                  : "You Didn't Select Any Property Yet!"}
              </h1>
            </div>
            {selectedEstates.length > 0 && (
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-easing="ease-in-sine"
                className="card w-full max-w-lg shadow-2xl bg-base-100"
              >
                <div
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="900"
                  data-aos-easing="ease-in-sine"
                  className="overflow-x-auto py-7"
                >
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
        <ToastContainer theme={currTheme} />
      </div>
    </>
  );
};

export default Cart;
