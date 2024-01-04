import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import './ServicosStyle.css'

const ServicosComponent = ({titulo,descricao,imagem}) => {
  return (
    
    <Box sx={{marginTop:'50px'}}>

    
      <Card  id="card-servicos" sx={{ maxWidth: 240, marginBottom: "-100px" }}>
        <CardMedia   sx={{ width:'70px', height: '70px', marginTop:'20px'}}
         image={imagem}
        />
        <CardContent sx={{ height: 40 }}>
          <Typography id="titulo-servicos" gutterBottom variant="h5" component="div">
            {titulo}
          </Typography>
        </CardContent>
        <CardActions>
          
        </CardActions>
      </Card>
    </Box>
  );
};

export default ServicosComponent;
