import { HStack, Text } from "@chakra-ui/layout";
import styled from "styled-components";
import kakaoTalk from "../assets/kakaoTalk.png";

const Table = styled.table`
  width: 100%;
`;

const Td = styled.td`
  text-align: center;
  padding: 5px;
`;

const Th = styled.th`
  font-weight: 800;
  color: #4318ff;
  text-align: center;
  border-bottom: 2px solid #4318ff;
`;

const Icon = styled.img`
  src: ${(props) => props.src};
  width: 20px;
  alt: "kakao";
`;

const Time = styled.td`
  color: #aeb4c4;
  text-align: center;
`;

export default function LatestTransactions(props) {

  const view = ()=>{
    let tran = props.tran;
    const result = [];
    const realResult=[];
    realResult.push(
    <thead>
      <tr>
        <Th>플랫폼</Th>
        <Th>시간</Th>
        <Th>FROM</Th>
        <Th>TO</Th>
        <Th>금액</Th>
        <Th>HASH</Th>
      </tr>
    </thead>
    );
    if(typeof props.tran === "object"){
      for(let i=0;i<props.tran[0]?.length;i++){
        console.log('asd');
        result.push(
          <tr>
            <Td>
              <HStack justifyContent="center">
                <Icon src={kakaoTalk} />
                <Text>{props.tran[3][i]}</Text>
              </HStack>
            </Td>
            <Time>{props.tran[4][i]}</Time>
            <Td>{props.tran[0][i].slice(0,8)}...</Td>
            <Td>{props.tran[1][i].slice(0,8)}...</Td>
            <Td>{props.tran[2][i]}</Td>
            <Td>{props.tran[5][i]}</Td>
          </tr>
        )
      }
      console.log(result);
    }
    realResult.push(<tbody>{result}</tbody>);

    return <Table>{realResult}</Table>
  }
  return (
    <>
      {view()}
    </>
  );
}
