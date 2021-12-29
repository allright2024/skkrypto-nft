import styled from "styled-components";

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

const Time = styled.td`
color: #aeb4c4;
text-align: center;

`;

export default function LatestBlock() {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Block Number</Th>
          <Th>시간</Th>
          <Th>HASH</Th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <Td>12523</Td>
          <Time>2021-09-26 14:13:40</Time>
          <Td>
            ebca498ec6fd35edc284e67f70ea5f0b53976925e6b140110e0b407b7ae5eaef
          </Td>
        </tr>

        <tr>
          <Td>12523</Td>
          <Time>2021-09-26 14:13:40</Time>
          <Td>
            ebca498ec6fd35edc284e67f70ea5f0b53976925e6b140110e0b407b7ae5eaef
          </Td>
        </tr>
      </tbody>
    </Table>
  );
}
