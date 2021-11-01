import {
    VStack,
    Box,
    Flex,
    Text,
    Button,
    Link,
    useMediaQuery,
    Tooltip,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

function AccountInfo() {
    const [isLessThan1195] = useMediaQuery("(max-width:1195px)");
    const { account } = useWeb3React();
    const parseAccount =
        account &&
        account?.substring(0, 10) + "..." + account?.substring(32, 40);

    const etherscanAccount = "https://etherscan.io/address/" + account;

    const parseAccountForColor = "#" + account?.substring(2, 8);
    console.log(parseAccountForColor);
    return (
        <VStack
            borderRadius={15}
            bg="white"
            p={10}
            h="355px"
            w={isLessThan1195 ? "full" : "45%"}
            m={3}
            justify="center"
            spacing={5}
        >
            <Flex
                backgroundColor={parseAccountForColor}
                borderRadius={100}
                w="110px"
                h="110px"
                align="center"
                justify="center"
                fontFamily="'Pacifico', cursive"
                fontSize="3xl"
            >
                {account?.substring(2, 6)}
            </Flex>
            <Text fontSize="lg">내 지갑 주소 : </Text>
            <Tooltip label={account}>
                <Text>{parseAccount}</Text>
            </Tooltip>
            {account && (
                <Button as={Link} isExternal href={etherscanAccount}>
                    View on Etherscan
                </Button>
            )}
        </VStack>
    );
}

export default AccountInfo;
