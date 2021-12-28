import { HStack, Text } from "@chakra-ui/layout";
import styled from "styled-components";
import kakaoTalk from "../assets/kakaoTalk.png";
import { useEffect, useState } from "react";

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

const getRequest = (jsons) => {
  return {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(jsons),
  };
};

export default function LatestTransactions() {
  const [tran, setTran] = useState();
  // setTran(props.tran);
  const [fromList, setFromListState] = useState(["Not Found"]);
  const [toList, setToListState] = useState(["Not Found"]);
  const [typeList, setTypeListState] = useState(["Not Found"]);
  const [valueList, setValueListState] = useState(["Not Found"]);
  const [dateList, setDateListState] = useState(["Not Found"]);
  const [hashList, setHashListState] = useState(["Not Found"]);

  useEffect(() => {
    const fromList = [];
    const toList = [];
    const typeList = [];
    const valueList = [];
    const dateList = [];
    const hashList = [];
    const requestOpt = getRequest();
    fetch("http://localhost:5000/api/viewAll", requestOpt)
      .then((response) => response.json())
      .then((jsons) => {
        console.log(jsons);
        for (let i = 1; i <= Object.keys(jsons).length; i++) {
          fromList.push(jsons[i].from);
          toList.push(jsons[i].to);
          typeList.push(jsons[i].type);
          valueList.push(jsons[i].value);
          dateList.push(jsons[i].create_date);
          hashList.push(jsons[i].hash);
        }
        setFromListState(fromList);
        setToListState(toList);
        setTypeListState(typeList);
        setValueListState(valueList);
        setDateListState(dateList);
        setHashListState(hashList);
      });
  }, []);

  const view = () => {
    const result = [];
    const realResult = [];

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
    console.log(typeof dateList);
    if (typeof dateList === "object") {
      for (let i = 0; i < dateList.length; i++) {
        // console.log('asd');
        result.push(
          <tr>
            <Td>
              <HStack justifyContent="center">
                <Icon src={kakaoTalk} />
                <Text>{typeList[i]}</Text>
              </HStack>
            </Td>
            <Time>{dateList[i]}</Time>
            <Td>{fromList[i]}...</Td>
            <Td>{toList[i]}...</Td>
            <Td>{valueList[i]}</Td>
            <Td>{hashList[i]}</Td>
          </tr>
        );
      }
      console.log(result);
    }
    realResult.push(<tbody>{result}</tbody>);

    return <Table>{realResult}</Table>;
  };
  return <>{view()}</>;
}
