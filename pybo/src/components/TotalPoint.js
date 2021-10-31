import { Text, HStack, Box, VStack } from "@chakra-ui/react";

function TotalPoint() {
    return (
        <VStack
            justify="space-between"
            p={5}
            m={3}
            backgroundImage="linear-gradient(#532DFB,#868CFF)"
            w="full"
            h="204px"
            borderRadius={15}
        >
            <HStack w="full" justify="space-between">
                <Text color="white" fontWeight="700" fontSize="3xl">
                    총 보유 포인트
                </Text>
                <Box />
            </HStack>
            <HStack w="full" justify="space-between">
                <Box />
                <Text color="white" fontWeight="700" fontSize="5xl">
                    3,350 point
                </Text>
            </HStack>
        </VStack>
    );
}

export default TotalPoint;
