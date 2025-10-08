import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/courses", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setCourses(res.data);
    } catch (err) {
      setError("Error fetching courses");
      console.error(err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setCourses(courses.filter((c) => c._id !== id));
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
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage users and courses efficiently
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 space-y-12">
          {error && <p className="text-red-500">{error}</p>}

          {/* Users Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Users Management
            </h2>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left border-b px-4 py-3">Name</th>
                      <th className="text-left border-b px-4 py-3">Email</th>
                      <th className="text-left border-b px-4 py-3">Role</th>
                      <th className="text-center border-b px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border-b px-4 py-3">{u.name}</td>
                        <td className="border-b px-4 py-3">{u.email}</td>
                        <td className="border-b px-4 py-3 capitalize">
                          {u.role}
                        </td>
                        <td className="border-b px-4 py-3 text-center">
                          <button
                            onClick={() => deleteUser(u._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No users found.</p>
            )}
          </div>

          {/* Courses Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Courses Management
            </h2>
            {courses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left border-b px-4 py-3">Title</th>
                      <th className="text-left border-b px-4 py-3">Instructor</th>
                      <th className="text-left border-b px-4 py-3">Price</th>
                      <th className="text-center border-b px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr
                        key={c._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border-b px-4 py-3">{c.title}</td>
                        <td className="border-b px-4 py-3">
                          {c.instructor?.name || "N/A"}
                        </td>
                        <td className="border-b px-4 py-3">${c.price}</td>
                        <td className="border-b px-4 py-3 text-center">
                          <button
                            onClick={() => deleteCourse(c._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No courses found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
