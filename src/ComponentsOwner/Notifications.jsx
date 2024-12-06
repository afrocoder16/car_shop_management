import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newMessage, setNewMessage] = useState("");

  // Fetch notifications when the component loads
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/notifications");
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
      await fetch(`/api/notifications/${id}/read`, { method: "POST" });
      setNotifications(
        notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: "DELETE" });
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Handle sending a new message
  const handleNewMessage = () => {
    if (newMessage.trim() === "") return;
    // Simulate the new message being sent to the backend
    const message = {
      id: notifications.length + 1, // Temporary unique ID
      message: newMessage,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications([message, ...notifications]);
    setUnreadCount(unreadCount + 1);
    setNewMessage("");
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-700 p-8 rounded-lg shadow-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/owner-dashboard")}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
          &larr; Back to Owner Dashboard
        </button>

        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          Notifications
        </h2>
        <p className="text-lg font-medium text-center mb-8 text-gray-300">
          You have <span className="text-yellow-400 font-bold">{unreadCount}</span>{" "}
          unread {unreadCount === 1 ? "notification" : "notifications"}.
        </p>

        {/* New Message Section */}
        <div className="bg-gray-800 p-6 mb-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Send a Message to Owner
          </h3>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-full p-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="4"
          ></textarea>
          <button
            onClick={handleNewMessage}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-400">
              No notifications to display.
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                  notification.read ? "bg-gray-600" : "bg-gray-800"
                }`}
              >
                <div className="flex-1">
                  <p className="text-lg font-medium text-white">
                    {notification.message}
                  </p>
                  <small className="text-sm text-gray-400">
                    {new Date(notification.date).toLocaleString()}
                  </small>
                </div>
                <div className="flex space-x-4">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;