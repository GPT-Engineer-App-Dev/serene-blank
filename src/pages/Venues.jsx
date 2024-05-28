import { useState } from "react";
import { Container, VStack, Box, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from "../integrations/supabase";

const Venues = () => {
  const { data: venues, error: venuesError, isLoading: venuesLoading } = useVenues();
  const addVenueMutation = useAddVenue();
  const updateVenueMutation = useUpdateVenue();
  const deleteVenueMutation = useDeleteVenue();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newVenue, setNewVenue] = useState({ name: "", location: "", description: "" });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleAddVenue = () => {
    addVenueMutation.mutate(newVenue, {
      onSuccess: () => {
        onClose();
        setNewVenue({ name: "", location: "", description: "" });
      },
    });
  };

  const handleUpdateVenue = () => {
    updateVenueMutation.mutate(editingVenue, {
      onSuccess: () => {
        onClose();
        setEditingVenue(null);
      },
    });
  };

  const handleDeleteVenue = (id) => {
    deleteVenueMutation.mutate(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingVenue) {
      setEditingVenue((prevVenue) => ({ ...prevVenue, [name]: value }));
    } else {
      setNewVenue((prevVenue) => ({ ...prevVenue, [name]: value }));
    }
  };

  if (venuesLoading) return <Text>Loading venues...</Text>;
  if (venuesError) return <Text>Error loading venues: {venuesError.message}</Text>;

  return (
    <Container maxW="container.xl" p={0} centerContent>
      <VStack spacing={4} mt={10}>
        <Text fontSize="4xl" fontWeight="bold">Venues</Text>
        <Button onClick={onOpen}>{editingVenue ? "Edit Venue" : "Add Venue"}</Button>
        {venues.map(venue => (
          <Box key={venue.id} p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{venue.name}</Text>
            <Text>{venue.location}</Text>
            <Text>{venue.description}</Text>
            <Button onClick={() => { setEditingVenue(venue); onOpen(); }} mt={2}>Edit</Button>
            <Button onClick={() => handleDeleteVenue(venue.id)} mt={2} ml={2}>Delete</Button>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingVenue ? "Edit Venue" : "Add New Venue"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={editingVenue ? editingVenue.name : newVenue.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="location" isRequired mt={4}>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={editingVenue ? editingVenue.location : newVenue.location} onChange={handleChange} />
            </FormControl>
            <FormControl id="description" isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={editingVenue ? editingVenue.description : newVenue.description} onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editingVenue ? handleUpdateVenue : handleAddVenue} isLoading={addVenueMutation.isLoading || updateVenueMutation.isLoading}>
              {editingVenue ? "Update Venue" : "Add Venue"}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Venues;