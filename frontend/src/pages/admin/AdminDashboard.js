import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth); // ✅ get token + role
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Error fetching users");
      console.error("Error fetching users", err);
    }
  };

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/courses", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setCourses(res.data);
    } catch (err) {
      setError("Error fetching courses");
      console.error("Error fetching courses", err);
    }
  };

  // ✅ Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(users.filter((u) => u._id !== id)); // update UI
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  // ✅ Delete a course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setCourses(courses.filter((c) => c._id !== id)); // update UI
    } catch (err) {
      console.error("Error deleting course", err);
    }
  };

  useEffect(() => {
    if (user?.token && user?.role === "admin") {
      fetchUsers();
      fetchCourses();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Users Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        {users.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="border px-4 py-2">{u.name}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.role}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Courses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Courses</h2>
        {courses.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Instructor</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td className="border px-4 py-2">{c.title}</td>
                  <td className="border px-4 py-2">{c.instructor?.name}</td>
                  <td className="border px-4 py-2">${c.price}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => deleteCourse(c._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}
