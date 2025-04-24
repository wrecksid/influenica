import React, { useCallback, useContext, useEffect } from 'react';
import './CreateService.css';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useMutation, gql, useQuery } from '@apollo/client';
import ImageDropZone from '../../components/image-drop-zone/ImageDropZone';
import UserContext from '../../UserContext';
import { useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';

const GET_service_BY_ID = gql`
    query GetServiceById($serviceId: ID!) {
        service(serviceId: $serviceId) {
            _id
            title
            description
            youtubelink
            xlink
            instalink
            about
            price
            images
            rating
            freelancer {
                _id
                username
                profile_picture
                bio
            }
            reviews {
                _id
                rating
                content
                reviewer {
                    _id
                    username
                    profile_picture
                }
            }
        }
    }
`;

function CreateService() {
    
    const [formData, setFormData] = useState({
        service_title: '',
        service_about: '',
        service_description: '',
        service_youtubelink: '',
        service_xlink: '',
        service_instalink: '',
        service_about: '',
        service_price: '',
      });

    const { id } = useParams();

    const navigate = useNavigate();

    const userId = useContext(UserContext).userId;

    const { loading, error, data } = useQuery(GET_service_BY_ID, {
        variables: { serviceId: id },
    }
);

if (loading) return <LoadingIndicator />;
if (error) return `Error! ${error.message}`;
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        // console.log(formData);
      };

    const updateService = async (service_id, formData) => {
        if(!formData.service_title) formData.service_title=data.service.title
        if(!formData.service_about) formData.service_about=data.service.about
        if(!formData.service_description) formData.service_description=data.service.description
        if(!formData.service_youtubelink) formData.service_youtubelink=data.service.youtubelink
        if(!formData.service_xlink) formData.service_xlink=data.service.xlink
        if(!formData.service_instalink) formData.service_instalink=data.service.instalink
        if(!formData.service_price) formData.service_price=data.service.price

        console.log(formData);

        try {
          const response = await axios.put(`http://localhost:4000/service-edit/${service_id}`, formData);
        //   return response.data;
        navigate('/');
        } catch (error) {
          console.error('Error updating service:', error);
          throw error;
        }
      };

    
    return (
        <div className='create-service__container col-xs-12 col-sm-12 col-md-8 col-lg-6'>
            <h1>Update Service</h1>
            <div >
                <div className='input__container'>
                    <label htmlFor="service_title">Name</label>
                    <input
                        className="inputPannel"
                        id="service_title"
                        name="service_title"
                        type="text"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_title}
                        placeholder={data.service.title}
                    />
                </div>

                <div className='input__container'>
                    <label htmlFor="service_title">Short note about you</label>
                    <input
                        className="inputPannel"
                        id="service_about"
                        name="service_about"
                        type="text"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_about}
                        placeholder={data.service.about}
                    />
                </div>

                <div className='input__container'>
                    <label htmlFor="service_description">Description</label>
                    <textarea
                        className="inputPannel"
                        id="service_description"
                        name="service_description"
                        rows={10}
                        type="text"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_description}
                        placeholder={data.service.description}
                    />
                </div>
                
                <div className='input__container'>
                    <label htmlFor="service_youtubelink">Youtube Channel Subscriber Count</label>
                    <input
                        className="inputPannel"
                        id="service_youtubelink"
                        name="service_youtubelink"
                        type="text"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_youtubelink}
                        placeholder={data.service.youtubelink}
                    />
                </div>

                <div className='input__container'>
                    <label htmlFor="service_xlink">X Followers Count</label>
                    <input
                        className="inputPannel"
                        id="service_xlink"
                        name="service_xlink"
                        type="text"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_xlink}
                        placeholder={data.service.xlink}
                    />
                </div>

                <div className='input__container'>
                    <label htmlFor="service_instalink">X Followers Count</label>
                    <input
                        className="inputPannel"
                        id="service_instalink"
                        name="service_instalink"
                        type="text"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_instalink}
                        placeholder={data.service.instalink}
                    />
                </div>

                
                <div className='input__container'>
                    <label htmlFor="service_price">Price</label>
                    <input
                        className="inputPannel"
                        id="service_price"
                        name="service_price"
                        type="number"
                        onChange={handleInputChange}
                        // onBlur={formik.handleBlur}
                        value={formData.service_price}
                        placeholder={data.service.price}
                    />
                </div>
                <button className='create-service__submit-button btnbtn' onClick={()=>updateService(id,formData)} >Submit</button>
            </div >
        </div >
    )
}

export default CreateService;