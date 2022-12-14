import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: #171725;
    }
    &-short-desc {
      font-size: 14px;
      color: #808191;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;

const DashboardLayout = () => {
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      {/* {loading && (
        <div className="flex h-[100vh] w-full items-center justify-center ">
          <LoadingSpinner
            size="70px"
            borderSize="8px"
            type="primary"
          ></LoadingSpinner>
        </div>
      )} */}

      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
