import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";
import LatestBlock from "../components/LatestBlocks";
import LatestTransactions from "../components/LatestTransactions";

function AllTransactions() {
    const getRequest=()=>{
        return{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Headers':"*"
            },
            body:JSON.stringify({'a':'a'})
        }
    }

    const apicall=()=>{
        console.log("hello");
        
        const requestOpt=getRequest();
        fetch('http://localhost:5000/api/viewAll', requestOpt).then(response=>response.json()).then(jsons=>{
            console.log(jsons);
        })
    }

    return (
        <Flex m={10} flexDirection="column" w="full">
            <Text fontSize="3xl" fontWeight="700">
                전체 거래내역
            </Text>

            {/* 그래프 */}

            <VStack
                w="full"
                backgroundColor="white"
                borderRadius="5px"
                p={5}
                marginTop={5}
                borderRadius={20}
            >
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
                        onClick={apicall}
                    >
                        + More
                    </Box>
                </HStack>

                <LatestBlock />
            </VStack>

            <VStack
                w="full"
                backgroundColor="white"
                borderRadius="5px"
                p={5}
                marginTop={5}
                borderRadius={20}
            >
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
