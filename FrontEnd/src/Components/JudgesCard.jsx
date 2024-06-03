import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import myImage from "../Image/Logo_of_Myanmar_Idol-removebg-preview.png";

const JudgesCard = ({ judges }) => {
  return (
    <Card sx={{ width: { md: 337, xs: 470 }, boxShadow: 4 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={judges.imgUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" bold component="div">
            {judges.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {judges.History}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JudgesCard;
