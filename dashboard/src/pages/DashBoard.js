import { HStack, Text, VStack, Flex, Box } from "@chakra-ui/layout";
import TotalPoint from "../components/TotalPoint";
import PointStatus from "../components/PointStatus";
import WalletConnect from "../components/WalletConnect";

function DashBoard() {
    return (
        <Flex wrap="wrap" w="full" h="full" justify="space-evenly" bg="#E5E5E5">
            <Flex
                justify="center"
                p={10}
                wrap="wrap"
                minW="350px"
                w="60%"
                bg="white"
                h="100vh"
            >
                <TotalPoint />
                <PointStatus />
                <PointStatus />
                <PointStatus />
                <PointStatus />
            </Flex>
            <VStack w="350px" bg="white" h="100vh">
                <WalletConnect />
            </VStack>
        </Flex>
    );
}

export default DashBoard;
