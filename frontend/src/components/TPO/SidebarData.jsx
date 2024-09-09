// Filename - components/SidebarData.js

import React from "react";
import { FaListUl, FaCheckSquare } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiArrowDownSFill, RiArrowUpSFill, RiPlayListAddLine } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import { FaIndustry } from "react-icons/fa6";
import { LiaIndustrySolid } from "react-icons/lia";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/tpo/dashboard",
    icon: <AiFillHome />
  },
  {
    title: "Students",
    icon: <PiStudentDuotone />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: "Approve Students",
        path: "/tpo/approve-student",
        icon: <FaCheckSquare />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Company",
    icon: <LiaIndustrySolid />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "List All",
        path: "/tpo/companys",
        icon: <FaListUl />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/tpo/add-company",
        icon: <RiPlayListAddLine />,
      },
    ],
  },
  {
    title: "Job Listings",
    icon: <FaIndustry />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: "List All",
        path: "/tpo/job-listings",
        icon: <FaListUl />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/tpo/post-job",
        icon: <RiPlayListAddLine />,
      },
    ],
  },
];
