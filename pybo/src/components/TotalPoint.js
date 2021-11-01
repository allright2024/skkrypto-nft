import { Text, HStack, Box, VStack } from "@chakra-ui/react";
import {useState, useEffect} from "react"

const getRequest = (jsons) => {
    return {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(jsons),
    };
};

function TotalPoint() {
    const [pointArr, setPointArr] = useState([]);

    useEffect(() => {
        //username를 생성하는 부분이 완성되면, 아래 fortest을 지우고 현재 로그인된 사용자의 username을 넣으면 됩니다. (성민)
        let requestOpt = getRequest({"username":"fortest"});
        fetch("http://localhost:5000/api/userInfo", requestOpt)
            .then((response) => response.json())
            .then((jsons) => {
                setPointArr(pointArr.concat(jsons.pointA,jsons.pointB,jsons.pointC,jsons.pointD));
            });
    }, [])

    const sumTotalPoint = () => {
        let sumPoint = 0
        for (let i = 0; i < pointArr.length; i++) {
            sumPoint += pointArr[i]
        }
        return sumPoint
    }

    const sumPoint = sumTotalPoint()

    return (
        <VStack
            justify="space-between"
            p={5}
            m={3}
            backgroundImage="linear-gradient(#532DFB,#868CFF)"
            w="full"
            h="204px"
            borderRadius={15}
        >
            <HStack w="full" justify="space-between">
                <Text color="white" fontWeight="700" fontSize="3xl">
                    총 보유 포인트
                </Text>
                <Box />
            </HStack>
            <HStack w="full" justify="space-between">
                <Box />
                <Text color="white" fontWeight="700" fontSize="5xl">
                    {sumPoint} point
                </Text>
            </HStack>
        </VStack>
    );
}

export default TotalPoint;
