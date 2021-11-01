import {
    Flex,
    HStack,
    Text,
    VStack,
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import WalletConnect from "../components/WalletConnect";
import moment from "moment";

function AdminPage() {
    const { library, account } = useWeb3React();
    const signer = library?.getSigner(account).connectUnchecked();

    const handleCreateTransaction = (event) => {
        // console.log(event.target.parentElement.parentElement.children[1].value);
        // console.log(event.target.parentElement.parentElement.children[3].value);
        // console.log(event.target.parentElement.parentElement.children[5].value);
        // console.log(event.target.parentElement.parentElement.children[7].value);
        // console.log(event.target.parentElement.parentElement.children[9].value);
        // console.log(event.target.parentElement.parentElement.children[11].value);
        let m = moment().format("YYYY.MM.DD");
        fetch("http://localhost:5000/api/createTx/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Headers':"*"    
            },
            body:JSON.stringify({
                from : event.target.parentElement.parentElement.children[1].value, 
                to : event.target.parentElement.parentElement.children[3].value,
                point : event.target.parentElement.parentElement.children[5].value,
                type : event.target.parentElement.parentElement.children[7].value,
                date : m,
                hash : event.target.parentElement.parentElement.children[9].value,
            })
          }).then(res => {
              if (res.ok){
                console.log("Successfully added Transaction");
              }
          }
          )
    };

    const getRequest=(jsons)=>{
        return{
            method:'POST',
            header:{
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Headers':"*"                
            },
            body:JSON.stringify(jsons)
        }
    }
    const handleCreateUserInfo = (event) => {
        console.log(event.target.parentElement.children[1].value);
        console.log(event.target.parentElement.children[3].value);
        console.log(event.target.parentElement.children[5].value);
        fetch("http://localhost:5000/api/createUser/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Headers':"*"    
            },
            body: JSON.stringify({
              id: event.target.parentElement.children[1].value,
              password: event.target.parentElement.children[3].value,
              email: event.target.parentElement.children[5].value,                
            })
          }).then(res => {
              if (res.ok){
                console.log("Successfully added user");
              }
          }
          )            
    };

    const handleDemo = () => {
        let hash;
        let m = moment().format("YYYY.MM.DD");
        const message = JSON.stringify({
            from: account,
            to: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            point: 100,
            type: "A",
            date: m,
        });

        signer.signMessage(message).then((result) => (hash = result));
        // 밑의 주석 이용하면 demo send 가능 
        // const send_message = JSON.stringify({
        //     from: account,
        //     to: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        //     type: "A",
        //     value: 100,
        // });
        // signer.signMessage(send_message).then((result) => (hash = result));
        // // 위의 hash 이용해서 Create transaction 보내면 됨
        // fetch("http://localhost:5000/api/createTx/", {
        //     method:'POST',
        //     header:{
        //         'Content-Type':'application/json',
        //         "Access-Control-Allow-Origin":"*",
        //         'Access-Control-Allow-Headers':"*"                
        //     },
        //     body:JSON.send_message
            
        // }).then(() => {
        //     console.log("added");
        // }
        // )
    };

    


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
            <VStack
                w="full"
                backgroundColor="white"
                borderRadius="5px"
                p={5}
                marginTop={5}
                borderRadius={20}
                align="flex-start"
            >
                <HStack justifyContent="space-between" w="full">
                    <Text color="#4318FF" fontWeight={700} fontSize="lg">
                        Demo
                    </Text>
                </HStack>
                <Text fontSize="lg">A에게 100포인트 보내기</Text>
                <WalletConnect />
                <Button
                    type="submit"
                    onClick={handleDemo}
                    h="40px"
                    borderRadius={20}
                    w="200px"
                    bg="#4318FF"
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                    mt={5}
                >
                    <Text>Demo 실행</Text>
                </Button>
            </VStack>
        </Flex>
    );
}

export default AdminPage;
