import React from 'react';
import './Service.css';
import Rating from '../../components/rating/Rating';
import ImageCarousel from '../../components/carousel/ImageCarousel';
import Reviews from '../../components/reviews/Reviews';
import { NavLink, useParams } from 'react-router-dom';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import { useQuery, gql } from '@apollo/client';
import defaultImage from '../../assets/images/default-user-image.png';
import { useContext } from 'react';
import UserContext from '../../UserContext';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const GET_service_BY_ID = gql`
    query GetServiceById($serviceId: ID!) {
        service(serviceId: $serviceId) {
            _id
            title
            description
            youtubelink
            xlink
            instalink
            price
            images
            brandimages
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

function Service() {

    // const[yid,setYid] = useState();
    
    const { id } = useParams();
    
    const userId = useContext(UserContext).userId;
    const isFreelancer = Cookies.get('isFreelancer');
    
    const { loading, error, data } = useQuery(GET_service_BY_ID, {
        variables: { serviceId: id },
    }
);
if (loading) return <LoadingIndicator />;
if (error) return `Error! ${error.message}`;
// if (data) console.log(data);





// if(data.service.youtubelink!=='no__value'){

// fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCRgsRWJUiRScjQWG_790zbQ&key=AIzaSyCQd11PqBEgv4pVu9fHWSTroZBJu15xmsM`)
// .then((res) => {
//   return res.json();
// })
// .then((data) => {
//   console.log(data.items[0].statistics.subscriberCount);
//   setYid(data.items[0]);
// });

// }


    return (
        <div className="service__wrapper row">
            <div className='service__container col-xs-12 col-sm-12 col-md-9 col-lg-9'>
                <div className="service-info__container">
                    <div className="flex2">
                    <div className="flexi">
                    <h1 className='service-title'>
                        {data.service.title}
                    </h1>
                   
                    <Rating value={
                        data.service.rating
                    } count={
                        data.service.reviews.length
                    } />
                    </div>

                     {
                    isFreelancer === 'false' && userId !== data.service.freelancer._id ? (
                        <NavLink to={`/create-order/${data.service._id}`}>
                            <button className="service-freelancer__hire-button">Hire</button>
                        </NavLink>
                    ) : null
                }
               </div>
               <div className="aboutSection">
               <h1 className='service-title-ab'>
                        ABOUT ME
                    </h1>
               <div className="aboutandimage">
                    
                    <div className="service-info__description">
                        {data.service.description}
                    </div>
                    <div className="service-image__carousel">
                        <ImageCarousel slidesToShow={1} slidesToScroll={1} images={
                            data.service.images
                        } />
                    </div>
                </div>
                <div className="statsFlex">
                {data.service.youtubelink==='no__value' ? null : 
                    <div className="service-info__description-t">
                    {data.service.youtubelink}
                    </div>
                    }
                    {data.service.xlink==='no__value' ? null : 
                    <div className="service-info__description-t">
                    {data.service.xlink}
                    </div>
                    }
                    {data.service.instalink==='no__value' ? null : 
                    <div className="service-info__description-t">
                    {data.service.instalink}
                    </div>
                    }
                    </div>
                    <div className="statsFlex">
                    <div className="service-info__description-t-x">YouTube Subscribers</div>
                    <div className="service-info__description-t-x">Instagram Followers</div>
                    <div className="service-info__description-t-x">X Followers</div>
                    </div>
                </div>
                
                   
                    {/* <div className="service-image__carousel">
                        <ImageCarousel slidesToShow={1} slidesToScroll={1} images={
                            data.service.brandimages
                        } />
                    </div> */}
                     <div className="aboutSection">
                     <h1 className='service-title-ab'>
                        BRANDS I HAVE WORKED WITH
                    </h1>
                    <div className='flexxxx'>
                    {
                        data.service.brandimages.map((image, index) => {
                            return (
                                <div className='brandImgDiv'key={index}>
                                    <img className='brandImages'src={image} alt="service" style={
                                        {
                                            width: "100%",
                                            height: "400px",
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }
                                    } />
                                </div>
                            )
                        })
                    }
                  </div>  
                  </div>
                </div>
                <Reviews serviceId={
                    data.service._id
                } />
            </div>
            
            {/* <div className="service-freelancer__container col-xs-12 col-sm-12 col-md-3 col-lg-3"> */}
                {/* <NavLink to={`/user/${data.service.freelancer._id}`} className="service-freelancer__link">
                    {/* <div className="service-freelancer__info">
                        <div className="service-freelancer__avatar">
                            <img src={
                                data.service.freelancer.profile_picture ? data.service.freelancer.profile_picture : defaultImage
                            } alt="avatar" />
                        </div>
                        <div className="service-freelancer__personal-info-wrapper">
                            <h3 className="service-freelancer__name">{
                                data.service.freelancer.username
                            }</h3>
                            <div className="service-freelancer__level">Noob</div>
                        </div>
                    </div> */}
                {/* </NavLink> */} 
                {/* <div className="service-freelancer__description">
                    {
                        data.service.freelancer.bio
                    }
                </div> */}
                
            {/* </div> */}
        </div>
    )
}

export default Service;