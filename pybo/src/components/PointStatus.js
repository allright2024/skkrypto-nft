import { VStack, HStack, Text, useMediaQuery } from "@chakra-ui/react";

function PointStatus() {
    const [isLessThan1195] = useMediaQuery("(max-width:1195px)");
    return (
        <VStack
            borderRadius={15}
            bg="white"
            p={10}
            align="flex-start"
            h="355px"
            w={isLessThan1195 ? "full" : "45%"}
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
