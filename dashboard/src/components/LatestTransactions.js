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
  margin-left: 10px;
`;

const Time = styled.td`
color: #aeb4c4;
text-align: center;

`;

export default function LatestTransactions() {
  return (
    <Table>
      <thead>
        <tr>
          <Th> </Th>
          <Th>플랫폼</Th>
          <Th>시간</Th>
          <Th>FROM</Th>
          <Th>TO</Th>
          <Th>금액</Th>
          <Th>HASH</Th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <Td>
            <Icon src={kakaoTalk} />
          </Td>
          <Td>kakaoPay</Td>
          <Time>2021-09-26 14:13:40</Time>
          <Td>0xF503f059...</Td>
          <Td>0xF503f059...</Td>
          <Td>금액</Td>
          <Td>ebcaef...</Td>
        </tr>

        <tr>
          <Td>
            <Icon src={kakaoTalk} />
          </Td>
          <Td>kakaoPay</Td>
          <Time>2021-09-26 14:13:40</Time>
          <Td>0xF503f059...</Td>
          <Td>0xF503f059...</Td>
          <Td>금액</Td>
          <Td>ebcaef...</Td>
        </tr>
      </tbody>
    </Table>
  );
}
