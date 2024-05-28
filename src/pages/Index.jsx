import { Container, VStack, Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents, useAddEvent } from "../integrations/supabase";

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
      <VStack spacing={4} mt={10}>
        <Text fontSize="4xl" fontWeight="bold">Welcome to Our Landing Page</Text>
        <Text fontSize="lg">We are glad to have you here. Explore our services and get to know more about us.</Text>
        <Button onClick={handleAddEvent}>Add Event</Button>
        {events.map(event => (
          <Box key={event.id} p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
            <Button as={Link} to={`/event/${event.id}`} mt={2}>View Details</Button>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;