import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";
import { useState } from "react";
import MyTransactionsAll from "../components/MyTransactionsAll";
import MyTransactionsSend from "../components/MyTransactionsSend";
import MyTransactionsReceive from "../components/MyTransactionsReceive";
import TransactionsChart from "../components/TransactionsChart";
import { useWeb3React } from "@web3-react/core";

function MySelect({ select }) {
  if (select === 2) {
    return <MyTransactionsReceive />;
  } else if (select === 1) {
    return <MyTransactionsSend />;
  } else {
    return <MyTransactionsAll />;
  }
}

function MyTransactions() {
  const [index, setIndex] = useState(0);

  return (
    <Flex m={10} flexDirection="column" w="full">
      <Text fontSize="3xl" fontWeight="700">
        My 거래내역
      </Text>
      <VStack
        w="full"
        backgroundColor="white"
        borderRadius="5px"
        p={5}
        marginBottom={5}
        marginTop={5}
        borderRadius={20}
      >
        <TransactionsChart />
      </VStack>
      <HStack>
        <Box
          as="button"
          backgroundColor={index === 0 ? "#4318FF" : "white"}
          color={index === 0 ? "white" : "black"}
          borderRadius="3px"
          width="60px"
          fontWeight="bold"
          onClick={() => {
            setIndex(0);
          }}
        >
          ALL
        </Box>
        <Box
          as="button"
          backgroundColor={index === 1 ? "#4318FF" : "white"}
          color={index === 1 ? "white" : "black"}
          borderRadius="3px"
          width="60px"
          fontWeight="bold"
          onClick={() => {
            setIndex(1);
          }}
        >
          보낸 내역
        </Box>
        <Box
          as="button"
          backgroundColor={index === 2 ? "#4318FF" : "white"}
          color={index === 2 ? "white" : "black"}
          borderRadius="3px"
          width="60px"
          fontWeight="bold"
          onClick={() => {
            setIndex(2);
          }}
        >
          받은 내역
        </Box>
      </HStack>

      <VStack
        w="full"
        backgroundColor="white"
        borderRadius={20}
        p={5}
        marginTop={5}
      >
        <MySelect select={index} />
      </VStack>
    </Flex>
  );
}

export default MyTransactions;
