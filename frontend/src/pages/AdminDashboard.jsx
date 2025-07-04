// AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../network/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = ({ role }) => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    address: "",
    apptTime: "",
    doctorId: "",
  });

  // Fetch users and doctors on mount
  useEffect(() => {
    fetchUsers();
    fetchDoctors();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchUsers = async () => {
    try {
      const res = await api.post("/admin/users", {
        params: { requestBy: role },
      });
      const filtered = res.data.filter((user) => user.role !== "ADMIN");
      setUsers(filtered);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.post("/admin/doctors", {
        params: { requestBy: role },
      });
      setDoctors(res.data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    }
  };

  // User CRUD operations
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditData({
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      gender: user.gender || "MALE",
      address: user.address || "",
      apptTime: user.apptTime
        ? new Date(user.apptTime).toISOString().slice(0, 16)
        : "",
      doctorId: user.doctorId || "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        ...editData,
        requestBy: role,
        apptTime: editData.apptTime
          ? new Date(editData.apptTime).toISOString()
          : null,
        doctorId: editData.doctorId ? Number(editData.doctorId) : null,
      };
      console.log("Saving user with payload:", payload);

      await api.put(`/admin/users/${id}`, payload);
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to save user", err);
    }
  };

  const handleCancel = () => {
    setEditUserId(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`, {
        data: { requestBy: role },
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newUser,
        requestBy: role,
        apptTime: newUser.apptTime
          ? new Date(newUser.apptTime).toISOString()
          : null,
        doctorId: newUser.doctorId ? Number(newUser.doctorId) : null,
        role: "USER",
      };
      console.log("Submitting user:", payload);
      await api.post("/admin/create", payload);
      setNewUser({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        address: "",
        apptTime: "",
        doctorId: "",
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to create user", err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <nav className="admin-nav">
        <h3>HealthConnect</h3>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <div className="admin-content">
        <h2>Admin Dashboard</h2>

        {/* Users Section */}
        <section className="users-section">
          <h3>Manage Users</h3>

          <form onSubmit={handleCreate} className="user-form">
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newUser.phoneNumber}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="form-group">
              <select
                name="gender"
                value={newUser.gender}
                onChange={handleNewUserChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newUser.address}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="datetime-local"
                name="apptTime"
                value={newUser.apptTime}
                onChange={handleNewUserChange}
              />
            </div>
            <div className="form-group">
              <select
                name="doctorId"
                value={newUser.doctorId}
                onChange={handleNewUserChange}
              >
                <option value="">Assign Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="create-btn">
              Create User
            </button>
          </form>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Appointment</th>
                  <th>Doctor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isEditing = editUserId === user.id;
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {isEditing ? (
                          <input
                            name="fullName"
                            value={editData.fullName}
                            onChange={handleEditChange}
                          />
                        ) : (
                          user.fullName
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            name="email"
                            value={editData.email}
                            onChange={handleEditChange}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            name="phoneNumber"
                            value={editData.phoneNumber}
                            onChange={handleEditChange}
                          />
                        ) : (
                          user.phoneNumber
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            name="gender"
                            value={editData.gender}
                            onChange={handleEditChange}
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHERS">Others</option>
                          </select>
                        ) : (
                          user.gender
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            name="address"
                            value={editData.address}
                            onChange={handleEditChange}
                          />
                        ) : (
                          user.address
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="datetime-local"
                            name="apptTime"
                            value={editData.apptTime}
                            onChange={handleEditChange}
                          />
                        ) : user.apptTime ? (
                          new Date(user.apptTime).toLocaleString()
                        ) : (
                          "Not Assigned"
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            name="doctorId"
                            value={editData.doctorId || ""}
                            onChange={handleEditChange}
                          >
                            <option value="">None</option>
                            {doctors.map((doc) => (
                              <option key={doc.id} value={doc.id}>
                                {doc.name} ({doc.specialization})
                              </option>
                            ))}
                          </select>
                        ) : user.assignedDoctor ? (
                          `${user.assignedDoctor.name} (${user.assignedDoctor.specialization})`
                        ) : (
                          "None"
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(user.id)}
                              className="save-btn"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="cancel-btn"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(user)}
                              className="edit-btn"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="delete-btn"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Doctors Section (Read-only) */}
        <section className="doctors-section">
          <h3>Available Doctors</h3>
          <div className="table-container">
            <table className="doctors-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>

                  <th>Specialization</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>

                    <td>{doctor.specialization}</td>
                    <td>{doctor.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
