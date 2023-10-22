import React from "react";

export default function LandingAdmin() {
  return (
    <div>
      <div className="h-20 bg-[#ffffff] mb-16">
        <h1 className="float-left mt-6 ml-8 text-4xl font-semibold text-black">
          Dashboard Overview
        </h1>
      </div>
      <div className="dashboard-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <h4 className="stat-title">Total Buses</h4>
            <div className="image-card">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/27/19/29/england-1283853_640.jpg"
                alt="Total Buses"
                style={{ borderRadius: "10%" }}
              />
            </div>
            <p className="stat-value">10</p>
          </div>
          <div className="stat-card">
            <h4 className="stat-title">Total Passengers</h4>
            <div className="image-card">
              <img
                src="https://cdn.pixabay.com/photo/2020/01/31/07/27/people-4807330_640.jpg"
                alt="Total Passengers"
                style={{ borderRadius: "10%" }}
              />
            </div>
            <p className="stat-value">400</p>
          </div>
          <div className="stat-card">
            <h4 className="stat-title">Total Managers</h4>
            <div className="image-card">
              <img
                src="https://cdn.pixabay.com/photo/2019/08/12/23/03/entrepreneur-4402272_640.jpg"
                alt="Total Managers"
                style={{ borderRadius: "10%" }}
              />
            </div>
            <p className="stat-value">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
