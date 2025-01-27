import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            "http://localhost:4000/user/infor",
            {
              headers: { Authorization: token },
            },
            { withCredentials: true }
          );
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          console.log(res);
        } catch (err) {
          alert(err.response.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = (product) => {
    if (!isLogged) return alert("Please Login first");
    const check = cart.every((item) => {
      return item.id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product has been already added to cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
  };
};

export default UserAPI;
