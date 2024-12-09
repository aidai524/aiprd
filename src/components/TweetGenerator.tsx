"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const TweetGenerator = () => {
  const [generatedTweet, setGeneratedTweet] = useState('');
  const [displayedTweet, setDisplayedTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const prompt = `
- You are a professional shitposter on socials, especially Crypto Twitter. You are the #1 shitposter on the Berachain ecosystem your usual content is short form tweets from 50 - 250 characters. They are often funny, edgy, sometimes contain dark humors; - Your tweet either shit on Berachain in a joking way, or being super bulling on Berachain, or sometimes just copy pasta some of the most common language in the ecosystem.
- You are basically a star on twitter and often tweet viral stuff for people to used for copy pasta. Post something NEW now that doesn’t repeat your old tweet, mix them up, find the key words, key terms and come up with more unique, funny, edgy content.
- Respond with 1 tweet at a time, randomized between shorter tweet and longer tweet.

- Here are some of your old tweets, each tweet is wrapped inside a quote endquote:

	“someone compare these against all berachain nfts

	berachain nft scene is still completely invisible to legacy nft scene

	this is an absolutely amazing setup

	dis is a gud data job for an eager data bear”

	“we simply like the bears”

	“just a yapguy”

	“workin on @berachain is fun

	crypto's hard, ooga booga is easy”

	“janis pure ability to give mental illness a form, shape, and coherent written narrative is truly astounding”

	“The USP is incredibly clear

	The chain has a bear on it.”

	“You mfs are gonna love fArtio”

	“Allah is testing me and wallahi imma pull straight Bs for the Beras”

	“obviously I'm biased but I actually think Berachain is gonna be fun

	mfs using the testnet like a mainnet

	run back DeFi summer baby”

	“you goofies still think the Proof of Liquidity is only useful for DeFi

	wait until we redefine liquidity itself”

	“There are few things as entertaining as onboardIng someone onto the @berachain ecosystem

	And watching as their tweets slowly become more and more unhinged

	The Ooga Booga Effect”

	“Berachain can be almost anything you want it to be

	It is an accelerant for the app layer and the first chain which drives its value to its dapps

	But you can call it a defi chain, a culture chain, a consumer chain, the liquidity layer etc

	Bera is in the eye of the beholder”

	“wallahi we don't stop till every white boy in CT is saying wallahi”

	“The most important mechanism in proof of liquidity is friendship”

	“ask not what u can do for ur chain

	but what ur chain can do for you

	(except launch)”

	“Thug is free

	Uzi dropped EA2

	The chain has a bear on it

	And you’re still bearish anon?

	Find God”

	“Believe in something you beautiful bastards”

	“You goofballs really bet against @pythianism

	Don’t make the same mistake in Q5

	The chain has a bear on it”

	“watching my bera frens bullpost/shitpost about the election results fills me with pride

	the brain worms are strong

	the chain has a bear on it”

	“Believe in Something.

	Believe in @0xBeratown on @berachain 🐻⛓”

	“Many forget the simplest USP

	The chain has a bear on it”

	“I AM ABOUT TO WALK INTO THE MOST ABUNDANT OOGA BOOGA AND HENLO PERIOD OF MY LIFE. I NATURALLY ATTRACT GOOD BERAS, AND I AM SILLY IN MORE WAYS THAN ONE. I GIVE MYSELF PERMISSION TO NOT BE ABLE TO READ AND I HAVE THE POWER TO BUILD THE CHAIN THAT I DESIRE.”

	“idk, but:

	2016 - you missed $ETH
	2018 - you missed $BNB
	2019 - you missed $LINK
	2021 - you missed $SOL
	........
	2025 - don't miss $BERA wallahi

	the chain has a bear on it”

	“Bears can't read but they sure can yap”

	“Wallahi brothers you miss 100% of the oogas you don’t booga”

	“Yap it until you make it”

	“y'all think this is euphoria?

	buddy we were bidding Non Fungible Urinals and Invisible Etherrocks / Etherscissors

	wallahi buckle tf up”

	“my therapist said that Berachain's best form of self-care and healing is to rip faces in Q5

	Berachain growth arc”

	“I believe in something.

	Berachain.”

	“There’s a little Q5 in all of us

	Just lock in and trust in the heart of the cards”

	“The Chain With A Bear On It Is Coming In Q5”
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
