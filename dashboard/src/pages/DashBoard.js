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
    const [isLessThan1070] = useMediaQuery("(max-width:1070px)");
    return (
        <Flex wrap="wrap" w="full" h="full" justify="space-evenly" bg="#E5E5E5">
            <Flex
                justify="space-between"
                p={5}
                wrap="wrap"
                minW="350px"
                w={isLessThan1070 ? "full" : "60%"}
            >
                <TotalPoint />
                <PointStatus />
                <PointStatus />
                <PointStatus />
                <PointStatus />
            </Flex>
            <VStack
                p={5}
                minW={isLessThan1070 ? "350px" : 0}
                w={isLessThan1070 ? "full" : "300px"}
            >
                <WalletConnect />
            </VStack>
        </Flex>
    );
}

export default DashBoard;
