import { Container, VStack, Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container maxW="container.xl" p={0} centerContent>
      <Box w="100%" bg="white" boxShadow="md">
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="white" color="black">
          <Box>
            <Text fontSize="xl" fontWeight="bold">BrandName</Text>
          </Box>
          <Spacer />
          <Box>
            <Button variant="ghost" mr={4}>Home</Button>
            <Button variant="ghost" mr={4}>About</Button>
            <Button variant="ghost" mr={4}>Services</Button>
            <Button variant="ghost">Contact</Button>
          </Box>
        </Flex>
      </Box>
      <VStack spacing={4} mt={10}>
        <Text fontSize="4xl" fontWeight="bold">Welcome to Our Landing Page</Text>
        <Text fontSize="lg">We are glad to have you here. Explore our services and get to know more about us.</Text>
      </VStack>
    </Container>
  );
};

export default Index;