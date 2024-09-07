import { Flex, Image, Box } from "@chakra-ui/react";

export default function PictureRow() {
    return (
        <Flex
            direction="row"
            justify="center"
            align="center"
            gap={4}
            my={4}
            wrap="wrap"
        >
            <Box flex="1" maxW="200px" minW="150px">
                <Image
                    src="/furr-ball.JPEG"
                    alt="Picture 1"
                    borderRadius="md"
                    boxSize="full"
                    objectFit="cover"
                />
            </Box>
            <Box flex="1" maxW="200px" minW="150px">
                <Image
                    src="/n.JPEG"
                    alt="Picture 2"
                    borderRadius="md"
                    boxSize="full"
                    objectFit="cover"
                />
            </Box>
            <Box flex="1" maxW="200px" minW="150px">
                <Image
                    src="/dog-brush.JPEG"
                    alt="Picture 3"
                    borderRadius="md"
                    boxSize="full"
                    objectFit="cover"
                />
            </Box>
        </Flex>
    );
}
