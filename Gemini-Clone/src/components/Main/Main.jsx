import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
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
    setShowResult,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-content">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to visit</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept : urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm ideas for your next project</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className=" result">
            <div className="result-title">
                <img src={assets.user_icon}/>
                <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon}/>
                {loading ? <div className="loader">
                    <hr></hr>
                    <hr></hr>
                    <hr></hr>
                </div> : null}
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="search-icons">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
