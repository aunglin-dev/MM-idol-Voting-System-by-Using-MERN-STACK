import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import myImage from "../Image/Logo_of_Myanmar_Idol-removebg-preview.png";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const currentTime = moment();

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewsCard({ news }) {
  const [expanded, setExpanded] = useState(false);
  const [admins, setAdmins] = useState([]);
  const { currentAdmin } = useSelector((state) => state.admin);

  const fetchAdmin = async () => {
    const res = await axios.get(`/auth/findAdmin/${news.AdminId}`);
    setAdmins(res.data);
  };

  const handleDelete = async () => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this News?"
    );

    if (confirmed) {
      try {
        const res = await axios.delete(`/news/${news._id}`);
        console.log(res.status);
        if (res.status === 200) {
          const resDetailedNews = await axios.post("/news/savedNewsDetail", {
            NewsId: news._id,
            Transaction: "Delete",
          });

          resDetailedNews.status === 200 &&
            window.alert("News is successfully deleted");
        } else {
          window.alert("Failed to delete news");
        }
      } catch (error) {
        // If an error occurs during deletion, display error message
        window.alert("An error occurred while deleting the video");
      }
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    fetchAdmin();
    console.log(admins);
  }, []);
  return (
    <Card
      component="main"
      sx={{
        width: { xs: "100%", md: "75%" },
        ml: { xs: "0", md: "12%" },
        mr: "8%",
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          currentAdmin && (
            <Tooltip title="delete this news">
              <IconButton onClick={handleDelete} aria-label="settings">
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          )
        }
        title={`${admins?.name}`}
        subheader={moment
          .duration(
            currentTime.diff(
              moment(news?.createdAt).format("YYYY-MM-DD HH:mm:ss")
            )
          )
          .humanize()}
      />
      <CardMedia
        component="img"
        height="350"
        cover
        image={news?.imgUrl}
        alt="No Image"
      />

      <CardActions disableSpacing>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {news?.title}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph> {news?.title}</Typography>
          <Typography paragraph>{news?.desc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
