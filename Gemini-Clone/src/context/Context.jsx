import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Delayed paragraph effect
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // Function to handle new chat initiation
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Function to process user input and trigger Gemini API
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    // Prepare the prompt for execution
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompts(prompt);
    } else {
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompts(input);
      response = await run(input);
    }

    // Process response for formatting
    let formattedResponse = formatResponse(response);

    // Display formatted response with delay effect
    displayFormattedResponse(formattedResponse);

    setLoading(false);
    setInput("");
  };

  // Function to format Gemini response according to specified format
  const formatResponse = (response) => {
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    return newResponse2;
  };

  // Function to display formatted response with delayed effect
  const displayFormattedResponse = (formattedResponse) => {
    let newResponseArray = formattedResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    recentPrompts,
    setRecentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    onSent,
    newChat,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
