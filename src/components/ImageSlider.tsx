import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { range } from "../utils/utils";

function ImageSlider() {
    const slideImageNum = 3;

    const handleDragStart = (e: any) => e.preventDefault();

    const items = range(1, slideImageNum + 1).map((idx: number) =>
        <img
            src={
                process.env.PUBLIC_URL + "/static/slide_images/slide_image" + idx + ".png"
            }
            width="100%"
            height="100%"
            onDragStart={handleDragStart}
            role="presentation"
        />
    );

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            autoPlay={true}
            autoPlayInterval={4000}
            animationDuration={2000}
            infinite={true}
            disableButtonsControls={true}
        />
    );
}

export default ImageSlider;