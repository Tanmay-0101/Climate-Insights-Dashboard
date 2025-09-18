import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, lightBlue, red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SunnyIcon from '@mui/icons-material/WbSunny';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HOT_URL = "https://images.unsplash.com/photo-1524594081293-190a2fe0baae?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
const COLD_URL = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
const HUMID_URL = "https://images.unsplash.com/photo-1518966820974-f748fde4b180?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function InfoBox({ info }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  const toggleIcon = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) alert("Thanks for liking the app!");
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardHeader
        title={info.city}
        subheader={`Temperature: ${info.temp}°C`}
      />
      {info.humidity > 80 
        ? <ThunderstormIcon sx={{ color: blueGrey[500] }} /> 
        : (info.temp > 15 
          ? <SunnyIcon sx={{ color: yellow[500] }} /> 
          : <AcUnitIcon sx={{ color: lightBlue[500] }} />)}

      <CardMedia
        component="img"
        height="300"
        image={info.humidity > 80 ? HUMID_URL : (info.temp > 15 ? HOT_URL : COLD_URL)}
        alt="Weather"
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
          <h2>{info.weather}</h2>
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={toggleIcon} aria-label="add to favorites">
          {isFavorite ? <FavoriteIcon sx={{ color: red[500] }} /> : <FavoriteIcon />}
        </IconButton>
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
          <Typography component={"span"}>
            <p>Feels Like: {info.feelsLike}°C</p>
          </Typography>
          <Typography component={"span"}>
            <p>Humidity: {info.humidity}%</p>
          </Typography>
          <Typography component={"span"}>
            <p>Min Temperature: {info.tempMin}°C</p>
          </Typography>
          <Typography component={"span"}>
            <p>Max Temperature: {info.tempMax}°C</p>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
