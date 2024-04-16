import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { deletePropertyId, getPropertyIds } from "../services/storeCartItems";
import SingleProperty from "../components/cartDetails/SingleProperty";
import { AuthContext } from "../providers/AuthProvider";

const Cart = () => {
  const { user, estates, setCartNumber, setToastMsg } = useContext(AuthContext);
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
    setToastMsg("Items deleted succesfully  !");
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
      <div className="my-10  container bg-base-100 mx-auto  py-5 md:p-10 min-h-screen">
        {/* testing */}
        <div className="hero py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center flex-col">
            <div className="text-center">
              <h1
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="text-4xl font-bold"
              >
                {selectedEstates.length > 0
                  ? "Your Cart Details"
                  : "You didn't select any property yet!"}
              </h1>
            </div>
            <div className="max-w-[21rem] md:max-w-2xl lg:max-w-3xl">
              {selectedEstates.length > 0 && (
                <div
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-sine"
                  className="card w-full  shadow-2xl bg-base-100"
                >
                  {/* Table for cart */}
                  <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="900"
                    data-aos-easing="ease-in-sine"
                    className="overflow-x-auto py-7 "
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
                        <tr>
                          <th colSpan="5">
                            <div className="divider -my-3"></div>
                          </th>
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
                          <th colSpan="5">
                            <div className="divider -my-3"></div>
                          </th>
                        </tr>
                        <tr>
                          <th className="text-right" colSpan={3}>
                            Total =
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
      </div>
    </>
  );
};

export default Cart;
