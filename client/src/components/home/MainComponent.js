import React, { useEffect } from 'react'
import Banner from './Banner'
import "./home.css";
import Slide from './Slide';
import {getProducts} from ".../redux/actions";
import {useDispatch,useSelector} from "react-redux"

const MainComponent = () => {

  const {products} = useSelector(state =>state.getProductsdata);
  console.log(products);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

  return (
    <div className='home_section'>
      <div className='banner_part'>
        <Banner />
      </div>

      <div className='slide_part'>
        <div className='left_slide'>
          <Slide title="Deal Of The Day"/>
        </div>
        <div className='right_slide'>
          <h4>Festive latest launchest</h4>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt='festive Image' />
          <a href="#">see More</a>
        </div>
      </div>

      <Slide title="Today's Deal"/>
        <div className='center_img'>
          <img src='https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg' alt='DeskTop Banner'/>
        </div>
      <Slide title="Best Seller"/>
      <Slide title="Upto 80% off"/>
      
    </div>
  )
}

export default MainComponent
