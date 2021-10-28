import { Flex, HStack, Text, VStack, Box} from "@chakra-ui/layout";

function MyTransactions() {
  return (
    <Flex m={10} flexDirection="column">

        <Text fontSize="3xl" fontWeight="700" >My 거래내역</Text>

        {/* 그래프 */}


        <HStack >
            <Box as="button" backgroundColor="white" borderRadius="3px" width="60px" fontWeight="bold">ALL</Box>
            <Box as="button" backgroundColor="white" borderRadius="3px" width="60px" fontWeight="bold">보낸 내역</Box>
            <Box as="button" backgroundColor="white" borderRadius="3px" width="60px" fontWeight="bold">받은 내역</Box>
        </HStack>

        {/* 거래내역 */}




      
    </Flex>
  );
}

export default MyTransactions;
