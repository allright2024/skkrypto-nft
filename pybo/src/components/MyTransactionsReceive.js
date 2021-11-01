import styled from "styled-components";
import kakaoTalk from "../assets/kakaoTalk.png";
import { HStack, Text } from "@chakra-ui/layout";
import { useState, useEffect } from "react";

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

const getRequest=(jsons)=>{
  return{
      method:'POST',
      header:{
          'Content-Type':'application/json',
          "Access-Control-Allow-Origin":"*",
          'Access-Control-Allow-Headers':"*"                
      },
      body:JSON.stringify(jsons)
  }
}

export default function MyTransactionsAll() {
  const [fromListState, setFromListState] = useState(["Not Found"]);
  const [toListState, setToListState] = useState(["Not Found"]);
  const [typeListState, setTypeListState] = useState(["Not Found"]);
  const [valueListState, setValueListState] = useState(["Not Found"]);
  const [dateListState, setDateListState] = useState(["Not Found"]);
  const [hashListState, setHashListState] = useState(["Not Found"]);

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
          for(let i = 1; i <= Object.keys(jsons).length; i++) {
            if(jsons[i].to == "0x61C95C10959056297077E85c444EFE95c3BEf2d2") {
              fromList.push(jsons[i].from);
              typeList.push(jsons[i].type);
              valueList.push(jsons[i].value);
              dateList.push(jsons[i].create_date);
              hashList.push(jsons[i].hash);
            }
          }
          setFromListState(fromList);
          setTypeListState(typeList);
          setValueListState(valueList);
          setDateListState(dateList);
          setHashListState(hashList);
        });
    }, [])

  const createTransactionTable = () => {
    const displayedTable = [];
    for(let i = 0; i < valueListState.length; i++) {
      displayedTable.push(
        <tr>
          <Td>
            <HStack justifyContent="center">
              <Icon src={kakaoTalk} />
              <Text>kakaoPay</Text>
            </HStack>
          </Td>
          <Time>{dateListState[i]}</Time>
          <Td>{fromListState[i]}</Td>
          <Td>{valueListState[i]}</Td>
          <Td>{hashListState[i]}</Td>
        </tr>
      )
    }
    return(
      <Table>
      <thead>
        <tr>
          <Th>플랫폼</Th>
          <Th>시간</Th>
          <Th>FROM</Th>
          <Th>금액</Th>
          <Th>HASH</Th>
        </tr>
      </thead>

      <tbody>
        {displayedTable}
      </tbody>
    </Table>
    )
  }

  return (
    <>
      {createTransactionTable()}
    </>
  );
}
