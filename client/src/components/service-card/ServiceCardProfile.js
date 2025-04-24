import React from 'react'
import { Link } from 'react-router-dom'
import './ServiceCard.css'
import Rating from '../rating/Rating'
import defaultImage from '../../assets/images/default-user-image.png'
import Cookies from 'js-cookie';
import { NavLink, useParams } from 'react-router-dom';
import { gql, useQuery,useMutation } from '@apollo/client';
// import { DELETE_SERVICE } from '../../graphql/mutation'
import axios from 'axios';
const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            profile_picture
            bio
        }
    }
`;



const ServiceCardProfile = ({ service,user }) => {


    // const [deletePost, { errr }] = useMutation(DELETE_SERVICE);

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { userId: id },
    }
    );
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);


    const isFreelancer = Cookies.get('isFreelancer');

    // const deleteService=(id)=>{
    //     // console.log(id)
    //     deletePost({
    //         variables: { serviceId: id },
    //     });
    // };

    // const handleClick = (userId) => {
    //     const requestOptions = {
    //       method: 'DELETE'
    //     };
      
    //     // Note: I'm using arrow functions inside the `.fetch()` method.
    //     // This makes it so you don't have to bind component functions like `setState`
    //     // to the component.
    //     fetch("http://localhost:4000//service/" + userId, requestOptions).then((response) => {
    //       return response.json();
    //     }).then((result) => {
    //       // do what you want with the response here
    //     });
    //   }


    const handleClickDelete = async (service_id) => { 
        const userConfirmed = window.confirm(
            "Are you sure you want to delete this record?"
          );


        if (userConfirmed) {
        const response = await axios
          .delete(`http://localhost:4000/service/${service_id}`)
          .then((response) => {
            console.log("Record Deleted:", response.data);
          })
          .catch((error) => {
            console.error("Error >>>>:", error);
        }); 
        }
        else {
            // If the user cancels, you can provide feedback or take other actions
            console.log("Delete operation canceled by the user.");
        }
        window.location.reload();
    }
    return (
        <div className="service-card">
            {/* <Link to={`/services/${service._id}`}> */}



                <div className='service-card__wrapper'>
                    <div className='service-card__body__wrapper'>
                        <div className='service-card__header'>
                            <div className='service-card__header__freelancer-info'>
                            <img src={service.images[0] ? service.images[0] : ""} alt={service.name} />
                                <p>{service.freelancer.username ? service.freelancer.username : ""}</p>
                            </div>
                    <div className='service___buttons'>
                            {
                    isFreelancer === 'true' && user === id ? (
                        // <NavLink to={`/create-order/${data.service._id}`}>
                            <button 
                            // onClick={()=>deleteService(service._id)} 
                            onClick={() => { handleClickDelete(service._id) }}
                            className="cta">DELETE</button>
                        // </NavLink>
                    ) : null
                    }
                        {
                    isFreelancer === 'true' && user === id ? (
                        // <NavLink to={`/create-order/${data.service._id}`}>
                        <Link to={`/edit-services/${service._id}`}>
                            <button className="cta">UPDATE</button>
                        </Link>
                        // </NavLink>
                    ) : null
                    }

                    </div>
                        </div>
                        <div className='service-card__image'>
                            <img src={service.images[0] ? service.images[0] : ""} alt={service.name} />
                        </div>
                        <Rating value={
                            service.rating ? service.rating : 0
                        } count={
                            service.reviews ? service.reviews.length : 0
                        } />
                        <h3 className='service-card__title'>
                            {service.title}
                        </h3>
                    </div>
                    <div className='service-card__price__wrapper'>
                        <p>BASE PRICE</p>
                        <div className='service-card__price'>
                            Rs{service.price}
                        </div>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    )
}

export default ServiceCardProfile;
