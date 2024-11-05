import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import "./css/SideMenu.css";

/////////////////////////////////////////////////////////// REDUX

import { useSelector, useDispatch } from "react-redux";

//////////////////////////////////////////////////////////////////////////// COMPONENTS

import Tooltip from "@mui/joy/Tooltip";

//////////////////////////////////////////////////////////////////////////// ICONS

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Add from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CSS

const SidebarContainer = styled(motion.div)`
  flex-direction: column;
  align-self: start;
  gap: 8px;
  padding: 0 5px 0 16px;
  position: sticky;
  top: 9vh;
  height: 0vh;
  touch-action: none;
  button.openedMenu > i:nth-child(3) {
    rotate: -180deg;
    transition: all 0.2s;
  }

  i {
    font-size: 20px;
    width: 20px;
  }
`;

const SideMenuUL = styled.ul`
  display: grid;
  padding: 0;
  margin: 10px 0 0 0;
  grid-row-gap: 5px;
  width: 100%;
  list-style: none;

  @media (max-width: 430px) {
    grid-row-gap: 0px;
  }
`;

const SideSubMenuUL = styled.ul`
  display: grid;
  padding: 0;
  margin: 5px 0 0 0;
  grid-row-gap: 5px;
  width: 100%;
  list-style: none;
`;

const SideMenuButtonName = styled.p`
  transition: all 0.2s;
  font-family: ${(props) => `${props.theme.fonts.primary}`};
  font-size: 20px;
  font-weight: ${(props) => `${props.theme.custom.sideMenuFontWeight}`};
  color: ${(props) => `${props.theme.colors.tertiary}`};
  margin: 0 0 -5px 0;
  display: ${(props) => `${props.$issidebarcollapsed ? "none" : "block"}`};
  letter-spacing: 0.5px;

  &:nth-child(2) {
    flex: 1 1 auto;
  }
`;

const SideMenuButton = styled(motion.button)`
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
  display: flex;
  gap: 16px;
  align-items: center;
  height: 50px;
  width: 100%;
  border-radius: ${(props) => `${props.$issidebarcollapsed ? `50%` : `16px`}`};
  font-family: ${(props) => `${props.theme.fonts.primary}`};
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
  padding: 0 16px;
  color: ${(props) => `${props.theme.colors.tertiary}`};

  transition: background 0.2s;

  &:not(.active):hover {
    color: ${(props) => `${props.theme.colors.secondary}`};
    background: ${(props) => `${props.theme.colors.septenary}`};
  }

  &:not(.active):hover ${SideMenuButtonName} {
    color: ${(props) => `${props.theme.colors.secondary}`};
  }

  &:is(.active) {
    background: ${(props) => `${props.theme.colors.senary}`};
    color: ${(props) => `${props.theme.colors.theme}`};
  }

  &:is(.active) ${SideMenuButtonName} {
    color: ${(props) => `${props.theme.colors.theme}`};
  }

  @media (max-width: 431px) {
    height: 40px;
  }
`;

const SidebarMenuContainer = styled.div`
  width: 100%;
  height: 560px;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 2px;
  }

  @media (max-width: 430px) {
    height: 525px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
`;

const SidebarDownMenuContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => `${props.theme.colors.septenary}`};
  padding: 5px 0 0 0;
