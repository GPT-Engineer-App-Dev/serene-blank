import { useParams } from "react-router-dom";
import { Container, Box, Text, VStack, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useComments, useAddComment, useEvents, useVenues, useDeleteEvent } from "../integrations/supabase";
import { useState } from "react";

const Event = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [deletingEventId, setDeletingEventId] = useState(null);
  const addCommentMutation = useAddComment();
  const deleteEventMutation = useDeleteEvent();
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const { data: comments, error: commentsError, isLoading: commentsLoading } = useComments(id);
  const { data: venues } = useVenues();

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    addCommentMutation.mutate({ content: newComment, event_id: id }, {
      onSuccess: () => {
        setNewComment("");
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

  if (eventsLoading || commentsLoading) return <Text>Loading...</Text>;
  if (eventsError) return <Text>Error loading event: {eventsError.message}</Text>;
  if (commentsError) return <Text>Error loading comments: {commentsError.message}</Text>;

  const event = events.find(event => event.id === parseInt(id));
  const venue = venues.find(venue => venue.id === event.venue_id);

  if (!event) return <Text>Event not found</Text>;

  return (
    <Container maxW="container.xl" p={0} centerContent>
      <Box p={5} shadow="md" borderWidth="1px" w="100%">
        <Text fontSize="4xl" fontWeight="bold">{event.name}</Text>
        <Text>{event.date}</Text>
        <Text>{event.description}</Text>
        <Text>{venue ? venue.name : "No venue selected"}</Text>
        <Button
          colorScheme="red"
          onClick={() => handleDeleteEvent(event.id)}
          isLoading={deletingEventId === event.id}
          mt={2}
        >
          Delete Event
        </Button>
      </Box>
      <VStack spacing={4} mt={10} w="100%">
        <Text fontSize="2xl" fontWeight="bold">Comments</Text>
        {comments.map(comment => (
          <Box key={comment.id} p={5} shadow="md" borderWidth="1px" w="100%">
            <Text>{comment.content}</Text>
          </Box>
        ))}
        <Box p={5} shadow="md" borderWidth="1px" w="100%">
          <FormControl id="new-comment" isRequired>
            <FormLabel>Add a Comment</FormLabel>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
            />
          </FormControl>
          <Button
            mt={2}
            colorScheme="blue"
            onClick={handleAddComment}
            isLoading={addCommentMutation.isLoading}
          >
            Submit
          </Button>
          {addCommentMutation.error && (
            <Text color="red.500" mt={2}>Error adding comment: {addCommentMutation.error.message}</Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Event;