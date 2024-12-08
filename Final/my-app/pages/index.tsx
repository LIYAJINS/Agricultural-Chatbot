import { useState } from 'react';

const Home = () => {
  // State for user input and the model's output
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the payload for the POST request
    const data = { prompt: input };

    try {
      // Send the input to  FastAPI backend
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the request was successful
      if (res.ok) {
        const result = await res.json();
        setOutput(result.response);  // Set the output from the response
      } else {
        setOutput('Error: Could not fetch response from the model.');
      }
    } catch (error) {
      setOutput('Error: Could not connect to the backend.');
    }
  };

  return (
    <div style={styles.pageContainer}>
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Agricultural Information Chatbot</h2>
      {/* User input form */}
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label htmlFor="inputText" style={styles.label}>
            Enter your question :
          </label>
          <input
            type="text"
            id="inputText"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here (English or Malayalam)"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>

      {/* Output section */}
      {output && (
        <div style={styles.outputContainer}>
          <h3 style={styles.outputTitle}>Output:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  </div>
);
};

const styles = {
pageContainer: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#a7c7e7',  // Pale blue background
  padding: '0 20px',
},
formContainer: {
  padding: '30px',
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'transparent', // Remove the box format (no background color or border)
},
title: {
  textAlign: 'center',
  color: '#333',  // Dark text color for contrast with the pale blue background
  fontWeight: 'bold',
  fontSize: '2.5rem',
  marginBottom: '20px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',  // Adds a subtle shadow effect to the title
},
inputContainer: {
  marginBottom: '20px',
},
label: {
  fontSize: '16px',
  fontWeight: '600',
  color: '#333',
},
input: {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginTop: '8px',
  backgroundColor: '#fafafa',  // Light background for the input field
  color: '#333',
},
submitButton: {
  width: '100%',
  padding: '14px',
  fontSize: '18px',
  backgroundColor: '#4CAF50',  // Green background for the submit button
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s',
},
outputContainer: {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: 'transparent', // No box format (no background color or border)
},
outputTitle: {
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: '#333',
},
};

export default Home;
