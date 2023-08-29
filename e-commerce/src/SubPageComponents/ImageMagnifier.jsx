import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
//import ReactImageMagnify from 'react-image-magnify';

export default function ImageMagnifier({ url }) {
  return (

    // <TransformWrapper
    //   initialScale={1}
    //   initialPositionX={200}
    //   initialPositionY={100}
    // >
    //   {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
    //     <React.Fragment>
    //       <div className="tools text-center">
    //         <button onClick={() => zoomIn()}>+</button>
    //         <button onClick={() => zoomOut()}>-</button>
    //         <button onClick={() => resetTransform()}>x</button>
    //       </div>
    //       <TransformComponent>
    //         <img src={url} alt="test" />
    //       </TransformComponent>
    //     </React.Fragment>
    //   )}
    // </TransformWrapper>

    <TransformWrapper>
      <TransformComponent>
        <img src={url} alt="test" />
      </TransformComponent>
    </TransformWrapper>

    // <img
    //   className='max-w-full'
    //   src={url} alt="" />

    // <div style={{ width: '100%', height: '100%' }}>
    //   <div
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <ReactImageMagnify
    //       {...{
    //         smallImage: {
    //           alt: 'Wristwatch by Ted Baker London',
    //           src: url,
    //           isFluidWidth: true,
    //         },
    //         largeImage: {
    //           src: url,
    //           width: 1200, // Replace with the actual width of the large image
    //           height: 1800, // Replace with the actual height of the large image
    //         },
    //         enlargedImagePosition: 'over', // Set 'over' to show the zoomed image over the original image
    //       }}
    //     />
    //   </div>
    // </div>
  );
}