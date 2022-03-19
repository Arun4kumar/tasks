import styledComponents from "styled-components";

export const CheckBox = styledComponents.div`
height:1.5rem;
width:1.5rem;
cursor:pointer;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
background:${({ active }) =>
    !active
      ? `linear-gradient(145deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%))`
      : `none`};
border:${({ active,mode,theme }) => (active ? `2px solid ${mode ? theme.dark[ 4 ] : theme.light[ 1 ]}` : `none`)};
&:hover{
  border:${({ active,colorHover }) =>
    active ? `2px solid ${colorHover}` : `none`};
}`;
