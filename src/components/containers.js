import { useSelector } from "react-redux";
import styledComponents from "styled-components";

export const InputContainer = styledComponents.div`
  padding:.5rem 1rem;
  font-size:1.2rem;
  input{
    color:${({ mode,theme }) => mode ? theme.dark[ 0 ] : theme.light[ 4 ]};
    padding:.5rem;
    background:transparent;
    outline:none;
    border:none;
    width:100%;
    font-size:1.2rem;
}`;

export const StyledLink = styledComponents.div`
text-align:center;
color:${({ mode,theme }) => mode ? theme.dark[ 2 ] : theme.light[ 4 ]};
a{
  text-decoration:none;
  color:${({ theme }) => theme.primary};
}`;

export const Flex = styledComponents.div`
display:flex;
justify-content:center;
align-items:center;
gap:1rem;
`;

const Main = styledComponents.section`
  display:flex;
  justify-content:center;
  min-height:100vh;
  background-image:url('${({ backgroundImage }) => backgroundImage}');
  background-repeat:no-repeat;
  background-size:100%;
  background-color:${({ theme,mode }) => mode ? theme.dark[ 6 ] : theme.light[ 1 ]};
  @media screen and (min-width:500px) {
    background-image:url('${({ backgroundImageDesktop }) =>
    backgroundImageDesktop}');
}`;

export const Container = styledComponents.section`
  display:flex;
  flex-direction:column;
  padding:1rem;
  justify-content:center;
  gap : 1rem;
  width:100%;
  max-width:40rem;
`;

export const FilterContainer = styledComponents.section`
display:flex;
justify-content:center;
gap:1rem;
font-weight:700;
color:${({ theme,mode }) => mode ? theme.dark[ 3 ] : theme.light[ 3 ]};
&>h1:hover{
    color:${({ theme,mode }) => mode ? theme.dark[ 0 ] : theme.light[ 4 ]};
    cursor:pointer;
}
h1:nth-of-type(${({ child }) => (child + 1)}) {
  color:${({ active }) => (active)}
}
`;

export const ListContainer = styledComponents.section`
padding:1rem 1.5rem;;
display:flex;
flex-direction:column;
gap:2px;
background-color:${({ mode,theme }) => mode ? theme.dark[ 5 ] : theme.light[ 0 ]};
border-radius:5px;
`;

export const ListContainerCont = styledComponents.section`
display:flex;
flex-direction:column;
background:${({ mode,theme }) => mode ? theme.dark[ 5 ] : theme.light[ 0 ]};
border-radius:5px;
`;

export const ItemDes = styledComponents.footer`
padding:1rem;
display:flex;
color:${({ mode,theme }) => mode ? theme.dark[ 3 ] : theme.light[ 2 ]};
justify-content:space-between;
&>h1:hover{
    color:${({ mode,theme }) => mode ? theme.dark[ 1 ] : theme.light[ 3 ]};
    cursor:pointer;
}`;

const Background = ({
  children,
  backgroundImage,
  backgroundImageDesktop,
}) => {
  const mode = useSelector((state) => state.darkMode)
  return (
    <Main
      mode={mode}
      backgroundImage={backgroundImage}
      backgroundImageDesktop={backgroundImageDesktop}
    >
      <Container>{children}</Container>
    </Main>

  );
};

export default Background;
