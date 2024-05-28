import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box w="100%" bg="white" boxShadow="md">
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="white" color="black">
        <Box>
          <Text fontSize="xl" fontWeight="bold">BrandName</Text>
        </Box>
        <Spacer />
        <Box>
          <Button as={Link} to="/" variant="ghost" mr={4}>Home</Button>
          <Button as={Link} to="/about" variant="ghost" mr={4}>About</Button>
          <Button as={Link} to="/services" variant="ghost" mr={4}>Services</Button>
          <Button as={Link} to="/contact" variant="ghost">Contact</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;