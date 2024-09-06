import { Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import PictureRow from "./components/PictureRow";

function App() {
  return (
		<Stack h='100vh' backgroundColor="gray.800">
			<Navbar />
			<Container>
        <PictureRow />
				<ReviewList />
        <ReviewForm />
			</Container>
		</Stack>
	);
}

export default App;