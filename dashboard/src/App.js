import { HashRouter, Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import { Container, Flex } from "@chakra-ui/react";
import DashBoard from "./pages/DashBoard";
import MyTransactions from "./pages/MyTransactions";
import AllTransactions from "./pages/AllTransactions";

const AppWrap = styled.div`
  font-size: 12px;
  font-family: "Poppins", sans-serif;
`;

function App() {
  return (
    <AppWrap>
      <Container maxW="full" bg="#E5E5E5" p={0}>
        <Flex minH="100vh" h="full">
          <HashRouter>
            <NavBar />
            <Route exact="true" path="/" component={DashBoard} />
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
          </HashRouter>
        </Flex>
      </Container>
    </AppWrap>
  );
}

export default App;
