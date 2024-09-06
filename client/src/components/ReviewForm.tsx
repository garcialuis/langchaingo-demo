import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { PiOpenAiLogoLight } from "react-icons/pi";

const ReviewForm = () => {
	const [newReview, setNewReview] = useState("");
	const [isOpenAiAction, setIsOpenAiAction] = useState(false);

	const queryClient = useQueryClient();

	const createReviewMutation = useMutation({
		mutationKey: ['createReview'],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				const res = await fetch("http://localhost:8080/api/v1/reviews", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ body: newReview }),
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Failed to submit review");
				}
				setNewReview("");
				return data;
			} catch (error: any) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
		onError: (error: any) => {
			alert(error.message);
		},
	});

	const openAiActionMutation = useMutation({
		mutationKey: ['openAiAction'],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				// const res = await fetch("http://localhost:8080/api/v1/openai-action", {
				// 	method: "POST",
				// 	headers: {
				// 		"Content-Type": "application/json",
				// 	},
				// 	body: JSON.stringify({ body: newReview }),
				// });
				// const data = await res.json();
				// if (!res.ok) {
				// 	throw new Error(data.error || "Failed to perform OpenAI action");
				// }
				// setNewReview("");
				// onSummaryUpdate(data.summary);
				// return data;
				const res = await fetch("http://localhost:8080/api/v1/summaries")
				const data = await res.json()

				if(!res.ok){
					throw new Error(data.error || "failed to fetch reviews")
				}
				console.log(data) //TODO: remove
				setNewReview("");
				return data || []
			} catch (error: any) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			// TODO: Handle success, e.g., invalidate queries or show a success message
		},
		onError: (error: any) => {
			alert(error.message);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isOpenAiAction) {
			openAiActionMutation.mutate(e);
		} else {
			createReviewMutation.mutate(e);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex gap={2}>
				<Input
					type='text'
					value={newReview}
					onChange={(e) => setNewReview(e.target.value)}
					ref={(input) => input && input.focus()}
				/>
				<Button
					mx={2}
					type='submit'
					_active={{ transform: "scale(.97)" }}
					onClick={() => setIsOpenAiAction(false)}
				>
					{createReviewMutation.isPending ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
				<Button
					mx={1}
					type='submit'
					_active={{ transform: "scale(.97)" }}
					onClick={() => setIsOpenAiAction(true)}
				>
					{openAiActionMutation.isPending ? <Spinner size={"xs"} /> : <PiOpenAiLogoLight size={30} />}
				</Button>
			</Flex>
		</form>
	);
};

export default ReviewForm;
