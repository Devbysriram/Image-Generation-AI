import React, { useState } from 'react';
import axios from 'axios';


const apiKey = import.meta.env.VITE_APP_APIKEY;

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const generateImage = async () => {


    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: prompt,
        n: 4,
        size: "1024x1024",
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      setGeneratedImage(response.data.data[0].url);
      setError(''); // Clear any previous errors
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that is not in the range of 2xx
        console.error('Error response:', error.response.data);
        setError(error.response.data.error.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setError('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error message:', error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <div className="Nav flex justify-around my-4 border-b py-4">
        <h3 className='text-xl font-medium'>AI Image Generator</h3>
        <button className='btn bg-blue-600 text-white rounded px-4 py-2' onClick={generateImage}>Generate Random Image</button>
      </div>

      <div className="content flex flex-col justify-center items-center">
        <p className='text-xl font-medium'>Enter Prompt:</p>
        <input type="text" value={prompt} onChange={handlePromptChange} />
        <button className='btn bg-blue-600 text-white rounded px-4 py-2 mt-4' onClick={generateImage}>Generate Image</button>
        <p className='text-xl font-medium mt-4'>Generated Image:</p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {generatedImage && <img src={generatedImage} alt="Generated" />}
      </div>
    </div>
  );
};

export default Home;
