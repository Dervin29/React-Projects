import React, { useContext, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { LuImagePlus ,LuSendHorizonal} from "react-icons/lu";
import { MdMicNone } from "react-icons/md";


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
    isDarkMode,
    toggleDarkMode,
  } = useContext(Context);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <div className="user">
          <img src={assets.user_icon} alt="" />
          <ToggleSwitch isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </div>
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
              <img src={assets.user_icon} />
              <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} />
              {loading ? (
                <div className="loader">
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                </div>
              ) : null}
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
              <LuImagePlus className="icon cursor-pointer"/>
              <MdMicNone className="icon cursor-pointer"/>
              {input?.length > 0 ? (
                <LuSendHorizonal onClick={() => onSent(input)} className="icon cursor-pointer" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.<a className=" underline hover:text-blue-400" href="https://support.google.com/gemini/answer/13594961?visit_id=638549877250638270-97009260&p=privacy_notice&rd=1#privacy_notice">Your privacy and Gemini Apps</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;