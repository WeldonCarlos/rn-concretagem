import React, { useRef, useState } from 'react';
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './carrossel.css'
import { Pagination } from 'swiper/modules';

import imagem1 from '../../assets/imagensCarrosselPrincipal/imagem1.jpg'
import imagem2 from '../../assets/imagensCarrosselPrincipal/imagem2.jpg'
import { width } from "@mui/system";



const CarrosselPrincipal = () => {

   const imagens = [
    {
        id:1,
        img:imagem1
    },
    {
        id:1,
        img:imagem2
    }, {
        id:1,
        img:imagem1
    }

]
  return (
    <Box>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {imagens.map((item)=>(
            <SwiperSlide key={item.id}><img src={item.img} alt="" /></SwiperSlide>
        ))}
        
        
      </Swiper>
   
 
    </Box>
  );
};

export default CarrosselPrincipal;