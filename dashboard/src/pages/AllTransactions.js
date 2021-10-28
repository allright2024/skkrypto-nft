import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";

function AllTransactions() {
  return (
    <Flex m={10} flexDirection="column" w="full">
      <Text fontSize="3xl" fontWeight="700">
        전체 거래내역
      </Text>

      {/* 그래프 */}

      <VStack w="full" backgroundColor="white" borderRadius="5px" p={5}>
        
          <HStack justifyContent="space-between" w="full">
            <Text color="#4318FF" fontWeight={700}>Latest Blocks</Text>
            <Box
              as="button"
              backgroundColor="#4318FF"
              color="white"
              borderRadius="3px"
              width="60px"
              fontWeight="bold"
            >
              + More
            </Box>
          </HStack>
          
          <HStack justifyContent="space-around">
          <Text color="#4318FF" fontWeight={700}>Block Number</Text>
          <Text color="#4318FF" fontWeight={700}>시간</Text>
          <Text color="#4318FF" fontWeight={700}>Hash</Text>


          </HStack>

        </VStack>

        

      {/* 거래내역 */}
    </Flex>
  );
}

export default AllTransactions;
