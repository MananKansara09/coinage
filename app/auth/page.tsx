"use client";
import LoginAuth from "@/components/auth/loginauth";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function Auth() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoginAuth />
      </QueryClientProvider>
    </>
  );
}
