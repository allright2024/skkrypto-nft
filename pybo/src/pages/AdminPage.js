import {
    Flex, HStack, Text, VStack, Box, Input, Button,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
  } from "@chakra-ui/react"

function AdminPage() {
    const handleCreateTransaction = (event) => {
        console.log(event.target.parentElement.parentElement.children[1].value);
        console.log(event.target.parentElement.parentElement.children[3].value);
        console.log(event.target.parentElement.parentElement.children[5].value);
        console.log(event.target.parentElement.parentElement.children[7].value);
        console.log(event.target.parentElement.parentElement.children[9].value);
        console.log(event.target.parentElement.parentElement.children[11].value);
    }

    const handleCreateUserInfo = (event) => {
        console.log(event.target.parentElement.children[1].value);
        console.log(event.target.parentElement.children[3].value);
        console.log(event.target.parentElement.children[5].value);
    }

    return (
        <Flex m={10} flexDirection="column" w="full">
            <Text fontSize="3xl" fontWeight="700">
                관리자 페이지
            </Text>

            <VStack
                w="full"
                backgroundColor="white"
                borderRadius="5px"
                p={5}
                marginTop={5}
                borderRadius={20}
            >
                <HStack justifyContent="space-between" w="full">
                    <Text color="#4318FF" fontWeight={700} fontSize="lg">
                        트랜잭션 생성
                    </Text>
                </HStack>
                <FormControl id="transaction-create">
                    <FormLabel>From</FormLabel>
                    <Input placeholder="ex) Alice" />
                    <FormLabel>To</FormLabel>
                    <Input placeholder="ex) Bob" />
                    <FormLabel>Point</FormLabel>
                    <Input placeholder="ex) 300" />
                    <FormLabel>Type</FormLabel>
                    <Input placeholder="ex) A" />
                    <FormLabel>Date</FormLabel>
                    <Input placeholder="ex) 2018.05.03" />
                    <FormLabel>Hash</FormLabel>
                    <Input placeholder="Hash Value" />
                    <Button
                        type="submit"
                        onClick={handleCreateTransaction}
                        h="40px"
                        borderRadius={20}
                        w="200px"
                        bg="#4318FF"
                        color="white"
                        fontSize="sm"
                        fontWeight="bold"
                        mt={5}
                    >
                        <Text>트랜잭션 생성하기</Text>
                    </Button>
                </FormControl>

                

            </VStack>

            <VStack
                w="full"
                backgroundColor="white"
                borderRadius="5px"
                p={5}
                marginTop={5}
                borderRadius={20}
            >
                <HStack justifyContent="space-between" w="full">
                    <Text color="#4318FF" fontWeight={700} fontSize="lg">
                        유저 정보 생성
                    </Text>
                </HStack>
                <FormControl id="transaction-create">
                    <FormLabel>User ID</FormLabel>
                    <Input placeholder="Enter user ID" />
                    <FormLabel>User Pw</FormLabel>
                    <Input placeholder="Enter user Password" />
                    <FormLabel>User Email</FormLabel>
                    <Input placeholder="Enter user Email" />
                    <Button
                        type="submit"
                        onClick={handleCreateUserInfo}
                        h="40px"
                        borderRadius={20}
                        w="200px"
                        bg="#4318FF"
                        color="white"
                        fontSize="sm"
                        fontWeight="bold"
                        mt={5}
                    >
                        <Text>유저 정보 생성하기</Text>
                    </Button>
                </FormControl>

                

            </VStack>
            
        </Flex>
    );
}

export default AdminPage;
