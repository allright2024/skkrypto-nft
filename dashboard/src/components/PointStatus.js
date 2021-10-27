import { VStack, HStack, Text } from "@chakra-ui/react";

function PointStatus() {
    return (
        <VStack
            borderRadius={15}
            bg="yellow"
            p={10}
            align="flex-start"
            h="355px"
            w="45%"
            m={3}
        >
            <Text fontSize="3xl" fontWeight="700">
                포인트 현황
            </Text>
            <VStack spacing={10} w="full">
                <HStack w="full" justify="space-between">
                    <Text fontSize="lg">SKKU</Text>
                    <Text fontSize="lg">1221</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text fontSize="lg">SKKU</Text>
                    <Text fontSize="lg">1221</Text>
                </HStack>
                <HStack w="full" justify="space-between">
                    <Text fontSize="lg">SKKU</Text>
                    <Text fontSize="lg">1221</Text>
                </HStack>
            </VStack>
        </VStack>
    );
}

export default PointStatus;
