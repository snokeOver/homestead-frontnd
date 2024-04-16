const SingleProperty = ({ sEstate, index, handleDeleteProperty }) => {
  return (
    <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200">
      <th>{index + 1}</th>
      <td>{sEstate.estate_title}</td>
      <td>{sEstate.status}</td>
      <td>{sEstate.price}</td>
      <td className="">
        <button
          onClick={() => handleDeleteProperty(sEstate.id)}
          className="btn border  hover:border-red-400  hover:bg-red-100 hover:text-gray-800"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SingleProperty;
