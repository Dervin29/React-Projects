import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegQuestionCircle, FaHistory } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompts, setRecentPrompts, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <GiHamburgerMenu onClick={() => setExtended((prev) => !prev)} className="menu w-[20px]" />
        <div className="new-chat" onClick={newChat}>
          <img className="plus" src={assets.plus_icon} />
          {extended ? <p className="text">New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((prompt, index) => (
              <div className="recent-entry" onClick={() => loadPrompt(prompt)} key={index}>
                <img src={assets.message_icon} alt="" />
                <p>{prompt.slice(0, 20)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <FaRegQuestionCircle className="sidebar-icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <FaHistory className="sidebar-icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <MdOutlineSettings className="sidebar-icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
