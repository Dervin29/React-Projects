import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";


const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);
  const { onSent, previousPrompts, setRecentPrompts } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} />
        <div className="new-chat">
          <img className="plus" src={assets.plus_icon} />
          {extended ? <p className="text">New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((prompt, index) => (
              <div className="recent-entry" onClick={() => loadPrompt(prompt)} key={prompt}>
                <img src={assets.message_icon} alt="" />
                <p>{prompt.slice(0, 20)} ...</p>
              </div>
            ))}


          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
