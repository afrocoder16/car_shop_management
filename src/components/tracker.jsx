import React from 'react';

const CarProgressTracker = ({ currentStage }) => {
    // Stages of the progress
    const stages = ['Accepted', 'Pending', 'Completed'];

    // Get the progress index based on the current stage
    const progressIndex = stages.indexOf(currentStage);

    return (
        <div style={styles.page}>
            {/* Heading */}
            <h2 style={styles.heading}>Car Service Progress Tracker</h2>

            {/* Car Image */}
            <div style={styles.imageContainer}>
                <img
                    src=""
                    alt="Car"
                    style={styles.carImage}
                />
            </div>

            {/* Progress Bar */}
            <div style={styles.progressBar}>
                {stages.map((stage, index) => (
                    <div
                        key={stage}
                        style={{
                            ...styles.stage,
                            ...(index <= progressIndex
                                ? styles.activeStage
                                : styles.inactiveStage),
                        }}
                    >
                        <div style={styles.dot}></div>
                        <span style={styles.stageLabel}>{stage}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles
const styles = {
    page: {
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #1e293b, #0f172a)', // Gradient background
        color: '#ffffff', // Text color for contrast
        padding: '50px 0', // Top and bottom padding
        boxSizing: 'border-box', // Ensures padding doesn't affect total height
    },
    heading: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px', // Margin to separate the heading from the image
        color: '#ffffff', // White color for visibility on gradient
    },
    imageContainer: {
        flex: 1, // Take up all available space except the reserved progress bar
        width: '80%', // Centered and responsive width
        maxWidth: '1000px', // Max width for larger screens
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures the image doesn’t overflow
    },
    carImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensures the image scales proportionally and fills the space
        borderRadius: '10px',
    },
    progressBar: {
        height: '80px', // Fixed height for the progress bar
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%', // Centered and responsive width
        maxWidth: '1000px', // Max width for larger screens
        marginTop: '20px', // Space between the image and progress bar
    },
    stage: {
        textAlign: 'center',
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    activeStage: {
        color: '#4ADE80', // Green for active stages
    },
    inactiveStage: {
        color: '#cccccc', // Gray for inactive stages
    },
    dot: {
        width: '30px', // Larger dots for better visibility
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#4ADE80', // Green for completed stages
        marginBottom: '10px',
    },
    stageLabel: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default CarProgressTracker;
