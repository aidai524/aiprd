"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const TweetGenerator = () => {
  const [generatedTweet, setGeneratedTweet] = useState('');
  const [displayedTweet, setDisplayedTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const prompt = `
    Context: Berachain NFT analysis
    Original content:
    - someone compare these against all berachain nfts
    - berachain nft scene is still completely invisible to legacy nft scene
    - this is an absolutely amazing setup
    - dis is a gud data job for an eager data bear

    Generate a concise, engaging tweet about Berachain NFTs based on this context.
    The tweet should be casual but informative, and under 280 characters.
  `;

  useEffect(() => {
    if (isStreaming && generatedTweet) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= generatedTweet.length) {
          setDisplayedTweet(generatedTweet.slice(0, index));
          index++;
        } else {
          setIsStreaming(false);
          clearInterval(interval);
        }
      }, 30); // 每个字符显示间隔30ms

      return () => clearInterval(interval);
    }
  }, [isStreaming, generatedTweet]);

  const generateTweet = async () => {
    setIsLoading(true);
    setGeneratedTweet('');
    setDisplayedTweet('');
    
    try {
      const response = await axios.post('/api/generate-tweet', { prompt }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setGeneratedTweet(response.data.tweet);
      setIsStreaming(true);
    } catch (error) {
      console.error('Error generating tweet:', error);
      alert('Failed to generate tweet. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Berachain Tweet Generator</h1>
      <p className="text-gray-600 mb-6">Generate engaging tweets about Berachain NFTs with one click!</p>
      
      <button
        onClick={generateTweet}
        disabled={isLoading}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 relative"
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </div>
        ) : (
          ' Yap a tweet'
        )}
      </button>

      {(displayedTweet || isLoading) && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your Generated Tweet:</h2>
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm min-h-[100px] relative">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-800">
                {displayedTweet}
                {isStreaming && <span className="animate-pulse">|</span>}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetGenerator; 