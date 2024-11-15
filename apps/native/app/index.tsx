import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { data, isError, isLoading } = useQuery<
    {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    }[]
  >({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.json();
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      {data?.map((todo) => <Text key={todo.id}>{todo.title}</Text>)}
    </View>
  );
}
