import { useState } from "react";
import { Container, VStack, Box, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents, useAddEvent, useVenues, useDeleteEvent } from "../integrations/supabase";

const Index = () => {
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const addEventMutation = useAddEvent();
  const deleteEventMutation = useDeleteEvent();
  const { data: venues } = useVenues();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: "" });
  const [deletingEventId, setDeletingEventId] = useState(null);

  const handleAddEvent = () => {
    addEventMutation.mutate(newEvent, {
      onSuccess: () => {
        onClose();
        setNewEvent({ name: "", date: "", description: "", venue_id: "" });
      },
    });
  };

  const handleDeleteEvent = (id) => {
    setDeletingEventId(id);
    deleteEventMutation.mutate(id, {
      onSuccess: () => {
        setDeletingEventId(null);
      },
      onError: () => {
        setDeletingEventId(null);
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  if (eventsLoading) return <Text>Loading events...</Text>;
  if (eventsError) return <Text>Error loading events: {eventsError.message}</Text>;

  return (
    <Container maxW="container.xl" p={0} centerContent>
      <VStack spacing={4} mt={10}>
        <Text fontSize="4xl" fontWeight="bold">Welcome to Our Landing Page</Text>
        <Text fontSize="lg">We are glad to have you here. Explore our services and get to know more about us.</Text>
        <Button onClick={onOpen}>Add Event</Button>
        {events.map(event => (
          <Box key={event.id} p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
            <Button as={Link} to={`/event/${event.id}`} mt={2}>View Details</Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteEvent(event.id)}
              isLoading={deletingEventId === event.id}
              mt={2}
              ml={2}
            >
              Delete
            </Button>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={newEvent.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="date" isRequired mt={4}>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={newEvent.date} onChange={handleChange} />
            </FormControl>
            <FormControl id="description" isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={newEvent.description} onChange={handleChange} />
            </FormControl>
            <FormControl id="venue" isRequired mt={4}>
              <FormLabel>Venue</FormLabel>
              <Select name="venue_id" value={newEvent.venue_id} onChange={handleChange}>
                <option value="">Select a venue</option>
                {venues && venues.map(venue => (
                  <option key={venue.id} value={venue.id}>{venue.name}</option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEvent} isLoading={addEventMutation.isLoading}>
              Add Event
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;