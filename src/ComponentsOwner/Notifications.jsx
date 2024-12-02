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
    // Send the new message to your backend
    const message = {
      message: newMessage,
      date: new Date().toLocaleString(),
      read: false,
    };
    setNotifications([message, ...notifications]); // Add the message to the state
    setNewMessage(""); // Clear input
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
        {/* Back Button to Owner Dashboard */}
        <button
          onClick={() => navigate("/owner-dashboard")}
          className="mb-6 text-blue-400 hover:text-blue-600 font-semibold text-lg"
        >
          &larr; Back to Owner Dashboard
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-300">
          Notifications
        </h2>
        <p className="text-xl text-center mb-6">
          Unread: {unreadCount}
        </p>

        {/* New Message Section */}
        <div className="bg-gray-600 p-6 mb-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Send a Message to Owner</h3>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-full p-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="4"
          ></textarea>
          <button
            onClick={handleNewMessage}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-white">No notifications to display.</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-md ${
                  notification.read ? "bg-gray-600" : "bg-yellow-600"
                } flex justify-between items-center`}
              >
                <div className="flex-1">
                  <p className="text-lg font-medium">{notification.message}</p>
                  <small className="text-sm text-gray-400">
                    {new Date(notification.date).toLocaleString()}
                  </small>
                </div>

                <div className="flex space-x-3">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
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