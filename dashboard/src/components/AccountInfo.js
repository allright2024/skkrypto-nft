import { VStack, Box, Text, Button, Link } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

function AccountInfo() {
    const { account } = useWeb3React();
    const parseAccount =
        account &&
        account?.substring(0, 10) + "..." + account?.substring(32, 40);

    const etherscanAccount = "https://etherscan.io/address/" + account;

    return (
        <VStack>
            <Box bg="black" borderRadius={100} w="80px" h="80px" />
            <Text>{parseAccount}</Text>
            {account && (
                <Button as={Link} isExternal href={etherscanAccount}>
                    View on Etherscan
                </Button>
            )}
        </VStack>
    );
}

export default AccountInfo;
