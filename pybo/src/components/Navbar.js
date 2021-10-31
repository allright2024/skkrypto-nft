import { useState } from "react";
import { VStack, HStack, Img, Text, Link } from "@chakra-ui/react";
import activeDashboard from "../assets/activeDashboard.svg";
import dashboard from "../assets/dashboard.svg";
import transactions from "../assets/transactions.svg";
import activeTransactions from "../assets/activeTransactions.svg";
import { Link as RouterLink } from "react-router-dom";

function NavBar() {
    const [index, setIndex] = useState(0);
    const path = window.location.pathname.split("/").pop();

    if (path === "/dashboard") {
        index !== 0 && setIndex(0);
    } else if (path === "my-transaction") {
        index !== 1 && setIndex(1);
    } else if (path === "all-transactions") {
        index !== 2 && setIndex(2);
    }

    return (
        <VStack spacing={8} p={9} bg="#ffffff" minW="200px">
            <HStack>
                <Text fontSize="xl" fontWeight="900" color="#4318FF">
                    KingoChain
                </Text>
            </HStack>
            <VStack h="full" justify="space-between" spacing={5}>
                <VStack>
                    <Link
                        onClick={() => setIndex(0)}
                        as={RouterLink}
                        to="/dashboard"
                    >
                        <HStack
                            p={3}
                            borderRadius={5}
                            w="130px"
                            bg={index === 0 ? "#4318FF" : "#ffffff"}
                            spacing={3}
                        >
                            <Img
                                src={index === 0 ? activeDashboard : dashboard}
                            />
                            <Text
                                fontSize="sm"
                                fontWeight="bold"
                                color={index === 0 ? "#ffffff" : "#A3AED0"}
                            >
                                대시보드
                            </Text>
                        </HStack>
                    </Link>
                    <Link
                        onClick={() => setIndex(1)}
                        as={RouterLink}
                        to="/my-transactions"
                    >
                        <HStack
                            p={3}
                            borderRadius={5}
                            w="130px"
                            bg={index === 1 ? "#4318FF" : "#ffffff"}
                            spacing={3}
                        >
                            <Img
                                src={
                                    index === 1
                                        ? activeTransactions
                                        : transactions
                                }
                            />
                            <Text
                                fontSize="sm"
                                fontWeight="bold"
                                color={index === 1 ? "#ffffff" : "#A3AED0"}
                            >
                                My 거래내역
                            </Text>
                        </HStack>
                    </Link>
                </VStack>
                <Link
                    onClick={() => setIndex(2)}
                    as={RouterLink}
                    to="/all-transactions"
                >
                    <HStack
                        p={2}
                        borderRadius={5}
                        w="130px"
                        bg={index === 2 ? "#4318FF" : "#ffffff"}
                    >
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={index === 2 ? "#ffffff" : "#00000"}
                        >
                            전체 거래내역
                        </Text>
                    </HStack>
                </Link>
                {/* <Link onClick={() => setIndex(3)} as={RouterLink} to="/admin-page">
                    <HStack
                        p={3}
                        borderRadius={5}
                        w="130px"
                        bg={index === 3 ? "#4318FF" : "#ffffff"}
                        spacing={3}
                    >
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={index === 3 ? "#ffffff" : "#A3AED0"}
                        >
                            관리자 페이지
                        </Text>
                    </HStack>
                </Link> */}
            </VStack>
        </VStack>
    );
}

export default NavBar;
