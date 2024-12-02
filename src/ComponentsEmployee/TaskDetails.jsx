import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = () => {
  const { taskId } = useParams(); // Get the taskId from the URL parameter
  const navigate = useNavigate(); // For navigation
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch task details when the component loads or taskId changes
  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        // Replace with your API endpoint to fetch task details
        const response = await fetch(`/api/tasks/${taskId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        setTask(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTaskDetail(); // Fetch task details when the component is mounted
  }, [taskId]); // This will trigger when taskId changes in the URL

  // Function to update task status
  const updateTaskStatus = async (status) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      setTask({ ...task, status }); // Update the task status in state
      alert("Task status updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating task status.");
    }
  };

  if (loading) {
    return <p>Loading task details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Car:</strong> {task.car}</p>
      <p><strong>Service Type:</strong> {task.serviceType}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
      <p><strong>Notes:</strong> {task.notes || "No notes provided."}</p>

      <div>
        {task.status === "Pending" && (
          <button onClick={() => updateTaskStatus("In Progress")}>
            Start Task
          </button>
        )}
        {task.status === "In Progress" && (
          <button onClick={() => updateTaskStatus("Completed")}>
            Complete Task
          </button>
        )}
      </div>

      <button onClick={() => navigate("/assigned-tasks")}>
        Back to Task List
      </button>
    </div>
  );
};

export default TaskDetails;