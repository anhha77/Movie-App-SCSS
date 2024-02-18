import React, { useState } from "react";
import "./style.scss";

function SwitchTab({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab);
  };

  return (
    <div className="switching-tabs">
      <div className="tab-items">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tab-item ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="moving-bg" style={{ left }}></span>
      </div>
    </div>
  );
}

export default SwitchTab;
