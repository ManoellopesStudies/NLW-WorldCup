import { Heading, Text, VStack } from "native-base";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={"Create new pool"} />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily={"heading"} color={"white"} fontSize="xl" my={8} textAlign="center">
        Create your own cup pool and share it with friends!
        </Heading>

        <Input mb={2} placeholder="What is your pool name?"/>
        <Button title="create my pool"/>

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
        After creating your pool, you will receive a unique code that you can use to invite others.
        </Text>
      </VStack>
    </VStack>
  )
}