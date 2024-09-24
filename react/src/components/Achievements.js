import React from "react";

export default function Achievements() {
  return (
    <div className="achievements">
      <div className="achievements_content">
        <div className="achievements1">
          <div className="achievements1_img">
            <img src="/assets/icons/Group 1000002515.svg" alt="" />
          </div>
          <div className="achievements1_content">
            <b>500+</b>
            <p>Blog Posts Published</p>
          </div>
        </div>
        <div className="achievements2">
          <div className="achievements2_img">
            <img src="/assets/icons/Group 1000002515.svg" alt="" />
          </div>
          <div className="achievements2_content">
            <b>20K+</b>
            <p>Active Readers</p>
          </div>
        </div>
        <div className="achievements3">
          <div className="achievements3_img">
            <img src="/assets/icons/Group 1000002515.svg" alt="" />
          </div>
          <div className="achievements3_content">
            <b>150+</b>
            <p>Contributors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
