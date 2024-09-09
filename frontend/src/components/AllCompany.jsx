import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import { useLocation, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalBox from './Modal';
import Toast from './Toast';

function AllCompany() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [companys, setCompanys] = useState({});

  const [modalBody, setModalBody] = useState({
    companyName: "",
    companyId: ""
  });

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // useState for Modal display
  const [showModal, setShowModal] = useState(false);

  const fetchCompanys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4518/company/company-detail', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setCompanys(response.data.companys);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
    }
  }

  const handleDeleteCompany = (companyName, companyId) => {
    setModalBody({ companyId: companyId, companyName: companyName });
    setShowModal(true);
  }

  const confirmDelete = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4518/company/delete-company',
        { companyId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        },
      );

      setShowModal(false);
      fetchCompanys();
      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error?.response?.data?.msg);
        setShowToast(true);
      }
      console.log("Error deleting job ", error);
    }
  }

  const renderTooltipDeleteCompany = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete Company
    </Tooltip>
  );

  const renderTooltipEditCompany = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit Company
    </Tooltip>
  );


  const closeModal = () => setShowModal(false);

  const { showToastPass, toastMessagePass } = location.state || { showToastPass: false, toastMessagePass: '' };

  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      // Clear the state after the toast is shown
      navigate('.', { replace: true, state: {} });
    }
    fetchCompanys()
  }, []);
  return (
    <>
      <>
        {/* Toast Component */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage}
          delay={3000}
          position="bottom-end"
        />

        <div className=''>
          {
            loading ? (
              // fake table loading animation 
              <div>
                <Table striped bordered hover className='bg-white my-6 rounded-lg shadow w-full'>
                  <thead>
                    <tr>
                      <th>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </th>
                      <th>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </th>
                      <th>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </th>
                      <th>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </th>
                      <th>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </th>
                      <th>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                {/* <i className="fa-solid fa-spinner fa-spin text-3xl" /> */}
              </div>
            ) : (
              <Table striped bordered hover className='bg-white my-6 rounded-lg shadow w-full text-base'>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>Sr. No.</th>
                    <th style={{ width: '15%' }}><b>Company Name</b></th>
                    <th style={{ width: '15%' }}>Company Website</th>
                    <th style={{ width: '15%' }}>Company Location</th>
                    <th style={{ width: '15%' }}>Company Difficulty Level</th>
                    <th style={{ width: '15%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companys?.length > 0 ? (
                    companys?.map((company, index) => (
                      <tr key={company?._id}>
                        <td>{index + 1}</td>
                        <td>
                          <b>
                            {company?.companyName}
                          </b>
                        </td>
                        <td>
                          <a 
                          href={company?.companyWebsite} 
                          target="_blank" 
                          className='text-blue-500 no-underline'
                          rel="noopener noreferrer"
                          >
                            {company?.companyWebsite}
                          </a>
                        </td>
                        <td>
                          {company?.companyLocation}
                        </td>
                        <td>
                          {
                            company?.companyDifficulty === "Easy" && (
                              <span className='bg-green-500 text-white px-2 py-1 rounded'>{company?.companyDifficulty}</span>
                            )
                          }
                          {
                            company?.companyDifficulty === "Moderate" && (
                              <span className='bg-orange-500 text-white px-2 py-1 rounded'>{company?.companyDifficulty}</span>
                            )
                          }
                          {
                            company?.companyDifficulty === "Hard" && (
                              <span className='bg-red-500 text-white px-2 py-1 rounded'>{company?.companyDifficulty}</span>
                            )
                          }
                        </td>
                        <td>
                          {/* for hover label effect  */}
                          <div className="flex justify-around items-center">
                            <div className="px-0.5">
                              {/* edit company  */}
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipEditCompany}
                              >
                                <i
                                  className="fa-regular fa-pen-to-square text-2xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-500"
                                  onClick={() => navigate(`../tpo/add-company/${company._id}`)}
                                  onMouseEnter={(e) => {
                                    e.target.classList.add('fa-solid');
                                    e.target.classList.remove('fa-regular');
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.classList.add('fa-regular');
                                    e.target.classList.remove('fa-solid');
                                  }}
                                />
                              </OverlayTrigger>
                            </div>
                            <div className="px-0.5">
                              {/* delete company  */}
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipDeleteCompany}
                              >
                                <i
                                  className="fa-regular fa-trash-can text-2xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-red-500"
                                  onClick={() => handleDeleteCompany(company?.companyName, company?._id)}
                                  onMouseEnter={(e) => {
                                    e.target.classList.add('fa-solid');
                                    e.target.classList.remove('fa-regular');
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.classList.add('fa-regular');
                                    e.target.classList.remove('fa-solid');
                                  }}
                                />
                              </OverlayTrigger>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Jobs found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )
          }
        </div >


        {/* ModalBox Component for Delete Confirmation */}
        <ModalBox
          show={showModal}
          close={closeModal}
          header={"Confirmation"}
          body={`Do you want to delete company ${modalBody.companyName}?`}
          btn={"Delete"}
          confirmAction={() => confirmDelete(modalBody.companyId)}
        />
      </>
    </>
  )
}

export default AllCompany
