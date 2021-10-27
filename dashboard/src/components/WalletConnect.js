import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connector";
import { Box, Text, Button } from "@chakra-ui/react";

function WalletConnect() {
    const { activate, active } = useWeb3React();
    console.log(active);
    const onClick = () => {
        activate(injectedConnector);
    };

    return (
        <Box as="button" onClick={onClick}>
            <Text>지갑 연결하기</Text>
        </Box>
    );
}

export default WalletConnect;
