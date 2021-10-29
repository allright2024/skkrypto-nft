import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";
import LatestBlock from "../components/LatestBlocks";
import LatestTransactions from "../components/LatestTransactions";

function AllTransactions() {
  return (
    <Flex m={10} flexDirection="column" w="full">
      <Text fontSize="3xl" fontWeight="700">
        전체 거래내역
      </Text>

      {/* 그래프 */}

      <VStack w="full" backgroundColor="white" borderRadius="5px" p={5} marginTop={5}>
        <HStack justifyContent="space-between" w="full">
          <Text color="#4318FF" fontWeight={700} fontSize="lg">
            Latest Blocks
          </Text>
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

        <LatestBlock />
      </VStack>

      <VStack w="full" backgroundColor="white" borderRadius="5px" p={5} marginTop={5}>
        <HStack justifyContent="space-between" w="full">
          <Text color="#4318FF" fontWeight={700} fontSize="lg">
            Latest Transaction
          </Text>
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

        <LatestTransactions />
      </VStack>

      {/* 거래내역 */}
    </Flex>
  );
}

export default AllTransactions;
