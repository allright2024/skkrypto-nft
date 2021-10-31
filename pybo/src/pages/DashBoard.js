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
import AccountInfo from "../components/AccountInfo";

function DashBoard() {
    const [isLessThan1070] = useMediaQuery("(max-width:1070px)");
    return (
        <Flex wrap="wrap" w="full" h="full" justify="space-evenly" bg="#E5E5E5">
            <Flex
                flexGrow="1"
                justify="space-between"
                p={5}
                wrap="wrap"
                minW="350px"
                w={isLessThan1070 ? "full" : "60%"}
            >
                <TotalPoint />
                <PointStatus />
                <AccountInfo />
                <PointStatus />
                <PointStatus />
            </Flex>
        </Flex>
    );
}

export default DashBoard;
