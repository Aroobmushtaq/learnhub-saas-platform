// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login, resetState } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const { email, password } = formData;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isLoading, isError, message } = useSelector(
//     (state) => state.auth
//   );

//   // ✅ Navigate immediately when login success
//   useEffect(() => {
//     if (user) {
//       if (user.role === "instructor") {
//         navigate("/instructor/my-courses");
//       } else if (user.role === "student") {
//         navigate("/my-courses");
//       } else {
//         navigate("/");
//       }
//     }

//     return () => {
//       dispatch(resetState());
//     };
//   }, [user, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {isError && <p className="text-red-500">{message}</p>}
//       <form onSubmit={onSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={onChange}
//           placeholder="Email"
//           className="border p-2 w-full"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={onChange}
//           placeholder="Password"
//           className="border p-2 w-full"
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // ✅ Navigate immediately when login success
  useEffect(() => {
    if (user) {
      if (user.role === "instructor") {
        navigate("/instructor/my-courses");
      } else if (user.role === "student") {
        navigate("/my-courses");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }

    return () => {
      dispatch(resetState());
    };
  }, [user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {isError && <p className="text-red-500">{message}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
