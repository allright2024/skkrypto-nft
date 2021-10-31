import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connector";
import { Box, Text, VStack, Link } from "@chakra-ui/react";

function WalletConnect() {
    const { activate, active } = useWeb3React();
    console.log(active);
    const onClick = () => {
        activate(injectedConnector);
    };

    return (
        <VStack w="full" h="100vh" align="center" justify="center">
            <VStack bg="white" p={10} borderRadius={20}>
                <Text fontSize="md">Kingo Chain에 오신 것을 환영합니다.</Text>
                <Text>서비스 이용을 위해 메타마스크 로그인을 해주세요.</Text>
                <Link color="blue" href="https://metamask.io/" isExternal>
                    메타마스크 설치하기
                </Link>
                <Box
                    as="Button"
                    onClick={onClick}
                    h="40px"
                    borderRadius={20}
                    w="200px"
                    bg="#4318FF"
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                >
                    <Text>지갑 연결하기</Text>
                </Box>
            </VStack>
        </VStack>
    );
}

export default WalletConnect;
