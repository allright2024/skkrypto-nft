import {
    HStack,
    Text,
    VStack,
    Flex,
    Box,
    useMediaQuery,
} from "@chakra-ui/react";
import TotalPoint from "../components/TotalPoint";
import PointStatus from "../components/PointStatus";
import WalletConnect from "../components/WalletConnect";

function DashBoard() {
    const [isLessThan1342] = useMediaQuery("(max-width:1342px)");
    return (
        <Flex wrap="wrap" w="full" h="full" justify="space-evenly" bg="#E5E5E5">
            <Flex
                justify="center"
                p={10}
                wrap="wrap"
                minW="350px"
                w="76%"
                bg="white"
            >
                <TotalPoint />
                <PointStatus />
                <PointStatus />
                <PointStatus />
                <PointStatus />
            </Flex>
            <VStack
                minW={isLessThan1342 ? "350px" : 0}
                w={isLessThan1342 ? "76%" : "250px"}
                bg="white"
            >
                <WalletConnect />
            </VStack>
        </Flex>
    );
}

export default DashBoard;
