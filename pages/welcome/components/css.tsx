import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Modal } from 'antd';

const greyColor = '#DEDEDE 0% 0% no-repeat padding-box;'
export const Section = styled(Container)``;
export const SectionTop = styled.section`
    background: ${(props: { color: string }) => props.color == 'grey' ? `${greyColor}` : `#FFF`};
    padding: 0 20px 2rem 20px;
    border-radius: 0 0 20px 20px;
`;
export const Logo = styled.div`
  width: 60px;
  height: 60px;
  background: ${(props: { color: string }) => props.color == 'grey' ? `${greyColor}` : `#FFF`};
  border-radius : 10px;
`;

export const UserInfoContent = styled.div`
  display : flex;
  flex-direction : column;
  text-align : right;

  small {

  }
`;

export const SectionTopContent = styled.section`
  padding: 3rem 15px;
`;

export const ContentCircle = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
`;

export const Circle = styled.div`
  background :${(props: { dimension: string }) => props.dimension === '151px' || props.dimension === '50px'
    ? '#F0F0F0 0% 0% no-repeat padding-box;' : '#FFF'};
  height : ${(props: { dimension: string }) => props.dimension};
  width : ${(props: { dimension: string }) => props.dimension};
  border-radius : 50%;
`;

export const ContentTxt = styled.div`
  display : flex;
  justify-content : start;
  align-items : center;
  flex-direction : row;
  height : 100%;
`;

export const IntoTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 1.3rem;
`;

export const IntoSubTitle = styled.div`
  margin-bottom: 1.3rem;
`;

export const SectionMain = styled.section`
  margin : 50px 0;
`;

export const CardBody = styled.div`
  border-radius : 20px;
  background : ${greyColor};
  padding : 1rem;
  display : flex;
  cursor: pointer;
`;

export const CardBodyTheme = styled.div`
  border-radius : 20px;
  background : ${greyColor};
  padding : 1rem;
  display : flex;
  flex-direction : column;
  margin-bottom : 20px;
  cursor : pointer;
`;

export const LotText = styled.div`
  text-align: center;
  font-size: n14px;
  letter-spacing: 0px;
  color: #1C1F22;
  opacity: 1;
    margin: 8px 0;
  font-weight: 600;
`;

export const LotSubText = styled.span`
 display : block;
 text-align : center;
`

export const CirclePlus = styled.div`
  background : #F0F0F0 0% 0% no-repeat padding-box;
  height : ${(props: { dimension: string }) => props.dimension};
  width : ${(props: { dimension: string }) => props.dimension};
  border-radius : 50%;
  display : flex;
  justify-content : center;
  align-items : center;
`;

export const FormNumeroContent = styled.div`
  padding: 30px 25px;
  background: ${greyColor};
  border-radius: 16px;
`;

