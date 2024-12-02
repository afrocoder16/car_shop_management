
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotificationsEmployee = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications when the component loads
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/employee/notifications");
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((notification) => !notification.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await fetch(`/api/employee/notifications/${id}/read`, { method: "POST" });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  const handleBackToDashboard = () => {
    navigate("/mechanics-dashboard");
  };
  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await fetch(`/api/employee/notifications/${id}`, { method: "DELETE" });
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Employee Notifications</h1>
      <p className="text-center text-lg mb-6">
        Unread Notifications: <span className="font-semibold">{unreadCount}</span>
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded-md shadow-md flex justify-between items-center ${
                  notification.read ? "bg-gray-700" : "bg-blue-600"
                }`}
              >
                <div>
                  <p className="font-semibold">{notification.message}</p>
                  <small className="text-gray-400">
                    {new Date(notification.date).toLocaleString()}
                  </small>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400">No notifications available.</p>
          )}
        </ul>
        
      </div>
      <button
            onClick={handleBackToDashboard}
            className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-md font-bold"
          >
            Back to Mechanics Dashboard
          </button>

    </div>
  );
};

export default NotificationsEmployee;