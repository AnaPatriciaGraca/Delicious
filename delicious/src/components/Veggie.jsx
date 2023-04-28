import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

function Veggie() {

  const [veggie, setVeggie] = useState([]);

  //running getVeggiehas soon as the component gets mounted => []
  useEffect(() => {
    getVeggie();
  },[]);

  //get data
  const getVeggie = async () => {
    //see if there's anything in our local storage; if not fetch it
    //so we don't max out the API resources
    const check = localStorage.getItem('veggie');

    if(check){
      //parsing back from string to array
      setVeggie(JSON.parse(check));
    }else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`);
      const data = await api.json();
      
      //local storage only saves strings, that's why we're using stringify
      localStorage.setItem('veggie', JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data.recipes);
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: '5rem',
        }}>
        {veggie.map((recipe) => {
          return(
            <SplideSlide key={recipe.id}>
              <Card>
                <p>{recipe.title}</p>
                <img  src={recipe.image} alt={recipe.title}/>
                <Gradient />
              </Card>
            </SplideSlide>
          );
        })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    //width: 100%;
    height: auto,
    object-fit: cover;

  }
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%
    text-align: center;
    font-weght: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: auto;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))
`

export default Veggie;