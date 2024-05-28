import { Container, VStack, Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";
import { useEvents, useAddEvent, useComments, useAddComment } from "../integrations/supabase";

const Index = () => {
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const addEventMutation = useAddEvent();

  const handleAddEvent = () => {
    addEventMutation.mutate({ name: "New Event", date: "2023-10-01", description: "Description of the new event" });
  };

  if (eventsLoading) return <Text>Loading events...</Text>;
  if (eventsError) return <Text>Error loading events: {eventsError.message}</Text>;

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
        <Button onClick={handleAddEvent}>Add Event</Button>
        {events.map(event => (
          <Box key={event.id} p={5} shadow="md" borderWidth="1px">
            <Text>{event.name}</Text>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;