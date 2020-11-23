import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../assets/img/login-ban.png";
import image2 from "../assets/img/hawan.jpg";
import image3 from "../assets/img/slider1.jpg";
import image4 from "../assets/img/slider3.jpg";


export default class Slider extends Component {
    render() {
        return (
            <div>
                <AliceCarousel autoPlay autoPlayInterval="3000">
                    <img src={image1} className="sliderimg" />
                    <img src={image2} className="sliderimg" />
                    <img src={image3} className="sliderimg" />
                    <img src={image4} className="sliderimg" />
                </AliceCarousel>
            </div>
        )
    }
}
