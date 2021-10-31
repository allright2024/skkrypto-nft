import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";
import LatestBlock from "../components/LatestBlocks";
import LatestTransactions from "../components/LatestTransactions";
import {useEffect, useState} from 'react';


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

function AllTransactions() {
    let fromList = [];
    let toList = [];
    let pointList=[];
    let typeList=[];
    let dateList = [];
    let hashList = []; 
    let tranList = [];

    const [ren, setRen]= useState(0);
    const [tran, setTran] = useState();
    useEffect(() => {
        // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
        if(ren<= 2){
            let requestOpt = getRequest({"asd":"asd"});
        

        fetch('http://localhost:5000/api/viewAll', requestOpt).then(response=>response.json()).then(jsons=>{
            for (let i = 1;jsons[i]!==undefined;i++){
                fromList.push(jsons[i]['from']);
                toList.push(jsons[i]['to']);
                pointList.push(jsons[i]['value']);
                typeList.push(jsons[i]['type']);
                dateList.push(jsons[i]['create_date']);
                hashList.push(jsons[i]['hash']);
            }
        })
        tranList.push(fromList);
        tranList.push(toList);
        tranList.push(pointList);
        tranList.push(typeList);
        tranList.push(dateList);
        tranList.push(hashList);
        //console.log(tranList);
        setTran(tranList);
        console.log(tran);
        setRen(ren+1);
        //console.log(fromList);
        }
    });
    return (
        <Flex m={10} flexDirection="column" w="full">
            <Text fontSize="3xl" fontWeight="700">
                전체 거래내역
            </Text>

            {/* 그래프 */}

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
                        Latest Blocks
                    </Text>
                    <Box
                        as="button"
                        backgroundColor="#4318FF"
                        color="white"
                        borderRadius="3px"
                        width="60px"
                        fontWeight="bold"
                    >
                        + More
                    </Box>
                </HStack>

                <LatestBlock />
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
                        Latest Transaction
                    </Text>
                    <Box
                        as="button"
                        backgroundColor="#4318FF"
                        color="white"
                        borderRadius="3px"
                        width="60px"
                        fontWeight="bold"
                    >
                        + More
                    </Box>
                </HStack>

                <LatestTransactions 
                tran={tran}/>
            </VStack>

            {/* 거래내역 */}
        </Flex>
    );
}

export default AllTransactions;
