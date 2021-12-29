import { HashRouter, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/Navbar.js";
import { Container, Flex } from "@chakra-ui/react";
import DashBoard from "./pages/DashBoard";
import MyTransactions from "./pages/MyTransactions";
import AllTransactions from "./pages/AllTransactions";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import { useWeb3React } from "@web3-react/core";

const AppWrap = styled.div`
    font-size: 12px;
    font-family: "Poppins", sans-serif;
`;

function App() {
    const { active } = useWeb3React();
    return (
        <AppWrap>
            <Container maxW="full" bg="#E5E5E5" p={0}>
                <Flex minH="100vh" h="full">
                    <HashRouter>
                        {active ? (
                            <Redirect to="/dashboard" />
                        ) : (
                            <Redirect to="/" />
                        )}
                        {active ? <NavBar /> : <></>}
                        <Route exact="true" path="/" component={Login} />
                        <Route
                            exact="true"
                            path="/dashboard"
                            component={DashBoard}
                        />
                        <Route
                            exact="true"
                            path="/my-transactions"
                            component={MyTransactions}
                        />
                        <Route
                            exact="true"
                            path="/all-transactions"
                            component={AllTransactions}
                        />
                        <Route
                            exact="true"
                            path="/admin-page"
                            component={AdminPage}
                        />
                    </HashRouter>
                </Flex>
            </Container>
        </AppWrap>
    );
}

export default App;
