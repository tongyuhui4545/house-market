import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useState, useEffect, useRef } from "react";

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularprice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longtitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longtitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //text/booeans/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>
      {/* sell or rent */}
      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>
          {/* name */}
          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />
        </form>
        {/* rooms */}
        <div className="formRooms flex">
          <div>
            <label className="formLabel">Bedrooms</label>
            <input
              className="formInputSmall"
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onMutate}
              min="1"
              max="50"
              required
            />
          </div>
          <div>
            <label className="formLabel">Bathrooms</label>
            <input
              className="formInputSmall"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onMutate}
              min="1"
              max="50"
              required
            />
          </div>
        </div>
        {/* parking slot */}
        <label className="formLabel">Parking Slot</label>
        <div className="formButtons">
          <button
            type="button"
            className={parking ? "formButtonActive" : "formButton"}
            id="parking"
            value={true}
            onClick={onMutate}
            min="1"
            max="50"
          >
            Yes
          </button>
          <button
            type="button"
            className={
              !parking && parking !== null ? "formButtonActive" : "formButton"
            }
            id="parking"
            value={false}
            onClick={onMutate}
            min="1"
            max="50"
          >
            No
          </button>
        </div>
        {/* furnishing */}
        <label className="formLabel">Furnishing</label>
        <div className="formButtons">
          <button
            type="button"
            className={furnished ? "formButtonActive" : "formButton"}
            id="furnished"
            value={true}
            onClick={onMutate}
            min="1"
            max="50"
          >
            Yes
          </button>
          <button
            type="button"
            className={
              !furnished && furnished !== null
                ? "formButtonActive"
                : "formButton"
            }
            id="furnished"
            value={false}
            onClick={onMutate}
            min="1"
            max="50"
          >
            No
          </button>
        </div>
        {/* Address */}
        <label className="formLabel">Address</label>
        <textarea
          className="formInputAddress"
          type="text"
          id="address"
          value={address}
          onChange={onMutate}
          required
        />
        {/* geollocation */}
        {!geolocationEnabled && (
          <div className="formLatLng flex">
            <div>
              <label className="formLabel">Latitude</label>
              <input
                className="formInputSmall"
                type="number"
                id="latitude"
                value={latitude}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className="formLabel">Longtitude</label>
              <input
                className="formInputSmall"
                type="number"
                id="longtitude"
                value={longtitude}
                onChange={onMutate}
                required
              />
            </div>
          </div>
        )}
        {/* offers */}
        <label className="formLabel">Offers</label>
        <div className="formButtons">
          <button
            type="button"
            className={offer ? "formButtonActive" : "formButton"}
            id="offer"
            value={true}
            onClick={onMutate}
            min="1"
            max="50"
          >
            Yes
          </button>
          <button
            type="button"
            className={
              !offer && offer !== null ? "formButtonActive" : "formButton"
            }
            id="offer"
            value={false}
            onClick={onMutate}
            min="1"
            max="50"
          >
            No
          </button>
        </div>
        {/* price */}
        <label className="formLabel">Regular Price</label>
        <div className="formPriceDiv">
          <input
            className="formInputSmall"
            type="number"
            id="regularPrice"
            value={regularPrice}
            onChange={onMutate}
            min="50"
            max="750000000"
            required
          />
          {type === "rent" && <p className="formPriceText">$ / Month</p>}
        </div>

        {offer && (
          <>
            <label className="formLabel">Discounted Price</label>
            <input
              type="number"
              className="formInputSmall"
              id="discountedPrice"
              value={discountedPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required={offer}
            />
          </>
        )}
        {/* images */}
        <label className="formLabel">Images</label>
        <p className="imagesInfo">The first image will be shown. (max 6)</p>
        <input
          className="formInputFile"
          type="file"
          id="images"
          onChange={onMutate}
          max="6"
          accept=".jpg, .png, .jepg"
          multiple
          required
        />
        <button className="primaryButton createListingButton">
          Create Listing
        </button>
      </main>
    </div>
  );
}

export default CreateListing;
