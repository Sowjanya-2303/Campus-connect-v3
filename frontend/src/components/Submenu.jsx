import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Tailwind CSS classes will replace styled-components
const SidebarLink = ({ to, onClick, active, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center justify-between w-full px-4 py-3 h-16 text-black text-lg no-underline hover:bg-gray-300 hover:border-l-4 hover:border-blue-500 ${active ? 'bg-gray-300 border-l-4 border-blue-500' : 'bg-transparent'}`}
  >
    {children}
  </Link>
);

const SidebarLabel = ({ children }) => (
  <span className="ml-3">{children}</span>
);

const DropdownLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`flex items-center h-16 pl-12 text-black text-lg no-underline hover:bg-gray-300 hover:border-l-4 hover:border-blue-500 ${active ? 'bg-gray-300 border-l-4 border-blue-500' : 'bg-transparent'}`}
  >
    {children}
  </Link>
);

const SubMenu = ({ item, currentPath }) => {
  const [subnav, setSubnav] = useState(false);

  useEffect(() => {
    if (item.subNav && item.subNav.some(subItem => currentPath.includes(subItem.path))) {
      setSubnav(true);
    } else {
      setSubnav(false);
    }
  }, [currentPath, item.subNav]);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        active={currentPath === item.path}
      >
        <div className="flex items-center">
          {item.icon}
          <SidebarLabel>
            {item.title}
          </SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((subItem, index) => (
          <DropdownLink
            to={subItem.path}
            key={index}
            active={currentPath === subItem.path}
          >
            {subItem.icon}
            <SidebarLabel>
              {subItem.title}
            </SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
