import { useParams } from "react-router-dom";
import { Container, Box, Text, VStack } from "@chakra-ui/react";
import { useComments } from "../integrations/supabase";
import { useEvents } from "../integrations/supabase";

const Event = () => {
  const { id } = useParams();
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const { data: comments, error: commentsError, isLoading: commentsLoading } = useComments(id);

  if (eventsLoading || commentsLoading) return <Text>Loading...</Text>;
  if (eventsError) return <Text>Error loading event: {eventsError.message}</Text>;
  if (commentsError) return <Text>Error loading comments: {commentsError.message}</Text>;

  const event = events.find(event => event.id === parseInt(id));

  if (!event) return <Text>Event not found</Text>;

  return (
    <Container maxW="container.xl" p={0} centerContent>
      <Box p={5} shadow="md" borderWidth="1px" w="100%">
        <Text fontSize="4xl" fontWeight="bold">{event.name}</Text>
        <Text>{event.date}</Text>
        <Text>{event.description}</Text>
      </Box>
      <VStack spacing={4} mt={10} w="100%">
        <Text fontSize="2xl" fontWeight="bold">Comments</Text>
        {comments.map(comment => (
          <Box key={comment.id} p={5} shadow="md" borderWidth="1px" w="100%">
            <Text>{comment.content}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Event;