import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Category() {
  return (
    <List>
      <div>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </div>
      <div>
        <FaHamburger />
        <h4>American</h4>
      </div>
      <div>
        <GiNoodles />
        <h4>Thai</h4>
      </div>
      <div>
        <GiChopsticks />
        <h4>Japanese</h4>
      </div>
    </List>
  );
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`

export default Category;
