import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const StudentTable = ({ branchName, studentData }) => {
  const BASE_URL = 'http://localhost:4518';
  return (
    <Accordion.Item eventKey={branchName} className='shadow-md'>
      <Accordion.Header>{branchName}</Accordion.Header>
      <Accordion.Body>
        <Table striped borderless hover className='w-fit'>
          <thead>
            <tr>
              <th style={{ width: "9%" }}>Roll Number</th>
              <th style={{ width: "15%" }}>Full Name</th>
              <th style={{ width: "10%" }}>UIN</th>
              <th style={{ width: "15%" }}>Email</th>
              <th style={{ width: "11%" }}>Phone Number</th>
              <th style={{ width: "10%" }}>Resume</th>
              <th style={{ width: "10%" }}>No. of Internships</th>
              <th style={{ width: "10%" }}>No. of Applied Jobs</th>
            </tr>
          </thead>
          <tbody>
            {
              studentData?.length > 0 ? (
                studentData
                  ?.sort((a, b) => {
                    const rollA = parseInt(a?.studentProfile?.rollNumber || 0);
                    const rollB = parseInt(b?.studentProfile?.rollNumber || 0);
                    return rollA - rollB; // Sort in ascending order of roll numbers
                  })
                  ?.map((student, index) => (
                    <tr key={index}>
                      <td>{student?.studentProfile?.rollNumber}</td>
                      <td>
                        <Link to={`/tpo/user/${student?._id}`} className='no-underline text-blue-500 hover:text-blue-700'>
                          {student?.first_name + " " + student?.middle_name + " " + student?.last_name}
                        </Link>
                      </td>
                      <td>{student?.studentProfile?.UIN}</td>
                      <td>
                        <a
                          href={"mailto:" + student?.email}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='no-underline text-blue-500 hover:text-blue-700'
                        >
                          {student?.email}
                        </a>
                      </td>
                      <td>{student?.number}</td>
                      <td>
                        <a
                          href={BASE_URL + student?.studentProfile?.resume?.filepath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='no-underline text-blue-500 hover:text-blue-700'
                        >
                          View Resume
                        </a>
                      </td>
                      <td>{student?.studentProfile?.internship?.length || 0}</td>
                      <td>{student?.studentProfile?.appliedJobs?.length || 0}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={8}>No Student Registered!</td>
                </tr>
              )
            }

          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};


export default StudentTable;