`;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sidebarData = [
  {
    name: "Home",
    isNavigate: "/",
    startDecorator: <i className="ai-dashboard"></i>,
  },
  {
    name: "Labs",
    isNavigate: false,
    startDecorator: (
      <ShowChartIcon
        style={{
          pointerEvents: "none",
          margin: "0 -2px 0 -2px",
        }}
      />
    ),
    subMenu: [
      {
        name: "NGSpice",
        isNavigate: "/ngspice",
        startDecorator: (
          <AccountBalanceIcon
            style={{
              fontSize: "22px",
              pointerEvents: "none",
              margin: "0 -2px 0 -2px",
            }}
          />
        ),
      },
    ],
  },
  {
    name: "Support",
    isNavigate: "/support",
    startDecorator: (
      <HeadsetMicOutlinedIcon
        style={{
          pointerEvents: "none",
          margin: "0 -2px 0 -2px",
        }}
      />
    ),
  },
];

///////////////////////////////////////////////////////////////////////////////////

const handleClick = (item) => {
  if (item.nodeName === "P" || item.nodeName === "I") {
    item = item.parentElement;
  }
  const buttons = document.querySelectorAll(".sidebar ul button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  item.classList.add("active");
};

///////////////////////////////////////////////////////////////////////////////////

const openSubMenu = (item) => {
  if (item.nodeName === "P" || item.nodeName === "I") {
    item = item.parentElement;
  }

  const subMenu = item.nextElementSibling;
  const ul = subMenu.querySelector("ul");

  if (!subMenu.clientHeight) {
    subMenu.style.height = `${ul.clientHeight + 5}px`;
    item.classList.add("openedMenu");
  } else {
    subMenu.style.height = "0px";
    item.classList.remove("openedMenu");
  }
};

///////////////////////////////////////////////////////////////////////////////////

const SideMenuLoopButton = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <li>
      <Tooltip
        title={item.name}
        variant="plain"
        placement="right"
        id="globalTooltip"
      >
        <SideMenuButton
          whileTap={{ scale: 0.98 }}
          className={location.pathname === item.isNavigate ? "active" : ""}
          onClick={(e) => {
            handleClick(e.target);
            navigate(item.isNavigate);
          }}
        >
          {item.startDecorator}
          <SideMenuButtonName>{item.name}</SideMenuButtonName>
        </SideMenuButton>
      </Tooltip>
    </li>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function SideMenu({ setProgress }) {
  const navigate = useNavigate();
  const location = useLocation();

  ////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  ///////////////////////////////////////////////////////////////////////////////////

  const sidebarDownData = [
    {
      name: "Settings",
      startDecorator: <i className="ai-gear"></i>,
      onClick: () => {},
    },
    {
      name: "Logout",
      startDecorator: <i className="ai-sign-out"></i>,
      onClick: () => {
        setProgress(20);
        setTimeout(() => {
          navigate("/login");
          setProgress(100);
        }, 1000);
      },
    },
  ];

  ///////////////////////////////////////////////////////////////////////////////////

  return (
    <SidebarContainer>
      {/* /////////////////////////////////////////////////////////////////////////////////// MAIN MENU */}

      <SidebarMenuContainer>
        <SideMenuUL>
          {sidebarData.map((item) => {
            return (
              <React.Fragment key={item.name}>
                {item.isNavigate ? (
                  <SideMenuLoopButton item={item} />
                ) : (
                  <li>
                    <SideMenuButton
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        openSubMenu(e.target);
                      }}
                    >
                      {item.startDecorator}
                      <SideMenuButtonName>{item.name}</SideMenuButtonName>

                      <i className="ai-chevron-down-small"></i>
                    </SideMenuButton>
                    <div className="sub-menu">
                      <SideSubMenuUL>
                        {item.subMenu.map((subMenuItem) => {
                          return (
                            <SideMenuLoopButton
                              key={subMenuItem.name}
                              item={subMenuItem}
                            />
                          );
                        })}
                      </SideSubMenuUL>
                    </div>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </SideMenuUL>
      </SidebarMenuContainer>

      {/* /////////////////////////////////////////////////////////////////////////////////// DOWN MENU */}

      <SidebarDownMenuContainer>
        {sidebarDownData.map((item) => {
          return (
            <SideMenuButton
              onClick={item.onClick}
              key={item.name}
              whileTap={{ scale: 0.98 }}
            >
              {item.startDecorator}
              <SideMenuButtonName>{item.name}</SideMenuButtonName>
            </SideMenuButton>
          );
        })}
      </SidebarDownMenuContainer>

      {/* /////////////////////////////////////////////////////////////////////////////////// END */}
    </SidebarContainer>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
